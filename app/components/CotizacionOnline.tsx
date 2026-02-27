"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { PopupButton } from "react-calendly";
import { Video } from "lucide-react"; // Usamos lucide para simular el ícono de Zoom

const CotizacionOnline = () => {
  // Estado para asegurar que Calendly solo se renderice en el cliente (evita errores de hidratación en Next.js)
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <section className="bg-surface py-16 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Columna Izquierda: Imagen con borde corporativo */}
          <div className="relative w-full aspect-[4/3] lg:aspect-[4/4] rounded-[2rem] border-[4px] border-primary overflow-hidden shadow-2xl">
            {/* Asegúrate de reemplazar "/asesora.jpg" con la ruta real de tu imagen en la carpeta public */}
            <Image
              src="/images/seccion-cotizacion-online.jpeg"
              alt="Asesora de Isapre en videollamada"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Columna Derecha: Contenido y Calendly */}
          <div className="flex flex-col items-center justify-center text-center">
            {/* Ícono simulado de Zoom */}
            <div className="mb-6 flex flex-col items-center">
              <div className="bg-[#2D8CFF]/10 p-4 rounded-full mb-2">
                <Video className="w-10 h-10 text-[#2D8CFF]" />
              </div>
              <span className="text-[#2D8CFF] font-bold text-xl tracking-tight">
                zoom
              </span>
            </div>

            {/* Títulos principales */}
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-text-main leading-tight mb-4">
              COTIZACIÓN
              <br />
              ONLINE
            </h2>

            <h3 className="text-primary text-lg sm:text-xl md:text-2xl font-extrabold uppercase tracking-wide mb-10">
              Agenda tu cotización virtual
            </h3>

            {/* Botón de Calendly */}
            {isClient && (
              <PopupButton
                // REEMPLAZA ESTA URL CON TU ENLACE REAL DE CALENDLY
                url="https://calendly.com/contacto-desdetu7/30min"
                // Elemento raíz para la accesibilidad del modal en Next.js
                rootElement={document.body}
                text="HORARIOS DISPONIBLES"
                className="bg-primary hover:bg-primary/90 text-white font-bold py-4 px-10 rounded-md transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1 w-full sm:w-auto uppercase tracking-wider"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CotizacionOnline;
