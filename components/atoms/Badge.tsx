import { cn } from "@/lib/utils";

type Tone = "primary" | "info" | "success" | "gold";

interface BadgeProps {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}

const tones: Record<Tone, string> = {
  primary: "bg-primary/10 text-primary",
  info: "bg-blue-50 text-blue-800",
  success: "bg-emerald-50 text-emerald-800",
  gold: "bg-yellow-50 text-yellow-800",
};

export function Badge({ children, tone = "primary", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-block px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
