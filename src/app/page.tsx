import { Beneficios } from "@/components/landing/beneficios";
import { ChamadaFinal } from "@/components/landing/chamada-final";
import { ComoFunciona } from "@/components/landing/como-funciona";
import { Hero } from "@/components/landing/hero";
import { SecaoPerguntas } from "@/components/landing/secao-perguntas";

export default function Home() {
  return (
    <>
      <Hero />
      <Beneficios />
      <ComoFunciona />
      <SecaoPerguntas />
      <ChamadaFinal />
    </>
  );
}
