import React from "react";
// Importamos la interfaz de datos para el tipado de las props
import { IsapreData } from "../Isapres";

interface IsapreCardProps {
  data: IsapreData;
}

const IsapreCard: React.FC<IsapreCardProps> = ({ data }) => {
  const { title, subtitle, description, logoPlaceholderStr } = data;

  return (
    // Contenedor principal de la tarjeta
    // 'mt-12' es crucial para dar espacio al logo que flota arriba
    <div className="relative mt-12 bg-surface rounded-[2rem] shadow-xl p-8 pt-16 flex flex-col justify-between text-center h-full transition-transform hover:-translate-y-2 duration-300">
      {/* Círculo del Logo Flotante */}
      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-surface rounded-full shadow-md flex items-center justify-center p-2 z-10">
        {/* NOTA: En un entorno real, aquí usarías el componente <Image /> de Next.js 
          con la ruta real del logo. Por ahora, usamos un placeholder visual 
          basado en el color de la marca en la imagen.
        */}
        <div
          className={`w-full h-full rounded-full flex items-center justify-center text-white font-bold text-2xl bg-white`}
        >
          {/* Placeholder del logo (ej: 'CB' para Cruz Blanca) */}
          <img src={logoPlaceholderStr} alt={title} />
        </div>
      </div>

      {/* Cuerpo de la tarjeta */}
      <div>
        <h3 className="font-bold text-xl text-text-main mb-2 uppercase tracking-wide">
          {title}
        </h3>
        <h4 className="text-xs font-bold text-primary opacity-80 uppercase mb-5 tracking-wider">
          {subtitle}
        </h4>
        <p className="text-text-muted text-sm leading-relaxed px-2">
          {description}
        </p>
      </div>

      {/* Icono Más (+) inferior */}
      <div className="mt-8 text-teal-400 text-4xl leading-none font-light select-none">
        +
      </div>
    </div>
  );
};

export default IsapreCard;
