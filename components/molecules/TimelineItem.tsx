interface TimelineItemProps {
  year: string;
  title: string;
  desc: string;
  last?: boolean;
}

export function TimelineItem({ year, title, desc, last = false }: TimelineItemProps) {
  return (
    <div className={`relative pl-10 ${last ? "" : "pb-10"}`}>
      <div className="absolute left-0 top-1 w-3.5 h-3.5 rounded-full bg-primary border-[3px] border-gray-50 z-10" />
      {!last && (
        <div className="absolute left-[6px] top-4 w-0.5 bg-gray-200 bottom-0" />
      )}
      <div className="text-xs font-bold uppercase tracking-wider text-primary">{year}</div>
      <h4 className="font-head font-bold text-lg mt-1.5 mb-2">{title}</h4>
      <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
    </div>
  );
}
