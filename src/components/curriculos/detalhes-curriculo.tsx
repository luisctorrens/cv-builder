"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  BriefcaseBusiness,
  CalendarDays,
  Copy,
  GraduationCap,
  IdCard,
  LoaderCircle,
  Mail,
  MapPin,
  Phone,
  Printer,
  SearchX,
  Trash2,
  UserRound,
} from "lucide-react";
import { FaLinkedin } from "react-icons/fa6";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { confirmarExclusao } from "@/lib/alertas";
import { buscarCurriculo, excluirCurriculo } from "@/lib/curriculos-storage";
import {
  calcularIdade,
  formatarDataCadastro,
  formatarMesAno,
  formatarPeriodo,
  mascararCpf,
} from "@/lib/formatadores";
import { rotas } from "@/lib/rotas";
import type { Curriculo } from "@/types/curriculo";
import { FotoPerfil } from "./foto-perfil";
import { DetalhesCurriculoSkeleton } from "./skeletons";

type Estado =
  | { situacao: "carregando" }
  | { situacao: "ausente" }
  | { situacao: "encontrado"; curriculo: Curriculo };

export function DetalhesCurriculo({ id }: { id: string }) {
  const router = useRouter();
  const [estado, setEstado] = useState<Estado>({ situacao: "carregando" });
  const [excluindo, setExcluindo] = useState(false);

  useEffect(() => {
    let ativo = true;
    buscarCurriculo(id)
      .then((curriculo) => {
        if (!ativo) return;
        setEstado(curriculo ? { situacao: "encontrado", curriculo } : { situacao: "ausente" });
      })
      .catch(() => ativo && setEstado({ situacao: "ausente" }));
    return () => {
      ativo = false;
    };
  }, [id]);

  if (estado.situacao === "carregando") return <DetalhesCurriculoSkeleton />;

  if (estado.situacao === "ausente") {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-dashed bg-card px-6 py-14 text-center">
        <span className="grid size-14 place-items-center rounded-full bg-secondary text-primary">
          <SearchX className="size-6" aria-hidden />
        </span>
        <h1 className="mt-4 text-xl font-semibold">Currículo não encontrado</h1>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          Ele pode ter sido excluído ou o endereço está incorreto.
        </p>
        <Button asChild className="mt-6" size="lg">
          <Link href={rotas.visualizar}>
            <ArrowLeft data-icon="inline-start" aria-hidden />
            Voltar para os currículos
          </Link>
        </Button>
      </div>
    );
  }

  const { curriculo } = estado;

  async function copiarEmail() {
    try {
      await navigator.clipboard.writeText(curriculo.email);
      toast.success("E-mail copiado", { description: curriculo.email });
    } catch {
      toast.error("Não foi possível copiar o e-mail", {
        description: "O navegador bloqueou o acesso à área de transferência.",
      });
    }
  }

  async function excluir() {
    const confirmado = await confirmarExclusao(curriculo.nome);
    if (!confirmado) return;

    setExcluindo(true);
    try {
      await excluirCurriculo(curriculo.id);
      toast.success("Currículo excluído", {
        description: `${curriculo.nome} foi removido da lista.`,
      });
      router.push(rotas.visualizar);
    } catch {
      setExcluindo(false);
      toast.error("Não foi possível excluir o currículo", {
        description: "Tente novamente em instantes.",
      });
    }
  }

  return (
    <article className="space-y-6">
      <div data-print="ocultar" className="flex flex-wrap items-center justify-between gap-3">
        <Button asChild variant="ghost">
          <Link href={rotas.visualizar}>
            <ArrowLeft data-icon="inline-start" aria-hidden />
            Voltar para os currículos
          </Link>
        </Button>
        <div className="flex flex-wrap gap-2" aria-label="Ações do currículo">
          <Button variant="outline" onClick={copiarEmail}>
            <Copy data-icon="inline-start" aria-hidden />
            Copiar e-mail
          </Button>
          <Button variant="outline" onClick={() => window.print()}>
            <Printer data-icon="inline-start" aria-hidden />
            Imprimir
          </Button>
          <Button variant="destructive" onClick={excluir} disabled={excluindo}>
            {excluindo ? (
              <LoaderCircle data-icon="inline-start" className="animate-spin" aria-hidden />
            ) : (
              <Trash2 data-icon="inline-start" aria-hidden />
            )}
            {excluindo ? "Excluindo…" : "Excluir"}
          </Button>
        </div>
      </div>

      <Card className="gap-0 overflow-hidden p-0">
        <div aria-hidden className="h-28 bg-linear-to-r from-primary via-indigo-500 to-violet-600" />
        <div className="flex flex-col gap-4 px-6 pb-6 sm:flex-row sm:items-end">
          <FotoPerfil
            nome={curriculo.nome}
            src={curriculo.foto}
            tamanho={112}
            carregarAntes
            className="-mt-14"
          />
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{curriculo.nome}</h1>
            <p className="text-lg font-medium text-primary">{curriculo.cargo}</p>
          </div>
          <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="size-4" aria-hidden />
            {curriculo.cidade}
          </p>
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                <UserRound className="size-5 text-primary" aria-hidden />
                Resumo profissional
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed whitespace-pre-line text-muted-foreground">
                {curriculo.resumo}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                <BriefcaseBusiness className="size-5 text-primary" aria-hidden />
                Experiência profissional
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="relative space-y-6 border-l-2 border-secondary pl-6">
                {curriculo.experiencias.map((experiencia, indice) => (
                  <li key={`${experiencia.empresa}-${indice}`} className="relative">
                    <span
                      aria-hidden
                      className="absolute top-1 -left-[33px] size-4 rounded-full border-4 border-card bg-primary"
                    />
                    <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                      <h3 className="font-semibold">{experiencia.cargo}</h3>
                      <p className="text-sm text-muted-foreground">
                        {formatarPeriodo(experiencia.inicio, experiencia.fim, experiencia.atual)}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-primary">
                      {experiencia.empresa}
                      {experiencia.atual && (
                        <Badge variant="secondary" className="ml-2 align-middle">
                          Atual
                        </Badge>
                      )}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {experiencia.descricao}
                    </p>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                <GraduationCap className="size-5 text-primary" aria-hidden />
                Formação acadêmica
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {curriculo.formacoes.map((formacao, indice) => (
                  <li
                    key={`${formacao.curso}-${indice}`}
                    className="flex flex-col gap-1 rounded-xl bg-muted/50 p-4 sm:flex-row sm:items-start sm:justify-between"
                  >
                    <div>
                      <h3 className="font-semibold">{formacao.curso}</h3>
                      <p className="text-sm text-muted-foreground">{formacao.instituicao}</p>
                    </div>
                    <div className="flex items-center gap-2 sm:flex-col sm:items-end">
                      <Badge variant="outline">{formacao.nivel}</Badge>
                      <span className="text-xs text-muted-foreground">
                        {formatarMesAno(formacao.inicio)} – {formatarMesAno(formacao.conclusao)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <aside className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Contato</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-3">
                  <Mail className="size-4 shrink-0 text-primary" aria-hidden />
                  <a
                    href={`mailto:${curriculo.email}`}
                    className="truncate rounded outline-none hover:text-primary hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
                  >
                    {curriculo.email}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="size-4 shrink-0 text-primary" aria-hidden />
                  <a
                    href={`tel:+55${curriculo.telefone.replace(/\D/g, "")}`}
                    className="rounded outline-none hover:text-primary hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
                  >
                    {curriculo.telefone}
                  </a>
                </li>
                {curriculo.linkedin && (
                  <li className="flex items-center gap-3">
                    <FaLinkedin className="size-4 shrink-0 text-primary" aria-hidden />
                    <a
                      href={curriculo.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="truncate rounded outline-none hover:text-primary hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
                    >
                      Perfil no LinkedIn
                    </a>
                  </li>
                )}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Dados pessoais</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <CalendarDays className="size-4 shrink-0 text-primary" aria-hidden />
                  <dt className="sr-only">Nascimento</dt>
                  <dd>
                    {curriculo.dataNascimento} ({calcularIdade(curriculo.dataNascimento)} anos)
                  </dd>
                </div>
                <div className="flex items-center gap-3">
                  <IdCard className="size-4 shrink-0 text-primary" aria-hidden />
                  <dt className="sr-only">CPF</dt>
                  <dd title="CPF parcialmente oculto">{mascararCpf(curriculo.cpf)}</dd>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="size-4 shrink-0 text-primary" aria-hidden />
                  <dt className="sr-only">Cidade</dt>
                  <dd>{curriculo.cidade}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Habilidades</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="flex flex-wrap gap-2">
                {curriculo.habilidades.map((habilidade) => (
                  <li key={habilidade}>
                    <Badge variant="secondary" className="px-2.5 py-1 text-sm">
                      {habilidade}
                    </Badge>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <p className="text-center text-xs text-muted-foreground">
            Cadastrado em {formatarDataCadastro(curriculo.criadoEm)}
          </p>
        </aside>
      </div>
    </article>
  );
}
