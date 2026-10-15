export interface CodeExample {
  title: string;
  code: string;
}

export interface StudyTable {
  headers: string[];
  rows: string[][];
}

export interface StudyLesson {
  id: string;
  title: string;
  paragraphs: string[];
  codeExamples: CodeExample[];
  sourceSlides: number[];
  callout?: string;
  table?: StudyTable;
}

export interface StudyExercise {
  statement: string;
  answer: string;
  sourceSlides: number[];
}

export interface StudySection {
  id: string;
  title: string;
  introduction: string;
  lessons: StudyLesson[];
  exercise: StudyExercise;
}

export interface QuizQuestion {
  id: string;
  statement: string;
  options: string[];
  correctOption: number;
  explanation: string;
  sectionId: string;
  sourceSlides: number[];
}

export interface StudyItem {
  slug: string;
  title: string;
  description: string;
  category: string;
  level: string;
  estimatedMinutes: number;
  topics: string[];
  sourceTitle: string;
  sourceSlides: number;
  materialUrl?: string;
  published: boolean;
}

export interface Study extends StudyItem {
  version: number;
  introduction: StudyLesson[];
  sections: StudySection[];
  questions: QuizQuestion[];
  references: { label: string; url: string }[];
}
