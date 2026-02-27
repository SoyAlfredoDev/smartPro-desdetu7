import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// TODO SEO: Reemplaza "Nombre de tu Empresa" y añade la base de tu URL real. Esto es crucial para que Google entienda tu dominio principal.
export const metadata: Metadata = {
  metadataBase: new URL("https://desdetu7.cl"), // TODO SEO: Reemplazar con URL base real, ej: https://misapres.cl
  title: {
    template: "%s | Desde Tu 7%", // TODO SEO: Reemplazar "Nombre de tu Empresa"
    default: "Asesoría en Isapres | Desde Tu 7%", // TODO SEO: Título por defecto
  },
  description:
    "Asesoría experta y personalizada para elegir el mejor plan de Isapres en Chile. Ahorra y mejora tu cobertura médica hoy.", // TODO SEO: Descripción general corporativa
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: "https://desdetu7.cl", // TODO SEO: Reemplazar con URL real
    siteName: "Desde Tu 7%", // TODO SEO: Nombre oficial
    images: [
      {
        url: "/images/og-image.png", // TODO SEO: Crea una imagen de 1200x630 para compartir en WhatsApp/RRSS y colocarla en public/images
        width: 1200,
        height: 630,
        alt: "Asesoría de Isapres - Desde Tu 7%", // TODO SEO: Texto alt de la imagen OG
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Usamos layouts estándar en lugar de renderizar directamente la landing aquí. */}
        {children}
      </body>
    </html>
  );
}
