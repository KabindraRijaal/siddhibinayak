"use client";

import { useState } from "react";
import { Navbar } from "@/components/organisms/Navbar";
import { Footer } from "@/components/organisms/Footer";
import { CTABanner } from "@/components/layout/CTABanner";
import { useQuote } from "@/components/organisms/QuoteModal";
import { useCms } from "@/components/CmsShell";

const FILTERS = [
  { key: "all", label: "All Projects" },
  { key: "residential", label: "Residential" },
  { key: "commercial", label: "Commercial" },
  { key: "interior", label: "Interior" },
  { key: "renovation", label: "Renovation" },
  { key: "hospitality", label: "Hospitality" },
  { key: "civil", label: "Civil Works" },
];

type ProjectRow = {
  id: string;
  name: string;
  cat: string;
  catLabel: string;
  loc: string;
  desc: string;
  area: string;
  year: string;
  image: string;
  featured: boolean;
};

function ProjectModal({ project, onClose }: { project: ProjectRow; onClose: () => void }) {
  const { open } = useQuote();
  return (
    <div
      className="fixed inset-0 bg-black/65 z-[200] flex items-center justify-center p-5"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-3xl max-w-[680px] w-full relative overflow-hidden max-h-[90vh] overflow-y-auto">
        <div
          className="relative overflow-hidden flex flex-col items-center justify-center gap-2.5 text-[#6b7585] font-mono text-xs"
          style={{ aspectRatio: "16/9", background: "linear-gradient(135deg, #e7e8e9, #d9dadb)" }}
        >
          {project.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={project.image} alt={project.name} className="w-full h-full object-cover absolute inset-0" />
          ) : (
            <>
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#6b7585" strokeWidth="1.5">
                <rect x="4" y="16" width="40" height="28" rx="2" />
                <path d="M4 20L24 8l20 12" />
                <rect x="16" y="26" width="16" height="18" />
              </svg>
              project photo
            </>
          )}
        </div>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 shadow-md flex items-center justify-center text-xl hover:bg-white transition-colors z-10"
        >
          ×
        </button>
        <div className="p-9">
          <span className="inline-block bg-[#eff4fa] text-primary px-3 py-1 rounded-full text-[11px] font-bold tracking-[0.08em] uppercase mb-4">
            {project.catLabel}
          </span>
          <h2 className="font-head text-[28px] font-extrabold mb-2 leading-tight">{project.name}</h2>
          <p className="text-[14px] text-[#4a5568] mb-5 flex items-center gap-1.5">📍 {project.loc}</p>
          <p className="text-[15px] text-[#4a5568] leading-[1.7] mb-7">{project.desc}</p>
          <div className="grid grid-cols-2 gap-4 mb-7">
            {[
              { label: "Category", val: project.catLabel },
              { label: "Year", val: project.year },
              { label: "Area / Scale", val: project.area },
              { label: "Location", val: project.loc },
            ].map((d) => (
              <div key={d.label} className="bg-[#f8f9fa] rounded-xl p-4">
                <div className="text-[11px] font-semibold tracking-widest uppercase text-[#3e4a5e] mb-1.5">{d.label}</div>
                <div className="font-head text-[15px] font-bold">{d.val}</div>
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => { onClose(); open(project.name); }}
              className="bg-primary text-white font-head font-semibold text-[15px] px-7 py-3.5 rounded-lg hover:bg-[#0a1733] transition-colors"
            >
              Discuss Similar Project →
            </button>
            <button
              onClick={onClose}
              className="border border-[#505f77] text-[#505f77] font-head font-semibold text-[15px] px-7 py-3.5 rounded-lg hover:bg-[#505f77] hover:text-white transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProjectsClient() {
  const cms = useCms();
  const [filter, setFilter] = useState("all");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [modal, setModal] = useState<ProjectRow | null>(null);
  const { settings, navigation } = cms;

  const allProjects: ProjectRow[] = cms.projects.map((p) => ({
    id: p.id,
    name: p.name,
    cat: p.category.toLowerCase(),
    catLabel: p.category,
    loc: p.location,
    desc: p.desc,
    area: p.area,
    year: p.year,
    image: p.image,
    featured: p.featured,
  }));

  const visible = allProjects.filter((p) =>
    filter === "all" || p.cat.includes(filter)
  );

  return (
    <>
      <Navbar activePage="projects" navLinks={navigation} brandName={settings.brandName} />

      {/* PAGE HERO */}
      <div className="pt-[72px] relative overflow-hidden" style={{ background: "linear-gradient(135deg, #fff 0%, #f8f9fa 60%, #fff8e1 100%)" }}>
        <div className="absolute -top-24 -right-48 w-[600px] h-[600px] rounded-full" style={{ background: "radial-gradient(circle, rgba(15,34,64,0.06) 0%, transparent 70%)" }} />
        <div className="max-w-[1280px] mx-auto px-8 pt-20 pb-16">
          <div className="flex items-center gap-2 text-[13px] text-[#3e4a5e] mb-6">
            <a href="/" className="text-primary hover:underline">Home</a>
            <span className="opacity-40">/</span>
            <span>Projects</span>
          </div>
          <div className="text-[13px] font-semibold tracking-[0.12em] uppercase text-primary mb-4 flex items-center gap-2.5">
            <span className="w-8 h-0.5 bg-primary inline-block" />
            Our Portfolio
          </div>
          <h1 className="font-head font-extrabold leading-[1.1] tracking-[-0.01em] mb-5" style={{ fontSize: "clamp(36px, 4vw, 56px)", letterSpacing: "-0.02em" }}>
            Every Project,<br />A <span className="text-primary">Story Built</span> in Stone
          </h1>
          <p className="text-[17px] text-[#4a5568] leading-[1.7] max-w-[600px] mb-12">
            From hillside villas overlooking Kali Gandaki River to landmark commercial complexes in Baglung&apos;s city centre — each project represents our commitment to precision, heritage, and lasting quality.
          </p>
          <div className="flex flex-wrap gap-12 pt-12 border-t border-[#cdd5e3]">
            {[
              { num: `${cms.projects.length}+`, lbl: "Projects Listed" },
              { num: "15+", lbl: "Years in Baglung" },
              { num: "8", lbl: "Project Categories" },
              { num: "100%", lbl: "Client Satisfaction" },
            ].map((s) => (
              <div key={s.lbl} className="flex flex-col gap-1">
                <div className="font-head text-[32px] font-extrabold text-primary leading-none">{s.num}</div>
                <div className="text-[13px] text-[#3e4a5e] font-medium">{s.lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="bg-white border-b border-[#cdd5e3] sticky top-[72px] z-50">
        <div className="max-w-[1280px] mx-auto px-8 flex items-center justify-between gap-5 flex-wrap min-h-16">
          <div className="flex gap-1 overflow-x-auto py-3 scrollbar-none">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-5 py-2 rounded-full text-[13px] font-semibold border whitespace-nowrap transition-all duration-200 ${
                  filter === f.key
                    ? "bg-primary border-primary text-white"
                    : "border-[#cdd5e3] text-[#3e4a5e] hover:border-primary hover:text-primary bg-transparent"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <span className="text-[13px] text-[#3e4a5e] whitespace-nowrap">
              {visible.length} project{visible.length !== 1 ? "s" : ""}
            </span>
            <div className="flex gap-1 bg-[#edeeef] rounded-lg p-1">
              <button
                onClick={() => setView("grid")}
                className={`w-8 h-8 rounded-md flex items-center justify-center transition-all ${view === "grid" ? "bg-white shadow-sm" : ""}`}
                title="Grid view"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="1" y="1" width="6" height="6" rx="1" fill="currentColor" />
                  <rect x="9" y="1" width="6" height="6" rx="1" fill="currentColor" />
                  <rect x="1" y="9" width="6" height="6" rx="1" fill="currentColor" />
                  <rect x="9" y="9" width="6" height="6" rx="1" fill="currentColor" />
                </svg>
              </button>
              <button
                onClick={() => setView("list")}
                className={`w-8 h-8 rounded-md flex items-center justify-center transition-all ${view === "list" ? "bg-white shadow-sm" : ""}`}
                title="List view"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="1" y="2" width="14" height="3" rx="1" fill="currentColor" />
                  <rect x="1" y="7" width="14" height="3" rx="1" fill="currentColor" />
                  <rect x="1" y="12" width="14" height="3" rx="1" fill="currentColor" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* PROJECTS */}
      <div className="px-8 py-16 pb-28">
        <div className="max-w-[1280px] mx-auto">
          {visible.length === 0 ? (
            <div className="text-center py-20 text-[#3e4a5e]">
              <h3 className="font-head text-[20px] font-bold mb-2">No projects in this category yet</h3>
              <p className="text-[14px]">Check back soon — we&apos;re always building.</p>
            </div>
          ) : (
            <div className={view === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7" : "flex flex-col gap-5"}>
              {visible.map((p) => {
                const isFeatured = p.featured && filter === "all";
                if (view === "grid") {
                  return (
                    <div
                      key={p.id}
                      onClick={() => setModal(p)}
                      className={`rounded-2xl overflow-hidden bg-white cursor-pointer border border-transparent hover:-translate-y-1.5 hover:shadow-[0_20px_60px_rgba(0,0,0,0.10)] hover:border-[#cdd5e3] transition-all duration-300 ${isFeatured ? "lg:col-span-2" : ""}`}
                    >
                      <div
                        className="relative overflow-hidden flex flex-col items-center justify-center gap-2.5 text-[#6b7585] font-mono text-[11px]"
                        style={{ aspectRatio: isFeatured ? "16/7" : "4/3", background: "linear-gradient(135deg, #e7e8e9 0%, #d9dadb 100%)" }}
                      >
                        {p.image && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={p.image} alt={p.name} className="absolute inset-0 w-full h-full object-cover" />
                        )}
                        {!p.image && (
                          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#6b7585" strokeWidth="1.5">
                            <rect x="4" y="14" width="32" height="22" rx="2" />
                            <path d="M4 18L20 8l16 10" />
                          </svg>
                        )}
                        <span className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-[11px] font-semibold tracking-[0.06em] uppercase z-10">
                          {p.catLabel}
                        </span>
                        <span className="absolute top-4 right-4 bg-black/50 text-white px-2.5 py-1 rounded-full text-[11px] font-semibold backdrop-blur-sm z-10">
                          {p.year}
                        </span>
                      </div>
                      <div className="p-6">
                        <h3 className={`font-head font-bold mb-2 ${isFeatured ? "text-[24px]" : "text-[18px]"}`}>{p.name}</h3>
                        <p className="text-[13px] text-[#4a5568] flex items-center gap-1.5 mb-3">📍 {p.loc}</p>
                        <p className="text-[14px] text-[#4a5568] leading-[1.6] mb-4 line-clamp-2">{p.desc}</p>
                        <div className="flex items-center justify-between border-t border-[#cdd5e3] pt-3.5">
                          <span className="text-[12px] text-[#3e4a5e] font-medium">{p.area}</span>
                          <div className="w-8 h-8 rounded-full bg-[#f8f9fa] flex items-center justify-center text-primary text-[16px] hover:bg-primary hover:text-white hover:translate-x-1 transition-all duration-200">→</div>
                        </div>
                      </div>
                    </div>
                  );
                }
                return (
                  <div
                    key={p.id}
                    onClick={() => setModal(p)}
                    className="rounded-2xl overflow-hidden bg-white cursor-pointer border border-transparent hover:shadow-[0_20px_60px_rgba(0,0,0,0.10)] hover:border-[#cdd5e3] transition-all duration-300 grid"
                    style={{ gridTemplateColumns: "320px 1fr" }}
                  >
                    <div
                      className="relative flex flex-col items-center justify-center gap-2.5 text-[#6b7585] font-mono text-[11px]"
                      style={{ background: "linear-gradient(135deg, #e7e8e9 0%, #d9dadb 100%)" }}
                    >
                      {p.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={p.image} alt={p.name} className="absolute inset-0 w-full h-full object-cover" />
                      ) : (
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#6b7585" strokeWidth="1.5">
                          <rect x="4" y="14" width="32" height="22" rx="2" />
                          <path d="M4 18L20 8l16 10" />
                        </svg>
                      )}
                      <span className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-[11px] font-semibold tracking-[0.06em] uppercase z-10">
                        {p.catLabel}
                      </span>
                    </div>
                    <div className="p-8 flex flex-col justify-center">
                      <h3 className="font-head text-[22px] font-bold mb-2.5">{p.name}</h3>
                      <p className="text-[13px] text-[#4a5568] flex items-center gap-1.5 mb-3">📍 {p.loc}</p>
                      <p className="text-[14px] text-[#4a5568] leading-[1.6] mb-4 line-clamp-3">{p.desc}</p>
                      <div className="flex items-center justify-between border-t border-[#cdd5e3] pt-3.5">
                        <span className="text-[12px] text-[#3e4a5e] font-medium">{p.area}</span>
                        <div className="w-8 h-8 rounded-full bg-[#f8f9fa] flex items-center justify-center text-primary text-[16px] hover:bg-primary hover:text-white transition-all duration-200">→</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <CTABanner
        title="Have a Project in Mind?"
        desc="Tell us about your vision and we'll schedule a free site visit and consultation within 48 hours."
        ctaLabel="Start a Conversation →"
        ctaHref="/contact"
      />

      <Footer cms={cms} />

      {modal && <ProjectModal project={modal} onClose={() => setModal(null)} />}
    </>
  );
}
