const skills = [
  "SQL",
  "PostgreSQL",
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "Prisma",
  "Docker",
  "Git",
  "Tailwind",
];

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
            Tecnologias e ferramentas que utilizo ou estudo
            durante minha evolução como desenvolvedor.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">

          {skills.map((skill) => (
            <div
              key={skill}
              className="group rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400/40 hover:bg-white/10"
            >
              <h3 className="font-semibold text-white transition-colors group-hover:text-cyan-400">
                {skill}
              </h3>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}