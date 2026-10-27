"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { LoaderCircle, Plus, SearchX } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useDebounce } from "@/hooks/use-debounce";
import { listarCurriculos, restaurarExemplos } from "@/lib/curriculos-storage";
import { normalizarTexto } from "@/lib/formatadores";
import { rotas } from "@/lib/rotas";
import type { Curriculo } from "@/types/curriculo";
import { BarraBusca } from "./barra-busca";
import { CurriculoCard } from "./curriculo-card";
import { EstadoVazio } from "./estado-vazio";
import { ListaCurriculosSkeleton } from "./skeletons";

export function ListaCurriculos() {
  const [curriculos, setCurriculos] = useState<Curriculo[] | null>(null);
  const [busca, setBusca] = useState("");
  const [restaurando, setRestaurando] = useState(false);
  const termo = useDebounce(busca, 300);

  useEffect(() => {
    let ativo = true;
    listarCurriculos()
      .then((lista) => ativo && setCurriculos(lista))
      .catch(() => {
        if (!ativo) return;
        setCurriculos([]);
        toast.error("Não foi possível carregar os currículos", {
          description: "O armazenamento do navegador não respondeu. Recarregue a página.",
        });
      });
    return () => {
      ativo = false;
    };
  }, []);

  const filtrados = useMemo(() => {
    const termoNormalizado = normalizarTexto(termo);
    if (!curriculos || !termoNormalizado) return curriculos ?? [];
    return curriculos.filter(
      (curriculo) =>
        normalizarTexto(curriculo.nome).includes(termoNormalizado) ||
        normalizarTexto(curriculo.cargo).includes(termoNormalizado)
    );
  }, [curriculos, termo]);

  async function restaurar() {
    setRestaurando(true);
    try {
      const exemplos = await restaurarExemplos();
      setCurriculos(exemplos);
      toast.success("Exemplos restaurados", {
        description: `${exemplos.length} currículos fictícios voltaram para a lista.`,
      });
    } catch {
      toast.error("Não foi possível restaurar os exemplos", {
        description: "Verifique se o navegador permite salvar dados neste site.",
      });
    } finally {
      setRestaurando(false);
    }
  }

  const carregando = curriculos === null;
  const vazio = curriculos?.length === 0;
  const buscando = busca !== termo;

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Currículos</h1>
          <p className="mt-1 text-muted-foreground">
            {carregando
              ? "Carregando currículos cadastrados…"
              : `${curriculos.length} ${curriculos.length === 1 ? "currículo cadastrado" : "currículos cadastrados"} neste navegador.`}
          </p>
        </div>
        <Button asChild size="lg">
          <Link href={rotas.cadastrar}>
            <Plus data-icon="inline-start" aria-hidden />
            Novo currículo
          </Link>
        </Button>
      </div>

      {!vazio && (
        <div className="space-y-2">
          <BarraBusca valor={busca} aoMudar={setBusca} desabilitada={carregando} />
          <p aria-live="polite" className="flex min-h-5 items-center gap-1.5 text-sm text-muted-foreground">
            {buscando && <LoaderCircle className="size-3.5 animate-spin" aria-hidden />}
            {!carregando &&
              termo &&
              !buscando &&
              `${filtrados.length} de ${curriculos.length} currículos para “${termo}”.`}
          </p>
        </div>
      )}

      {carregando ? (
        <ListaCurriculosSkeleton />
      ) : vazio ? (
        <EstadoVazio aoRestaurar={restaurar} restaurando={restaurando} />
      ) : filtrados.length === 0 ? (
        <div className="flex flex-col items-center rounded-2xl border border-dashed bg-card px-6 py-12 text-center">
          <span className="grid size-14 place-items-center rounded-full bg-secondary text-primary">
            <SearchX className="size-6" aria-hidden />
          </span>
          <h2 className="mt-4 text-lg font-semibold">Nenhum currículo encontrado</h2>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            Não há currículos com nome ou cargo parecido com “{termo}”. Confira a grafia ou tente
            outro termo.
          </p>
          <Button variant="outline" className="mt-5" onClick={() => setBusca("")}>
            Limpar busca
          </Button>
        </div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtrados.map((curriculo) => (
            <li key={curriculo.id} className="animate-in duration-300 fade-in-0 slide-in-from-bottom-1">
              <CurriculoCard curriculo={curriculo} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
