import Link from "next/link";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { rotas } from "@/lib/rotas";
import { Logo } from "./logo";
import { MenuMobile } from "./menu-mobile";
import { Nav } from "./nav";

export function Header() {
  return (
    <header
      data-print="ocultar"
      className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur supports-backdrop-filter:bg-background/70"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo />
        <div className="hidden md:block">
          <Nav />
        </div>
        <div className="flex items-center gap-2">
          <Button asChild size="lg" className="hidden sm:inline-flex">
            <Link href={rotas.cadastrar}>
              <Plus data-icon="inline-start" aria-hidden />
              Novo currículo
            </Link>
          </Button>
          <MenuMobile />
        </div>
      </div>
    </header>
  );
}
