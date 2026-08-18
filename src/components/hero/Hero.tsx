import Button from "../ui/Button";
import { ArrowDown, Database, Terminal } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      <div className="absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-cyan-400/10 blur-[120px]" />

      <div className="absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-blue-500/10 blur-[120px]" />

      <div className="mx-auto w-full max-w-7xl px-6 py-24 lg:px-12">
        <div className="grid items-center gap-16 lg:grid-cols-[1.2fr_0.8fr]">

          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />

              <span className="text-xs uppercase tracking-[0.25em] text-cyan-400">
                Disponível para novos desafios
              </span>
            </div>

            <p className="mb-4 text-sm uppercase tracking-[0.4em] text-gray-500">
              Olá, eu sou
            </p>

            <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-8xl">
              Douglas
              <span className="block text-cyan-400">
                Williams.
              </span>
            </h1>

            <div className="mt-8 flex items-center gap-3 text-xl text-gray-300">
              <Terminal size={22} className="text-cyan-400" />

              <span>
                Desenvolvedor Full Stack
              </span>
            </div>

            <div className="mt-3 flex items-center gap-3 text-lg text-gray-500">
              <Database size={20} className="text-cyan-400" />

              <span>
                Especialização em PostgreSQL
              </span>
            </div>

            <p className="mt-8 max-w-xl text-base leading-8 text-gray-400">
              Construo aplicações modernas, sistemas orientados
              a dados e soluções que transformam problemas
              complexos em experiências digitais.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="#projetos">
                Explorar projetos
              </Button>

              <Button href="#contato">
                Entrar em contato
              </Button>
            </div>
          </div>

          <div className="relative hidden lg:block">

            <div className="relative mx-auto h-[420px] w-[420px]">

              <div className="absolute inset-0 rounded-full border border-cyan-400/10" />

              <div className="absolute inset-8 rounded-full border border-cyan-400/10" />

              <div className="absolute inset-16 rounded-full border border-cyan-400/10" />

              <div className="absolute inset-24 flex items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-400/5 shadow-[0_0_100px_rgba(34,211,238,0.15)]">

                <div className="text-center">
                  <span className="block text-6xl font-black text-white">
                    DW
                  </span>

                  <span className="mt-2 block text-xs uppercase tracking-[0.4em] text-cyan-400">
                    Developer
                  </span>
                </div>

              </div>

              <div className="absolute right-8 top-20 rounded-xl border border-white/10 bg-black/60 px-4 py-3 backdrop-blur-xl">
                <span className="text-xs text-cyan-400">
                  PostgreSQL
                </span>
              </div>

              <div className="absolute bottom-20 left-0 rounded-xl border border-white/10 bg-black/60 px-4 py-3 backdrop-blur-xl">
                <span className="text-xs text-cyan-400">
                  Next.js
                </span>
              </div>

            </div>
          </div>

        </div>

        <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-gray-600 md:flex">
          <span className="text-[10px] uppercase tracking-[0.4em]">
            Scroll
          </span>

          <ArrowDown
            size={16}
            className="animate-bounce"
          />
        </div>

      </div>
    </section>
  );
}