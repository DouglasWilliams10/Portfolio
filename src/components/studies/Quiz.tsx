"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import type { QuizQuestion } from "@/src/domain/study/entities/Study";
import { gradeQuiz, type QuizAnswers } from "@/src/application/study/gradeQuiz";

type CompleteResult = { complete: true; correct: number; total: number; grade: number };
export default function Quiz({ questions, slug }: { questions: QuizQuestion[]; slug: string }) {
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [result, setResult] = useState<CompleteResult | null>(null);
  const [missing, setMissing] = useState<string[]>([]);
  const resultHeading = useRef<HTMLHeadingElement>(null);
  const answered = questions.filter((question) => answers[question.id] !== undefined).length;
  function finish(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const evaluation = gradeQuiz(questions, answers);
    if (!evaluation.complete) {
      setMissing(evaluation.missingIds);
      document.getElementById(`question-${evaluation.missingIds[0]}`)?.focus();
      return;
    }
    setMissing([]); setResult(evaluation);
    window.requestAnimationFrame(() => resultHeading.current?.focus());
  }
  function restart() {
    setAnswers({}); setResult(null); setMissing([]);
    window.requestAnimationFrame(() => document.getElementById(`question-${questions[0]?.id}`)?.focus());
  }
  return (
    <div className="study-quiz">
      <div className="study-quiz-info"><span>{questions.length} questões</span><span>Nota de 0 a 10</span><span>Correção comentada</span></div>
      <p className="study-muted">Autoavaliação didática, corrigida neste navegador. O gabarito faz parte do código enviado ao cliente: não é uma prova protegida, certificação ou avaliação oficial.</p>
      <p role="status" className="study-count">{answered} de {questions.length} questões respondidas.</p>
      {result && <section className="study-result" aria-labelledby="quiz-result-title">
        <div><p className="study-eyebrow">RESULTADO DA AUTOAVALIAÇÃO</p><h2 id="quiz-result-title" ref={resultHeading} tabIndex={-1}>
          Sua nota: <strong>{result.grade.toLocaleString("pt-BR", { maximumFractionDigits: 2 })}</strong> / 10</h2>
          <p>{result.correct} acertos em {result.total} questões. Confira abaixo os comentários e os links para revisão.</p></div>
        <button type="button" className="study-button study-button-secondary" onClick={restart}>Refazer questionário</button>
      </section>}
      {missing.length > 0 && <p className="study-error" role="alert">Responda às {missing.length} questões pendentes antes de finalizar.</p>}
      <form onSubmit={finish}>
        {questions.map((question, questionIndex) => {
          const selected = answers[question.id];
          const isCorrect = selected === question.correctOption;
          return <fieldset key={question.id} id={`question-${question.id}`} tabIndex={-1}
            className={`study-question ${missing.includes(question.id) ? "study-question-missing" : ""}`} disabled={result !== null}>
            <legend><span>QUESTÃO {String(questionIndex + 1).padStart(2, "0")}</span>{question.statement}</legend>
            <div className="study-options">{question.options.map((option, optionIndex) =>
              <label key={optionIndex} className={`study-option ${result && optionIndex === question.correctOption ? "study-option-correct" : ""} ${result && selected === optionIndex && !isCorrect ? "study-option-wrong" : ""}`}>
                <input type="radio" name={question.id} value={optionIndex} checked={selected === optionIndex}
                  onChange={() => {setAnswers((previous) => ({ ...previous, [question.id]: optionIndex })); setMissing((previous) => previous.filter((id) => id !== question.id));}} />
                <span className="study-option-letter">{String.fromCharCode(65 + optionIndex)}</span><span>{option}</span>
              </label>)}</div>
            {result && <div className={`study-answer ${isCorrect ? "study-answer-correct" : "study-answer-wrong"}`}>
              <strong>{isCorrect ? "Resposta correta." : "Resposta incorreta."}</strong>
              <p>Gabarito: {String.fromCharCode(65 + question.correctOption)} — {question.options[question.correctOption]}</p>
              <p>{question.explanation}</p>
              <Link href={`/estudos/${slug}#${question.sectionId}`}>Revisar o módulo correspondente →</Link>
              <small>Base: slides {question.sourceSlides.join(", ")} da apresentação.</small>
            </div>}
          </fieldset>;
        })}
        {!result && <button type="submit" className="study-button">Finalizar e ver minha nota →</button>}
      </form>
    </div>
  );
}
