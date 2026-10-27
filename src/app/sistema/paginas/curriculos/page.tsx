import type { Metadata } from "next";

import { ListaCurriculos } from "@/components/curriculos/lista-curriculos";

export const metadata: Metadata = {
  title: "Currículos",
  description: "Lista de currículos cadastrados com busca por nome ou cargo.",
};

// Servida em /curriculos/visualizar (rewrite em next.config.ts).
export default function PaginaCurriculos() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <ListaCurriculos />
    </div>
  );
}
