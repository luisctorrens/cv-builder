"use client";

import { Suspense } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FilePlus2, House, UsersRound, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { rotas } from "@/lib/rotas";

// O servidor renderiza a página pelo caminho interno (/sistema/paginas/...) e o navegador
// mostra a URL amigável (/curriculos/...). Reconhecer os dois evita divergência na hidratação.
const INTERNO = "/sistema/paginas/curriculos";

type ItemNav = {
  href: string;
  rotulo: string;
  icone: LucideIcon;
  ativo: (caminho: string) => boolean;
};

const itensNav: ItemNav[] = [
  { href: rotas.inicio, rotulo: "Início", icone: House, ativo: (c) => c === rotas.inicio },
  {
    href: rotas.visualizar,
    rotulo: "Currículos",
    icone: UsersRound,
    ativo: (c) =>
      c === rotas.visualizar ||
      c.startsWith(`${rotas.visualizar}/`) ||
      (c.startsWith(INTERNO) && c !== `${INTERNO}/novo`),
  },
  {
    href: rotas.cadastrar,
    rotulo: "Cadastrar",
    icone: FilePlus2,
    ativo: (c) => c === rotas.cadastrar || c === `${INTERNO}/novo`,
  },
];

type NavProps = {
  orientacao?: "horizontal" | "vertical";
  aoNavegar?: () => void;
};

function ListaNav({ caminho, orientacao = "horizontal", aoNavegar }: NavProps & { caminho: string }) {
  return (
    <nav aria-label="Navegação principal">
      <ul className={cn("flex gap-1", orientacao === "vertical" && "flex-col")}>
        {itensNav.map(({ href, rotulo, icone: Icone, ativo }) => {
          const atual = ativo(caminho);
          return (
            <li key={href}>
              <Link
                href={href}
                onClick={aoNavegar}
                aria-current={atual ? "page" : undefined}
                className={cn(
                  "relative flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors outline-none hover:bg-secondary hover:text-secondary-foreground focus-visible:ring-3 focus-visible:ring-ring/50",
                  atual && "bg-secondary text-secondary-foreground",
                  orientacao === "horizontal" &&
                    atual &&
                    "after:absolute after:inset-x-3 after:-bottom-[13px] after:h-0.5 after:rounded-full after:bg-primary",
                  orientacao === "vertical" && "py-3 text-base"
                )}
              >
                <Icone className="size-4" aria-hidden />
                {rotulo}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function NavAtiva(props: NavProps) {
  const caminho = usePathname();
  return <ListaNav caminho={caminho} {...props} />;
}

/** Menu com estado ativo. Em rotas dinâmicas o caminho só é conhecido na requisição,
 *  por isso o fallback mostra os mesmos links sem destaque até o caminho ser resolvido. */
export function Nav(props: NavProps) {
  return (
    <Suspense fallback={<ListaNav caminho="" {...props} />}>
      <NavAtiva {...props} />
    </Suspense>
  );
}
