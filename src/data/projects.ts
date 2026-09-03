import { Project } from "@/src/domain/projeto/entities/Project";

export const projects = [
  new Project({
    title: "Sistema de Gestão",
    description:
      "Sistema desenvolvido para gerenciamento de clientes, produtos e pedidos.",
    technologies: [
      "C#",
      "Windows Forms",
      "MySQL",
    ],
    category: "Desktop",
  }),

  new Project({
    title: "Portfolio Next.js",
    description:
      "Portfólio profissional desenvolvido com Next.js, TypeScript e Tailwind CSS.",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind",
    ],
    category: "Web",
  }),

  new Project({
    title: "Consultas PostgreSQL",
    description:
      "Projeto focado em consultas SQL, relatórios, joins, filtros e manipulação de dados.",
    technologies: [
      "PostgreSQL",
      "SQL",
      "DBeaver",
    ],
    category: "Database",
  }),
];