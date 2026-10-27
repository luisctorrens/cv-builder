import type { Curriculo } from "@/types/curriculo";

// Persistência mockada: os currículos ficam no localStorage do navegador.
// Na primeira visita, a lista é preenchida com os exemplos de src/data, carregados sob demanda.
const CHAVE = "cv-builder:curriculos:v1";

/** Simula a latência de uma API real para exibir os estados de carregamento. */
const LATENCIA = { leitura: 700, escrita: 900, exclusao: 400 } as const;

export type NovoCurriculo = Omit<Curriculo, "id" | "criadoEm">;

function esperar(ms: number) {
  return new Promise((resolver) => setTimeout(resolver, ms));
}

function lerArmazenamento(): Curriculo[] | null {
  try {
    const bruto = window.localStorage.getItem(CHAVE);
    if (bruto === null) return null;
    const dados: unknown = JSON.parse(bruto);
    return Array.isArray(dados) ? (dados as Curriculo[]) : null;
  } catch {
    return null;
  }
}

function gravarArmazenamento(curriculos: Curriculo[]) {
  window.localStorage.setItem(CHAVE, JSON.stringify(curriculos));
}

async function carregarExemplos(): Promise<Curriculo[]> {
  const { curriculosMock } = await import("@/data/curriculos-mock");
  return structuredClone(curriculosMock);
}

function maisRecentesPrimeiro(curriculos: Curriculo[]) {
  return [...curriculos].sort((a, b) => b.criadoEm.localeCompare(a.criadoEm));
}

function gerarId(nome: string) {
  const base = nome
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .split("-")
    .slice(0, 2)
    .join("-");
  return `${base || "curriculo"}-${crypto.randomUUID().slice(0, 6)}`;
}

async function obterTodos() {
  const salvos = lerArmazenamento();
  if (salvos !== null) return salvos;

  const exemplos = await carregarExemplos();
  gravarArmazenamento(exemplos);
  return exemplos;
}

export async function listarCurriculos() {
  await esperar(LATENCIA.leitura);
  return maisRecentesPrimeiro(await obterTodos());
}

export async function buscarCurriculo(id: string) {
  await esperar(LATENCIA.leitura);
  const curriculos = await obterTodos();
  return curriculos.find((curriculo) => curriculo.id === id) ?? null;
}

export async function salvarCurriculo(dados: NovoCurriculo) {
  await esperar(LATENCIA.escrita);
  const curriculos = await obterTodos();
  const novo: Curriculo = { ...dados, id: gerarId(dados.nome), criadoEm: new Date().toISOString() };
  gravarArmazenamento([novo, ...curriculos]);
  return novo;
}

export async function excluirCurriculo(id: string) {
  await esperar(LATENCIA.exclusao);
  const curriculos = await obterTodos();
  gravarArmazenamento(curriculos.filter((curriculo) => curriculo.id !== id));
}

export async function restaurarExemplos() {
  const exemplos = await carregarExemplos();
  gravarArmazenamento(exemplos);
  return maisRecentesPrimeiro(exemplos);
}

export function erroDeArmazenamentoCheio(erro: unknown) {
  return erro instanceof DOMException && erro.name === "QuotaExceededError";
}
