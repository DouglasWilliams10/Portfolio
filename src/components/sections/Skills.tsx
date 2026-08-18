import { skills } from "@/src/data/skills";

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative py-24"
    >
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-12">
          <span className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
            Skills
          </span>

          <h2 className="mt-4 text-4xl font-bold text-white md:text-5xl">
            Tecnologias que fazem parte da minha{" "}
            <span className="text-cyan-400">
              jornada.
            </span>
          </h2>

          <p className="mt-4 max-w-2xl text-gray-400">
            Tecnologias que utilizo, estudo e pretendo
            aprofundar ao longo da minha carreira.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">

          {skills.map((skill) => (
            <article
              key={skill.name}
              className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400/40 hover:bg-cyan-400/[0.04]"
            >
              <div className="flex items-center justify-between">

                <span className="text-xs uppercase tracking-wider text-cyan-400">
                  {skill.category}
                </span>

                <span className="text-xs text-gray-600">
                  0{skills.indexOf(skill) + 1}
                </span>

              </div>

              <h3 className="mt-6 text-lg font-semibold text-white transition-colors group-hover:text-cyan-400">
                {skill.name}
              </h3>

              <p className="mt-2 text-xs text-gray-500">
                {skill.level}
              </p>

            </article>
          ))}

        </div>

      </div>
    </section>
  );
}