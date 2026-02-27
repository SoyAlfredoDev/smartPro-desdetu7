import { Metadata } from "next";
import Menu from "./components/Menu";
import News from "./components/News";
import Footer from "./components/Footer";
import Cotizador from "./components/Cotizador";
import Isapres from "./components/Isapres";
import CotizacionOnline from "./components/CotizacionOnline";

// TODO SEO: Personaliza este título y palabras clave específicas para la landing page.
export const metadata: Metadata = {
  title: "Desde Tu 7%", // Esto se inyectará en el layout: "Cotiza... | Nombre de tu Empresa"
  description:
    "Optimiza tu cobertura médica ahora mismo sin pagar de más. Nuestro cotizador inteligente compara las mejores Isapres de Chile por ti.", // TODO SEO: Descripción optimizada para incitar al clic (CTR)
  keywords: [
    "cotizador isapres",
    "planes de isapre",
    "mejor isapre chile",
    "asesoría salud",
    "fonasa a isapre",
    "cambiar de isapre", // TODO SEO: Añade más términos exactos que busquen tus potenciales clientes
  ],
  alternates: {
    canonical: "https://desdetu7.cl", // TODO SEO: URL canónica (ruta principal) para evitar indexar parámetros o duplicados
  },
};

export default function Home() {
  return (
    <main>
      {/* 
        Mantenemos la envoltura estructural que agrupa a Menu y Cotizador 
        con el mismo fondo (bg-cotizador.jpeg) preservando intacta la UI.
      */}
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

      <Isapres />
      <CotizacionOnline />
      <News />

      <Footer />
    </main>
  );
}
