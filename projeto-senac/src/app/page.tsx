import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
          <div className="container">
            <h1> Minha página de contato</h1>
              <a href="index.html"> Início </a>
              <a href="sobre.html"> Sobre </a>
              <a className="ativo" href="contato.html"> Contato </a>
          </div>

        <div className="container">
          <section >
            <h2>Entre em contato</h2>

            <form id="form-contato" className="formulario">

              <div className="flex flex-col gap-4 md:flex-row">
                <div className="flex-1">
                  <label htmlFor="nome-contato"> Nome: </label>
                  <input type="text" id="nome-contato" name="nome" required />
                </div>

                <div className="flex-1">
                  <label htmlFor="email"> E-mail: </label>
                  <input type="email" id="email" name="email" required />
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-4 md:flex-row">
                <div className="flex-1">
                  <label htmlFor="assunto"> Assunto: </label>
                  <input type="text" id="assunto" name="assunto" required />
                </div>

                <div className="flex-1">
                  <label htmlFor="texto-mensagem"> Mensagem: </label>
                  <textarea id="texto-mensagem" name="mensagem" rows={6} required />
                </div>
              </div>

            </form>
          </section>

        </div>
      </div>
    </main> 
  );
}
