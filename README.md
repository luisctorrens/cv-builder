# CV Builder — Sistema de Gestão de Currículos

Aplicação web em **Next.js (App Router)** para cadastrar, listar, buscar e consultar currículos. Os dados ficam no `localStorage`; o foco desta etapa é interface, experiência do usuário, componentização e validação de formulários.

> Trabalho 2 da UC **Desenvolvimento de Sistemas Web** — Análise e Desenvolvimento de Sistemas, SENAI/SC (Etapa 1: Frontend).

## Funcionalidades

- **Landing page** (`/`) com hero, benefícios, passo a passo, perguntas frequentes (Accordion) e chamada final.
- **Lista de currículos** (`/curriculos/visualizar`) em cards com foto, nome, cargo, cidade, resumo profissional e principais habilidades.
- **Busca em tempo real** por nome ou cargo, com debounce de 300 ms e sem diferenciar acentos ou maiúsculas.
- **Detalhes** (`/curriculos/visualizar/[id]`) em rota dinâmica: resumo, experiências em linha do tempo, formações, contato, dados pessoais e habilidades.
- **Ações de gestão**: copiar e-mail, imprimir ou salvar em PDF e excluir, com confirmação no SweetAlert.
- **Cadastro** (`/curriculos/cadastrar`) com React Hook Form e Yup:
  - campos obrigatórios, e-mail, tamanhos mínimos e máximos, CPF com dígitos verificadores, data existente e idade entre 14 e 100 anos;
  - máscaras de CPF, celular, data de nascimento e mês/ano;
  - `useFieldArray` para adicionar e remover **experiências profissionais** e **formações acadêmicas**, todas validadas pelo Yup;
  - “Trabalho atual” desabilita o término;
  - upload simulado da foto com barra de progresso, arrastar e soltar, validação de tipo e tamanho e redimensionamento no navegador;
  - remoção de item com ação **Desfazer** no toast.
- **Feedback**: Sonner em todas as ações. Em caso de erro, o toast mostra a mensagem específica retornada pelo Yup. O SweetAlert é usado para confirmar exclusão, limpar o formulário e comemorar o cadastro.
- **Estados**: Skeleton do shadcn/ui na lista, nos detalhes e no formulário; *empty state* com “Criar meu primeiro currículo” e “Restaurar exemplos”; estado “nenhum resultado” na busca; página 404.
- **Microinterações**: botões com `hover`, `focus-visible` e `disabled`. O botão de salvar fica desabilitado enquanto envia ou enquanto houver erros depois da primeira tentativa. O menu mostra o link ativo.
- **Responsividade** para celular (menu em Sheet), tablet e desktop, além de estilos de impressão.

## Stack

| Requisito | Uso no projeto |
| --- | --- |
| Next.js 16 (App Router) | rotas em `src/app`, `loading.tsx`, `not-found.tsx`, rewrites e Proxy |
| Tailwind CSS 4 | estilização e responsividade; paleta análoga índigo/violeta em `globals.css` |
| shadcn/ui | Button, Card, Input, Textarea, Select, Checkbox, Badge, Accordion, Sheet, Skeleton, Progress, Sonner |
| React Hook Form + Yup | `FormProvider`, `Controller`, `useFieldArray` e `yupResolver` com o schema em `src/schemas` |
| React Input Mask Next | `react-input-mask-next` em `src/components/curriculos/formulario/input-mascarado.tsx` |
| Sonner | toasts de sucesso, erro, informação e desfazer |
| SweetAlert2 | confirmações e alerta de sucesso, importados sob demanda |
| Lazy loading | `next/dynamic` no formulário e nas perguntas frequentes, além de `import()` nos dados mockados e no SweetAlert2 |
| Lucide React + React Icons | ícones da interface (Lucide) e marcas (React Icons) |
| Next Image | ilustrações, avatares em `public/` e pré-visualização da foto |

## Rotas e URLs amigáveis

As páginas ficam em `src/app/sistema/paginas/curriculos`, mas o usuário só acessa as URLs amigáveis:

