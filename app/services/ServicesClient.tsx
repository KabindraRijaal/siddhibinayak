"use client";

import { useState } from "react";
import { Navbar } from "@/components/organisms/Navbar";
import { Footer } from "@/components/organisms/Footer";
import { CTABanner } from "@/components/layout/CTABanner";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/atoms/Container";
import { useQuote } from "@/components/organisms/QuoteModal";
import type { ServiceItem } from "@/lib/cms-types";
import { useCms } from "@/components/CmsShell";

const SERVICE_ICONS = [
  <svg key="0" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7"><rect x="3" y="10" width="22" height="16" rx="1.5"/><path d="M3 14L14 5l11 9"/><rect x="10" y="18" width="8" height="8"/></svg>,
  <svg key="1" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7"><rect x="3" y="3" width="22" height="22" rx="1.5"/><path d="M3 10h22M10 3v22"/><circle cx="18" cy="18" r="3"/></svg>,
  <svg key="2" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7"><path d="M4 24h20M4 20l8-12 5 7 3-4 4 9"/><circle cx="22" cy="6" r="2.5"/></svg>,
  <svg key="3" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7"><path d="M6 22V12M22 22V8M14 22V4M3 22h22"/><path d="M10 12h-4v10h4"/></svg>,
  <svg key="4" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7"><circle cx="14" cy="14" r="10"/><path d="M14 8v6l4 4"/></svg>,
  <svg key="5" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7"><path d="M14 3L4 10v15h6v-8h8v8h6V10z"/></svg>,
  <svg key="6" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7"><path d="M5 23l18-18M10 5H5v5"/><rect x="14" y="14" width="9" height="9" rx="1"/></svg>,
  <svg key="7" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7"><path d="M7 21l7-14 7 14"/><path d="M9 17h10"/></svg>,
];

function ServiceRow({ svc, num, expanded, onToggle }: {
  svc: ServiceItem;
  num: string;
  expanded: boolean;
  onToggle: () => void;
}) {
  const { open } = useQuote();

  return (
    <div>
      <div
        onClick={onToggle}
        className={`grid gap-8 items-center p-8 rounded-2xl border cursor-pointer transition-all duration-300 ${
          expanded
            ? "bg-linear-to-br from-white to-[#eff4fa] border-primary"
            : "bg-white border-[#cdd5e3] hover:border-primary hover:translate-x-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)]"
        }`}
        style={{ gridTemplateColumns: "80px 1fr auto" }}
      >
        <div className={`font-head text-[36px] font-extrabold text-primary transition-opacity ${expanded ? "opacity-100" : "opacity-40"}`}>
          {num}
        </div>
        <div>
          <h3 className="font-head text-[22px] font-bold mb-1.5">{svc.title}</h3>
          <p className="text-[15px] text-[#4a5568] leading-relaxed">{svc.desc}</p>
        </div>
        <div className={`w-11 h-11 rounded-full flex items-center justify-center text-lg shrink-0 transition-all duration-200 ${
          expanded ? "bg-primary text-white rotate-90" : "bg-background text-primary hover:bg-primary hover:text-white hover:-rotate-45"
        }`}>
          →
        </div>
      </div>

      {expanded && (
        <div className="px-8 pb-8 pt-0 -mt-2 bg-linear-to-br from-white to-[#eff4fa] border border-t-0 border-primary rounded-b-2xl">
          <div className="grid md:grid-cols-[2fr_1fr] gap-8 pt-6">
            <div>
              <h4 className="font-head text-[14px] font-bold tracking-[0.08em] uppercase text-primary mb-3">
                What&apos;s Included
              </h4>
              <ul>
                {svc.features.map((f) => (
                  <li key={f} className="relative pl-6 py-2 text-[14px] text-foreground border-b border-[#cdd5e3] last:border-0">
                    <span className="absolute left-0 text-primary font-bold">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-background rounded-xl p-6">
              <div className="font-head text-[28px] font-extrabold text-primary mb-1">{svc.price}</div>
              <div className="text-[13px] text-[#3e4a5e] mb-4">{svc.priceLabel}</div>
              <button
                onClick={(e) => { e.stopPropagation(); open(svc.title); }}
                className="w-full justify-center bg-primary text-white text-[13px] font-semibold font-head py-2.5 px-4 rounded-lg hover:bg-[#0a1733] transition-colors"
              >
                Request Quote
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function ServicesClient() {
  const cms = useCms();
  const [expanded, setExpanded] = useState<number | null>(null);
  const { services, settings, navigation } = cms;

  return (
    <>
      <Navbar activePage="services" navLinks={navigation} brandName={settings.brandName} />

      <PageHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Services" }]}
        label="What We Do"
        title={<>End-to-End <span className="text-primary">Construction</span><br />Services in Baglung</>}
        desc={services.pageDesc}
      />

      <section className="py-30 bg-white">
        <Container>
          <div className="flex flex-col gap-6 mt-0">
            {services.items.map((svc, i) => (
              <ServiceRow
                key={i}
                svc={svc}
                num={String(i + 1).padStart(2, "0")}
                expanded={expanded === i}
                onToggle={() => setExpanded(expanded === i ? null : i)}
              />
            ))}
          </div>
        </Container>
      </section>

      <CTABanner
        title="Not Sure Which Service You Need?"
        desc="Book a free 30-minute consultation with our team — we'll help you choose the right approach."
        ctaLabel="Book Free Consultation →"
        ctaHref="/contact"
      />

      <Footer cms={cms} />
    </>
  );
}
