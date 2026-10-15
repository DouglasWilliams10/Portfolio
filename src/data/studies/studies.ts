import type {
  Study,
  StudyItem,
} from "@/src/domain/study/entities/Study";

import { csharpDddCrudStudy } from "./csharp-ddd-crud";

// Cadastre aqui cada novo estudo.
export const studyLibrary: Study[] = [
  csharpDddCrudStudy,
];

export const studies: StudyItem[] = studyLibrary
  .filter((study) => study.published)
  .map(
    ({
      slug,
      title,
      description,
      category,
      level,
      estimatedMinutes,
      topics,
      sourceTitle,
      sourceSlides,
      materialUrl,
      published,
    }) => ({
      slug,
      title,
      description,
      category,
      level,
      estimatedMinutes,
      topics,
      sourceTitle,
      sourceSlides,
      materialUrl,
      published,
    }),
  );

export function getStudy(slug: string): Study | undefined {
  return studyLibrary.find(
    (study) => study.published && study.slug === slug,
  );
}