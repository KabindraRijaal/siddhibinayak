"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "white" | "ghost";

interface BtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  href?: string;
  children: React.ReactNode;
  className?: string;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-white hover:bg-primary-dark hover:-translate-y-0.5 shadow-sm hover:shadow-lg",
  outline:
    "border border-secondary text-secondary hover:bg-secondary hover:text-white hover:-translate-y-0.5",
  white:
    "bg-white text-primary hover:shadow-xl hover:-translate-y-0.5",
  ghost:
    "text-primary hover:bg-primary/10",
};

export function Btn({ variant = "primary", href, children, className, ...rest }: BtnProps) {
  const cls = cn(
    "inline-flex items-center gap-2 px-7 py-3.5 rounded-lg font-head font-semibold text-sm transition-all duration-200 cursor-pointer",
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
