import { Project } from "@/src/domain/project/entities/Project";
import { ProjectRepository } from "@/src/domain/project/repositories/ProjectsRepository";

export class GetProjectsUseCase {
    constructor(
        private readonly projectRepository: ProjectRepository
    ) { }

    execute(): Project[] {
        return this.projectRepository.list();
    }
}