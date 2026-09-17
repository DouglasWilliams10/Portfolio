import { Project } from "@/src/domain/projeto/entities/Project";
import { ProjectRepository } from "@/src/domain/projeto/repositories/ProjectsRepository";
import { projects } from "@/src/data/projects";

export class StaticProjectRepository implements ProjectRepository {

    list(): Project[] {
        return projects;
    }

    findByTitle(title: string): Project | undefined {
        return projects.find(
            (project) => project.title === title
        );
    }

    listByCategory(category: string): Project[] {
        return projects.filter(
            (project) => project.categories.includes(category)
        );
    }
}