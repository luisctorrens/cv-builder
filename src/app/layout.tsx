import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "CV Builder — Gestão de currículos",
    template: "%s | CV Builder",
  },
  description:
    "Cadastre, organize e encontre currículos com validação, busca em tempo real e uma interface responsiva.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <a
          href="#conteudo"
          className="sr-only z-50 rounded-lg bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Pular para o conteúdo
        </a>
        <Header />
        <main id="conteudo" className="flex flex-1 flex-col">
          {children}
        </main>
        <Footer />
        <Toaster
          theme="light"
          position="top-right"
          offset={{ top: 76, right: 16 }}
          mobileOffset={{ top: 72 }}
          richColors
          closeButton
        />
      </body>
    </html>
  );
}
