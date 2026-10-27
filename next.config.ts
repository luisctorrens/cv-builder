import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // URLs amigáveis: o usuário navega por /curriculos/* e o Next.js serve as páginas
  // de /sistema/paginas/curriculos/*. O acesso direto à pasta interna é bloqueado em src/proxy.ts.
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/curriculos/visualizar", destination: "/sistema/paginas/curriculos" },
        {
          // "novo" é a página de cadastro e não deve ser alcançada como se fosse um id.
          source: "/curriculos/visualizar/:id((?!novo$)[^/]+)",
          destination: "/sistema/paginas/curriculos/:id",
        },
        { source: "/curriculos/cadastrar", destination: "/sistema/paginas/curriculos/novo" },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
  async redirects() {
    return [{ source: "/curriculos", destination: "/curriculos/visualizar", permanent: false }];
  },
};

export default nextConfig;
