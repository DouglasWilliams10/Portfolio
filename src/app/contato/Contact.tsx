import Link from "next/link";

export default function Contact() {
    return (
        <main className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <h1>Minha página de contato</h1>
            <Link href="/">
                Início
            </Link>
            <Link href="#projetos">
                Projetos
            </Link>
            <Link className="ativo" href="contato.html">
                Contato
            </Link>
        </main>
    )
}