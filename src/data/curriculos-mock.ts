import type { Curriculo } from "@/types/curriculo";

// Dados fictícios usados como carga inicial. Os CPFs foram gerados apenas para
// passar na validação dos dígitos verificadores e não pertencem às pessoas descritas.
export const curriculosMock: Curriculo[] = [
  {
    id: "ana-ribeiro",
    nome: "Ana Clara Ribeiro",
    cargo: "Desenvolvedora Front-end",
    email: "ana.ribeiro@exemplo.com",
    telefone: "(47) 99812-3344",
    cpf: "529.982.247-25",
    dataNascimento: "14/03/1998",
    cidade: "Blumenau - SC",
    linkedin: "https://www.linkedin.com/in/exemplo-ana-ribeiro",
    foto: "/avatars/ana-ribeiro.webp",
    resumo:
      "Desenvolvedora front-end com 4 anos de experiência em React e Next.js. Gosto de transformar protótipos em interfaces acessíveis, rápidas e fáceis de manter, sempre com testes e atenção à experiência do usuário.",
    habilidades: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Acessibilidade", "Jest"],
    experiencias: [
      {
        empresa: "Vale Digital Tecnologia",
        cargo: "Desenvolvedora Front-end Pleno",
        inicio: "02/2024",
        atual: true,
        descricao:
          "Construção do design system interno com React e Storybook, migração de páginas para Next.js App Router e redução de 35% no tempo de carregamento.",
      },
      {
        empresa: "Agência Pixel Norte",
        cargo: "Desenvolvedora Front-end Júnior",
        inicio: "03/2021",
        fim: "01/2024",
        atual: false,
        descricao:
          "Desenvolvimento de landing pages responsivas, integração com APIs REST e implantação de testes unitários em componentes críticos.",
      },
    ],
    formacoes: [
      {
        instituicao: "SENAI/SC",
        curso: "Análise e Desenvolvimento de Sistemas",
        nivel: "Tecnólogo",
        inicio: "02/2019",
        conclusao: "12/2021",
      },
    ],
    criadoEm: "2026-09-02T13:20:00.000Z",
  },
  {
    id: "bruno-carvalho",
    nome: "Bruno Henrique Carvalho",
    cargo: "Engenheiro de Software Back-end",
    email: "bruno.carvalho@exemplo.com",
    telefone: "(48) 99654-1020",
    cpf: "153.509.460-56",
    dataNascimento: "22/07/1993",
    cidade: "Florianópolis - SC",
    linkedin: "https://www.linkedin.com/in/exemplo-bruno-carvalho",
    foto: "/avatars/bruno-carvalho.webp",
    resumo:
      "Engenheiro de software focado em APIs escaláveis com Java, Spring Boot e Node.js. Experiência com mensageria, observabilidade e arquitetura de microsserviços em ambientes de alta disponibilidade.",
    habilidades: ["Java", "Spring Boot", "Node.js", "PostgreSQL", "Kafka", "Docker"],
    experiencias: [
      {
        empresa: "Ilha Pagamentos",
        cargo: "Engenheiro de Software Sênior",
        inicio: "06/2022",
        atual: true,
        descricao:
          "Liderança técnica do time de conciliação financeira, desenho de serviços orientados a eventos com Kafka e definição de padrões de observabilidade.",
      },
      {
        empresa: "Conecta Logística",
        cargo: "Desenvolvedor Back-end",
        inicio: "01/2018",
        fim: "05/2022",
        atual: false,
        descricao:
          "Criação de APIs de rastreamento de entregas em Spring Boot e migração de rotinas batch para filas, reduzindo falhas noturnas.",
      },
    ],
    formacoes: [
      {
        instituicao: "Universidade Federal de Santa Catarina",
        curso: "Ciência da Computação",
        nivel: "Bacharelado",
        inicio: "03/2012",
        conclusao: "12/2016",
      },
      {
        instituicao: "PUC-PR",
        curso: "Arquitetura de Software Distribuído",
        nivel: "Pós-graduação",
        inicio: "03/2019",
        conclusao: "08/2020",
      },
    ],
    criadoEm: "2026-09-10T18:45:00.000Z",
  },
  {
    id: "camila-souza",
    nome: "Camila Souza Martins",
    cargo: "Designer de Produto (UX/UI)",
    email: "camila.martins@exemplo.com",
    telefone: "(47) 99133-7788",
    cpf: "862.917.048-46",
    dataNascimento: "05/11/1996",
    cidade: "Joinville - SC",
    foto: "/avatars/camila-souza.webp",
    resumo:
      "Designer de produto com foco em pesquisa com usuários e prototipação. Conduzo entrevistas, testes de usabilidade e transformo descobertas em fluxos simples, documentados no Figma junto ao time de desenvolvimento.",
    habilidades: ["Figma", "Pesquisa com usuários", "Prototipação", "Design System", "Acessibilidade"],
    experiencias: [
      {
        empresa: "Mercado Fácil",
        cargo: "Product Designer",
        inicio: "04/2023",
        atual: true,
        descricao:
          "Redesenho do checkout mobile com testes A/B, aumento de 12% na conversão e criação da biblioteca de componentes no Figma.",
      },
    ],
    formacoes: [
      {
        instituicao: "UDESC",
        curso: "Design",
        nivel: "Bacharelado",
        inicio: "02/2015",
        conclusao: "12/2019",
      },
    ],
    criadoEm: "2026-09-18T11:05:00.000Z",
  },
  {
    id: "diego-alves",
    nome: "Diego Alves Pereira",
    cargo: "Analista de Dados",
    email: "diego.pereira@exemplo.com",
    telefone: "(47) 98877-6655",
    cpf: "374.615.290-99",
    dataNascimento: "30/01/2000",
    cidade: "Jaraguá do Sul - SC",
    foto: "/avatars/diego-alves.webp",
    resumo:
      "Analista de dados que conecta negócio e tecnologia. Construo pipelines em Python e SQL, dashboards no Power BI e análises que apoiam decisões comerciais e de operação.",
    habilidades: ["Python", "SQL", "Power BI", "Pandas", "Estatística"],
    experiencias: [
      {
        empresa: "Têxtil Vale do Itapocu",
        cargo: "Analista de Dados Júnior",
        inicio: "08/2023",
        atual: true,
        descricao:
          "Automação de relatórios de produção com Python, modelagem de dados no Power BI e acompanhamento de indicadores de perdas.",
      },
      {
        empresa: "Têxtil Vale do Itapocu",
        cargo: "Estagiário de BI",
        inicio: "02/2022",
        fim: "07/2023",
        atual: false,
        descricao:
          "Apoio na limpeza de bases de vendas, criação de consultas SQL e documentação do dicionário de dados da área comercial.",
      },
    ],
    formacoes: [
      {
        instituicao: "SENAI/SC",
        curso: "Análise e Desenvolvimento de Sistemas",
        nivel: "Tecnólogo",
        inicio: "02/2021",
        conclusao: "12/2023",
      },
    ],
    criadoEm: "2026-10-01T09:30:00.000Z",
  },
  {
    id: "elisa-moreira",
    nome: "Elisa Moreira Santos",
    cargo: "Engenheira DevOps",
    email: "elisa.santos@exemplo.com",
    telefone: "(47) 99210-4433",
    cpf: "418.203.795-23",
    dataNascimento: "18/09/1991",
    cidade: "Itajaí - SC",
    linkedin: "https://www.linkedin.com/in/exemplo-elisa-santos",
    foto: "/avatars/elisa-moreira.webp",
    resumo:
      "Engenheira DevOps com experiência em nuvem AWS, infraestrutura como código e pipelines de CI/CD. Trabalho para que times publiquem com segurança, rapidez e visibilidade sobre o que está em produção.",
    habilidades: ["AWS", "Terraform", "Kubernetes", "GitHub Actions", "Linux", "Observabilidade"],
    experiencias: [
      {
        empresa: "Porto Conecta",
        cargo: "Engenheira DevOps",
        inicio: "09/2021",
        atual: true,
        descricao:
          "Padronização de pipelines no GitHub Actions, migração de serviços para Kubernetes e implantação de alertas com Prometheus e Grafana.",
      },
      {
        empresa: "Data Center Litoral",
        cargo: "Analista de Infraestrutura",
        inicio: "03/2016",
        fim: "08/2021",
        atual: false,
        descricao:
          "Administração de servidores Linux, automação de rotinas com Ansible e plano de recuperação de desastres para clientes corporativos.",
      },
    ],
    formacoes: [
      {
        instituicao: "UNIVALI",
        curso: "Sistemas de Informação",
        nivel: "Bacharelado",
        inicio: "02/2010",
        conclusao: "12/2014",
      },
    ],
    criadoEm: "2026-10-12T16:10:00.000Z",
  },
];
