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
    <div className="p-7 bg-gray-50 rounded-2xl border border-gray-200 h-full flex flex-col">
      <div className="text-gold text-sm tracking-widest mb-3">{"★".repeat(rating)}</div>
      <p className="italic text-[15px] leading-relaxed mb-5 flex-1">"{quote}"</p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-head font-bold text-primary text-sm shrink-0">
          {initials}
        </div>
        <div>
          <div className="font-head font-bold text-sm">{name}</div>
          <div className="text-xs text-gray-500">{role}</div>
        </div>
      </div>
    </div>
  );
}
