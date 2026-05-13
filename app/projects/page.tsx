"use client";

import { useState } from "react";
import { Navbar } from "@/components/organisms/Navbar";
import { Footer } from "@/components/organisms/Footer";
import { CTABanner } from "@/components/layout/CTABanner";
import { useQuote } from "@/components/organisms/QuoteModal";

const PROJECTS = [
  {
    name: "Tara Khola Villa",
    cat: "residential",
    catLabel: "Residential",
    loc: "Tara Khola, Baglung",
    desc: "A flagship luxury residential villa with panoramic Kali Gandaki River and Annapurna views. Blends traditional Newari woodwork with contemporary open-plan living.",
    scope: "4-Storey Luxury Villa",
    year: "2023",
    area: "520 sqm",
    duration: "18 months",
    fullDesc: "A flagship luxury residential villa perched above the shores of Kali Gandaki River, offering panoramic views of the Annapurna range. This 4-storey residence seamlessly blends traditional Newari woodwork with contemporary open-plan living. Features include a rooftop terrace, infinity plunge pool, underfloor heating, and a private Puja room with hand-carved stone detailing.",
    featured: true,
  },
  {
    name: "Himalaya Business Hub",
    cat: "commercial",
    catLabel: "Commercial",
    loc: "Baglung Bazaar",
    desc: "Landmark 8-storey commercial complex with office floors, retail arcade, and rooftop café with mountain views.",
    scope: "Office Complex",
    year: "2022",
    area: "3,200 sqm",
    duration: "24 months",
    fullDesc: "A landmark 8-storey commercial complex in the commercial heart of Baglung. The building features flexible open-plan office floors, a ground-floor retail arcade, rooftop café with mountain views, two basement parking levels, and a state-of-the-art conference centre.",
    featured: false,
  },
  {
    name: "Annapurna Boutique Hotel",
    cat: "interior hospitality",
    catLabel: "Interior",
    loc: "Bhakunde, Baglung",
    desc: "Full interior fit-out for a 32-room heritage hotel with hand-crafted Gandaki-inspired design across all spaces.",
    scope: "Hospitality Interior",
    year: "2023",
    area: "1,800 sqm",
    duration: "14 months",
    fullDesc: "Complete interior design and construction fit-out for a boutique 32-room hotel inspired by the cultural heritage of the Gandaki region. Every room features hand-crafted wooden furniture, local stone flooring, and custom thangka-inspired artwork.",
    featured: false,
  },
  {
    name: "Mountain View Residences",
    cat: "residential",
    catLabel: "Residential",
    loc: "Galkot, Baglung",
    desc: "12 eco-friendly townhouses with Annapurna views, seismic-resistant construction and solar energy systems.",
    scope: "Townhouse Community",
    year: "2021",
    area: "280 sqm per unit",
    duration: "22 months",
    fullDesc: "A thoughtfully designed community of 12 modern townhouses set against the backdrop of the Annapurna range. Each unit features seismic-resistant RCC construction, solar panels, rainwater harvesting, private gardens, and a shared community garden.",
    featured: false,
  },
  {
    name: "Heritage Home Restoration",
    cat: "renovation",
    catLabel: "Renovation",
    loc: "Old Bazaar, Baglung",
    desc: "Award-nominated restoration of a 60-year-old Newari home. Seismic retrofit with full preservation of carved windows and courtyards.",
    scope: "Heritage Restoration",
    year: "2024",
    area: "310 sqm",
    duration: "10 months",
    fullDesc: "A sensitive and award-nominated restoration of a 60-year-old traditional Newari home in Baglung's historic Old Bazaar district. The project involved seismic retrofitting, replacement of decayed structural timbers, full restoration of original carved peacock windows and courtyards, and modern electrical and plumbing upgrades.",
    featured: false,
  },
  {
    name: "Gandaki Wellness Center",
    cat: "hospitality commercial",
    catLabel: "Hospitality",
    loc: "Kali Gandaki Riverside, Baglung",
    desc: "Premium spa and wellness complex with hydrotherapy pool, meditation pavilion, and organic restaurant. Full turnkey delivery.",
    scope: "Wellness Complex",
    year: "2024",
    area: "2,400 sqm",
    duration: "20 months",
    fullDesc: "A premium wellness destination featuring 18 treatment rooms, a 20-metre hydrotherapy pool, Finnish sauna suite, meditation pavilion with lake views, yoga deck, and a farm-to-table organic restaurant. Siddhibinayak handled full construction, structural engineering, interior design, landscaping, and MEP works.",
    featured: false,
  },
  {
    name: "Kali Gandaki Road Infrastructure",
    cat: "civil",
    catLabel: "Civil Works",
    loc: "Kali Gandaki Corridor, Baglung",
    desc: "2.4km road widening, pedestrian walkways, drainage upgrades and landscaping in Baglung's premier tourist corridor.",
    scope: "Road Infrastructure",
    year: "2020",
    area: "2.4 km road",
    duration: "16 months",
    fullDesc: "A major civil infrastructure project involving the widening and resurfacing of 2.4km of Lakeside Road, construction of pedestrian walkways, drainage upgrades, decorative lamp post installation, and landscaping.",
    featured: false,
  },
  {
    name: "Fishtail Forest Retreat",
    cat: "residential",
    catLabel: "Residential",
    loc: "Pumdi Bhumdi, Baglung",
    desc: "Biophilic luxury home in the forest above Baglung with Machhapuchhre views, living walls, and cantilevered viewing deck.",
    scope: "Luxury Residence",
    year: "2023",
    area: "680 sqm",
    duration: "26 months",
    fullDesc: "An exclusive private residence nestled in the forest above Baglung, offering unobstructed views of Machhapuchhre (Fishtail Mountain). Designed around the concept of biophilic architecture, the home features floor-to-ceiling glazing, living green walls, natural stone and reclaimed timber throughout, and a cantilevered viewing deck.",
    featured: false,
  },
  {
    name: "Baglung Bazaar Commercial Plaza",
    cat: "commercial",
    catLabel: "Commercial",
    loc: "Main Road, Baglung",
    desc: "6-storey mixed-use plaza with retail, offices and sky lounge. 94% occupancy achieved within 3 months of handover.",
    scope: "Mixed-Use Commercial",
    year: "2022",
    area: "2,800 sqm",
    duration: "18 months",
    fullDesc: "A six-storey mixed-use commercial plaza featuring ground and first-floor retail units, upper-floor office suites, and a sky lounge on the top floor. The building was delivered under a fast-track 18-month programme and achieved an occupancy rate of 94% within 3 months of handover.",
    featured: false,
  },
  {
    name: "Seti Restaurant & Bar",
    cat: "interior",
    catLabel: "Interior",
    loc: "Baglung Bazaar",
    desc: "Himalayan-inspired restaurant interior with raw stone walls, copper elements, and custom furniture by local Bandipur artisans.",
    scope: "Restaurant Interior",
    year: "2024",
    area: "420 sqm",
    duration: "5 months",
    fullDesc: "A complete interior concept, design, and build for a two-level restaurant and bar celebrating Nepali cuisine and craft beverages. The design draws inspiration from Himalayan geology — raw stone feature walls, hand-hammered copper elements, warm amber lighting, and custom furniture crafted by local artisans in Bandipur.",
    featured: false,
  },
  {
    name: "Seti Gandaki Bridge Approach",
    cat: "civil",
    catLabel: "Civil Works",
    loc: "Bhakunde Beni, Baglung",
    desc: "380m bridge approach road and retaining structures over the Seti Gandaki river, completed in an 8-month programme.",
    scope: "Bridge & Civil Works",
    year: "2019",
    area: "380m road",
    duration: "8 months",
    fullDesc: "Construction of 380m of road approach and retaining structures for a new bridge over the Seti Gandaki river. Works included mass excavation, gabion retaining walls, reinforced concrete abutments, road formation, and installation of safety barriers and lighting.",
    featured: false,
  },
  {
    name: "Gorkha School Retrofit",
    cat: "renovation",
    catLabel: "Renovation",
    loc: "Lekhnath, Baglung",
    desc: "Seismic retrofit and expansion for a primary school of 420 students. Delivered as a community pro-bono project post-earthquake.",
    scope: "Community Retrofit",
    year: "2020",
    area: "780 sqm",
    duration: "9 months",
    fullDesc: "Post-earthquake seismic retrofit and expansion of a primary school serving 420 students. The project reinforced all existing structural frames, added two new classrooms, a science laboratory, a library block, and fully accessible toilet facilities — delivered as a pro-bono community project.",
    featured: false,
  },
];

