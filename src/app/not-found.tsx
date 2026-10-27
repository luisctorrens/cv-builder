import Link from "next/link";
import { ArrowLeft, SearchX } from "lucide-react";

import { Button } from "@/components/ui/button";
import { rotas } from "@/lib/rotas";

export default function NaoEncontrado() {
  return (
    <div className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center justify-center px-4 py-20 text-center">
      <span className="grid size-16 place-items-center rounded-2xl bg-secondary text-primary">
        <SearchX className="size-8" aria-hidden />
      </span>
      <p className="mt-6 text-sm font-semibold text-primary">Erro 404</p>
      <h1 className="mt-1 text-3xl font-bold tracking-tight">Página não encontrada</h1>
      <p className="mt-3 text-muted-foreground">
        O endereço acessado não existe ou não está disponível. Use o menu ou volte para a página
        inicial.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button asChild size="lg">
          <Link href={rotas.inicio}>
            <ArrowLeft data-icon="inline-start" aria-hidden />
            Página inicial
          </Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href={rotas.visualizar}>Ver currículos</Link>
        </Button>
      </div>
    </div>
  );
}
