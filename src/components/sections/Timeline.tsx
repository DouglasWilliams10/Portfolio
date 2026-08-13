import ScrollReveal from "../ui/ScrollReveal";

const timeline = [
    {
        year: "2024",
        title: "Início da jornada",
        description:
            "Início dos estudos e aprofundamento na área de tecnologia.",
    },

    {
        year: "2025",
        title: "Desenvolvimento",
        description:
            "Evolução nos estudos de programação, bancos de dados e desenvolvimento de sistemas.",
    },

    {
        year: "2026",
        title: "Full Stack",
        description:
            "Aprofundamento em desenvolvimento web, PostgreSQL, Next.js e tecnologias modernas.",
    },

    {
        year: "Próximo",
        title: "Evolução contínua",
        description:
            "Construção de novos projetos e aprofundamento profissional na área de tecnologia.",
    },
];

export default function Timeline() {
    return (
        <section
            id="timeline"
            className="relative py-24"
        >
            <div className="mx-auto max-w-5xl px-6">

                <div className="mb-16 text-center">
                    <span className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
                        Timeline
                    </span>

                    <h2 className="mt-4 text-4xl font-bold text-white md:text-5xl">
                        Minha{" "}
                        <span className="text-cyan-400">
                            evolução.
                        </span>
                    </h2>
                </div>

                <div className="relative">

                    {/* Linha central */}
                    <div className="absolute left-4 top-0 h-full w-px bg-cyan-400/20 md:left-1/2" />

                    <div className="space-y-12">

                        {timeline.map((item, index) => (
                            <ScrollReveal
                                key={item.year}
                                delay={index * 0.15}
                            >
                                <div
                                    key={item.year}
                                    className={`relative flex ${index % 2 === 0
                                        ? "md:justify-start"
                                        : "md:justify-end"
                                        }`}
                                >

                                    {/* Ponto */}
                                    <div className="absolute left-[9px] top-6 z-10 h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)] md:left-1/2 md:-translate-x-1/2" />

                                    <div className="ml-12 w-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all duration-300 hover:border-cyan-400/40 md:ml-0 md:w-[45%]">

                                        <span className="text-sm font-semibold text-cyan-400">
                                            {item.year}
                                        </span>

                                        <h3 className="mt-2 text-xl font-semibold text-white">
                                            {item.title}
                                        </h3>

                                        <p className="mt-3 text-sm leading-6 text-gray-400">
                                            {item.description}
                                        </p>

                                    </div>

                                </div>
                            </ScrollReveal>
                        ))}

                    </div>

                </div>

            </div>
        </section>
    );
}