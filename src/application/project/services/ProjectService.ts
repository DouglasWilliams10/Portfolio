import { StaticProjectRepository } from "@/src/infrastructure/repositories/StaticProjectRepository.ts";
import { GetProjectsUseCase } from "../use-cases/GetProjectsUseCase";


const projectsRepository = new StaticProjectRepository();

const getProjectsUseCase = new GetProjectsUseCase(projectsRepository);

export const ProgectsService = {
    getProjects() {
        return getProjectsUseCase.execute();
    }
};