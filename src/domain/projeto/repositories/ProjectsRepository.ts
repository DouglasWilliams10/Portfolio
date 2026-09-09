import { Project } from "../entities/Project";

export interface ProjectRepository {
    list(): Project[];

    findByTitle(title: string): Project | undefined;

    listByCategory(category: string): Project[];
}
    