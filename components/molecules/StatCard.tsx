"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  num: number;
  suffix?: string;
  label: string;
  variant?: "light" | "dark";
}

export function StatCard({ num, suffix = "+", label, variant = "dark" }: StatCardProps) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          let v = 0;
          const step = num / 40;
          const id = setInterval(() => {
            v += step;
            if (v >= num) {
              v = num;
              clearInterval(id);
            }
            setVal(Math.floor(v));
          }, 30);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [num]);

  const isDark = variant === "dark";

  return (
    <div ref={ref} className="text-center">
      <div
        className={cn(
          "font-head text-[48px] font-extrabold leading-none",
          isDark ? "text-white" : "text-primary"
        )}
      >
        {val}
        <span className="text-[#f4b400]">{suffix}</span>
      </div>
      <div
        className={cn(
          "text-[13px] font-medium uppercase tracking-[0.08em] mt-2",
          isDark ? "text-white/60" : "text-gray-500"
        )}
      >
        {label}
      </div>
    </div>
  );
}
