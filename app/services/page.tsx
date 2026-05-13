"use client";

import { useState } from "react";
import { Navbar } from "@/components/organisms/Navbar";
import { Footer } from "@/components/organisms/Footer";
import { CTABanner } from "@/components/layout/CTABanner";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/atoms/Container";
import { useQuote } from "@/components/organisms/QuoteModal";

const SERVICES = [
  {
    num: "01",
    title: "Residential Construction",
    short: "Custom homes, villas, and apartments crafted to your lifestyle — from foundation to finishing.",
    features: [
      "Custom architectural design",
      "Seismic-resistant RCC construction",
      "MEP (mechanical, electrical, plumbing)",
      "Premium interior finishing",
      "Landscaping and outdoor works",
      "Government approvals and permits",
    ],
    price: "From NPR 2,200/sqft",
    priceLabel: "Standard residential builds",
  },
  {
    num: "02",
    title: "Architectural Design",
    short: "Detailed blueprints, 3D renders, and structural plans that balance aesthetic beauty with engineering integrity.",
    features: [
      "Concept design and feasibility study",
      "Floor plans and elevations",
      "3D walkthroughs and renders",
      "Working drawings for construction",
      "Structural design and calculations",
      "Building bylaw compliance",
    ],
    price: "From NPR 80/sqft",
    priceLabel: "Full design package",
  },
  {
    num: "03",
    title: "Interior Design",
    short: "Harmonious interiors that reflect your personality — space planning, materials, lighting, and bespoke furniture.",
    features: [
      "Space planning and zoning",
      "Material and finish selection",
      "Custom furniture and joinery",
      "Lighting design",
      "Soft furnishings and styling",
      "Project supervision and handover",
    ],
    price: "From NPR 1,500/sqft",
    priceLabel: "Full interior fit-out",
  },
  {
    num: "04",
    title: "Commercial Projects",
    short: "Office complexes, hotels, and retail spaces crafted for function, brand identity, and lasting impressions.",
    features: [
      "Multi-storey commercial buildings",
      "Retail and showroom fit-out",
      "Hotel and hospitality construction",
      "Office tower development",
      "Mixed-use complexes",
      "Compliance with commercial codes",
    ],
    price: "From NPR 3,000/sqft",
    priceLabel: "Commercial construction",
  },
  {
    num: "05",
    title: "Renovation & Remodelling",
    short: "Breathing new life into existing structures — modern upgrades, retrofits, and structural reinforcement.",
    features: [
      "Structural assessment and audit",
      "Seismic retrofitting",
      "Heritage restoration",
      "Layout reconfiguration",
      "Modern utilities upgrade",
      "Aesthetic modernisation",
    ],
    price: "Starts NPR 4 lakhs",
    priceLabel: "Project-based pricing",
  },
  {
    num: "06",
    title: "Roofing Solutions",
    short: "Durable roofing systems engineered for Nepal's diverse climate — from Himalayan winters to monsoon rains.",
    features: [
      "Slate, tile, and CGI roofing",
      "RCC slab roofing",
      "Insulation and waterproofing",
      "Skylights and dormers",
      "Gutter and drainage systems",
      "Solar-ready roof structures",
    ],
    price: "From NPR 350/sqft",
    priceLabel: "Material + installation",
  },
  {
    num: "07",
    title: "Foundation & Civil Works",
    short: "Robust foundation engineering and civil infrastructure ensuring seismic-resilient structures for Nepal's terrain.",
    features: [
      "Soil investigation and testing",
      "Pile and raft foundations",
      "Retaining walls and gabions",
      "Site grading and earthworks",
      "Drainage and sewer systems",
      "Roads, paving, and access works",
    ],
    price: "Custom quote",
    priceLabel: "Based on site conditions",
  },
  {
    num: "08",
    title: "Project Management",
    short: "End-to-end supervision, budgeting, and timeline management ensuring on-time, on-budget delivery.",
    features: [
      "Detailed project planning",
      "Cost estimation and budgeting",
      "Vendor and contractor management",
      "Quality control and inspections",
      "Weekly progress reports",
      "Risk management and reporting",
    ],
    price: "8–12% of project",
    priceLabel: "PM fee structure",
  },
];

function ServiceRow({ svc, expanded, onToggle }: {
  svc: typeof SERVICES[0];
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
          {svc.num}
        </div>
        <div>
          <h3 className="font-head text-[22px] font-bold mb-1.5">{svc.title}</h3>
          <p className="text-[15px] text-gray-500 leading-relaxed">{svc.short}</p>
        </div>
        <div className={`w-11 h-11 rounded-full flex items-center justify-center text-lg shrink-0 transition-all duration-200 ${
          expanded ? "bg-primary text-white rotate-90" : "bg-gray-50 text-primary hover:bg-primary hover:text-white hover:-rotate-45"
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
            <div className="bg-gray-50 rounded-xl p-6">
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

export default function ServicesPage() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <>
      <Navbar activePage="services" />

      <PageHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Services" }]}
        label="What We Do"
        title={<>End-to-End <span className="text-primary">Construction</span><br />Services in Baglung</>}
        desc="From the first sketch to the final handover key — Siddhibinayak delivers complete construction and design solutions for residential, commercial, and civil projects across the Gandaki Province."
      />

      <section className="py-24 bg-white">
        <Container>
          <div className="flex flex-col gap-6 mt-0">
            {SERVICES.map((svc, i) => (
              <ServiceRow
                key={svc.num}
                svc={svc}
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

      <Footer />
    </>
  );
}
