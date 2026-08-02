import { NextResponse } from "next/server";
import { siteConfig } from "@/constants/site";

export const runtime = "nodejs";

const LEAD_SOURCE = "Formulario web - Desde Tu 7%";

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

function getClientsEndpoint(): string {
  const base = (
    process.env.COTIZADOR_API_URL?.trim() ||
    process.env.NEXT_PUBLIC_COTIZADOR_URL?.trim() ||
    "https://isaprespremium.cl"
  ).replace(/\/$/, "");
  return `${base}/api/public/v1/clients`;
}

/**
 * Registra el lead del formulario marketing en el CRM del cotizador
 * (POST /api/public/v1/clients). No bloquea el flujo de EmailJS del cliente.
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
    const rut = asTrimmedString(body.rut);

    if (fullName.length < 2 || !email || !phone) {
      return NextResponse.json(
        { ok: false, error: "Faltan nombre, correo o teléfono." },
        { status: 400 },
      );
    }

    const secret = process.env.COTIZADOR_PUBLIC_API_SECRET?.trim();
    if (!secret) {
      console.error(
        "[api/leads] COTIZADOR_PUBLIC_API_SECRET no configurada; lead no registrado en CRM.",
      );
      return NextResponse.json(
        { ok: false, error: "Registro CRM no configurado." },
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
      metadata: {
        sitio: siteConfig.name,
        edad: asTrimmedString(body.edad) || undefined,
        "previsión actual": asTrimmedString(body.previsionActual) || undefined,
        "UF actuales": asTrimmedString(body.ufActual) || undefined,
        región: asTrimmedString(body.regionResidencia) || undefined,
        "cargas médicas": asTrimmedString(body.cargas) || undefined,
        "edad cargas": asTrimmedString(body.edadCargas) || undefined,
        "renta imponible": asTrimmedString(body.rentaImponible) || undefined,
      },
      executiveKind: "ISAPRES_PREMIUM",
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
      console.error("[api/leads] CRM error", response.status, endpoint, errorPayload);
      return NextResponse.json(
        { ok: false, error: "No se pudo registrar el lead en el cotizador." },
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
