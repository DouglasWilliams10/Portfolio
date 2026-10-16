import Link from "next/link";

export default function StudyNotFound() {
    return <main className="study-container study-empty"><p className="study-eyebrow">ESTUDOS / NÃO ENCONTRADO</p>
        <h1>Este estudo não está disponível.</h1><p>Volte à biblioteca para escolher um material publicado.</p>
        <Link href="/studies" className="study-button">Voltar para Estudos</Link></main>;
}