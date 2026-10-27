import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { rotas } from "@/lib/rotas";
import type { Curriculo } from "@/types/curriculo";
import { FotoPerfil } from "./foto-perfil";

export function CurriculoCard({ curriculo }: { curriculo: Curriculo }) {
  const habilidadesVisiveis = curriculo.habilidades.slice(0, 3);
  const habilidadesRestantes = curriculo.habilidades.length - habilidadesVisiveis.length;

  return (
    <Card className="group/curriculo relative h-full gap-4 transition-all focus-within:ring-2 focus-within:ring-ring/60 hover:-translate-y-0.5 hover:shadow-lg hover:ring-primary/30">
      <CardHeader className="flex items-center gap-4">
        <FotoPerfil nome={curriculo.nome} src={curriculo.foto} tamanho={56} />
        <div className="min-w-0">
          <h2 className="truncate text-base font-semibold">{curriculo.nome}</h2>
          <p className="truncate text-sm font-medium text-primary">{curriculo.cargo}</p>
          <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="size-3" aria-hidden />
            {curriculo.cidade}
          </p>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-3">
        <p className="line-clamp-3 text-sm text-muted-foreground">{curriculo.resumo}</p>
        <ul className="mt-auto flex flex-wrap gap-1.5" aria-label="Principais habilidades">
          {habilidadesVisiveis.map((habilidade) => (
            <li key={habilidade}>
              <Badge variant="secondary">{habilidade}</Badge>
            </li>
          ))}
          {habilidadesRestantes > 0 && (
            <li>
              <Badge variant="outline">+{habilidadesRestantes}</Badge>
            </li>
          )}
        </ul>
      </CardContent>
      <CardFooter className="border-t bg-muted/40 py-3">
        <Link
          href={rotas.detalhes(curriculo.id)}
          className="flex w-full items-center justify-between rounded text-sm font-medium text-primary outline-none after:absolute after:inset-0 after:content-['']"
        >
          Ver currículo completo
          <ArrowRight
            className="size-4 transition-transform group-hover/curriculo:translate-x-1"
            aria-hidden
          />
          <span className="sr-only"> de {curriculo.nome}</span>
        </Link>
      </CardFooter>
    </Card>
  );
}
