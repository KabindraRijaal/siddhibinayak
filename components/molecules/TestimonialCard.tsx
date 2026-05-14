interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  rating?: number;
}

export function TestimonialCard({ quote, name, role, rating = 5 }: TestimonialCardProps) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0])
    .join("");

  return (
    <div className="p-8 bg-[#f8f9fa] rounded-2xl border border-[#cdd5e3] h-full flex flex-col box-border">
      <div className="text-[#f4b400] text-[18px] tracking-[2px] mb-4">{"★".repeat(rating)}</div>
      <p className="italic text-[15px] leading-[1.7] text-foreground mb-6 flex-1">{quote}</p>
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-full bg-[#cdd5e3] flex items-center justify-center font-head font-bold text-primary text-[16px] shrink-0">
          {initials}
        </div>
        <div>
          <div className="font-head font-bold text-[15px]">{name}</div>
          <div className="text-[12px] text-[#4a5568]">{role}</div>
        </div>
      </div>
    </div>
  );
}
