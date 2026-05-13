export function SectionLabel({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-2.5 text-[13px] font-semibold tracking-widest uppercase text-primary mb-4 font-head">
      <span className="w-8 h-0.5 bg-primary inline-block" />
      {children}
    </div>
  );
}
