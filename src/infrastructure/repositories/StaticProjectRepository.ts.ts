import { Project } from "@/src/domain/project/entities/Project";
import { ProjectRepository } from "@/src/domain/project/repositories/ProjectsRepository";
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