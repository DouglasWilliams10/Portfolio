import Link from "next/link";
import { ArrowUpRight, BookOpen, Clock3 } from "lucide-react";
import type { StudyItem } from "@/src/domain/study/entities/Study";

export default function StudyCard({ study }: { study: StudyItem }) {
  return (
    <article className="study-card">
      <div className="study-card-top"><span className="study-pill">{study.category}</span><BookOpen size={24} aria-hidden="true" /></div>
      <p className="study-eyebrow">LEITURA + PRÁTICA</p>
      <h2>{study.title}</h2>
      <p className="study-muted">{study.description}</p>
      <div className="study-tags">{study.topics.map((topic) => <span key={topic}>{topic}</span>)}</div>
      <div className="study-card-meta"><span>{study.level}</span><span><Clock3 size={14} aria-hidden="true" /> ~{study.estimatedMinutes} min*</span></div>
      <Link href={`/estudos/${study.slug}`} className="study-button">
        Começar a estudar <ArrowUpRight size={18} aria-hidden="true" />
      </Link>
      <small className="study-muted">*Estimativa editorial; o ritmo de leitura pode variar.</small>
    </article>
  );
}