const FILTERS = [
  { key: "all", label: "All Projects" },
  { key: "residential", label: "Residential" },
  { key: "commercial", label: "Commercial" },
  { key: "interior", label: "Interior" },
  { key: "renovation", label: "Renovation" },
  { key: "hospitality", label: "Hospitality" },
  { key: "civil", label: "Civil Works" },
];

type Project = typeof PROJECTS[0];

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const { open } = useQuote();
  return (
    <div
      className="fixed inset-0 bg-black/65 z-[200] flex items-center justify-center p-5"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-3xl max-w-[680px] w-full relative overflow-hidden max-h-[90vh] overflow-y-auto">
        <div
          className="flex flex-col items-center justify-center gap-2.5 text-[#6b7585] font-mono text-xs"
          style={{ aspectRatio: "16/9", background: "linear-gradient(135deg, #e7e8e9, #d9dadb)" }}
        >
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#6b7585" strokeWidth="1.5">
            <rect x="4" y="16" width="40" height="28" rx="2" />
            <path d="M4 20L24 8l20 12" />
            <rect x="16" y="26" width="16" height="18" />
          </svg>
          project photo
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
          <p className="text-[15px] text-[#4a5568] leading-[1.7] mb-7">{project.fullDesc}</p>
          <div className="grid grid-cols-2 gap-4 mb-7">
            {[
              { label: "Scope", val: project.scope },
              { label: "Year", val: project.year },
              { label: "Area / Scale", val: project.area },
              { label: "Duration", val: project.duration },
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

export default function ProjectsPage() {
  const [filter, setFilter] = useState("all");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [modal, setModal] = useState<Project | null>(null);

  const visible = PROJECTS.filter((p) =>
    filter === "all" || p.cat.includes(filter)
  );

  return (
    <>
      <Navbar activePage="projects" />

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
          <h1 className="font-head font-extrabold leading-[1.1] tracking-tight mb-5" style={{ fontSize: "clamp(36px, 4vw, 56px)", letterSpacing: "-0.02em" }}>
            Every Project,<br />A <span className="text-primary">Story Built</span> in Stone
          </h1>
          <p className="text-[17px] text-[#4a5568] leading-[1.7] max-w-[600px] mb-12">
            From hillside villas overlooking Kali Gandaki River to landmark commercial complexes in Baglung's city centre — each project represents our commitment to precision, heritage, and lasting quality.
          </p>
          {/* Stats row */}
          <div className="flex flex-wrap gap-12 pt-12 border-t border-[#cdd5e3]">
            {[
              { num: "200+", lbl: "Projects Completed" },
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
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="#6b7585" strokeWidth="1.5" className="mx-auto mb-4 opacity-30">
                <rect x="8" y="16" width="48" height="36" rx="4" />
                <path d="M24 16V12h16v4" />
                <circle cx="32" cy="34" r="8" />
                <path d="M32 30v4l3 3" />
              </svg>
              <h3 className="font-head text-[20px] font-bold mb-2">No projects in this category yet</h3>
              <p className="text-[14px]">Check back soon — we're always building.</p>
            </div>
          ) : (
            <div className={view === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7" : "flex flex-col gap-5"}>
              {visible.map((p) => {
                const isFeatured = p.featured && filter === "all";
                if (view === "grid") {
                  return (
                    <div
                      key={p.name}
                      onClick={() => setModal(p)}
                      className={`rounded-2xl overflow-hidden bg-white cursor-pointer border border-transparent hover:-translate-y-1.5 hover:shadow-[0_20px_60px_rgba(0,0,0,0.10)] hover:border-[#cdd5e3] transition-all duration-300 ${isFeatured ? "lg:col-span-2" : ""}`}
                    >
                      <div
                        className="relative overflow-hidden flex flex-col items-center justify-center gap-2.5 text-[#6b7585] font-mono text-[11px]"
                        style={{ aspectRatio: isFeatured ? "16/7" : "4/3", background: "linear-gradient(135deg, #e7e8e9 0%, #d9dadb 100%)" }}
                      >
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#6b7585" strokeWidth="1.5">
                          <rect x="4" y="14" width="32" height="22" rx="2" />
                          <path d="M4 18L20 8l16 10" />
                        </svg>
                        {p.name}
                        <span className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-[11px] font-semibold tracking-[0.06em] uppercase">
                          {p.catLabel}
                        </span>
                        <span className="absolute top-4 right-4 bg-black/50 text-white px-2.5 py-1 rounded-full text-[11px] font-semibold backdrop-blur-sm">
                          {p.year}
                        </span>
                      </div>
                      <div className="p-6">
                        <h3 className={`font-head font-bold mb-2 ${isFeatured ? "text-[24px]" : "text-[18px]"}`}>{p.name}</h3>
                        <p className="text-[13px] text-[#4a5568] flex items-center gap-1.5 mb-3">📍 {p.loc}</p>
                        <p className="text-[14px] text-[#4a5568] leading-[1.6] mb-4 line-clamp-2">{p.desc}</p>
                        <div className="flex items-center justify-between border-t border-[#cdd5e3] pt-3.5">
                          <span className="text-[12px] text-[#3e4a5e] font-medium">{p.scope} · {p.area}</span>
                          <div className="w-8 h-8 rounded-full bg-[#f8f9fa] flex items-center justify-center text-primary text-[16px] hover:bg-primary hover:text-white hover:translate-x-1 transition-all duration-200">→</div>
                        </div>
                      </div>
                    </div>
                  );
                }
                // list view
                return (
                  <div
                    key={p.name}
                    onClick={() => setModal(p)}
                    className="rounded-2xl overflow-hidden bg-white cursor-pointer border border-transparent hover:shadow-[0_20px_60px_rgba(0,0,0,0.10)] hover:border-[#cdd5e3] transition-all duration-300 grid"
                    style={{ gridTemplateColumns: "320px 1fr" }}
                  >
                    <div
                      className="relative flex flex-col items-center justify-center gap-2.5 text-[#6b7585] font-mono text-[11px]"
                      style={{ background: "linear-gradient(135deg, #e7e8e9 0%, #d9dadb 100%)" }}
                    >
                      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#6b7585" strokeWidth="1.5">
                        <rect x="4" y="14" width="32" height="22" rx="2" />
                        <path d="M4 18L20 8l16 10" />
                      </svg>
                      <span className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-[11px] font-semibold tracking-[0.06em] uppercase">
                        {p.catLabel}
                      </span>
                    </div>
                    <div className="p-8 flex flex-col justify-center">
                      <h3 className="font-head text-[22px] font-bold mb-2.5">{p.name}</h3>
                      <p className="text-[13px] text-[#4a5568] flex items-center gap-1.5 mb-3">📍 {p.loc}</p>
                      <p className="text-[14px] text-[#4a5568] leading-[1.6] mb-4 line-clamp-3">{p.desc}</p>
                      <div className="flex items-center justify-between border-t border-[#cdd5e3] pt-3.5">
                        <span className="text-[12px] text-[#3e4a5e] font-medium">{p.scope} · {p.area}</span>
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

      <Footer />

      {modal && <ProjectModal project={modal} onClose={() => setModal(null)} />}
    </>
  );
}
