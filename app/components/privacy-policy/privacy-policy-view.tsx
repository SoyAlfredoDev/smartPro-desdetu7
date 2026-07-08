"use client";

import {
  Cookie,
  Database,
  ExternalLink,
  Lock,
  RefreshCw,
  Scale,
  Share2,
  Shield,
  ShieldCheck,
  Target,
  UserCheck,
} from "lucide-react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

import { PrivacyPolicyContactCta } from "@/app/components/privacy-policy/privacy-policy-contact-cta";
import { PrivacyPolicySectionCard } from "@/app/components/privacy-policy/privacy-policy-section-card";
import {
  privacyPolicyContactCta,
  privacyPolicyMeta,
  privacyPolicySections,
} from "@/constants/privacy-policy";
import { siteConfig } from "@/constants/site";

const sectionIcons = {
  "ley-21719": Scale,
  responsable: Shield,
  "datos-recopilados": Database,
  finalidades: Target,
  principios: ShieldCheck,
  derechos: UserCheck,
  cesion: Share2,
  conservacion: Lock,
  cookies: Cookie,
  actualizaciones: RefreshCw,
} as const;

export default function PrivacyPolicyView() {
  const pageRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(pageRef, { once: true, margin: "-8%" });
  const reducedMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-background py-12 sm:py-16 md:py-20">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(234,88,12,0.08),_transparent_50%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(234,88,12,0.05),_transparent_45%)]"
        aria-hidden
      />

      <div ref={pageRef} className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(220px,260px)_minmax(0,1fr)] lg:gap-14 xl:gap-16">
          <motion.aside
            className="lg:sticky lg:top-28 lg:self-start"
            initial={reducedMotion ? false : { opacity: 0, y: 16 }}
            animate={isInView && !reducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 30 }}
          >
            <nav
              aria-label="Contenido de la política de privacidad"
              className="rounded-2xl border border-gray-200 bg-white/80 p-4 shadow-sm backdrop-blur-sm sm:p-5"
            >
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-primary">
                En esta página
              </p>
              <ul className="space-y-1.5" role="list">
                {privacyPolicySections.map((section, index) => (
                  <motion.li
                    key={section.id}
                    initial={false}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 280,
                      damping: 30,
                      delay: reducedMotion ? 0 : 0.04 * index,
                    }}
                  >
                    <a
                      href={`#${section.id}`}
                      className="block rounded-lg px-3 py-2 text-sm leading-snug text-text-muted transition-colors duration-200 hover:bg-primary/5 hover:text-primary"
                    >
                      {section.title}
                    </a>
                  </motion.li>
                ))}
                <motion.li
                  initial={false}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 280,
                    damping: 30,
                    delay: reducedMotion ? 0 : 0.04 * privacyPolicySections.length,
                  }}
                >
                  <a
                    href={`#${privacyPolicyContactCta.id}`}
                    className="block rounded-lg px-3 py-2 text-sm leading-snug text-text-muted transition-colors duration-200 hover:bg-primary/5 hover:text-primary"
                  >
                    {privacyPolicyContactCta.eyebrow}
                  </a>
                </motion.li>
              </ul>
            </nav>
          </motion.aside>

          <div className="min-w-0">
            <motion.header
              className="mb-8 max-w-3xl space-y-5 sm:mb-10"
              initial={reducedMotion ? false : { opacity: 0, y: 20 }}
              animate={isInView && !reducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 30, delay: 0.05 }}
            >
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
                Transparencia y cumplimiento legal
              </p>

              <h1 className="text-3xl font-bold tracking-tight text-text-main text-balance sm:text-4xl md:text-[2.5rem]">
                {privacyPolicyMeta.title}
              </h1>

              <div className="flex flex-wrap gap-2.5">
                <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/8 px-3 py-1 text-xs font-medium text-primary">
                  {privacyPolicyMeta.lawReference}
                </span>
                <span className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-text-muted">
                  Vigencia plena: {privacyPolicyMeta.lawFullVigencyDate}
                </span>
              </div>

              <p className="text-base leading-relaxed text-text-muted sm:text-lg">
                En {siteConfig.name} tratamos sus datos personales conforme a la normativa
                chilena. Esta política explica cómo recopilamos, usamos y protegemos su
                información al cotizar y asesorar planes de salud en Chile.
              </p>

              <p className="text-sm text-text-muted">
                Última actualización:{" "}
                <time dateTime={privacyPolicyMeta.lastUpdated}>
                  {privacyPolicyMeta.lastUpdated}
                </time>
              </p>
            </motion.header>

            <div className="space-y-5 sm:space-y-6">
              {privacyPolicySections.map((section, index) => {
                const Icon = sectionIcons[section.id as keyof typeof sectionIcons] ?? Shield;

                return (
                  <PrivacyPolicySectionCard
                    key={section.id}
                    section={section}
                    icon={Icon}
                    index={index}
                  />
                );
              })}
            </div>

            <div className="mt-5 sm:mt-6">
              <PrivacyPolicyContactCta />
            </div>

            <motion.footer
              className="mt-10 rounded-2xl border border-gray-200 bg-white/80 p-6 shadow-sm backdrop-blur-sm sm:p-7"
              initial={reducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ type: "spring", stiffness: 280, damping: 30 }}
            >
              <p className="text-sm leading-relaxed text-text-muted sm:text-base">
                Si tiene dudas sobre el tratamiento de sus datos, contáctenos en{" "}
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="font-medium text-primary transition-colors hover:underline"
                >
                  {siteConfig.contact.email}
                </a>
                . También puede consultar el texto oficial de la norma en el{" "}
                <a
                  href="https://www.bcn.cl/leychile/navegar?idNorma=1203407"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-medium text-primary transition-colors hover:underline"
                >
                  Biblioteca del Congreso Nacional de Chile
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                </a>
                .
              </p>
              <p className="mt-5 text-sm text-text-muted">
                <Link
                  href="/"
                  className="inline-flex items-center font-medium text-primary transition-opacity hover:opacity-80"
                >
                  ← Volver al inicio
                </Link>
              </p>
            </motion.footer>
          </div>
        </div>
      </div>
    </section>
  );
}
