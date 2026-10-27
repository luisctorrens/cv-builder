import {
  Layers,
  ListChecks,
  Lock,
  Printer,
  Search,
  Smartphone,
  type LucideIcon,
} from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const beneficios: { icone: LucideIcon; titulo: string; descricao: string }[] = [
  {
    icone: ListChecks,
    titulo: "Cadastro guiado e validado",
    descricao:
      "Campos obrigatórios, e-mail, CPF e datas são conferidos enquanto você preenche, com mensagens claras.",
  },
  {
    icone: Layers,
    titulo: "Experiências e formações ilimitadas",
    descricao:
      "Adicione ou remova quantas experiências profissionais e formações acadêmicas forem necessárias.",
  },
  {
    icone: Search,
    titulo: "Busca instantânea",
    descricao: "Encontre candidatos pelo nome ou pelo cargo enquanto digita, sem recarregar a página.",
  },
  {
    icone: Smartphone,
    titulo: "Pensado para qualquer tela",
    descricao: "Layout fluido para celular, tablet e desktop, com navegação sempre à mão.",
  },
  {
    icone: Printer,
    titulo: "Pronto para imprimir",
    descricao: "Cada currículo tem uma página de detalhes limpa, que pode ser impressa ou salva em PDF.",
  },
  {
    icone: Lock,
    titulo: "Dados no seu navegador",
    descricao:
      "Nesta versão, as informações ficam no localStorage do seu dispositivo e não são enviadas a servidores.",
  },
];

export function Beneficios() {
  return (
    <section id="beneficios" className="scroll-mt-20 bg-card py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="text-sm font-semibold tracking-wide text-primary uppercase">Benefícios</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-balance">
            Tudo o que você precisa para gerenciar currículos
          </h2>
          <p className="mt-3 text-muted-foreground">
            Menos planilhas e e-mails perdidos; mais clareza para comparar perfis e tomar decisões.
          </p>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {beneficios.map(({ icone: Icone, titulo, descricao }) => (
            <li key={titulo}>
              <Card className="h-full transition-all hover:-translate-y-0.5 hover:shadow-md hover:ring-primary/30">
                <CardHeader>
                  <span className="mb-2 grid size-11 place-items-center rounded-xl bg-secondary text-primary">
                    <Icone className="size-5" aria-hidden />
                  </span>
                  <CardTitle className="text-base font-semibold">{titulo}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="leading-relaxed">{descricao}</CardDescription>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
