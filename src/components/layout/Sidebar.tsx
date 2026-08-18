"use client";

import Link from "next/link";

import {
  Mail,
  Home,
  User,
  Code2,
  Briefcase,
} from "lucide-react";

import {
  FaGithub,
  FaLinkedinIn,
} from "react-icons/fa";

const menuItems = [
  {
    label: "Início",
    href: "#inicio",
    icon: Home,
  },
  {
    label: "Sobre",
    href: "#sobre",
    icon: User,
  },
  {
    label: "Skills",
    href: "#skills",
    icon: Code2,
  },
  {
    label: "Projetos",
    href: "#projetos",
    icon: Briefcase,
  },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-50 hidden h-screen w-20 border-r border-white/10 bg-black/60 backdrop-blur-xl lg:flex lg:flex-col lg:items-center lg:justify-between lg:py-8">

      {/* Logo */}
      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-400/10">
        <span className="font-bold text-cyan-400">
          DW
        </span>
      </div>

      {/* Menu */}
      <nav className="flex flex-col gap-6">

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.label}
              href={item.href}
              title={item.label}
              className="group relative flex h-10 w-10 items-center justify-center rounded-xl text-gray-500 transition-all duration-300 hover:bg-cyan-400/10 hover:text-cyan-400"
            >
              <Icon size={20} />

              <span className="pointer-events-none absolute left-14 whitespace-nowrap rounded-md border border-white/10 bg-black px-3 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                {item.label}
              </span>
            </Link>
          );
        })}

      </nav>

      {/* Redes sociais */}
      <div className="flex flex-col gap-4">

        <Link
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          title="GitHub"
          className="text-gray-500 transition-all duration-300 hover:scale-110 hover:text-cyan-400"
        >
          <FaGithub size={19} />
        </Link>

        <Link
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          title="LinkedIn"
          className="text-gray-500 transition-all duration-300 hover:scale-110 hover:text-cyan-400"
        >
          <FaLinkedinIn size={19} />
        </Link>

        <Link
          href="#contato"
          title="Contato"
          className="text-gray-500 transition-all duration-300 hover:scale-110 hover:text-cyan-400"
        >
          <Mail size={19} />
        </Link>

      </div>

    </aside>
  );
}