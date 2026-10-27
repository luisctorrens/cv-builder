"use client";

import { useState } from "react";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Nav } from "./nav";

export function MenuMobile() {
  const [aberto, setAberto] = useState(false);

  return (
    <Sheet open={aberto} onOpenChange={setAberto}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon-lg" className="md:hidden" aria-label="Abrir menu">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-72">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription>Navegue pelas páginas do CV Builder.</SheetDescription>
        </SheetHeader>
        <div className="px-4">
          <Nav orientacao="vertical" aoNavegar={() => setAberto(false)} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
