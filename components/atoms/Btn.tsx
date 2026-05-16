"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "white" | "white-outline" | "ghost";

interface BtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  href?: string;
  children: React.ReactNode;
  className?: string;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-white hover:bg-[#0a1733] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(15,34,64,0.25)]",
  outline:
    "border-[1.5px] border-secondary text-secondary hover:bg-secondary hover:text-white hover:-translate-y-0.5",
  white:
    "bg-white text-primary hover:shadow-[0_8px_32px_rgba(0,0,0,0.2)] hover:-translate-y-0.5",
  "white-outline":
    "border-2 border-white text-white hover:bg-white hover:text-primary hover:-translate-y-0.5 transition-all duration-200",
  ghost:
    "text-primary hover:bg-primary/10",
};

export function Btn({ variant = "primary", href, children, className, ...rest }: BtnProps) {
  const cls = cn(
    "inline-flex items-center gap-2 px-7 py-3.5 rounded-lg font-head font-semibold text-[15px] transition-all duration-200 cursor-pointer",
    variants[variant],
    className
  );

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
