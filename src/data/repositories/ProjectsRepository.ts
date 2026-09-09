import { Project } from "../../domain/projeto/entities/Project";
import { ProjectRepository } from "../../domain/projeto/repositories/ProjectsRepository";
import { projects } from "../projects";

export class ProjectsRepository implements ProjectRepository {
  // Lista os projetos disponíveis
  list(): Project[] {
    return projects.map(
      (project) =>
        new Project({
          title: project.title,
          description: project.description,
          technologies: project.technologies,
          categories: project.categories,
          githubUrl: project.githubUrl,
          demoUrl: project.demoUrl
        })
    );
  }

  // Busca um projeto pelo título
  findByTitle(title: string): Project | undefined {
    return this.list().find((project) => project.title === title);
  }

  // Lista os projetos por categoria
  listByCategory(category: string): Project[] {
    return this.list().filter(
      (project) => project.categories.includes(category)
    );
  }
}