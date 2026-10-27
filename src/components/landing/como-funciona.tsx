import { FilePlus2, Search, UserRound } from "lucide-react";

const passos = [
  {
    icone: FilePlus2,
    titulo: "Cadastre",
    descricao: "Preencha dados pessoais, contato, experiências e formações. A foto pode ser enviada na hora.",
  },
  {
    icone: Search,
    titulo: "Encontre",
    descricao: "Na lista de currículos, filtre por nome ou cargo e veja os resumos em cards.",
  },
  {
    icone: UserRound,
    titulo: "Analise",
    descricao: "Abra os detalhes para ver o perfil completo, copiar o contato, imprimir ou excluir.",
  },
];

export function ComoFunciona() {
  return (
    <section id="como-funciona" className="scroll-mt-20 py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-sm font-semibold tracking-wide text-primary uppercase">Como funciona</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight">Três passos, nenhum mistério</h2>
        </div>
        <ol className="grid gap-8 md:grid-cols-3">
          {passos.map(({ icone: Icone, titulo, descricao }, indice) => (
            <li key={titulo} className="relative flex flex-col items-center text-center">
              {indice < passos.length - 1 && (
                <span
                  aria-hidden
                  className="absolute top-8 left-[calc(50%+3rem)] hidden h-px w-[calc(100%-6rem)] bg-linear-to-r from-primary/40 to-violet-400/40 md:block"
                />
              )}
              <span className="relative grid size-16 place-items-center rounded-2xl bg-linear-to-br from-primary to-violet-600 text-primary-foreground shadow-lg shadow-primary/20">
                <Icone className="size-7" aria-hidden />
                <span className="absolute -top-2 -right-2 grid size-7 place-items-center rounded-full bg-card text-sm font-bold text-primary ring-2 ring-primary/20">
                  {indice + 1}
                </span>
              </span>
              <h3 className="mt-5 text-lg font-semibold">{titulo}</h3>
              <p className="mt-2 max-w-xs text-sm text-muted-foreground">{descricao}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
