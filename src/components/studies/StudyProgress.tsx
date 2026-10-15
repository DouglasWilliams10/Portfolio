"use client";

import { useStudyProgress } from "./useStudyProgress";

interface ProgressProps { slug: string; version: number; sectionIds: string[] }
export default function StudyProgress(props: ProgressProps) {
  const { completed, reset, temporary } = useStudyProgress(props.slug, props.version, props.sectionIds);
  const percent = props.sectionIds.length ? Math.round(completed.length / props.sectionIds.length * 100) : 0;
  return (
    <div className="study-progress">
      <div className="study-progress-heading"><span>Seu progresso</span><strong>{percent}%</strong></div>
      <progress value={completed.length} max={props.sectionIds.length || 1}
        aria-label="Módulos marcados como concluídos" />
      <p>{completed.length} de {props.sectionIds.length} módulos concluídos.</p>
      <small>{temporary ? "Armazenamento indisponível: progresso temporário nesta aba." :
        "Marque os módulos ao terminar. Progresso salvo só neste navegador, sem conta ou sincronização."}</small>
      {completed.length > 0 && <button type="button" className="study-text-button"
        onClick={() => { if (window.confirm("Zerar apenas o progresso deste estudo neste navegador?")) reset(); }}>
        Zerar progresso
      </button>}
    </div>
  );
}

export function StudyCompleteButton(props: ProgressProps & { sectionId: string }) {
  const { completed, toggle, temporary } = useStudyProgress(props.slug, props.version, props.sectionIds);
  const done = completed.includes(props.sectionId);
  return (
    <div>
      <button type="button" className={`study-button ${done ? "study-button-done" : "study-button-secondary"}`}
        aria-pressed={done} onClick={() => toggle(props.sectionId)}>
        {done ? "✓ Módulo concluído" : "Marcar módulo como concluído"}
      </button>
      {temporary && <small className="study-muted"> Progresso temporário nesta aba.</small>}
    </div>
  );
}
