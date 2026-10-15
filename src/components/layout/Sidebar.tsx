"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, Home, User, Code2, Briefcase, BookOpen } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

const menuItems = [
  { label: "Início", href: "/#inicio", icon: Home },
  { label: "Sobre", href: "/#sobre", icon: User },
  { label: "Skills", href: "/#skills", icon: Code2 },
  { label: "Projetos", href: "/#projects", icon: Briefcase },
  { label: "Estudos", href: "/estudos", icon: BookOpen },
];
export default function Sidebar() {
  const pathname = usePathname();
  const inStudies = pathname === "/estudos" || pathname.startsWith("/estudos/");
  return (
    <>
      <aside className="fixed left-0 top-0 z-50 hidden h-screen w-20 border-r border-white/10 bg-black/60 backdrop-blur-xl lg:flex lg:flex-col lg:items-center lg:justify-between lg:py-8">
        <Link href="/" aria-label="Página inicial do portfólio" className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-400/10 focus-visible:outline-2 focus-visible:outline-cyan-400">
          <span className="font-bold text-cyan-400">DW</span>
        </Link>
        <nav className="flex flex-col gap-6" aria-label="Navegação principal">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = item.label === "Estudos" && inStudies;
            return <Link key={item.label} href={item.href} title={item.label} aria-label={item.label} aria-current={active ? "page" : undefined}
              className={`group relative flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 hover:bg-cyan-400/10 hover:text-cyan-400 focus-visible:outline-2 focus-visible:outline-cyan-400 ${active ? "bg-cyan-400/10 text-cyan-400" : "text-gray-500"}`}>
              <Icon size={20} aria-hidden="true" />
              <span aria-hidden="true" className="pointer-events-none absolute left-14 whitespace-nowrap rounded-md border border-white/10 bg-black px-3 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">{item.label}</span>
            </Link>;
          })}
        </nav>
        <div className="flex flex-col gap-4">
          <Link href="https://github.com/DouglasWilliams10" target="_blank" rel="noopener noreferrer" title="GitHub" aria-label="GitHub"
            className="text-gray-500 transition-all duration-300 hover:scale-110 hover:text-cyan-400"><FaGithub size={19} aria-hidden="true" /></Link>
          <Link href="https://www.linkedin.com/in/douglaswilliamssp" target="_blank" rel="noopener noreferrer" title="LinkedIn" aria-label="LinkedIn"
            className="text-gray-500 transition-all duration-300 hover:scale-110 hover:text-cyan-400"><FaLinkedinIn size={19} aria-hidden="true" /></Link>
          <Link href="mailto:douglaswilliamssp@gmail.com" title="Contato" aria-label="Contato por e-mail"
            className="text-gray-500 transition-all duration-300 hover:scale-110 hover:text-cyan-400"><Mail size={19} aria-hidden="true" /></Link>
        </div>
      </aside>
      <nav aria-label="Navegação principal no celular" className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-5 border-t border-white/10 bg-[#030712]/95 px-1 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden">
        {menuItems.map((item) => {
          const Icon = item.icon; const active = item.label === "Estudos" && inStudies;
          return <Link key={item.label} href={item.href} aria-current={active ? "page" : undefined}
            className={`flex min-h-16 min-w-0 flex-col items-center justify-center gap-1 rounded-lg text-[11px] focus-visible:outline-2 focus-visible:outline-cyan-400 ${active ? "text-cyan-400" : "text-gray-400 hover:text-cyan-400"}`}>
            <Icon size={20} aria-hidden="true" /><span>{item.label}</span>
          </Link>;
        })}
      </nav>
    </>
  );
}
