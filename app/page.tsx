import { Metadata } from "next";
import Menu from "./components/Menu";
import News from "./components/News";
import Footer from "./components/Footer";
import Cotizador from "./components/Cotizador";
import Isapres from "./components/Isapres";
import CotizacionOnline from "./components/CotizacionOnline";
import CotizadorEmbedSection from "./components/CotizadorEmbedSection";

export const metadata: Metadata = {
  title: "Desde Tu 7%",
  description:
    "Optimiza tu cobertura médica ahora mismo sin pagar de más. Nuestro cotizador inteligente compara las mejores Isapres de Chile por ti.",
  keywords: [
    "cotizador isapres",
    "planes de isapre",
    "mejor isapre chile",
    "asesoría salud",
    "fonasa a isapre",
    "cambiar de isapre",
  ],
  alternates: {
    canonical: "https://desdetu7.cl",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function Home() {
  return (
    <main>
      <div
        style={{
          backgroundImage: "url('/images/bg-cotizador.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Menu />
        <Cotizador />
      </div>

      <CotizadorEmbedSection />

      <Isapres />
      <CotizacionOnline />
      <News />

      <Footer />
    </main>
  );
}
