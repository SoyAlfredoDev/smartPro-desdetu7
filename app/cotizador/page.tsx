import { Metadata } from "next";
import Menu from "../components/Menu";
import Footer from "../components/Footer";
import CotizadorEmbedSection from "../components/CotizadorEmbedSection";

export const metadata: Metadata = {
  title: "Cotizador de Isapres",
  description:
    "Compara planes de salud de las principales Isapres en Chile. Cotiza en línea según tu región, edad e ingreso.",
  alternates: {
    canonical: "https://desdetu7.cl/cotizador",
  },
};

export default function CotizadorPage() {
  return (
    <main>
      <Menu />
      <CotizadorEmbedSection />
      <Footer />
    </main>
  );
}
