"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface FAQItemProps {
  q: string;
  a: string;
}

export function FAQItem({ q, a }: FAQItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(
        "bg-white rounded-xl border transition-colors",
        open ? "border-primary" : "border-gray-200"
      )}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center p-5 font-head font-semibold text-left text-[15px] gap-4"
      >
        <span>{q}</span>
        <span
          className={cn(
            "w-7 h-7 shrink-0 rounded-full flex items-center justify-center text-lg transition-all duration-200",
            open ? "bg-primary text-white rotate-45" : "bg-gray-100 text-primary"
          )}
        >
          +
        </span>
      </button>
      {open && (
        <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed">{a}</div>
      )}
    </div>
  );
}
