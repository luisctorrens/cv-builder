"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const perguntas = [
  {
    pergunta: "Onde os currículos ficam salvos?",
    resposta:
      "No localStorage do navegador. Na primeira visita, a lista é preenchida com exemplos fictícios; tudo o que você cadastrar ou excluir fica somente neste dispositivo.",
  },
  {
    pergunta: "A foto é enviada para algum servidor?",
    resposta:
      "Não. O upload é simulado: a imagem é reduzida no próprio navegador e salva junto com o currículo. As fotos dos exemplos ficam na pasta public do projeto.",
  },
  {
    pergunta: "Posso cadastrar mais de uma experiência ou formação?",
    resposta:
      "Sim. Use os botões “Adicionar experiência” e “Adicionar formação”. Cada item é validado individualmente antes de salvar.",
  },
  {
    pergunta: "Como encontro um currículo específico?",
    resposta:
      "Na página de currículos, digite parte do nome ou do cargo. A lista é filtrada automaticamente, inclusive ignorando acentos.",
  },
  {
    pergunta: "Consigo restaurar os exemplos depois de excluir tudo?",
    resposta:
      "Sim. Quando a lista fica vazia, aparece a opção de criar o primeiro currículo ou restaurar os exemplos.",
  },
];

export default function PerguntasFrequentes() {
  return (
    <Accordion type="single" collapsible className="rounded-xl bg-card px-5 ring-1 ring-foreground/10">
      {perguntas.map(({ pergunta, resposta }, indice) => (
        <AccordionItem key={pergunta} value={`pergunta-${indice}`}>
          <AccordionTrigger className="text-base">{pergunta}</AccordionTrigger>
          <AccordionContent className="text-muted-foreground">{resposta}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
