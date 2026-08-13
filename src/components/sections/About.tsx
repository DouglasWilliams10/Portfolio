export default function About() {
  return (
    <section
      id="sobre"
      className="relative py-24"
    >
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-12">
          <span className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
            Sobre mim
          </span>

          <h2 className="mt-4 text-4xl font-bold text-white md:text-5xl">
            Transformo dados em{" "}
            <span className="text-cyan-400">
              decisões.
            </span>
          </h2>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">

          <div className="space-y-6 text-gray-400">
            <p>
              Sou Douglas Williams, desenvolvedor Full Stack
              apaixonado por tecnologia e desenvolvimento de
              sistemas.
            </p>

            <p>
              Tenho especial interesse em desenvolvimento web,
              bancos de dados e PostgreSQL, buscando constantemente
              evoluir minhas habilidades técnicas.
            </p>

            <p>
              Este portfólio representa minha jornada na área de
              tecnologia e também meu processo contínuo de
              aprendizado.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
              <strong className="text-3xl text-cyan-400">
                +3
              </strong>

              <p className="mt-2 text-sm text-gray-400">
                anos estudando
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
              <strong className="text-3xl text-cyan-400">
                +10
              </strong>

              <p className="mt-2 text-sm text-gray-400">
                projetos
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
              <strong className="text-3xl text-cyan-400">
                100%
              </strong>

              <p className="mt-2 text-sm text-gray-400">
                aprendizado contínuo
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
              <strong className="text-3xl text-cyan-400">
                ∞
              </strong>

              <p className="mt-2 text-sm text-gray-400">
                evolução
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}