import Link from "next/link";
import type { Study, StudyLesson } from "@/src/domain/study/entities/Study";
import CodeBlock from "./CodeBlock";
import { StudyCompleteButton } from "./StudyProgress";

function Lesson({ lesson }: { lesson: StudyLesson }) {
  return (
    <article id={lesson.id} className="study-lesson">
      <p className="study-source-label">Base: {lesson.sourceSlides.length === 1 ? "slide" : "slides"} {lesson.sourceSlides.join(", ")} e notas do material</p>
      <h3>{lesson.title}</h3>
      {lesson.paragraphs[0] && <p>{lesson.paragraphs[0]}</p>}
      {lesson.codeExamples.map((example, index) => <CodeBlock key={`${lesson.id}-${index}`} {...example} />)}
      {lesson.table && <div className="study-table-scroll" tabIndex={0} role="region" aria-label={`Tabela: ${lesson.title}`}>
        <table><caption className="study-sr-only">{lesson.title}</caption><thead><tr>{lesson.table.headers.map((head) => <th key={head} scope="col">{head}</th>)}</tr></thead>
          <tbody>{lesson.table.rows.map((row, index) => <tr key={index}>{row.map((cell, cellIndex) => cellIndex === 0 ? <th scope="row" key={cellIndex}>{cell}</th> : <td key={cellIndex}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>}
      {lesson.paragraphs.slice(1).map((paragraph, index) => <p key={index}>{paragraph}</p>)}
      {lesson.callout && <aside className="study-callout"><strong>Ponto de atenção</strong><p>{lesson.callout}</p></aside>}
    </article>
  );
}

export default function StudyContent({ study }: { study: Study }) {
  const ids = study.sections.map((section) => section.id);
  return (
    <div className="study-content">
      <section id="contexto" className="study-module" tabIndex={-1} aria-labelledby="contexto-title">
        <p className="study-eyebrow">CONTEXTO E CONVENÇÕES</p><h2 id="contexto-title">Antes de começar</h2>
        <p>Este estudo reorganiza os textos, exemplos e notas da apresentação em uma leitura na web. As referências a slides indicam a origem do conteúdo, não uma sequência de imagens para visualizar.</p>
        <aside className="study-callout"><strong>Escopo do material</strong><p>Os exemplos C# são didáticos. Os trechos, alternativas e pré-requisitos foram preservados; não constituem um projeto .NET compilado 
          nesta entrega. O PPTX menciona anexos anteriores, mas a fonte efetivamente utilizada aqui foi a apresentação enviada, incluindo suas notas.</p></aside>
        <details className="study-context-details"><summary>Ver contexto, convenções e responsabilidades dos arquivos</summary>
          {study.introduction.map((lesson) => <Lesson key={lesson.id} lesson={lesson} />)}
        </details>
      </section>
      {study.sections.map((section, index) => (
        <section key={section.id} id={section.id} className="study-module" tabIndex={-1} aria-labelledby={`${section.id}-title`}>
          <header className="study-module-header"><span className="study-module-number">{String(index + 1).padStart(2, "0")}</span>
            <div><p className="study-eyebrow">MÓDULO {index + 1} / {study.sections.length}</p><h2 id={`${section.id}-title`}>{section.title}</h2></div>
          </header>
          <p className="study-module-intro">{section.introduction}</p>
          <details className="study-topic-index"><summary>Tópicos deste módulo ({section.lessons.length})</summary>
            <ul>{section.lessons.map((lesson) => <li key={lesson.id}><a href={`#${lesson.id}`}>{lesson.title}</a></li>)}</ul>
          </details>
          {section.lessons.map((lesson) => <Lesson key={lesson.id} lesson={lesson} />)}
          <div className="study-exercise"><p className="study-eyebrow">PAUSA PARA PRATICAR</p><h3>Conecte os conceitos</h3>
            <p>{section.exercise.statement}</p><details><summary>Conferir resposta comentada</summary><p>{section.exercise.answer}</p>
              <small>Exercício elaborado a partir dos slides {section.exercise.sourceSlides.join(", ")}.</small></details>
          </div>
          <div className="study-module-actions"><StudyCompleteButton slug={study.slug} version={study.version} sectionIds={ids} sectionId={section.id} />
            <div className="study-prev-next">
              {index > 0 && <a href={`#${study.sections[index - 1].id}`}>← Módulo anterior</a>}
              {index < study.sections.length - 1 ? <a href={`#${study.sections[index + 1].id}`}>Próximo módulo →</a> :
                <Link href={`/studies/${study.slug}/questionnaire`}>Fazer questionário →</Link>}
            </div>
          </div>
        </section>
      ))}
      <section id="referencias" className="study-module study-references" aria-labelledby="references-title">
        <p className="study-eyebrow">ORIGEM E MATERIAL COMPLEMENTAR</p><h2 id="references-title">Referências do estudo</h2>
        <p>A base é <strong>{study.sourceTitle}</strong>, com {study.sourceSlides} slides e suas notas. Os seis módulos técnicos são seguidos pela síntese aplicada. Os exercícios e as dez questões foram elaborados para esta versão web com indicação dos slides de apoio.</p>
        <p>Os links abaixo foram preservados da apresentação. Não representam uma nova verificação externa de cada exemplo ou uma confirmação de compatibilidade dos pacotes.</p>
        {study.materialUrl && <a href={study.materialUrl} download className="study-button study-button-secondary">Baixar apresentação original (.pptx)</a>}
        <details><summary>Consultar referências externas citadas no material</summary><ul>{study.references.map((reference) =>
          <li key={reference.url}><a href={reference.url} target="_blank" rel="noopener noreferrer">{reference.label} ↗</a></li>)}</ul></details>
      </section>
      <section className="study-final-cta"><p className="study-eyebrow">AGORA É SUA VEZ</p><h2>Da leitura à prática.</h2>
        <p>Responda às dez questões e confira a explicação de cada resposta. A nota vai de 0 a 10.</p>
        <Link href={`/studies/${study.slug}/questionnaire`} className="study-button">Fazer questionário →</Link>
      </section>
    </div>
  );
}
