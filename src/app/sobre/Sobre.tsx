export default function Sobre() {
  return (
    <main className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
          <div className="container">
            <h1> Minha página sobre</h1>
              <a href="index.html"> Início </a>
              <a className="ativo" href="sobre.html"> Sobre </a>
              <a href="contato.html"> Contato </a>
          </div>
        <div className="container">
          <section >
            <h2>Sobre mim</h2>  
            <p>Olá, eu sou um desenvolvedor full-stack com experiência em criar aplicações web modernas e funcionais.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
