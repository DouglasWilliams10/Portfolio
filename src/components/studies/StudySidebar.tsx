"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import StudyProgress from "./StudyProgress";

interface SidebarProps { slug: string; version: number; sections: { id: string; title: string }[] }
export default function StudySidebar({ slug, version, sections }: SidebarProps) {
  const [active, setActive] = useState("contexto");
  const ids = useMemo(() => sections.map((section) => section.id), [sections]);
  useEffect(() => {
    const headings = ["contexto", ...ids].map((id) => document.getElementById(id)).filter((item): item is HTMLElement => item !== null);
    let frame = 0;
    function update() {
      frame = 0;
      let current = headings[0]?.id ?? "contexto";
      for (const element of headings) {
        if (element.getBoundingClientRect().top <= 160) current = element.id;
      }
      setActive(current);
    }
    function requestUpdate() { if (!frame) frame = window.requestAnimationFrame(update); }
    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => { window.removeEventListener("scroll", requestUpdate); window.removeEventListener("resize", requestUpdate); window.cancelAnimationFrame(frame); };
  }, [ids]);
  const navigation = (
    <nav aria-label="Sumário do estudo" className="study-toc-links">
      <a href="#contexto" aria-current={active === "contexto" ? "location" : undefined}>Antes de começar</a>
      {sections.map((section, index) => <a key={section.id} href={`#${section.id}`}
        aria-current={active === section.id ? "location" : undefined}>
        <span>{String(index + 1).padStart(2, "0")}</span>{section.title}
      </a>)}
      <a href="#referencias">Referências e material</a>
    </nav>
  );
  return (
    <aside className="study-toc">
      <div className="study-toc-desktop"><p className="study-eyebrow">NESTE ESTUDO</p>{navigation}</div>
      <details className="study-toc-mobile"><summary>Sumário do estudo</summary>{navigation}</details>
      <StudyProgress slug={slug} version={version} sectionIds={ids} />
      <Link className="study-button study-button-secondary study-toc-quiz" href={`/studies/${slug}/questionnaire`}>Ir para o questionário →</Link>
    </aside>
  );
}
