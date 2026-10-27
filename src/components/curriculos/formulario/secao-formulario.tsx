import type { LucideIcon } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type SecaoFormularioProps = {
  icone: LucideIcon;
  titulo: string;
  descricao: string;
  children: React.ReactNode;
};

export function SecaoFormulario({ icone: Icone, titulo, descricao, children }: SecaoFormularioProps) {
  return (
    <Card className="gap-6">
      <CardHeader className="flex items-start gap-3 border-b">
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-secondary text-primary">
          <Icone className="size-5" aria-hidden />
        </span>
        <div className="space-y-1">
          <CardTitle className="text-lg font-semibold">{titulo}</CardTitle>
          <CardDescription>{descricao}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
