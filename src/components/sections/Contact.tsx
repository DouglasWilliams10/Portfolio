import {
  Mail,
  ArrowUpRight,
} from "lucide-react";

import {
  FaGithub,
  FaLinkedinIn,
} from "react-icons/fa";

import Link from "next/link";

export default function Contact() {
  return (
    <section
      id="contato"
      className="relative py-32"
    >
      <div className="mx-auto max-w-5xl px-6">

        <div className="relative overflow-hidden rounded-3xl border border-cyan-400/20 bg-white/[0.03] p-8 backdrop-blur-xl md:p-12">

          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan-400/10 blur-[100px]" />

          <div className="relative">

            <span className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
              Contato
            </span>

            <h2 className="mt-5 max-w-3xl text-4xl font-bold text-white md:text-6xl">
              Vamos construir algo
              <span className="text-cyan-400">
                {" "}incrível?
              </span>
            </h2>

            <p className="mt-6 max-w-2xl leading-8 text-gray-400">
              Estou sempre aberto a novos projetos,
              oportunidades e conversas sobre tecnologia.
            </p>

            <div className="mt-10 grid gap-4 md:grid-cols-3">

              <Link
                href="mailto:douglaswilliamssp@gmail.com"
                className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition-all hover:-translate-y-1 hover:border-cyan-400/40"
              >
                <Mail
                  size={22}
                  className="text-cyan-400"
                />

                <p className="mt-4 text-sm text-gray-400">
                  Email
                </p>

                <p className="mt-1 text-sm text-white">
                  Entre em contato
                </p>
              </Link>

              <Link
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition-all hover:-translate-y-1 hover:border-cyan-400/40"
              >
                <FaGithub
                  size={22}
                  className="text-cyan-400"
                />

                <p className="mt-4 text-sm text-gray-400">
                  GitHub
                </p>

                <p className="mt-1 text-sm text-white">
                  Ver projetos
                </p>
              </Link>

              <Link
                href="https://www.linkedin.com/in/douglaswilliamssp"
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition-all hover:-translate-y-1 hover:border-cyan-400/40"
              >
                <FaLinkedinIn
                  size={22}
                  className="text-cyan-400"
                />

                <p className="mt-4 text-sm text-gray-400">
                  LinkedIn
                </p>

                <p className="mt-1 text-sm text-white">
                  Meu perfil
                </p>
              </Link>

            </div>

            <Link
              href="mailto:douglaswilliamssp@gmail.com"
              className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 transition hover:text-cyan-300"
            >
              Enviar mensagem

              <ArrowUpRight size={16} />
            </Link>

          </div>

        </div>

      </div>
    </section>
  );
}