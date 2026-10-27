import Image from "next/image";

import { cn } from "@/lib/utils";
import { iniciais } from "@/lib/formatadores";

type FotoPerfilProps = {
  nome: string;
  src?: string;
  tamanho?: number;
  className?: string;
  carregarAntes?: boolean;
};

export function FotoPerfil({ nome, src, tamanho = 64, className, carregarAntes }: FotoPerfilProps) {
  if (!src) {
    return (
      <span
        aria-hidden
        style={{ width: tamanho, height: tamanho, fontSize: tamanho * 0.36 }}
        className={cn(
          "grid shrink-0 place-items-center rounded-full bg-linear-to-br from-indigo-100 to-violet-200 font-semibold text-secondary-foreground ring-4 ring-card",
          className
        )}
      >
        {iniciais(nome)}
      </span>
    );
  }

  return (
    <Image
      src={src}
      alt={`Foto de ${nome}`}
      width={tamanho}
      height={tamanho}
      // Fotos do upload simulado são data URLs e não passam pelo otimizador.
      unoptimized={src.startsWith("data:")}
      loading={carregarAntes ? "eager" : "lazy"}
      className={cn("shrink-0 rounded-full object-cover ring-4 ring-card", className)}
      style={{ width: tamanho, height: tamanho }}
    />
  );
}
