import { NextResponse } from "next/server";
import { siteConfig } from "@/constants/site";

export const runtime = "nodejs";

/** Origen visible en el panel admin del cotizador. */
const LEAD_SOURCE = "Formulario web - Desde Tu 7%";

/** Host del motor CRM (isapresPremium). Nunca usar la URL del widget/iframe. */
const DEFAULT_COTIZADOR_API_URL = "https://isaprespremium.cl";

type LeadBody = {
  nombreCompleto?: unknown;
  correo?: unknown;
  celular?: unknown;
  rut?: unknown;
  edad?: unknown;
  previsionActual?: unknown;
  ufActual?: unknown;
  regionResidencia?: unknown;
  cargas?: unknown;
  edadCargas?: unknown;
  rentaImponible?: unknown;
  comentarios?: unknown;
  tipo_contacto?: unknown;
  _hp?: unknown;
  website?: unknown;
};

function asTrimmedString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function mapPreferenciaContacto(value: string): string | undefined {
  const normalized = value.trim().toLowerCase();
  if (!normalized) return undefined;
  if (normalized === "correo" || normalized === "email") return "email";
  if (normalized === "telefono" || normalized === "teléfono") return "telefono";
  if (
    normalized === "video_llamada" ||
    normalized === "video-llamada" ||
    normalized === "zoom"
  ) {
    return "video-llamada";
  }
  if (normalized === "whatsapp") return "whatsapp";
  return normalized;
}

/** RUT chileno básico; si no es válido devolvemos null (no fallar el lead). */
function normalizeOptionalRut(value: string): string | null {
  const cleaned = value.replace(/[.\s]/g, "").toUpperCase();
  if (!cleaned) return null;
  const match = cleaned.match(/^(\d{7,8})-?([\dK])$/);
  if (!match) return null;

  const body = match[1];
  const dv = match[2];
  let sum = 0;
  let mul = 2;
  for (let i = body.length - 1; i >= 0; i -= 1) {
    sum += Number(body[i]) * mul;
    mul = mul === 7 ? 2 : mul + 1;
  }
  const expected = 11 - (sum % 11);
  const expectedDv =
    expected === 11 ? "0" : expected === 10 ? "K" : String(expected);
  if (expectedDv !== dv) return null;

  return `${body}-${dv}`;
}

function getClientsEndpoint(): string {
  // Solo COTIZADOR_API_URL (server). No usar NEXT_PUBLIC_COTIZADOR_URL:
  // esa apunta al widget/iframe y en prod suele ser cotizadorpremium.cl.
  const base = (
    process.env.COTIZADOR_API_URL?.trim() || DEFAULT_COTIZADOR_API_URL
  ).replace(/\/$/, "");
  return `${base}/api/public/v1/clients`;
}

function getApiSecret(): string | undefined {
  return (
    process.env.COTIZADOR_PUBLIC_API_SECRET?.trim() ||
    process.env.PUBLIC_API_SECRET?.trim() ||
    undefined
  );
}

function compactMetadata(
  input: Record<string, string | undefined>,
): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [key, value] of Object.entries(input)) {
    if (value && value.trim()) out[key] = value.trim();
  }
  return out;
}

/** Diagnóstico seguro: ¿está configurado el CRM? (sin filtrar secretos). */
export async function GET() {
  const secretConfigured = Boolean(getApiSecret());
  const apiBase = (
    process.env.COTIZADOR_API_URL?.trim() || DEFAULT_COTIZADOR_API_URL
  ).replace(/\/$/, "");

  return NextResponse.json({
    ok: true,
    crm: {
      configured: secretConfigured,
      apiBase,
      source: LEAD_SOURCE,
    },
  });
}

/**
 * Registra el lead del formulario marketing en el CRM del cotizador
 * (POST /api/public/v1/clients). El cliente también envía EmailJS por separado.
 */
export async function POST(request: Request) {
  try {
    let body: LeadBody;
    try {
      body = (await request.json()) as LeadBody;
    } catch {
      return NextResponse.json(
        { ok: false, error: "Solicitud inválida." },
        { status: 400 },
      );
    }

    // Honeypot: fingir éxito sin side-effects.
    const bait = asTrimmedString(body._hp ?? body.website);
    if (bait) {
      return NextResponse.json({ ok: true, registered: false });
    }

    const fullName = asTrimmedString(body.nombreCompleto);
    const email = asTrimmedString(body.correo);
    const phone = asTrimmedString(body.celular);
    const rut = normalizeOptionalRut(asTrimmedString(body.rut));

    if (fullName.length < 2 || !email || !phone) {
      return NextResponse.json(
        { ok: false, error: "Faltan nombre, correo o teléfono." },
        { status: 400 },
      );
    }

    const secret = getApiSecret();
    if (!secret) {
      console.error(
        "[api/leads] Falta COTIZADOR_PUBLIC_API_SECRET (o PUBLIC_API_SECRET) en el entorno de este sitio.",
      );
      return NextResponse.json(
        {
          ok: false,
          error:
            "Registro CRM no configurado. Agrega COTIZADOR_PUBLIC_API_SECRET en Vercel.",
          code: "CRM_NOT_CONFIGURED",
        },
        { status: 503 },
      );
    }

    const preferenciaContacto = mapPreferenciaContacto(
      asTrimmedString(body.tipo_contacto),
    );
    const comentarios = asTrimmedString(body.comentarios);

    const payload = {
      fullName,
      email,
      phone,
      ...(rut ? { rut } : {}),
      source: LEAD_SOURCE,
      ...(preferenciaContacto ? { preferenciaContacto } : {}),
      ...(comentarios ? { notes: `Motivo: ${comentarios}` } : {}),
      metadata: compactMetadata({
        sitio: siteConfig.name,
        edad: asTrimmedString(body.edad) || undefined,
        "previsión actual": asTrimmedString(body.previsionActual) || undefined,
        "UF actuales": asTrimmedString(body.ufActual) || undefined,
        región: asTrimmedString(body.regionResidencia) || undefined,
        "cargas médicas": asTrimmedString(body.cargas) || undefined,
        "edad cargas": asTrimmedString(body.edadCargas) || undefined,
        "renta imponible": asTrimmedString(body.rentaImponible) || undefined,
      }),
      executiveKind: "ISAPRES_PREMIUM" as const,
      autoAssign: false,
    };

    const endpoint = getClientsEndpoint();
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secret}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    if (!response.ok) {
      const errorPayload: unknown = await response.json().catch(() => null);
      console.error(
        "[api/leads] CRM error",
        response.status,
        endpoint,
        errorPayload,
      );
      return NextResponse.json(
        {
          ok: false,
          error: "No se pudo registrar el lead en el cotizador.",
          code: "CRM_UPSTREAM_ERROR",
          status: response.status,
        },
        { status: 502 },
      );
    }

    const result: unknown = await response.json().catch(() => null);
    return NextResponse.json({ ok: true, registered: true, result });
  } catch (error) {
    console.error("[api/leads]", error);
    return NextResponse.json(
      { ok: false, error: "Error interno al registrar el lead." },
      { status: 500 },
    );
  }
}
