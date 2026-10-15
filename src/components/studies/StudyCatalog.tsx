"use client";

import { useState } from "react";
import type { StudyItem } from "@/src/domain/study/entities/Study";
import StudyCard from "./StudyCard";

function normalize(text: string) {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}
export default function StudyCatalog({ studies }: { studies: StudyItem[] }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todos");
  const categories = ["Todos", ...new Set(studies.map((study) => study.category))];
  const shown = studies.filter((study) =>
    (category === "Todos" || study.category === category) &&
    normalize([study.title, study.description, ...study.topics].join(" ")).includes(normalize(search.trim())));
  return (
    <section aria-label="Catálogo de estudos">
      <div className="study-catalog-controls">
        <div className="study-search"><label htmlFor="study-search">Buscar por assunto</label>
          <input id="study-search" type="search" value={search} onChange={(event) => setSearch(event.target.value)}
            placeholder="C#, validação, EF Core, interfaces..." autoComplete="off" />
        </div>
        <div className="study-filters" aria-label="Filtrar categoria">
          {categories.map((item) => <button type="button" key={item} aria-pressed={category === item}
            onClick={() => setCategory(item)}>{item}</button>)}
        </div>
      </div>
      <p className="study-count" role="status">{shown.length} {shown.length === 1 ? "estudo disponível" : "estudos disponíveis"}</p>
      <div className="study-grid">{shown.map((study) => <StudyCard key={study.slug} study={study} />)}</div>
      {shown.length === 0 && <div className="study-empty"><h2>Nenhum estudo encontrado.</h2><p>Experimente outro assunto ou remova os filtros.</p>
        <button type="button" className="study-button study-button-secondary" onClick={() => {setSearch("");setCategory("Todos");}}>Limpar filtros</button>
      </div>}
    </section>
  );
}
