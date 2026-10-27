"use client";

import { Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type BarraBuscaProps = {
  valor: string;
  aoMudar: (valor: string) => void;
  desabilitada?: boolean;
};

export function BarraBusca({ valor, aoMudar, desabilitada }: BarraBuscaProps) {
  return (
    <div role="search" className="relative">
      <label htmlFor="busca-curriculos" className="sr-only">
        Buscar currículos por nome ou cargo
      </label>
      <Search
        className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden
      />
      <Input
        id="busca-curriculos"
        type="search"
        value={valor}
        onChange={(evento) => aoMudar(evento.target.value)}
        placeholder="Buscar por nome ou cargo…"
        autoComplete="off"
        disabled={desabilitada}
        className="h-11 rounded-xl pr-11 pl-10 text-base shadow-xs [&::-webkit-search-cancel-button]:hidden"
      />
      {valor && (
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={() => aoMudar("")}
          className="absolute top-1/2 right-2 -translate-y-1/2"
          aria-label="Limpar busca"
        >
          <X />
        </Button>
      )}
    </div>
  );
}
