export default function Hero() {
  return (
    <section
      id="inicio"
      className="flex min-h-screen items-center justify-center"
    >
      <div className="mx-auto max-w-7xl px-6 text-center">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-cyan-400">
          Olá, eu sou
        </p>

        <h1 className="text-5xl font-bold text-white md:text-7xl">
          Douglas Williams
        </h1>

        <p className="mt-6 text-xl text-gray-400 md:text-2xl">
          Desenvolvedor Full Stack
        </p>

        <p className="mt-2 text-lg text-cyan-400">
          Futuro DBA
        </p>
      </div>
    </section>
  );
}