import type { Metadata } from "next";

import { FormularioCurriculoLazy } from "@/components/curriculos/formulario/formulario-lazy";

export const metadata: Metadata = {
  title: "Cadastrar currículo",
  description: "Formulário de cadastro de currículo com validação e campos dinâmicos.",
};

// Servida em /curriculos/cadastrar (rewrite em next.config.ts).
export default function PaginaNovoCurriculo() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Cadastrar currículo</h1>
        <p className="mt-1 text-muted-foreground">
          Preencha as seções abaixo. As mensagens de validação aparecem ao sair de cada campo.
        </p>
      </div>
      <FormularioCurriculoLazy />
    </div>
  );
}
