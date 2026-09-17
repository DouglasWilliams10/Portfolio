import { Project } from "@/src/domain/projeto/entities/Project";
import { ProjectRepository } from "@/src/domain/projeto/repositories/ProjectsRepository";

export class GetProjectsUseCase {
    constructor(
        private readonly projectRepository: ProjectRepository
    ) {}

    execute(): Project[] {
        return this.projectRepository.list();
    }
}