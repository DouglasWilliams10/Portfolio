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
    categories: ["Desktop"],
  }),

  new Project({
    title: "Portfolio",
    description:
      "Portfólio profissional desenvolvido com Next.js, TypeScript e Tailwind CSS.",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Vercel"
    ],
    categories: [
      "Web",
      "Database"
    ],
    githubUrl: "https://github.com/DouglasWilliams10/Portfolio",
    demoUrl: "https://portfolio-six-ebon-40.vercel.app/"
  }),

  new Project({
    title: "F4 Bank - Landingpage",
    description:
      "Projeto inicial, focado em apredenzado de front-end para conhecimento das estruturas basicas de uma web page",
    technologies: [
      "JavaScript",
      "HTML",
      "CSS",
    ],
    categories: ["Web"],
    githubUrl: "https://github.com/DouglasWilliams10/e-commerce-gamer-backend",
    demoUrl: "https://landingpage-f4bank.surge.sh/"
  }),

  new Project({
    title: "MoveFit Academia",
    description: 
      "O MoveFit é um projeto web desenvolvido para representar a presença digital de uma academia, com foco em uma experiência moderna, objetiva e responsiva.",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Vercel"
    ],
    categories: ["Web"],
    githubUrl: "https://github.com/DouglasWilliams10/movefit-academia",
    demoUrl: "https://movefit-academia.vercel.app/?utm_source=chatgpt.com"
  })
];