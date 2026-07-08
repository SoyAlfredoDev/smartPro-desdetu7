"use client";

import { Mail, MessageCircle } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import {
  getPrivacyPolicyWhatsAppUrl,
  privacyPolicyContactCta,
} from "@/constants/privacy-policy";
import { siteConfig } from "@/constants/site";

export function PrivacyPolicyContactCta() {
  const reducedMotion = useReducedMotion();
  const whatsAppUrl = getPrivacyPolicyWhatsAppUrl(siteConfig.contact.phone);

  return (
    <motion.section
      id={privacyPolicyContactCta.id}
      aria-labelledby={`${privacyPolicyContactCta.id}-title`}
      className="scroll-mt-28"
      initial={reducedMotion ? false : { opacity: 0, y: 20 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ type: "spring", stiffness: 280, damping: 30 }}
    >
      <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-white to-white p-6 shadow-sm sm:p-8">
        <div
          className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/10 blur-2xl"
          aria-hidden
        />

        <div className="relative space-y-4">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
            {privacyPolicyContactCta.eyebrow}
          </p>
          <h2
            id={`${privacyPolicyContactCta.id}-title`}
            className="text-xl font-bold tracking-tight text-text-main sm:text-2xl"
          >
            {privacyPolicyContactCta.title}
          </h2>
          <p className="max-w-2xl text-sm leading-relaxed text-text-muted sm:text-base">
            {privacyPolicyContactCta.description}
          </p>

          <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:flex-wrap">
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="inline-flex items-center justify-center gap-2.5 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-text-main shadow-sm transition-all duration-200 hover:border-primary/30 hover:text-primary hover:shadow-md"
            >
              <Mail className="h-4 w-4 shrink-0 text-primary" aria-hidden />
              {siteConfig.contact.email}
            </a>
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 rounded-xl border border-[#25D366]/30 bg-[#25D366]/10 px-4 py-3 text-sm font-medium text-text-main shadow-sm transition-all duration-200 hover:border-[#25D366]/50 hover:bg-[#25D366]/15 hover:shadow-md"
              aria-label={`WhatsApp ${siteConfig.contact.phoneDisplay} (abre en nueva pestaña)`}
            >
              <MessageCircle className="h-4 w-4 shrink-0 text-[#128C7E]" aria-hidden />
              WhatsApp {siteConfig.contact.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
