import type { Metadata } from "next";
import Link from "next/link";
import { studies } from "@/src/data/studies/studies";
import StudyCatalog from "@/src/components/studies/StudyCatalog";

export const metadata: Metadata = {
  title: "Estudos | Douglas Williams",
  description: "Biblioteca de estudos técnicos com aulas, exemplos e questionários para aprender dentro do portfólio.",
};
export default function StudiesPage() {
  return (
    <main className="study-container study-library">
      <nav className="study-breadcrumb" aria-label="Caminho da página"><Link href="/">Portfólio</Link><span aria-hidden="true">/</span><span aria-current="page">Estudos</span></nav>
      <header className="study-library-header"><p className="study-eyebrow">DOUGLAS WILLIAMS / BIBLIOTECA DE ESTUDOS</p>
        <h1>Aprenda, pratique<br /><span>e evolua.</span></h1>
        <p>Conteúdos técnicos organizados por assunto, com explicações, exemplos práticos e questionários para consolidar o aprendizado.</p>
        <div className="study-library-features"><span>01 · Leia os conceitos</span><span>02 · Explore os exemplos</span><span>03 · Teste o aprendizado</span></div>
      </header>
      <StudyCatalog studies={studies} />
      <footer className="study-library-footer"><p>Conhecimento compartilhado, um estudo de cada vez.</p><span>DW / ESTUDOS</span></footer>
    </main>
  );
}