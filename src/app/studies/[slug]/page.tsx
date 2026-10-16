import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getStudy, studies } from "@/src/data/studies/studies";
import StudySidebar from "@/src/components/studies/StudySidebar";
import StudyContent from "@/src/components/studies/StudyContent";

type StudyPageProps = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return studies.map((study) => ({ slug: study.slug })); }
export async function generateMetadata({ params }: StudyPageProps): Promise<Metadata> {
  const study = getStudy((await params).slug);
  return study ? { title: `${study.title} | Estudos`, description: study.description } : { title: "Estudo não encontrado" };
}
export default async function StudyPage({ params }: StudyPageProps) {
  const study = getStudy((await params).slug);
  if (!study) notFound();
  return (
    <main className="study-container">
      <nav className="study-breadcrumb" aria-label="Caminho da página"><Link href="/">Portfólio</Link><span aria-hidden="true">/</span><Link href="/studies">Estudos</Link><span aria-hidden="true">/</span><span aria-current="page">{study.title}</span></nav>
      <header className="study-page-header"><p className="study-eyebrow">{study.category.toUpperCase()} / {study.level.toUpperCase()}</p>
        <h1>{study.title}</h1><p>{study.description}</p>
        <div className="study-page-meta"><span>{study.sections.length} módulos</span><span>{study.questions.length} questões</span><span>Base: {study.sourceSlides} slides + notas</span></div>
        <div className="study-header-actions"><a href={`#${study.sections[0].id}`} className="study-button">Começar a leitura ↓</a>
          <Link href={`/studies/${study.slug}/questionnaire`} className="study-button study-button-secondary">Fazer questionário →</Link></div>
      </header>
      <div className="study-reading-grid"><StudySidebar slug={study.slug} version={study.version} sections={study.sections.map(({ id, title }) => ({ id, title }))} />
        <StudyContent study={study} /></div>
    </main>
  );
}