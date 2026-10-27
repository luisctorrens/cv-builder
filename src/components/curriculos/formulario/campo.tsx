import { CircleAlert } from "lucide-react";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type CampoProps = {
  id: string;
  rotulo: string;
  erro?: string;
  dica?: string;
  obrigatorio?: boolean;
  className?: string;
  children: React.ReactNode;
};

/** Props de acessibilidade que ligam o input ao rótulo, à dica e à mensagem de erro. */
export function ariaDoCampo(id: string, erro?: string, dica?: string) {
  const descricoes = [erro && `${id}-erro`, dica && `${id}-dica`].filter(Boolean).join(" ");
  return {
    id,
    "aria-invalid": erro ? true : undefined,
    "aria-describedby": descricoes || undefined,
  } as const;
}

export function Campo({ id, rotulo, erro, dica, obrigatorio, className, children }: CampoProps) {
  return (
    <div className={cn("grid content-start gap-1.5", className)}>
      <Label htmlFor={id} className={cn(erro && "text-destructive")}>
        {rotulo}
        {obrigatorio && (
          <span className="text-destructive" aria-hidden>
            *
          </span>
        )}
      </Label>
      {children}
      {dica && !erro && (
        <p id={`${id}-dica`} className="text-xs text-muted-foreground">
          {dica}
        </p>
      )}
      {erro && (
        <p
          id={`${id}-erro`}
          className="flex items-start gap-1 text-xs font-medium text-destructive animate-in fade-in-0 slide-in-from-top-1"
        >
          <CircleAlert className="mt-px size-3.5 shrink-0" aria-hidden />
          {erro}
        </p>
      )}
    </div>
  );
}
