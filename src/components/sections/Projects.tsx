"use client";
import { useState } from "react";
import { ProjectsRepository } from "@/src/data/repositories/ProjectsRepository";
import ScrollReveal from "../ui/ScrollReveal";


export default function Projects() {
    const repository = new ProjectsRepository();
    const projects = repository.list();

    const [activeCategory, setActiveCategory] = useState("All");

    const categories = [
        "All",
        "Web",
        "Desktop",
        "Database",
    ];

    const filteredProjects = activeCategory === "All"
        ? projects
        : projects.filter((project) =>
            project.categories.includes(activeCategory)
        );

    return (
        <section
            id="projects"
            className="relative py-24"
        >
            <div className="mx-auto max-w-7xl px-6">

                <div className="mb-12">
                    <span className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
                        Projetos
                    </span>

                    <h2 className="mt-4 text-4xl font-bold text-white md:text-5xl">
                        Projetos que transformam{" "}
                        <span className="text-cyan-400">
                            ideias em soluções.
                        </span>
                    </h2>

                    <p className="mt-4 max-w-2xl text-gray-400">
                        Alguns dos projetos desenvolvidos durante minha
                        jornada de aprendizado e evolução profissional.
                    </p>
                </div>

                <div className="mb-10 flex flex-wrap gap-3">
                    {categories.map((category) => {
                        const isActive = activeCategory === category;

                        return (
                            <button
                                key={category}
                                type="button"
                                onClick={() => setActiveCategory(category)}
                                className={`rounded-xl border px-5 py-2.5 text-sm font-medium transition-all duration-300 ${isActive
                                    ? "border-cyan-400/50 bg-cyan-400/10 text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.12)]"
                                    : "border-white/10 bg-white/[0.03] text-gray-500 hover:border-cyan-400/30 hover:text-cyan-400"
                                    }`}
                            >
                                {category}
                            </button>
                        );
                    })}
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">


                    {filteredProjects.map((project, index) => (
                        <ScrollReveal
                            key={project.title}
                            delay={index * 0.2}
                        >
                            <article
                                className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400/40 hover:bg-white/10"
                            >
                                <div className="mb-6 flex items-center justify-between">
                                    <div className="flex flex-wrap gap-2">
                                        {project.categories.map((category) => (
                                            <span
                                                key={category}
                                                className="rounded-full border border-cyan-400/20 bg-cyan-400/5 px-3 py-1 text-xs text-cyan-400"
                                            >
                                                {category}
                                            </span>
                                        ))}
                                    </div>

                                    <span className="text-gray-600 transition-colors group-hover:text-cyan-400">
                                        ↗
                                    </span>
                                </div>

                                <h3 className="text-xl font-semibold text-white">
                                    {project.title}
                                </h3>

                                <p className="mt-3 text-sm leading-6 text-gray-400">
                                    {project.description}
                                </p>

                                <div className="mt-6 flex flex-wrap gap-2">
                                    {project.technologies.map((technology) => (
                                        <span
                                            key={technology}
                                            className="rounded-md bg-white/5 px-2 py-1 text-xs text-gray-400"
                                        >
                                            {technology}
                                        </span>
                                    ))}
                                </div>
                            </article>
                        </ScrollReveal>
                    ))}

                </div>

            </div>
        </section>
    );
}