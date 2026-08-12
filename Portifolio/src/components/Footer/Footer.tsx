export default function Footer() {
  return (
    <footer className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <div className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
            <div className="container">
                <h1> Rodapé da página </h1>
            </div>
            <div className="container">
                <section >
                    <h2>Entre em contato</h2>
                    <p>Se você tiver alguma dúvida ou quiser discutir um projeto, sinta-se à vontade para entrar em contato comigo.</p>
                </section>
            </div>
        </div>
    </footer>
    );
}