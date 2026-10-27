export const NIVEIS_FORMACAO = [
  "Ensino médio",
  "Técnico",
  "Tecnólogo",
  "Bacharelado",
  "Licenciatura",
  "Pós-graduação",
  "Mestrado",
  "Doutorado",
] as const;

export type NivelFormacao = (typeof NIVEIS_FORMACAO)[number];

export interface Experiencia {
  empresa: string;
  cargo: string;
  /** MM/AAAA */
  inicio: string;
  /** MM/AAAA; vazio quando é o trabalho atual */
  fim?: string;
  atual: boolean;
  descricao: string;
}

export interface Formacao {
  instituicao: string;
  curso: string;
  nivel: NivelFormacao;
  /** MM/AAAA */
  inicio: string;
  /** MM/AAAA (conclusão ou previsão) */
  conclusao: string;
}

export interface Curriculo {
  id: string;
  nome: string;
  cargo: string;
  email: string;
  telefone: string;
  cpf: string;
  /** DD/MM/AAAA */
  dataNascimento: string;
  cidade: string;
  linkedin?: string;
  /** Caminho em /public ou data URL gerada pelo upload simulado */
  foto?: string;
  resumo: string;
  habilidades: string[];
  experiencias: Experiencia[];
  formacoes: Formacao[];
  /** ISO 8601 */
  criadoEm: string;
}
