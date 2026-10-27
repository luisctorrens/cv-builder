// URLs amigáveis expostas ao usuário. As páginas ficam em /sistema/paginas/curriculos
// e são servidas por rewrites (next.config.ts); o acesso direto é bloqueado em src/proxy.ts.
export const rotas = {
  inicio: "/",
  visualizar: "/curriculos/visualizar",
  cadastrar: "/curriculos/cadastrar",
  detalhes: (id: string) => `/curriculos/visualizar/${encodeURIComponent(id)}`,
} as const;
