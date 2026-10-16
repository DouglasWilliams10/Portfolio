import type { QuizQuestion } from "@/src/domain/study/entities/Study";

export type QuizAnswers = Readonly<Record<string, number | undefined>>;
export type QuizResult =
  | { complete: false; missingIds: string[] }
  | { complete: true; correct: number; total: number; grade: number };

export function gradeQuiz(questions: readonly QuizQuestion[], answers: QuizAnswers): QuizResult {
  if (questions.length === 0) throw new Error("O questionário precisa ter questões.");
  const ids = new Set<string>();
  for (const question of questions) {
    if (ids.has(question.id) || question.options.length < 2 ||
      !Number.isInteger(question.correctOption) || question.correctOption < 0 ||
      question.correctOption >= question.options.length) {
      throw new Error("Configuração inválida do questionário.");
    }
    ids.add(question.id);
  }
  const missingIds = questions.filter((question) => {
    const selected = answers[question.id];
    return selected === undefined || !Number.isInteger(selected) ||
      selected < 0 || selected >= question.options.length;
  }).map((question) => question.id);
  if (missingIds.length > 0) return { complete: false, missingIds };
  const correct = questions.filter((question) => answers[question.id] === question.correctOption).length;
  return { complete: true, correct, total: questions.length,
    grade: Math.round((correct / questions.length) * 1000) / 100 };
}
