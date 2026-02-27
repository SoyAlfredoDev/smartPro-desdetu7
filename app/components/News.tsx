"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const newsItems = [
  {
    id: 1,
    title: "Por alza GES: Revisa cuánto aumentará el valor de los planes",
    date: "07 Ene 2026",
    category: "Actualidad",
    excerpt:
      "Conoce el detalle del reajuste en el valor de los planes de salud por concepto de las Garantías Explícitas en Salud (GES) para cada Isapre.",
    image: "/images/noticia1.webp", // Placeholder profesional médico/financiero
    url: "https://www.biobiochile.cl/noticias/servicios/toma-nota/2026/01/07/por-alza-ges-revisa-aqui-cuanto-aumentara-el-valor-de-los-planes-de-cada-isapre.shtml",
  },
  {
    id: 2,
    title: "Conoce las tres nuevas patologías incorporadas al GES",
    date: "Reciente",
    category: "Salud Pública",
    excerpt:
      "El Ministerio de Salud ha anunciado la inclusión de nuevas enfermedades al sistema de Garantías Explícitas en Salud, ampliando la cobertura y protección.",
    image:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop", // Placeholder profesional médico
    url: "https://www.gob.cl/noticias/conoce-las-tres-nuevas-patologias-ges/",
  },
  {
    id: 3,
    title: "Informativo Oficial Superintendencia de Salud (PDF)",
    date: "Documento Oficial",
    category: "Regulación",
    excerpt:
      "Revisa la circular y documentación oficial emitida por la Superintendencia de Salud respecto a las normativas vigentes del sistema privado.",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800&auto=format&fit=crop", // Placeholder documentos/legal
    url: "https://www.superdesalud.gob.cl/difusion/665/articles-17525_recurso_1.pdf",
  },
];

// --- Variantes de Animación (Suavizadas) ---
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

export default function News() {
  const [mounted, setMounted] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [[page, direction], setPage] = useState([0, 0]);

  // Manejar el diseño responsivo dinámico
  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      if (window.innerWidth >= 1024)
        setItemsPerPage(3); // Escritorio (3 tarjetas)
      else if (window.innerWidth >= 768)
        setItemsPerPage(2); // Tablet (2 tarjetas)
      else setItemsPerPage(1); // Móvil (1 tarjeta)
    };

    handleResize(); // Chequeo inicial
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.ceil(newsItems.length / itemsPerPage);

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

  const currentItems = newsItems.slice(
    page * itemsPerPage,
    (page + 1) * itemsPerPage,
  );

  // Evitar problemas de hidratación (Flash de contenido) en Next.js
  if (!mounted) return null;

  return (
    <section
      id="noticias"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), url('/images/bg-footer.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="py-20 px-4 sm:px-6 lg:px-8 font-sans overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative">
        {/* Título centrado animado al hacer scroll */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">
            Infórmate
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-text-main">
            Noticias y Actualizaciones
          </h2>
          <p className="mt-4 text-text-muted max-w-2xl mx-auto">
            Mantente al día con los últimos cambios regulatorios, coberturas GES
            y noticias relevantes del sistema de Isapres en Chile.
          </p>
        </motion.div>

        {/* Contenedor del Carrusel Animado */}
        <div className="min-h-[480px]">
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
              drag={totalPages > 1 ? "x" : false} // Solo permite arrastrar si hay múltiples páginas
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
              className={`grid gap-8 ${
                itemsPerPage === 1
                  ? "grid-cols-1"
                  : itemsPerPage === 2
                    ? "grid-cols-2"
                    : "grid-cols-3"
              } cursor-grab active:cursor-grabbing`}
            >
              {currentItems.map((item) => (
                <article
                  key={item.id}
                  className="bg-surface rounded-2xl shadow-lg border border-gray-100 overflow-hidden flex flex-col group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                >
                  {/* Contenedor de Imagen */}
                  <div className="relative h-56 w-full overflow-hidden">
                    <div className="absolute top-4 left-4 z-10 bg-surface/90 backdrop-blur-sm text-text-main text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                      {item.category}
                    </div>
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>

                  {/* Contenido de la Tarjeta */}
                  <div className="p-6 flex flex-col flex-grow bg-surface relative z-20">
                    <div className="flex items-center text-sm text-text-muted mb-3">
                      <Calendar className="w-4 h-4 mr-2 text-primary" />
                      <time>{item.date}</time>
                    </div>

                    <h3 className="text-xl font-bold text-text-main mb-3 leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-text-muted text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                      {item.excerpt}
                    </p>

                    {/* Botón de Enlace */}
                    <div className="mt-auto pt-4 border-t border-gray-100">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-primary font-bold text-sm hover:text-text-main transition-colors group/btn"
                      >
                        Leer artículo completo
                        <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  </div>
                </article>
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
}
