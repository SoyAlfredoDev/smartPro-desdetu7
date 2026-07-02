"use client";

import Script from "next/script";
import { useCallback, useRef } from "react";

const WIDGET_SCRIPT_URL =
  process.env.NEXT_PUBLIC_COTIZADOR_WIDGET_SCRIPT_URL ??
  "https://cotizador-widget.vercel.app/cotizador-widget.js";

const COTIZADOR_BASE_URL =
  process.env.NEXT_PUBLIC_COTIZADOR_URL ??
  (process.env.NODE_ENV === "development"
    ? "http://localhost:3001"
    : "https://cotizadorpremium.cl");

const AGENT_KEY =
  process.env.NEXT_PUBLIC_COTIZADOR_AGENT_KEY ?? "desdetu7";

declare global {
  interface Window {
    CotizadorWidget?: {
      mount: (
        element: HTMLElement,
        overrides?: {
          agentKey?: string;
          partner?: string;
          baseUrl?: string;
          routing?: "premium" | "legacy";
          minHeight?: number;
          fullWidth?: boolean;
          title?: string;
          query?: Record<string, string>;
        },
      ) => { destroy: () => void };
    };
  }
}

interface CotizadorWidgetProps {
  /** Modo compacto: sin full-bleed y menos espacio alrededor del iframe. */
  compact?: boolean;
}

export default function CotizadorWidget({ compact = false }: CotizadorWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mountedRef = useRef(false);

  const mountWidget = useCallback(() => {
    if (mountedRef.current || !containerRef.current) return;
    if (!window.CotizadorWidget) return;

    window.CotizadorWidget.mount(containerRef.current, {
      agentKey: AGENT_KEY,
      partner: AGENT_KEY,
      baseUrl: COTIZADOR_BASE_URL,
      routing: "premium",
      fullWidth: !compact,
      title: "Cotizador de planes de salud — Desde Tu 7",
      query: { auto: "1", region: "rm", edad: "35", sexo: "f" },
    });

    mountedRef.current = true;
  }, [compact]);

  return (
    <>
      <div
        ref={containerRef}
        data-cotizador-widget
        data-agent-key={AGENT_KEY}
        data-partner={AGENT_KEY}
        data-base-url={COTIZADOR_BASE_URL}
        data-routing="premium"
        data-auto-search="true"
        data-title="Cotizador de planes de salud — Desde Tu 7"
        data-full-width={compact ? "false" : "true"}
        className="block h-auto min-h-0 w-full max-w-none overflow-visible touch-pan-y"
      />
      <Script
        src={WIDGET_SCRIPT_URL}
        strategy="afterInteractive"
        onLoad={mountWidget}
      />
    </>
  );
}
