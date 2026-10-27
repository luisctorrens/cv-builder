import Link from "next/link";
import { FaGithub } from "react-icons/fa6";

import { rotas } from "@/lib/rotas";
import { Logo } from "./logo";

const linksSecundarios = [
  { href: "/#beneficios", rotulo: "Benefícios" },
  { href: "/#como-funciona", rotulo: "Como funciona" },
  { href: "/#perguntas", rotulo: "Perguntas frequentes" },
  { href: rotas.visualizar, rotulo: "Ver currículos" },
  { href: rotas.cadastrar, rotulo: "Cadastrar currículo" },
];

export function Footer() {
  return (
    <footer data-print="ocultar" className="mt-auto border-t bg-card">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.4fr_1fr]">
        <div className="space-y-3">
          <Logo />
          <p className="max-w-sm text-sm text-muted-foreground">
            Sistema de gestão de currículos desenvolvido no Trabalho 2 de Desenvolvimento de
            Sistemas Web — Análise e Desenvolvimento de Sistemas, SENAI/SC.
          </p>
        </div>
        <nav aria-label="Links secundários">
          <h2 className="mb-3 text-sm font-semibold">Navegue</h2>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
            {linksSecundarios.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded text-muted-foreground transition-colors outline-none hover:text-primary focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  {link.rotulo}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <p>© 2026 CV Builder. Todos os direitos reservados.</p>
          <a
            href="https://github.com/luisctorrens"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded transition-colors outline-none hover:text-primary focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <FaGithub className="size-4" aria-hidden />
            luisctorrens
          </a>
        </div>
      </div>
    </footer>
  );
}
