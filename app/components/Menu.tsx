"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu as MenuIcon, X } from "lucide-react"; // Importamos los iconos modernos

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Centralizamos los enlaces para facilitar su renderizado
  const navLinks = [
    { href: "/", label: "INICIO" },
    { href: "#cotizador", label: "COTIZADOR" },
    { href: "#isapres", label: "ISAPRES" },
    { href: "#agenda", label: "AGENDA ONLINE" },
    { href: "#noticias", label: "NOTICIAS" },
  ];

  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    href: string,
  ) => {
    // Si el link empieza con #, prevenimos la navegación por defecto y hacemos scroll suave
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.replace("#", "");
      const elem = document.getElementById(targetId);
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth" });
      }
      setIsOpen(false); // Cerramos el menú en caso de estar en vista móvil
    }
    // Si es "/" o no empieza con #, el componente Link de Next.js se encarga del enrutamiento normal al inicio
  };

  return (
    <nav className="text-text-main shadow-md relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center z-50">
            <Link
              href="/"
              aria-label="Volver al inicio"
              title="Inicio | Desde Tu 7"
            >
              {/* Ajusté ligeramente el tamaño para que no deforme el navbar */}
              <Image
                src="/logo.png"
                alt="Logotipo de Desde Tu 7 - Asesoría de Isapres" // TODO SEO: Describir explícitamente el logo para accesibilidad
                width={120}
                height={120}
                className="object-contain"
              />
            </Link>
          </div>

          {/* Menú Desktop (Oculto en móvil, visible en md y superior) */}
          <ul className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={(e) => handleScroll(e, link.href)}
                  className="text-primary font-bold text-sm tracking-wide hover:text-text-main transition-colors duration-200"
                  aria-label={`Ir a la sección de ${link.label.toLowerCase()}`}
                  title={`Navegar a ${link.label}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Botón de Menú Móvil (Hamburguesa) */}
          <div className="md:hidden flex items-center z-50">
            <button
              onClick={toggleMenu}
              className="text-primary hover:text-text-main focus:outline-none transition-colors"
              aria-label="Alternar menú"
            >
              {isOpen ? (
                <X className="h-8 w-8" />
              ) : (
                <MenuIcon className="h-8 w-8" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menú Desplegable Móvil */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden absolute top-full left-0 w-full bg-surface border-t border-gray-100 shadow-xl overflow-hidden"
          >
            <ul className="px-4 pt-2 pb-6 space-y-2 flex flex-col">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={(e) => {
                      if (link.href.startsWith("#")) {
                        handleScroll(e, link.href);
                      } else {
                        setIsOpen(false);
                      }
                    }}
                    className="block px-3 py-3 text-primary font-bold tracking-wide hover:bg-background hover:text-text-main rounded-md transition-colors"
                    aria-label={`Ir a la sección de ${link.label.toLowerCase()}`}
                    title={`Navegar a ${link.label}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
