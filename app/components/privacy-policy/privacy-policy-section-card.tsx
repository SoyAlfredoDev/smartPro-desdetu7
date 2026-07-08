"use client";

import type { LucideIcon } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

type PrivacyPolicySectionData = {
  id: string;
  title: string;
  paragraphs: readonly string[];
  list?: readonly string[];
  paragraphsAfter?: readonly string[];
};

interface PrivacyPolicySectionCardProps {
  section: PrivacyPolicySectionData;
  icon: LucideIcon;
  index: number;
}

export function PrivacyPolicySectionCard({
  section,
  icon: Icon,
  index,
}: PrivacyPolicySectionCardProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.section
      id={section.id}
      aria-labelledby={`${section.id}-title`}
      initial={reducedMotion ? false : { opacity: 0, y: 20 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{
        type: "spring",
        stiffness: 280,
        damping: 30,
        delay: reducedMotion ? 0 : 0.06 * index,
      }}
      whileHover={
        reducedMotion
          ? undefined
          : { y: -2, transition: { type: "spring", stiffness: 400, damping: 28 } }
      }
      className="group relative scroll-mt-28 overflow-hidden rounded-2xl border border-gray-200 bg-white/90 p-5 shadow-sm backdrop-blur-sm transition-[border-color,box-shadow] duration-300 hover:border-primary/30 hover:shadow-md sm:p-6 lg:p-7"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative">
        <div className="mb-4 flex items-start gap-3 sm:gap-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary/15">
            <Icon className="h-5 w-5" aria-hidden />
          </span>
          <h2
            id={`${section.id}-title`}
            className="pt-1 text-lg font-bold tracking-tight text-text-main sm:text-xl"
          >
            {section.title}
          </h2>
        </div>

        <div className="space-y-4 text-sm leading-relaxed text-text-muted sm:text-[15px]">
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}

          {section.list ? (
            <ul className="space-y-2.5">
              {section.list.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 rounded-xl border border-gray-200 bg-background/80 px-3 py-2.5"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : null}

          {section.paragraphsAfter?.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
