import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getStudy, studies } from "@/src/data/studies/studies";
import Quiz from "@/src/components/studies/Quiz";
import StudyFeedbackForm from "@/src/components/studies/StudyFeedbackForm";

type QuizPageProps = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return studies.map((study) => ({ slug: study.slug })); }
export async function generateMetadata({ params }: QuizPageProps): Promise<Metadata> {
  const study = getStudy((await params).slug);
  return { title: study ? `Questionário — ${study.title} | Estudos` : "Questionário não encontrado" };
}
export default async function QuizPage({ params }: QuizPageProps) {
  const study = getStudy((await params).slug);
  if (!study) notFound();
  return (
    <main className="study-container study-quiz-container">
      <nav className="study-breadcrumb" aria-label="Caminho da página"><Link href="/studies">Estudos</Link><span aria-hidden="true">/</span><Link href={`/studies/${study.slug}`}>Voltar à aula</Link><span aria-hidden="true">/</span><span aria-current="page">Questionário</span></nav>
      <header className="study-page-header"><p className="study-eyebrow">PRATIQUE O QUE VOCÊ ESTUDOU</p><h1>Teste seus<br /><span>conhecimentos.</span></h1>
        <p>{study.title}. Responda a todas as questões para receber sua nota e conferir os comentários.</p>
      </header>
      <Quiz questions={study.questions} slug={study.slug} />
      <StudyFeedbackForm studyTitle={study.title} />
    </main>
  );
}