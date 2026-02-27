import React from "react";
import IsapreCard from "./reusable/IsapreCard";

// Definición de la estructura de datos para una Isapre
export interface IsapreData {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  logoPlaceholderStr: string;
  logoColorClass: string;
}

// Datos extraídos de la imagen_3.png
const isapresDataList: IsapreData[] = [
  {
    id: 1,
    title: "ISAPRE CRUZ BLANCA",
    subtitle: "GINECÓLOGA",
    description:
      "Con más de una década de experiencia, la Dra. Herrera es la residente experta en ginecología general y salud de la mujer.",
    logoPlaceholderStr: "/images/isapre-cruz-blanca.jpeg",
    logoColorClass: "bg-blue-600",
  },
  {
    id: 2,
    title: "ISAPRE CONSALUD",
    subtitle: "GINECÓLOGO Y OBSTETRA",
    description:
      "Desde 1983, cuenta con más de 40 años de trayectoria y una de las mayores participaciones del sistema ISAPRE en Chile.",
    logoPlaceholderStr: "/images/isapre-consalud.png",
    logoColorClass: "bg-teal-",
  },
  {
    id: 3,
    title: "ISAPRE COLMENA",
    subtitle: "GINECÓLOGA Y OBSTETRA",
    description:
      "Creada en los inicios del sistema ISAPRE en 1981, mantiene trayectoria histórica y presencia consolidada en el mercado privado.",
    logoPlaceholderStr: "/images/isapre-colmena.png",
    logoColorClass: "bg-white",
  },
  {
    id: 4,
    title: "ISAPRE BANMEDICA",
    subtitle: "GINECÓLOGA",
    // Nota: Los textos de descripción en la imagen se repiten para la segunda fila
    description:
      "Fundada en los años 80, forma parte de un grupo internacional de salud con fuerte presencia en el sistema privado chileno.",
    logoPlaceholderStr: "/images/isapre-banmedica.png",
    logoColorClass: "bg-red-600",
  },
  {
    id: 5,
    title: "ISAPRE NUEVA MASVIDA",
    subtitle: "GINECÓLOGA Y OBSTETRA",
    description:
      "Reorganizada en 2017, continúa operando en el sistema ISAPRE con planes orientados a distintos perfiles de afiliados.",
    logoPlaceholderStr: "/images/isapre-nueva-masvida.png",
    logoColorClass: "bg-cyan-600",
  },
  {
    id: 6,
    title: "ISAPRE VIDA TRES",
    subtitle: "GINECÓLOGA Y OBSTETRA",
    description:
      "Activa desde los primeros años del sistema privado, actualmente integra el mismo grupo controlador de Banmédica en Chile.",
    logoPlaceholderStr: "/images/isapre-vida-tres.png",
    logoColorClass: "bg-green-600",
  },
  {
    id: 7,
    title: "ISAPRE ESENCIAL",
    subtitle: "GINECÓLOGA Y OBSTETRA",
    description:
      "Incorporada recientemente al sistema ISAPRE, destaca por su enfoque digital, estructura ágil y propuesta orientada a eficiencia operativa.",
    logoPlaceholderStr: "/images/isapre-esencial.png",
    logoColorClass: "bg-cyan-600",
  },
];

const Isapres: React.FC = () => {
  return (
    // Sección contenedora con un fondo claro suave
    <section
      style={{
        backgroundImage: "url('/images/bg-isapres.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grid responsivo:
          - 1 columna en móviles
          - 2 columnas en tablets (md)
          - 3 columnas en escritorio (lg)
          - gap-x-8: espacio horizontal entre tarjetas
          - gap-y-20: espacio vertical grande para compensar los logos flotantes
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20">
          {isapresDataList.map((data) => (
            // Renderizamos el componente tarjeta reutilizable
            <IsapreCard key={data.id} data={data} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Isapres;
