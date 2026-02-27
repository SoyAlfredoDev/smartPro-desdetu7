"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
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

// Datos extraídos
const isapresDataList: IsapreData[] = [
  {
    id: 1,
    title: "ISAPRE CRUZ BLANCA",
    subtitle: "GINECÓLOGA",
    description:
      "Cruz Blanca, parte del grupo internacional Bupa desde 2014, es una de las principales Isapres del país con más de 700.000 afiliados y amplia trayectoria en el sistema privado de salud chileno.",
    logoPlaceholderStr: "/images/isapre-cruz-blanca.jpeg",
    logoColorClass: "bg-blue-600",
  },
  {
    id: 2,
    title: "ISAPRE CONSALUD",
    subtitle: "GINECÓLOGO Y OBSTETRA",
    description:
      "Respaldada por Inversiones La Construcción (ILC), cuenta con más de 40 años de trayectoria en el sistema de salud chileno y el programa Camina Contigo, que acompaña integralmente a afiliados con enfermedades graves.",
    logoPlaceholderStr: "/images/isapre-consalud.png",
    logoColorClass: "bg-teal-600",
  },
  {
    id: 3,
    title: "ISAPRE COLMENA",
    subtitle: "GINECÓLOGA Y OBSTETRA",
    description:
      "Colmena, constituida en 1983, cuenta con amplia trayectoria en el sistema privado chileno y respaldo de grupos económicos nacionales e internacionales, con red preferente de clínicas de alta complejidad.",
    logoPlaceholderStr: "/images/isapre-colmena.png",
    logoColorClass: "bg-white",
  },
  {
    id: 4,
    title: "ISAPRE BANMEDICA",
    subtitle: "GINECÓLOGA",
    description:
      "Banmédica, con más de 30 años de trayectoria en Chile, forma parte de Empresas Banmédica, grupo integrado con red propia de clínicas y presencia internacional en Latinoamérica.",
    logoPlaceholderStr: "/images/isapre-banmedica.png",
    logoColorClass: "bg-red-600",
  },
  {
    id: 5,
    title: "ISAPRE NUEVA MASVIDA",
    subtitle: "GINECÓLOGA Y OBSTETRA",
    description:
      "Nueva Masvida, creada en 2017 y perteneciente a Nexus Chile Health SpA, opera con cobertura nacional, amplia red de prestadores y compromiso de estabilidad en sus planes.",
    logoPlaceholderStr: "/images/isapre-nueva-masvida.png",
    logoColorClass: "bg-cyan-600",
  },
  {
    id: 6,
    title: "ISAPRE VIDA TRES",
    subtitle: "GINECÓLOGA Y OBSTETRA",
    description:
      "Vida Tres, fundada en 1986 y parte del Grupo Empresas Banmédica, nace desde clínicas de alto prestigio en Chile. Ofrece planes de alta cobertura y amplia red nacional de prestadores. Incluye servicios digitales y convenios con centros médicos de primer nivel.",
    logoPlaceholderStr: "/images/isapre-vida-tres.png",
    logoColorClass: "bg-green-600",
  },
  {
    id: 7,
    title: "ISAPRE ESENCIAL",
    subtitle: "GINECÓLOGA Y OBSTETRA",
    description:
      "Isapre Esencial, parte del Grupo Alemana (Corporación Chilena Alemana de Beneficencia), opera desde 2022 con enfoque digital, cobertura nacional y red de prestadores de primer nivel.",
    logoPlaceholderStr: "/images/isapre-esencial.png",
    logoColorClass: "bg-cyan-600",
  },
];

// --- Variantes de animación para Framer Motion (Suavizadas) ---
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 30 : -30,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 30 : -30,
    opacity: 0,
  }),
};

// Umbral para detectar el gesto de deslizar (swipe)
const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const Isapres: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [[page, direction], setPage] = useState([0, 0]);

  // Manejar el diseño responsivo dinámico
  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      if (window.innerWidth >= 1024)
        setItemsPerPage(6); // Escritorio (3x2)
      else if (window.innerWidth >= 768)
        setItemsPerPage(4); // Tablet (2x2)
      else setItemsPerPage(2); // Móvil (1x2)
    };

    handleResize(); // Chequeo inicial
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.ceil(isapresDataList.length / itemsPerPage);

  // Asegurarnos de no quedar en una página vacía al redimensionar
  useEffect(() => {
    if (page >= totalPages && totalPages > 0) {
      setPage([totalPages - 1, 0]);
    }
  }, [totalPages, page]);

  const paginate = (newDirection: number) => {
    if (totalPages <= 1) return; // Si solo hay 1 página, no hacer nada
    let newPage = page + newDirection;
    if (newPage < 0) newPage = totalPages - 1;
    if (newPage >= totalPages) newPage = 0;
    setPage([newPage, newDirection]);
  };

  const currentItems = isapresDataList.slice(
    page * itemsPerPage,
    (page + 1) * itemsPerPage,
  );

  // Evitar problemas de hidratación (Flash de contenido)
  if (!mounted) return null;

  return (
    <section
      id="isapres"
      style={{
        backgroundImage: "url('/images/bg-isapres.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="py-20 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Título centrado animado al hacer scroll */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-text-main tracking-tight">
            Directorio de Isapres
          </h2>
          <p className="text-text-muted mt-2 font-medium">
            Explora las opciones disponibles en el sistema privado.
          </p>
        </motion.div>

        {/* Contenedor del Carrusel animado */}
        <div className="min-h-[500px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={page}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 200, damping: 25 },
                opacity: { duration: 0.4 },
              }}
              drag={totalPages > 1 ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                if (totalPages <= 1) return;
                const swipe = swipePower(offset.x, velocity.x);
                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20 cursor-grab active:cursor-grabbing"
            >
              {currentItems.map((data) => (
                <IsapreCard key={data.id} data={data} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controles Inferiores (Botones y Dots) - Solo se muestran si hay más de 1 página */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-6 mt-12">
            {/* Botón Anterior */}
            <button
              onClick={() => paginate(-1)}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-gray-300 bg-white/80 backdrop-blur-sm flex items-center justify-center text-text-muted hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Paginador de Puntos (Dots) */}
            <div className="flex justify-center items-center gap-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    const newDirection = index > page ? 1 : -1;
                    setPage([index, newDirection]);
                  }}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    index === page
                      ? "w-8 bg-primary"
                      : "w-2.5 bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Ir a la página ${index + 1}`}
                />
              ))}
            </div>

            {/* Botón Siguiente */}
            <button
              onClick={() => paginate(1)}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-gray-300 bg-white/80 backdrop-blur-sm flex items-center justify-center text-text-muted hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm"
              aria-label="Siguiente"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Isapres;
