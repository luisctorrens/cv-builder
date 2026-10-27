import * as yup from "yup";

import { NIVEIS_FORMACAO } from "@/types/curriculo";

const MES_ANO = /^(0[1-9]|1[0-2])\/\d{4}$/;
const DATA = /^\d{2}\/\d{2}\/\d{4}$/;
const CPF = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
const CELULAR = /^\(\d{2}\) 9\d{4}-\d{4}$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const NOME = /^[A-Za-zÀ-ÖØ-öø-ÿ'’ -]+$/;

export function cpfValido(cpf: string) {
  const digitos = cpf.replace(/\D/g, "");
  if (digitos.length !== 11 || /^(\d)\1{10}$/.test(digitos)) return false;

  const calcularDigito = (tamanho: number) => {
    let soma = 0;
    for (let i = 0; i < tamanho; i++) soma += Number(digitos[i]) * (tamanho + 1 - i);
    const resto = (soma * 10) % 11;
    return resto === 10 ? 0 : resto;
  };

  return calcularDigito(9) === Number(digitos[9]) && calcularDigito(10) === Number(digitos[10]);
}

export function separarHabilidades(texto: string) {
  return texto
    .split(",")
    .map((habilidade) => habilidade.trim())
    .filter(Boolean);
}

function mesAnoEmMeses(valor: string) {
  const [mes, ano] = valor.split("/").map(Number);
  return ano * 12 + mes;
}

function mesAtualEmMeses() {
  const hoje = new Date();
  return hoje.getFullYear() * 12 + hoje.getMonth() + 1;
}

function dataExiste(valor: string) {
  const [dia, mes, ano] = valor.split("/").map(Number);
  const data = new Date(ano, mes - 1, dia);
  return (
    ano >= 1900 &&
    data.getFullYear() === ano &&
    data.getMonth() === mes - 1 &&
    data.getDate() === dia
  );
}

function idadeEntre(valor: string, minima: number, maxima: number) {
  const [dia, mes, ano] = valor.split("/").map(Number);
  const hoje = new Date();
  let idade = hoje.getFullYear() - ano;
  if (hoje.getMonth() + 1 < mes || (hoje.getMonth() + 1 === mes && hoje.getDate() < dia)) {
    idade -= 1;
  }
  return idade >= minima && idade <= maxima;
}

/** Só executa o teste quando o formato já está correto, evitando mensagens repetidas. */
const seMesAnoValido = (valor: string | undefined, teste: (valor: string) => boolean) =>
  !valor || !MES_ANO.test(valor) || teste(valor);

export const experienciaSchema = yup.object({
  empresa: yup
    .string()
    .trim()
    .required("Informe o nome da empresa.")
    .min(2, "O nome da empresa deve ter ao menos 2 caracteres."),
  cargo: yup
    .string()
    .trim()
    .required("Informe o cargo ocupado.")
    .min(2, "O cargo ocupado deve ter ao menos 2 caracteres."),
  inicio: yup
    .string()
    .required("Informe o mês de início.")
    .matches(MES_ANO, "Use o formato MM/AAAA no início.")
    .test("inicio-passado", "O início não pode estar no futuro.", (valor) =>
      seMesAnoValido(valor, (v) => mesAnoEmMeses(v) <= mesAtualEmMeses())
    ),
  atual: yup.boolean().required().default(false),
  fim: yup
    .string()
    .default("")
    .when("atual", {
      is: true,
      then: (schema) => schema.optional(),
      otherwise: (schema) =>
        schema
          .required("Informe o término ou marque “Trabalho atual”.")
          .matches(MES_ANO, "Use o formato MM/AAAA no término.")
          .test("fim-passado", "O término não pode estar no futuro.", (valor) =>
            seMesAnoValido(valor, (v) => mesAnoEmMeses(v) <= mesAtualEmMeses())
          )
          .test(
            "fim-apos-inicio",
            "O término deve ser igual ou posterior ao início.",
            function (valor) {
              const inicio: string | undefined = this.parent.inicio;
              if (!inicio || !MES_ANO.test(inicio)) return true;
              return seMesAnoValido(valor, (v) => mesAnoEmMeses(v) >= mesAnoEmMeses(inicio));
            }
          ),
    }),
  descricao: yup
    .string()
    .trim()
    .required("Descreva as atividades realizadas.")
    .min(20, "A descrição da experiência deve ter ao menos 20 caracteres.")
    .max(500, "A descrição da experiência deve ter no máximo 500 caracteres."),
});

export const formacaoSchema = yup.object({
  instituicao: yup
    .string()
    .trim()
    .required("Informe a instituição de ensino.")
    .min(2, "O nome da instituição deve ter ao menos 2 caracteres."),
  curso: yup
    .string()
    .trim()
    .required("Informe o curso.")
    .min(2, "O nome do curso deve ter ao menos 2 caracteres."),
  // test() em vez de oneOf() mantém o tipo string, permitindo o valor inicial vazio no formulário.
  nivel: yup
    .string()
    .required("Selecione o nível da formação.")
    .test("nivel-da-lista", "Selecione um nível de formação da lista.", (valor) =>
      !valor ? true : (NIVEIS_FORMACAO as readonly string[]).includes(valor)
    ),
  inicio: yup
    .string()
    .required("Informe o mês de início do curso.")
    .matches(MES_ANO, "Use o formato MM/AAAA no início do curso.")
    .test("inicio-curso-passado", "O início do curso não pode estar no futuro.", (valor) =>
      seMesAnoValido(valor, (v) => mesAnoEmMeses(v) <= mesAtualEmMeses())
    ),
  conclusao: yup
    .string()
    .required("Informe a conclusão ou a previsão de conclusão.")
    .matches(MES_ANO, "Use o formato MM/AAAA na conclusão.")
    .test(
      "conclusao-apos-inicio",
      "A conclusão deve ser igual ou posterior ao início do curso.",
      function (valor) {
        const inicio: string | undefined = this.parent.inicio;
        if (!inicio || !MES_ANO.test(inicio)) return true;
        return seMesAnoValido(valor, (v) => mesAnoEmMeses(v) >= mesAnoEmMeses(inicio));
      }
    )
    .test("conclusao-limite", "A previsão de conclusão deve estar nos próximos 10 anos.", (valor) =>
      seMesAnoValido(valor, (v) => mesAnoEmMeses(v) <= mesAtualEmMeses() + 120)
    ),
});

export const curriculoSchema = yup.object({
  foto: yup.string().default(""),
  nome: yup
    .string()
    .trim()
    .required("Informe o nome completo.")
    .min(5, "O nome completo deve ter ao menos 5 caracteres.")
    .max(80, "O nome completo deve ter no máximo 80 caracteres.")
    .matches(NOME, "O nome deve conter apenas letras.")
    .test("sobrenome", "Informe nome e sobrenome.", (valor) =>
      !valor ? true : valor.trim().split(/\s+/).length >= 2
    ),
  cargo: yup
    .string()
    .trim()
    .required("Informe o cargo desejado.")
    .min(3, "O cargo deve ter ao menos 3 caracteres.")
    .max(80, "O cargo deve ter no máximo 80 caracteres."),
  email: yup
    .string()
    .trim()
    .required("Informe o e-mail.")
    .email("Informe um e-mail válido, por exemplo nome@empresa.com.")
    .matches(EMAIL, "Informe um e-mail válido, por exemplo nome@empresa.com."),
  telefone: yup
    .string()
    .required("Informe o celular.")
    .matches(CELULAR, "Informe o celular completo no formato (00) 90000-0000."),
  cpf: yup
    .string()
    .required("Informe o CPF.")
    .matches(CPF, "Informe o CPF completo no formato 000.000.000-00.")
    .test("cpf-valido", "CPF inválido: confira os dígitos informados.", (valor) =>
      !valor || !CPF.test(valor) ? true : cpfValido(valor)
    ),
  dataNascimento: yup
    .string()
    .required("Informe a data de nascimento.")
    .matches(DATA, "Use o formato DD/MM/AAAA na data de nascimento.")
    .test("data-existe", "Esta data de nascimento não existe.", (valor) =>
      !valor || !DATA.test(valor) ? true : dataExiste(valor)
    )
    .test("idade", "A idade deve estar entre 14 e 100 anos.", (valor) =>
      !valor || !DATA.test(valor) || !dataExiste(valor) ? true : idadeEntre(valor, 14, 100)
    ),
  cidade: yup
    .string()
    .trim()
    .required("Informe a cidade e o estado.")
    .min(3, "A cidade deve ter ao menos 3 caracteres."),
  linkedin: yup
    .string()
    .trim()
    .default("")
    .url("Informe um endereço válido, começando com https://."),
  resumo: yup
    .string()
    .trim()
    .required("Escreva um resumo profissional.")
    .min(50, "O resumo profissional deve ter ao menos 50 caracteres.")
    .max(600, "O resumo profissional deve ter no máximo 600 caracteres."),
  habilidades: yup
    .string()
    .trim()
    .required("Informe ao menos uma habilidade.")
    .test(
      "habilidades-validas",
      "Separe as habilidades por vírgula; cada uma deve ter ao menos 2 caracteres.",
      (valor) => {
        if (!valor) return true;
        const lista = separarHabilidades(valor);
        return lista.length > 0 && lista.every((habilidade) => habilidade.length >= 2);
      }
    ),
  experiencias: yup
    .array()
    .of(experienciaSchema)
    .required()
    .min(1, "Adicione ao menos uma experiência profissional.")
    .max(10, "Cadastre no máximo 10 experiências."),
  formacoes: yup
    .array()
    .of(formacaoSchema)
    .required()
    .min(1, "Adicione ao menos uma formação acadêmica.")
    .max(10, "Cadastre no máximo 10 formações."),
});

export type CurriculoFormValues = yup.InferType<typeof curriculoSchema>;
export type ExperienciaFormValues = yup.InferType<typeof experienciaSchema>;
export type FormacaoFormValues = yup.InferType<typeof formacaoSchema>;

export const experienciaVazia: ExperienciaFormValues = {
  empresa: "",
  cargo: "",
  inicio: "",
  atual: false,
  fim: "",
  descricao: "",
};

export const formacaoVazia: FormacaoFormValues = {
  instituicao: "",
  curso: "",
  nivel: "",
  inicio: "",
  conclusao: "",
};

export const curriculoVazio: CurriculoFormValues = {
  foto: "",
  nome: "",
  cargo: "",
  email: "",
  telefone: "",
  cpf: "",
  dataNascimento: "",
  cidade: "",
  linkedin: "",
  resumo: "",
  habilidades: "",
  experiencias: [experienciaVazia],
  formacoes: [formacaoVazia],
};
