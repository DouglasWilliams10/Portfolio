export default function Header() {
  return (
    <header className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <div className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
            <div className="container">
                <h1> Minha página inicial</h1>
                <a className="ativo" href="index.html"> Início </a>
                <a href="sobre.html"> Sobre </a>
                <a href="contato.html"> Contato </a>
            </div>
            <div className="container">
                <section >
                    <h2>Bem-vindo ao meu portfólio</h2>
                    <p>Olá, eu sou um desenvolvedor full-stack com experiência em criar aplicações web modernas e funcionais.</p>   
                </section>
            </div>
        </div>
    </header>
    );
}    