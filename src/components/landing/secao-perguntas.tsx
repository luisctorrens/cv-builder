"use client";

import dynamic from "next/dynamic";

import { Skeleton } from "@/components/ui/skeleton";

// O acordeão fica no fim da página: o código dele é separado em outro chunk
// e carregado sob demanda, com um Skeleton enquanto chega.
const PerguntasFrequentes = dynamic(() => import("./perguntas-frequentes"), {
  loading: () => (
    <div className="space-y-3 rounded-xl bg-card p-5 ring-1 ring-foreground/10">
      {Array.from({ length: 5 }, (_, indice) => (
        <Skeleton key={indice} className="h-8 w-full" />
      ))}
    </div>
  ),
});

export function SecaoPerguntas() {
  return (
    <section id="perguntas" className="scroll-mt-20 bg-card py-16 md:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold tracking-wide text-primary uppercase">Dúvidas</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight">Perguntas frequentes</h2>
        </div>
        <PerguntasFrequentes />
      </div>
    </section>
  );
}
