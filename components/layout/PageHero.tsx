import Link from "next/link";
import { Container } from "@/components/atoms/Container";
import { SectionLabel } from "@/components/atoms/SectionLabel";

interface Crumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  breadcrumb: Crumb[];
  label: string;
  title: React.ReactNode;
  desc?: string;
}

export function PageHero({ breadcrumb, label, title, desc }: PageHeroProps) {
  return (
    <section className="pt-[72px] bg-gradient-to-br from-white via-gray-50 to-yellow-50/30 relative overflow-hidden">
      <div className="absolute -top-24 -right-48 w-[600px] h-[600px] rounded-full bg-primary/[0.04] pointer-events-none" />
      <Container>
        <div className="py-20 relative z-10">
          <div className="flex items-center gap-2 text-[13px] text-gray-500 mb-6">
            {breadcrumb.map((c, i) => (
              <span key={i} className="flex items-center gap-2">
                {i > 0 && <span className="opacity-40">/</span>}
                {c.href ? (
                  <Link href={c.href} className="text-primary hover:underline">
                    {c.label}
                  </Link>
                ) : (
                  <span>{c.label}</span>
                )}
              </span>
            ))}
          </div>
          <SectionLabel>{label}</SectionLabel>
          <h1 className="font-head text-[clamp(36px,4vw,56px)] font-extrabold leading-[1.1] tracking-tight mb-5">
            {title}
          </h1>
          {desc && (
            <p className="text-[17px] text-gray-600 leading-relaxed max-w-xl">{desc}</p>
          )}
        </div>
      </Container>
    </section>
  );
}
