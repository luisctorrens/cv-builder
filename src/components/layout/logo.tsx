import Link from "next/link";
import { FileUser } from "lucide-react";

import { rotas } from "@/lib/rotas";

export function Logo() {
  return (
    <Link
      href={rotas.inicio}
      className="group flex items-center gap-2 rounded-lg font-semibold tracking-tight outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
      aria-label="CV Builder — página inicial"
    >
      <span className="grid size-9 place-items-center rounded-xl bg-linear-to-br from-primary to-violet-600 text-primary-foreground shadow-sm transition-transform group-hover:-rotate-6">
        <FileUser className="size-5" aria-hidden />
      </span>
      <span className="text-lg">
        CV <span className="text-primary">Builder</span>
      </span>
    </Link>
  );
}
