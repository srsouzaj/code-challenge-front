import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Providers from "@/Providers";
import Navbar from "../components/Navbar";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IZA: Cadastro de seguradores",
  description: "Cadastro de Seguradores",
  icons: {
    icon: { url: "/favicon.ico" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${nunito.variable} antialiased  overflow-hidden vsc-initialized`}
      >
        <Providers>
          <div className="w-full h-full">
            <Navbar />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