| URL pública | Página interna |
| --- | --- |
| `/curriculos/visualizar` | `/sistema/paginas/curriculos` |
| `/curriculos/visualizar/[id]` | `/sistema/paginas/curriculos/[id]` |
| `/curriculos/cadastrar` | `/sistema/paginas/curriculos/novo` |

- Os **rewrites** (`next.config.ts`) servem a página interna sem mudar a URL do navegador.
- O **Proxy** (`src/proxy.ts`, antigo middleware) intercepta acessos diretos a `/sistema/*` e responde com 404. Isso esconde a estrutura de pastas de quem tenta explorá-la.
- `/curriculos` redireciona para `/curriculos/visualizar`, e `/curriculos/visualizar/novo` não é tratado como id.

## Como executar

Pré-requisitos: Node.js 20.9 ou superior e npm.

```bash
npm install
npm run dev
```

Acesse <http://localhost:3000>. Outros scripts:

```bash
npm run build      # build de produção
npm run start      # servidor de produção (após o build)
npm run lint       # ESLint
npm run typecheck  # TypeScript sem emitir arquivos
```

Na primeira visita, a lista é preenchida com 5 currículos fictícios de `src/data/curriculos-mock.ts`. Os dados ficam na chave `cv-builder:curriculos:v1` do `localStorage`. Para voltar ao estado inicial, exclua todos os currículos e use **Restaurar exemplos**.

## Estrutura

```text
src/
├── app/
│   ├── layout.tsx                  # Header, Footer e Toaster globais
│   ├── page.tsx                    # landing page
│   ├── not-found.tsx
│   └── sistema/paginas/curriculos/
│       ├── page.tsx · loading.tsx  # lista
│       ├── [id]/page.tsx · loading.tsx
│       └── novo/page.tsx           # cadastro
├── components/
│   ├── layout/                     # Header, Nav (estado ativo), menu mobile, Footer
│   ├── landing/                    # seções da página inicial
│   ├── curriculos/                 # card, lista, busca, detalhes, skeletons, empty state
│   │   └── formulario/             # formulário, field arrays, máscara, upload simulado
│   └── ui/                         # componentes do shadcn/ui
├── data/curriculos-mock.ts         # dados fictícios
├── hooks/use-debounce.ts
├── lib/                            # armazenamento, alertas, rotas, formatadores
├── schemas/curriculo-schema.ts     # validações Yup
├── types/curriculo.ts
└── proxy.ts                        # bloqueio de /sistema/*
public/
├── avatars/                        # fotos dos exemplos
└── ilustracoes/                    # hero e empty state
```

## Decisões técnicas

- **Persistência mockada**: `src/lib/curriculos-storage.ts` funciona como uma API falsa, com latência simulada para exibir os Skeletons. Os exemplos são carregados com `import()` só quando o `localStorage` ainda está vazio.
- **Upload simulado**: a imagem é validada (JPG, PNG ou WEBP de até 2 MB), reduzida para 320 px e salva como *data URL* junto do currículo. As fotos dos exemplos ficam em `public/avatars`.
- **Compatibilidade com React 19**: a versão `3.0.0-alpha.12` do `react-input-mask-next` chama `ReactDOM.findDOMNode`, que foi removido no React 19. O script `scripts/corrigir-react-input-mask.mjs` roda no `postinstall` e troca a chamada pelo próprio `ref` do input. A versão do pacote está fixada para que o trecho corrigido não mude.
- **Hidratação com rewrites**: o servidor renderiza pelo caminho interno e o navegador exibe a URL amigável. Por isso, o estado ativo do menu reconhece os dois caminhos. Em rotas dinâmicas, o componente fica dentro de `Suspense`, como exige o Cache Components.
- **Privacidade**: os CPFs e telefones dos exemplos são fictícios. Na página de detalhes, o CPF aparece parcialmente oculto.

## Deploy na Vercel

1. Importe este repositório em <https://vercel.com/new>.
2. Mantenha as configurações detectadas: framework Next.js, `npm install` e `npm run build`.
3. Não é preciso configurar variáveis de ambiente.

## Autoria

Desenvolvido por Luís Carvalho Torrens.
