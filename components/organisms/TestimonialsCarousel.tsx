"use client";

import { useEffect, useState } from "react";
import { TestimonialCard } from "@/components/molecules/TestimonialCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  rating?: number;
}

interface TestimonialsCarouselProps {
  items: Testimonial[];
}

export function TestimonialsCarousel({ items }: TestimonialsCarouselProps) {
  const [idx, setIdx] = useState(0);
  const visibleCount = 3;
  const max = Math.max(0, items.length - visibleCount);

  useEffect(() => {
    const id = setInterval(
      () => setIdx((p) => (p >= max ? 0 : p + 1)),
      4500
    );
    return () => clearInterval(id);
  }, [max]);

  const prev = () => setIdx((p) => (p <= 0 ? max : p - 1));
  const next = () => setIdx((p) => (p >= max ? 0 : p + 1));

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          className="flex gap-7 transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${idx * (100 / visibleCount)}%)` }}
        >
          {items.map((t) => (
            <div
              key={t.name}
              className="flex-[0_0_calc(33.33%-19px)] min-w-0"
            >
              <TestimonialCard {...t} />
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          onClick={prev}
          className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
        >
          <ChevronLeft size={18} />
        </button>
        <div className="flex gap-2">
          {Array.from({ length: max + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === idx ? "w-6 bg-primary" : "w-2 bg-gray-300"
              }`}
            />
          ))}
        </div>
        <button
          onClick={next}
          className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
