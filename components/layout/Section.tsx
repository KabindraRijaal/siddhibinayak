import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  bg?: "white" | "gray";
  id?: string;
  className?: string;
}

/**
 * Standard padded section wrapper with optional background tone.
 * Design spec: py-24 (100px desktop) with max-w-[1280px] inner container.
 * bg="gray" uses --background (#f8f9fa); bg="white" uses #ffffff.
 */
export function Section({ children, bg = "white", id, className }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-14 md:py-24",
        bg === "gray" ? "bg-background" : "bg-white",
        className
      )}
    >
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-10">{children}</div>
    </section>
  );
}
