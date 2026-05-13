import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn("max-w-[1280px] mx-auto px-5 md:px-8 lg:px-10", className)}>
      {children}
    </div>
  );
}
