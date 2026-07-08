import type { Metadata } from "next";

import Footer from "@/app/components/Footer";
import Menu from "@/app/components/Menu";
import PrivacyPolicyView from "@/app/components/privacy-policy/privacy-policy-view";
import { privacyPolicyMeta } from "@/constants/privacy-policy";
import { siteConfig } from "@/constants/site";

export const metadata: Metadata = {
  title: privacyPolicyMeta.title,
  description: `Conoce cómo ${siteConfig.name} trata tus datos personales conforme a la Ley chilena N° 21.719 sobre protección de datos personales.`,
  alternates: {
    canonical: `${siteConfig.url}${privacyPolicyMeta.path}`,
  },
  openGraph: {
    title: privacyPolicyMeta.title,
    description: `Conoce cómo ${siteConfig.name} trata tus datos personales conforme a la Ley chilena N° 21.719.`,
    url: `${siteConfig.url}${privacyPolicyMeta.path}`,
  },
};

export default function PoliticaPrivacidadPage() {
  return (
    <main>
      <Menu />
      <PrivacyPolicyView />
      <Footer />
    </main>
  );
}
