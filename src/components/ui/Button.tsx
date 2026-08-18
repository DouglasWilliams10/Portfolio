import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
}

export default function Button({
  children,
  href,
  onClick,
}: ButtonProps) {
  const className =
    "inline-flex items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-6 py-3 text-sm font-semibold text-cyan-400 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400 hover:bg-cyan-400/20 hover:shadow-[0_0_25px_rgba(34,211,238,0.25)]";

  if (href) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={className}
    >
      {children}
    </button>
  );
}