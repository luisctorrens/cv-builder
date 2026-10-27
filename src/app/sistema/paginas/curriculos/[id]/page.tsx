import type { Metadata } from "next";

import { DetalhesCurriculo } from "@/components/curriculos/detalhes-curriculo";

export const metadata: Metadata = {
  title: "Detalhes do currículo",
};

// Servida em /curriculos/visualizar/[id] (rewrite em next.config.ts).
export default async function PaginaDetalhesCurriculo({
  params,
}: PageProps<"/sistema/paginas/curriculos/[id]">) {
  const { id } = await params;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
      <DetalhesCurriculo id={decodeURIComponent(id)} />
    </div>
  );
}
