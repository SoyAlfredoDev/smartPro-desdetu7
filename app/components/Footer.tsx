"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  TrendingUp,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [ufValue, setUfValue] = useState<string | null>(null);

  // Consumir API oficial para el valor de la UF (mindicador.cl)
  useEffect(() => {
    const fetchUF = async () => {
      try {
        const response = await fetch("https://mindicador.cl/api/uf");
        const data = await response.json();
        const valorActual = data.serie[0].valor;

        // Formatear el valor a moneda chilena
        const formattedUF = new Intl.NumberFormat("es-CL", {
          style: "currency",
          currency: "CLP",
        }).format(valorActual);

        setUfValue(formattedUF);
      } catch (error) {
        console.error("Error al obtener la UF:", error);
        setUfValue("No disponible");
      }
    };

    fetchUF();
  }, []);

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
  ];

  return (
    <footer className="bg-background py-16 border-t border-gray-200 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Columna 1: Marca y Descripción */}
          <div className="space-y-4">
            <h3 className="text-3xl font-bold text-text-main tracking-wide">
              DesdeTu7.cl
            </h3>
            <p className="text-sm leading-relaxed text-text-muted pr-4">
              Optimizamos tu elección de salud. Plataforma para encontrar y
              gestionar los mejores planes de previsión médica con total
              seguridad y transparencia.
            </p>

            {/* Indicador de UF */}
            <div className="mt-6 inline-flex items-center gap-3 bg-background border border-gray-200 px-4 py-3 rounded-lg shadow-sm">
              <div className="relative flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary relative z-10" />
                {/* Punto parpadeante para indicar que es un dato en vivo */}
                <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                </span>
              </div>
              <div>
                <p className="text-[11px] text-text-muted font-bold uppercase tracking-wider">
                  Valor UF Hoy
                </p>
                <p className="text-text-main font-extrabold">
                  {ufValue ? ufValue : "Cargando..."}
                </p>
              </div>
            </div>
          </div>

          {/* Columna 2: Enlaces Rápidos */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-text-main tracking-wide">
              Enlaces Rápidos
            </h4>
            <ul className="space-y-3 text-sm font-medium">
              <li>
                <a
                  href="#"
                  className="text-text-muted hover:text-primary transition-colors duration-200 block"
                >
                  Inicio
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-text-muted hover:text-primary transition-colors duration-200 block"
                >
                  Cotizador Digital
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-text-muted hover:text-primary transition-colors duration-200 block"
                >
                  Directorio de Isapres
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-text-muted hover:text-primary transition-colors duration-200 block"
                >
                  Noticias
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 3: Información de Contacto */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-text-main tracking-wide">
              Contacto
            </h4>
            <ul className="space-y-4 text-sm font-medium text-text-muted">
              <li className="flex items-start gap-3 group">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <span>
                  Vicuña Mackenna 920, dpto 726,
                  <br />
                  Ñuñoa, 7750000
                </span>
              </li>
              <li className="flex items-center gap-3 group">
                <Phone className="w-5 h-5 text-primary shrink-0 group-hover:scale-110 transition-transform" />
                <span>+56 9 6413 38 48</span>
              </li>
              <li className="flex items-center gap-3 group">
                <Mail className="w-5 h-5 text-primary shrink-0 group-hover:scale-110 transition-transform" />
                <a
                  href="mailto:Contacto@desdetu7.cl"
                  className="hover:text-primary transition-colors duration-200"
                >
                  contacto@desdetu7.cl
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 4: Redes Sociales */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-text-main tracking-wide">
              Síguenos
            </h4>
            <p className="text-sm text-text-muted mb-4">
              Mantente al tanto de las últimas novedades y actualizaciones.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    whileHover={{ scale: 1.1, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-full bg-background border border-gray-200 flex items-center justify-center text-text-muted hover:bg-primary hover:text-white hover:border-primary shadow-sm hover:shadow-primary/30 transition-all duration-300"
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Barra inferior: Copyright y Legales */}
        <div className="mt-16 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-text-muted">
          <p>&copy; {currentYear} Desde Tu 7. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">
              Términos y Condiciones
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Políticas de Privacidad
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
