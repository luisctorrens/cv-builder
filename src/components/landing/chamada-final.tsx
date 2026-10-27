import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { rotas } from "@/lib/rotas";

export function ChamadaFinal() {
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-primary via-indigo-600 to-violet-700 px-6 py-12 text-center text-primary-foreground shadow-xl shadow-primary/20 sm:px-12">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-white/10"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-28 -left-16 size-64 rounded-full bg-white/10"
          />
          <h2 className="relative text-3xl font-bold tracking-tight text-balance">
            Pronto para cadastrar o primeiro currículo?
          </h2>
          <p className="relative mx-auto mt-3 max-w-xl text-indigo-100">
            Leva poucos minutos e você pode adicionar quantas experiências e formações quiser.
          </p>
          <div className="relative mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="h-11 px-5 text-base focus-visible:ring-white/60"
            >
              <Link href={rotas.cadastrar}>
                Começar agora
                <ArrowRight data-icon="inline-end" aria-hidden />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="ghost"
              className="h-11 px-5 text-base text-primary-foreground hover:bg-white/15 hover:text-primary-foreground focus-visible:ring-white/60"
            >
              <Link href={rotas.visualizar}>Explorar exemplos</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
