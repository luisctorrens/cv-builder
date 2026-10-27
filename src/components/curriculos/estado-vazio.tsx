import Image from "next/image";
import Link from "next/link";
import { FilePlus2, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { rotas } from "@/lib/rotas";

type EstadoVazioProps = {
  aoRestaurar: () => void;
  restaurando: boolean;
};

export function EstadoVazio({ aoRestaurar, restaurando }: EstadoVazioProps) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed bg-card px-6 py-14 text-center">
      <Image
        src="/ilustracoes/lista-vazia.svg"
        alt=""
        width={280}
        height={200}
        className="h-auto w-56 sm:w-64"
      />
      <h2 className="mt-6 text-xl font-semibold">Nenhum currículo por aqui ainda</h2>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        Comece cadastrando o seu currículo. Ele aparecerá nesta lista com nome, cargo e resumo
        profissional.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button asChild size="lg">
          <Link href={rotas.cadastrar}>
            <FilePlus2 data-icon="inline-start" aria-hidden />
            Criar meu primeiro currículo
          </Link>
        </Button>
        <Button variant="outline" size="lg" onClick={aoRestaurar} disabled={restaurando}>
          <RotateCcw
            data-icon="inline-start"
            className={restaurando ? "animate-spin [animation-direction:reverse]" : undefined}
            aria-hidden
          />
          {restaurando ? "Restaurando…" : "Restaurar exemplos"}
        </Button>
      </div>
    </div>
  );
}
