import Link from "next/link";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  href?: string;
}

export function ServiceCard({ icon, title, desc, href = "/services" }: ServiceCardProps) {
  return (
    <Link
      href={href}
      className="block p-8 bg-gray-50 rounded-2xl border border-transparent hover:bg-primary hover:-translate-y-1.5 hover:shadow-[0_20px_60px_rgba(15,34,64,0.2)] hover:border-primary transition-all duration-300 group cursor-pointer"
    >
      <div className="w-14 h-14 rounded-xl bg-[#cdd5e3] flex items-center justify-center mb-6 text-primary group-hover:bg-white/15 transition-colors duration-300">
        <div className="[&_svg]:stroke-primary group-hover:[&_svg]:stroke-white transition-colors duration-300">
          {icon}
        </div>
      </div>
      <h3 className="font-head text-[18px] font-bold mb-3 text-foreground group-hover:text-white transition-colors duration-300">{title}</h3>
      <p className="text-[14px] text-gray-500 leading-[1.7] mb-5 group-hover:text-white transition-colors duration-300">{desc}</p>
      <span className="text-[13px] font-semibold tracking-[0.04em] text-primary group-hover:text-white transition-colors duration-300">
        Learn More →
      </span>
    </Link>
  );
}
