import { NextResponse, type NextRequest } from "next/server";

// O Proxy recebe a URL digitada pelo usuário antes dos rewrites do next.config.ts.
// Assim, quem tenta explorar a estrutura interna (/sistema/paginas/...) recebe 404,
// enquanto as URLs amigáveis (/curriculos/...) continuam funcionando normalmente.
export function proxy(request: NextRequest) {
  const destino = request.nextUrl.clone();
  destino.pathname = "/pagina-nao-encontrada";
  return NextResponse.rewrite(destino);
}

export const config = {
  matcher: ["/sistema/:path*"],
};
