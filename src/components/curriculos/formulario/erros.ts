import type { FieldErrors, FieldValues } from "react-hook-form";

export type ErroDeCampo = { caminho: string; mensagem: string };

const ITENS_DE_LISTA: Record<string, string> = {
  experiencias: "Experiência",
  formacoes: "Formação",
};

/** Percorre o objeto de erros do React Hook Form (inclusive os field arrays) na ordem do formulário. */
export function coletarErros(erros: FieldErrors<FieldValues>, caminho: string[] = []): ErroDeCampo[] {
  const encontrados: ErroDeCampo[] = [];

  for (const [chave, valor] of Object.entries(erros)) {
    if (!valor || typeof valor !== "object" || chave === "ref") continue;
    const atual = chave === "root" ? caminho : [...caminho, chave];

    if ("message" in valor && typeof valor.message === "string" && valor.message) {
      encontrados.push({ caminho: atual.join("."), mensagem: valor.message });
    }
    encontrados.push(...coletarErros(valor as FieldErrors<FieldValues>, atual));
  }

  return encontrados;
}

/** "experiencias.1.cargo" + mensagem -> "Experiência 2: Informe o cargo ocupado." */
export function descreverErro({ caminho, mensagem }: ErroDeCampo) {
  const [lista, indice] = caminho.split(".");
  if (ITENS_DE_LISTA[lista] && indice !== undefined && /^\d+$/.test(indice)) {
    return `${ITENS_DE_LISTA[lista]} ${Number(indice) + 1}: ${mensagem}`;
  }
  return mensagem;
}
