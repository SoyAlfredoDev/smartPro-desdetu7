"use client";

import { useState, type HTMLAttributes, type ReactNode } from "react";

interface WidgetCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  title?: string;
}

/** Card del widget con control para minimizar/expandir (útil en móvil). */
export default function WidgetCard({
  children,
  title = "Cotizador en línea",
  className = "",
  ...props
}: WidgetCardProps) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div
      className={`overflow-hidden rounded-xl border border-gray-200/90 bg-white shadow-sm ${className}`}
      {...props}
    >
      <div className="flex items-center justify-between gap-2 border-b border-gray-100 bg-gray-50/90 px-3 py-2 sm:px-4">
        <span className="truncate text-xs font-semibold text-text-muted">
          {title}
        </span>
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
          aria-controls="cotizador-widget-panel"
          className="shrink-0 rounded-lg border border-gray-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-primary transition hover:border-primary/30 hover:bg-primary/5 sm:text-xs"
        >
          {expanded ? "Minimizar" : "Expandir"}
        </button>
      </div>

      <div
        id="cotizador-widget-panel"
        aria-hidden={!expanded}
        className={
          expanded
            ? "block overflow-visible"
            : "max-h-0 overflow-hidden"
        }
      >
        {children}
      </div>
    </div>
  );
}
