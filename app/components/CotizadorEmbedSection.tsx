"use client";

import CotizadorWidget from "./CotizadorWidget";
import WidgetCard from "./reusable/WidgetCard";

/**
 * Sección del cotizador premium embebido, contenida en una card compacta.
 */
export default function CotizadorEmbedSection() {
  return (
    <section
      id="cotizador-online"
      className="bg-background py-8 lg:py-12"
    >
      <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-6">
        <header className="mb-4 space-y-1 text-center lg:mb-5 lg:text-left">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
            Cotizador en línea
          </p>
          <h2 className="text-2xl font-bold tracking-tight text-text-main sm:text-3xl">
            Encuentra tu plan de salud
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-text-muted lg:mx-0">
            Compara planes según tu región, edad e ingreso. Al cotizar o ver todos
            los planes, continúas en el cotizador completo con tu asesor.
          </p>
        </header>

        <WidgetCard>
          <CotizadorWidget compact />
        </WidgetCard>
      </div>
    </section>
  );
}
