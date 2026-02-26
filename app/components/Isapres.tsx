import React from "react";
import IsapreCard from "./reusable/IsapreCard";

// Definición de la estructura de datos para una Isapre
export interface IsapreData {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  // Estos campos son helpers visuales ya que no tenemos las imágenes reales
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
      "Como médico en jefe de Centro Médico del Bosque, el Dr. de la Peña se especializa en cirugía ginecológica y atención obstétrica.",
    logoPlaceholderStr: "/images/isapre-consalud.png",
    logoColorClass: "bg-teal-",
  },
  {
    id: 3,
    title: "ISAPRE COLMENA",
    subtitle: "GINECÓLOGA Y OBSTETRA",
    description:
      "La Dra. Ramos cuenta con más de 15 años de experiencia en las áreas de fertilidad y obstetricia.",
    logoPlaceholderStr: "/images/isapre-colmena.png",
    logoColorClass: "bg-white",
  },
  {
    id: 4,
    title: "ISAPRE BANMEDICA",
    subtitle: "GINECÓLOGA",
    // Nota: Los textos de descripción en la imagen se repiten para la segunda fila
    description:
      "Con más de una década de experiencia, la Dra. Herrera es la residente experta en ginecología general y salud de la mujer.",
    logoPlaceholderStr: "/images/isapre-banmedica.png",
    logoColorClass: "bg-red-600",
  },
  {
    id: 5,
    title: "ISAPRE NUEVA MASVIDA",
    subtitle: "GINECÓLOGA Y OBSTETRA",
    description:
      "Como médico en jefe de Centro Médico del Bosque, el Dr. de la Peña se especializa en cirugía ginecológica y atención obstétrica.",
    logoPlaceholderStr: "/images/isapre-nueva-masvida.png",
    logoColorClass: "bg-cyan-600",
  },
  {
    id: 6,
    title: "ISAPRE VIDA TRES",
    subtitle: "GINECÓLOGA Y OBSTETRA",
    description:
      "La Dra. Ramos cuenta con más de 15 años de experiencia en las áreas de fertilidad y obstetricia.",
    logoPlaceholderStr: "/images/isapre-vida-tres.png",
    logoColorClass: "bg-green-600",
  },
];

const Isapres: React.FC = () => {
  return (
    // Sección contenedora con un fondo claro suave
    <section className="py-20 bg-background">
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
