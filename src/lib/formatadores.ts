/** Remove acentos e padroniza caixa para buscas tolerantes ("joão" encontra "Joao"). */
export function normalizarTexto(texto: string) {
  return texto
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();
}

export function iniciais(nome: string) {
  const partes = nome.trim().split(/\s+/).filter(Boolean);
  if (partes.length === 0) return "?";
  const primeira = partes[0][0];
  const ultima = partes.length > 1 ? partes[partes.length - 1][0] : "";
  return (primeira + ultima).toUpperCase();
}

const MESES = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];

/** "03/2024" -> "mar 2024" */
export function formatarMesAno(mesAno?: string) {
  if (!mesAno) return "";
  const [mes, ano] = mesAno.split("/");
  const indice = Number(mes) - 1;
  return MESES[indice] ? `${MESES[indice]} ${ano}` : mesAno;
}

export function formatarPeriodo(inicio: string, fim?: string, atual?: boolean) {
  return `${formatarMesAno(inicio)} – ${atual ? "atual" : formatarMesAno(fim)}`;
}

/** Mostra apenas os 3 primeiros dígitos do CPF: 123.***.***-** */
export function mascararCpf(cpf: string) {
  return cpf.replace(/^(\d{3})\.\d{3}\.\d{3}-\d{2}$/, "$1.***.***-**");
}

export function calcularIdade(dataNascimento: string, hoje = new Date()) {
  const [dia, mes, ano] = dataNascimento.split("/").map(Number);
  let idade = hoje.getFullYear() - ano;
  const aindaNaoFezAniversario =
    hoje.getMonth() + 1 < mes || (hoje.getMonth() + 1 === mes && hoje.getDate() < dia);
  if (aindaNaoFezAniversario) idade -= 1;
  return idade;
}

export function formatarDataCadastro(iso: string) {
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "medium" }).format(new Date(iso));
}
