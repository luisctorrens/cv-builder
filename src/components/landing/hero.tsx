import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CircleCheck, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { rotas } from "@/lib/rotas";

const destaques = ["Validação em tempo real", "Busca por nome ou cargo", "Funciona no celular"];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-40 -z-10 h-[520px] bg-[radial-gradient(60%_60%_at_50%_0%,rgb(199_210_254/0.6),transparent)]"
      />
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-14 sm:px-6 md:py-20 lg:grid-cols-2">
        <div className="space-y-7 text-center lg:text-left">
          <Badge variant="secondary" className="gap-1.5 px-3 py-1 text-sm">
            <Sparkles className="size-3.5" aria-hidden />
            Currículos organizados em minutos
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl">
            Monte, organize e encontre{" "}
            <span className="bg-linear-to-r from-primary to-violet-600 bg-clip-text text-transparent">
              currículos
            </span>{" "}
            sem complicação
          </h1>
          <p className="mx-auto max-w-xl text-lg text-pretty text-muted-foreground lg:mx-0">
            O CV Builder guia o cadastro passo a passo, valida cada informação e reúne todos os
            currículos em um só lugar, prontos para consulta e impressão.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <Button asChild size="lg" className="h-11 px-5 text-base">
              <Link href={rotas.cadastrar}>
                Cadastrar currículo
                <ArrowRight data-icon="inline-end" aria-hidden />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-11 px-5 text-base">
              <Link href={rotas.visualizar}>Ver currículos</Link>
            </Button>
          </div>
          <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground lg:justify-start">
            {destaques.map((item) => (
              <li key={item} className="flex items-center gap-1.5">
                <CircleCheck className="size-4 text-primary" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <Image
          src="/ilustracoes/hero.svg"
          alt="Ilustração de um currículo com foto, habilidades e experiências validadas"
          width={560}
          height={460}
          loading="eager"
          fetchPriority="high"
          className="mx-auto h-auto w-full max-w-md lg:max-w-none"
        />
      </div>
    </section>
  );
}
