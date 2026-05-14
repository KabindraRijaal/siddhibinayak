"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { DEFAULTS } from "@/lib/cms-types";
import type { CmsState } from "@/lib/cms-types";

// ─── localStorage cache key (for live-preview debounce only) ─────────────────
const CMS_KEY = "siddhibinayak_cms";

function deepMerge(target: Record<string, unknown>, source: Record<string, unknown>): Record<string, unknown> {
  const result = { ...target };
  for (const k in source) {
    const sv = source[k];
    const tv = target[k];
    if (sv !== null && typeof sv === "object" && !Array.isArray(sv) && typeof tv === "object" && !Array.isArray(tv)) {
      result[k] = deepMerge(tv as Record<string, unknown>, sv as Record<string, unknown>);
    } else if (sv !== undefined) {
      result[k] = sv;
    }
  }
  return result;
}

function loadState(): CmsState {
  if (typeof window === "undefined") return JSON.parse(JSON.stringify(DEFAULTS));
  try {
    const saved = JSON.parse(localStorage.getItem(CMS_KEY) || "null");
    if (!saved) return JSON.parse(JSON.stringify(DEFAULTS));
    return deepMerge(JSON.parse(JSON.stringify(DEFAULTS)) as unknown as Record<string, unknown>, saved) as unknown as CmsState;
  } catch {
    return JSON.parse(JSON.stringify(DEFAULTS));
  }
}

function setNested(obj: Record<string, unknown>, path: string, value: unknown): Record<string, unknown> {
  const keys = path.split(".");
  const result = { ...obj };
  let cur: Record<string, unknown> = result;
  for (let i = 0; i < keys.length - 1; i++) {
    const k = keys[i];
    const idx = Number(k);
    const key = isNaN(idx) ? k : idx;
    const next = Array.isArray(cur[key as string]) ? [...(cur[key as string] as unknown[])] : { ...(cur[key as string] as Record<string, unknown>) };
    cur[key as string] = next;
    cur = next as Record<string, unknown>;
  }
  const lastKey = keys[keys.length - 1];
  const lastIdx = Number(lastKey);
  cur[isNaN(lastIdx) ? lastKey : lastIdx] = value;
  return result;
}

function getNested(obj: unknown, path: string): unknown {
  return path.split(".").reduce((o: unknown, k) => {
    if (o == null) return "";
    const idx = Number(k);
    return (o as Record<string, unknown>)[isNaN(idx) ? k : idx];
  }, obj);
}

// ─── Sub-components ────────────────────────────────────────────────────────────

function FieldInput({ label, path, hint, state, onChange }: { label: string; path: string; hint?: string; state: CmsState; onChange: (path: string, val: unknown) => void; }) {
  const val = String(getNested(state, path) ?? "");
  return (
    <div className="mb-[22px]">
      <div className="flex items-center justify-between mb-2 text-[11px] font-bold tracking-[0.1em] uppercase text-[#6b7280]">
        {label}
        {hint && <span className="text-[11px] font-medium normal-case tracking-normal text-[#6b7280]">{hint}</span>}
      </div>
      <input
        className="w-full px-[14px] py-[11px] border border-[#e5e7eb] rounded-lg text-[14px] bg-[#fafafa] text-[#111827] outline-none focus:border-[#0f2240] focus:shadow-[0_0_0_3px_rgba(15,34,64,0.08)] focus:bg-white transition-all"
        value={val}
        onChange={e => onChange(path, e.target.value)}
      />
    </div>
  );
}

function FieldTextarea({ label, path, hint, large, state, onChange }: { label: string; path: string; hint?: string; large?: boolean; state: CmsState; onChange: (path: string, val: unknown) => void; }) {
  const raw = getNested(state, path);
  const val = Array.isArray(raw) ? (raw as string[]).join("\n") : String(raw ?? "");
  const isFeatures = path.endsWith(".features");
  return (
    <div className="mb-[22px]">
      <div className="flex items-center justify-between mb-2 text-[11px] font-bold tracking-[0.1em] uppercase text-[#6b7280]">
        {label}
        {hint && <span className="text-[11px] font-medium normal-case tracking-normal text-[#6b7280]">{hint}</span>}
      </div>
      <textarea
        className={`w-full px-[14px] py-[11px] border border-[#e5e7eb] rounded-lg text-[14px] bg-[#fafafa] text-[#111827] outline-none focus:border-[#0f2240] focus:shadow-[0_0_0_3px_rgba(15,34,64,0.08)] focus:bg-white transition-all resize-vertical leading-[1.6] ${large ? "min-h-[140px]" : "min-h-[90px]"}`}
        value={val}
        onChange={e => {
          const v = isFeatures ? e.target.value.split("\n").filter(Boolean) : e.target.value;
          onChange(path, v);
        }}
      />
    </div>
  );
}

function ImgUploader({ label, path, imageId, state, onChange }: {
  label: string;
  path: string;
  imageId: string;
  state: CmsState;
  onChange: (path: string, val: unknown) => void;
}) {
  const val = String(getNested(state, path) ?? "");
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);

  async function handleFile(file: File) {
    if (!file.type.startsWith("image/")) return;
    if (file.size > 5 * 1024 * 1024) {
      alert("Image too large — max 5MB");
      return;
    }
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch(`/api/cms/images/${imageId}`, { method: "POST", body: fd });
      if (!res.ok) throw new Error(await res.text());
      const { url } = await res.json() as { url: string };
      onChange(path, url);
    } catch (e) {
      alert("Upload failed: " + String(e));
    } finally {
      setUploading(false);
    }
  }

  async function handleClear() {
    await fetch(`/api/cms/images/${imageId}`, { method: "DELETE" });
    onChange(path, "");
  }

  return (
    <div className="mb-[22px]">
      <div className="text-[11px] font-bold tracking-[0.1em] uppercase text-[#6b7280] mb-2">{label}</div>
      <div
        className={`border-2 border-dashed rounded-[10px] p-[18px] flex gap-[14px] items-center bg-[#fafafa] cursor-pointer transition-all ${dragging ? "border-[#0f2240] bg-[#eff4fa]" : "border-[#e5e7eb] hover:border-[#0f2240] hover:bg-[#eff4fa]"} ${uploading ? "opacity-60 pointer-events-none" : ""}`}
        onClick={() => inputRef.current?.click()}
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={e => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
      >
        <div
          className="w-[84px] h-[60px] rounded-[6px] bg-[#e5e7eb] shrink-0 flex items-center justify-center text-[9px] font-mono text-[#6b7280] bg-cover bg-center"
          style={val ? { backgroundImage: `url('${val}')` } : {}}
        >
          {!val && (uploading ? "…" : "no image")}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[13px] font-semibold mb-0.5 break-all">
            {uploading ? "Uploading…" : val ? "Image set" : "Drop image or click to upload"}
          </div>
          <div className="text-[11px] text-[#6b7280]">
            {val ? val : "JPG, PNG, WebP · max 5MB"}
          </div>
        </div>
        <button
          className="bg-white border border-[#e5e7eb] px-[12px] py-[6px] rounded-[6px] text-[11px] font-bold font-[Manrope,sans-serif] cursor-pointer shrink-0"
          onClick={e => { e.stopPropagation(); handleClear(); }}
        >Clear</button>
        <input ref={inputRef} type="file" accept="image/*" hidden onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
      </div>
    </div>
  );
}

function RepeaterCard({ title, hint, children, onDelete }: { title: string; hint?: string; children: React.ReactNode; onDelete?: () => void; }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-[#e5e7eb] rounded-[10px] bg-white overflow-hidden">
      <div
        className="px-[14px] py-[12px] flex items-center gap-[10px] cursor-pointer bg-[#fafafa] hover:bg-[#f3f4f6] transition-colors"
        style={open ? { borderBottom: "1px solid #e5e7eb" } : {}}
        onClick={() => setOpen(!open)}
      >
        <span className="text-[#6b7280] cursor-grab font-mono text-[13px]">⋮⋮</span>
        <span className="flex-1 text-[13px] font-semibold">{title}</span>
        {hint && <span className="text-[11px] text-[#9ca3af]">{hint}</span>}
        {onDelete && (
          <button
            className="w-7 h-7 rounded-[6px] border border-transparent bg-transparent cursor-pointer text-[#6b7280] flex items-center justify-center text-[13px] hover:bg-[#fee2e2] hover:text-[#dc2626] transition-all"
            onClick={e => { e.stopPropagation(); if (confirm("Delete this item?")) onDelete(); }}
          >🗑</button>
        )}
      </div>
      {open && <div className="p-[16px]">{children}</div>}
    </div>
  );
}

// ─── Editor Sections ──────────────────────────────────────────────────────────

function EditorHome({ state, onChange }: { state: CmsState; onChange: (path: string, val: unknown) => void; }) {
  return (
    <div className="p-[24px_28px]">
      <div className="mb-[22px]"><div className="text-[11px] font-bold tracking-[0.1em] uppercase text-[#6b7280]">Hero Section</div></div>
      <FieldInput label="Eyebrow Label" path="home.heroLabel" state={state} onChange={onChange} />
      <FieldInput label="Title Line 1" path="home.heroTitle1" state={state} onChange={onChange} />
      <FieldInput label="Title Line 2 (highlighted)" path="home.heroTitle2" hint="colored in primary" state={state} onChange={onChange} />
      <FieldInput label="Title Line 3" path="home.heroTitle3" state={state} onChange={onChange} />
      <FieldTextarea label="Description" path="home.heroDesc" state={state} onChange={onChange} />
      <FieldInput label="Primary Button" path="home.heroPrimaryCta" state={state} onChange={onChange} />
      <FieldInput label="Secondary Button" path="home.heroSecondaryCta" state={state} onChange={onChange} />
      <FieldInput label="Floating Badge" path="home.heroBadge" state={state} onChange={onChange} />
      <ImgUploader label="Hero Image" path="home.heroImage" imageId="hero-main" state={state} onChange={onChange} />

      <div className="mb-[22px] mt-8"><div className="text-[11px] font-bold tracking-[0.1em] uppercase text-[#6b7280]">Stats Banner</div></div>
      <div className="flex flex-col gap-[10px]">
        {state.home.stats.map((s, i) => (
          <RepeaterCard key={i} title={s.label || "Stat"}>
            <FieldInput label="Number" path={`home.stats.${i}.num`} state={state} onChange={onChange} />
            <FieldInput label="Suffix" path={`home.stats.${i}.suffix`} state={state} onChange={onChange} />
            <FieldInput label="Label" path={`home.stats.${i}.label`} state={state} onChange={onChange} />
          </RepeaterCard>
        ))}
      </div>

      <div className="mb-[22px] mt-8"><div className="text-[11px] font-bold tracking-[0.1em] uppercase text-[#6b7280]">About Preview Section</div></div>
      <FieldInput label="Section Title" path="home.aboutTitle" state={state} onChange={onChange} />
      <FieldTextarea label="Paragraph 1" path="home.aboutP1" state={state} onChange={onChange} />
      <FieldTextarea label="Paragraph 2" path="home.aboutP2" state={state} onChange={onChange} />
      <ImgUploader label="About Section Image" path="home.aboutImage" imageId="about-preview" state={state} onChange={onChange} />

      <div className="mb-[22px] mt-8"><div className="text-[11px] font-bold tracking-[0.1em] uppercase text-[#6b7280]">Final CTA Banner</div></div>
      <FieldInput label="Heading" path="home.finalCtaTitle" state={state} onChange={onChange} />
      <FieldTextarea label="Description" path="home.finalCtaDesc" state={state} onChange={onChange} />
      <FieldInput label="Button Text" path="home.finalCtaBtn" state={state} onChange={onChange} />
    </div>
  );
}

function EditorServices({ state, onChange, onAddItem, onRemoveItem }: { state: CmsState; onChange: (path: string, val: unknown) => void; onAddItem: (path: string, item: unknown) => void; onRemoveItem: (path: string, i: number) => void; }) {
  return (
    <div className="p-[24px_28px]">
      <FieldInput label="Page Hero Title" path="services.pageTitle" state={state} onChange={onChange} />
      <FieldTextarea label="Page Description" path="services.pageDesc" state={state} onChange={onChange} />
      <div className="mb-[22px] mt-6">
        <div className="flex items-center justify-between mb-2 text-[11px] font-bold tracking-[0.1em] uppercase text-[#6b7280]">
          Service Items <span className="text-[11px] font-medium normal-case tracking-normal">{state.services.items.length} services</span>
        </div>
        <div className="flex flex-col gap-[10px]">
          {state.services.items.map((s, i) => (
            <RepeaterCard key={i} title={s.title} onDelete={() => onRemoveItem("services.items", i)}>
              <FieldInput label="Title" path={`services.items.${i}.title`} state={state} onChange={onChange} />
              <FieldTextarea label="Description" path={`services.items.${i}.desc`} state={state} onChange={onChange} />
              <FieldInput label="Price" path={`services.items.${i}.price`} state={state} onChange={onChange} />
              <FieldInput label="Price Label" path={`services.items.${i}.priceLabel`} state={state} onChange={onChange} />
              <FieldTextarea label="Features (one per line)" path={`services.items.${i}.features`} hint="split by newline" state={state} onChange={onChange} />
            </RepeaterCard>
          ))}
        </div>
        <button className="mt-[10px] w-full py-[12px] border-[1.5px] border-dashed border-[#e5e7eb] rounded-[10px] text-[13px] font-bold text-[#6b7280] font-[Manrope,sans-serif] cursor-pointer hover:border-[#0f2240] hover:text-[#0f2240] hover:bg-[#eff4fa] transition-all" onClick={() => onAddItem("services.items", { title: "New Service", desc: "", price: "", priceLabel: "", features: [] })}>+ Add Service</button>
      </div>
    </div>
  );
}

function EditorProjects({ state, onChange, onAddItem, onRemoveItem }: { state: CmsState; onChange: (path: string, val: unknown) => void; onAddItem: (path: string, item: unknown) => void; onRemoveItem: (path: string, i: number) => void; }) {
  const cats = ["Residential", "Commercial", "Hospitality", "Renovation", "Interior", "Civil Works"];
  return (
    <div className="p-[24px_28px]">
      <div className="flex flex-col gap-[10px]">
        {state.projects.map((p, i) => (
          <RepeaterCard key={p.id} title={`${p.name}${p.featured ? " ⭐" : ""}`} hint={p.category} onDelete={() => onRemoveItem("projects", i)}>
            <FieldInput label="Name" path={`projects.${i}.name`} state={state} onChange={onChange} />
            <div className="mb-[22px]">
              <div className="text-[11px] font-bold tracking-[0.1em] uppercase text-[#6b7280] mb-2">Category</div>
              <select
                className="w-full px-[14px] py-[11px] border border-[#e5e7eb] rounded-lg text-[14px] bg-[#fafafa] text-[#111827] outline-none focus:border-[#0f2240] focus:bg-white transition-all"
                value={p.category}
                onChange={e => onChange(`projects.${i}.category`, e.target.value)}
              >
                {cats.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <FieldInput label="Location" path={`projects.${i}.location`} state={state} onChange={onChange} />
            <FieldInput label="Year" path={`projects.${i}.year`} state={state} onChange={onChange} />
            <FieldInput label="Area / Size" path={`projects.${i}.area`} state={state} onChange={onChange} />
            <FieldTextarea label="Description" path={`projects.${i}.desc`} state={state} onChange={onChange} />
            <div className="mb-[22px]">
              <label className="flex gap-2 items-center text-[13px] cursor-pointer select-none">
                <input type="checkbox" checked={p.featured} onChange={e => onChange(`projects.${i}.featured`, e.target.checked)} />
                Featured (large card on homepage)
              </label>
            </div>
            <ImgUploader label="Project Image" path={`projects.${i}.image`} imageId={p.id} state={state} onChange={onChange} />
          </RepeaterCard>
        ))}
      </div>
      <button
        className="mt-[10px] w-full py-[12px] border-[1.5px] border-dashed border-[#e5e7eb] rounded-[10px] text-[13px] font-bold text-[#6b7280] font-[Manrope,sans-serif] cursor-pointer hover:border-[#0f2240] hover:text-[#0f2240] hover:bg-[#eff4fa] transition-all"
        onClick={() => {
          const newId = `project-${Date.now()}`;
          onAddItem("projects", { id: newId, name: "New Project", category: "Residential", location: "", year: "2026", area: "", desc: "", featured: false, image: "" });
        }}
      >+ Add Project</button>
    </div>
  );
}

function EditorAbout({ state, onChange }: { state: CmsState; onChange: (path: string, val: unknown) => void; }) {
  return (
    <div className="p-[24px_28px]">
      <FieldInput label="Page Title" path="about.pageTitle" state={state} onChange={onChange} />
      <FieldTextarea label="Page Description" path="about.pageDesc" state={state} onChange={onChange} />
      <div className="mb-[22px] mt-6"><div className="text-[11px] font-bold tracking-[0.1em] uppercase text-[#6b7280]">Our Story</div></div>
      <FieldTextarea label="Paragraph 1" path="about.storyP1" state={state} onChange={onChange} />
      <FieldTextarea label="Paragraph 2" path="about.storyP2" state={state} onChange={onChange} />
      <FieldTextarea label="Paragraph 3" path="about.storyP3" state={state} onChange={onChange} />
      <ImgUploader label="Story Image" path="about.storyImage" imageId="about-story" state={state} onChange={onChange} />
      <div className="mb-[22px] mt-6"><div className="text-[11px] font-bold tracking-[0.1em] uppercase text-[#6b7280]">Pillars</div></div>
      <FieldTextarea label="Mission" path="about.mission" state={state} onChange={onChange} />
      <FieldTextarea label="Vision" path="about.vision" state={state} onChange={onChange} />
      <FieldTextarea label="Values" path="about.values" state={state} onChange={onChange} />
    </div>
  );
}

function EditorContact({ state, onChange }: { state: CmsState; onChange: (path: string, val: unknown) => void; }) {
  return (
    <div className="p-[24px_28px]">
      <FieldInput label="Page Title" path="contact.pageTitle" state={state} onChange={onChange} />
      <FieldTextarea label="Page Description" path="contact.pageDesc" state={state} onChange={onChange} />
      <FieldTextarea label="Office Address" path="contact.address" hint="newlines preserved" state={state} onChange={onChange} />
      <FieldInput label="Primary Email" path="contact.email1" state={state} onChange={onChange} />
      <FieldInput label="Secondary Email" path="contact.email2" state={state} onChange={onChange} />
      <FieldInput label="Office Phone" path="contact.phone1" state={state} onChange={onChange} />
      <FieldInput label="Mobile Phone" path="contact.phone2" state={state} onChange={onChange} />
      <FieldTextarea label="Office Hours" path="contact.hours" hint="newlines preserved" state={state} onChange={onChange} />
    </div>
  );
}

function EditorTestimonials({ state, onChange, onAddItem, onRemoveItem }: { state: CmsState; onChange: (path: string, val: unknown) => void; onAddItem: (path: string, item: unknown) => void; onRemoveItem: (path: string, i: number) => void; }) {
  return (
    <div className="p-[24px_28px]">
      <div className="flex flex-col gap-[10px]">
        {state.testimonials.map((t, i) => (
          <RepeaterCard key={i} title={t.name || "New Testimonial"} onDelete={() => onRemoveItem("testimonials", i)}>
            <FieldInput label="Client Name" path={`testimonials.${i}.name`} state={state} onChange={onChange} />
            <FieldInput label="Role / Project" path={`testimonials.${i}.role`} state={state} onChange={onChange} />
            <FieldTextarea label="Quote" path={`testimonials.${i}.quote`} large state={state} onChange={onChange} />
          </RepeaterCard>
        ))}
      </div>
      <button className="mt-[10px] w-full py-[12px] border-[1.5px] border-dashed border-[#e5e7eb] rounded-[10px] text-[13px] font-bold text-[#6b7280] font-[Manrope,sans-serif] cursor-pointer hover:border-[#0f2240] hover:text-[#0f2240] hover:bg-[#eff4fa] transition-all" onClick={() => onAddItem("testimonials", { name: "", role: "", quote: "" })}>+ Add Testimonial</button>
    </div>
  );
}

function EditorTeam({ state, onChange, onAddItem, onRemoveItem }: { state: CmsState; onChange: (path: string, val: unknown) => void; onAddItem: (path: string, item: unknown) => void; onRemoveItem: (path: string, i: number) => void; }) {
  return (
    <div className="p-[24px_28px]">
      <div className="flex flex-col gap-[10px]">
        {state.team.map((m, i) => (
          <RepeaterCard key={i} title={m.name || "New Member"} hint={m.role} onDelete={() => onRemoveItem("team", i)}>
            <FieldInput label="Full Name" path={`team.${i}.name`} state={state} onChange={onChange} />
            <FieldInput label="Role" path={`team.${i}.role`} state={state} onChange={onChange} />
            <FieldInput label="Initials (fallback)" path={`team.${i}.initials`} state={state} onChange={onChange} />
            <ImgUploader label="Profile Photo" path={`team.${i}.image`} imageId={m.imageId} state={state} onChange={onChange} />
          </RepeaterCard>
        ))}
      </div>
      <button
        className="mt-[10px] w-full py-[12px] border-[1.5px] border-dashed border-[#e5e7eb] rounded-[10px] text-[13px] font-bold text-[#6b7280] font-[Manrope,sans-serif] cursor-pointer hover:border-[#0f2240] hover:text-[#0f2240] hover:bg-[#eff4fa] transition-all"
        onClick={() => {
          const id = `team-${Date.now()}`;
          onAddItem("team", { name: "", role: "", initials: "", image: "", imageId: id });
        }}
      >+ Add Team Member</button>
    </div>
  );
}

function EditorFaqs({ state, onChange, onAddItem, onRemoveItem }: { state: CmsState; onChange: (path: string, val: unknown) => void; onAddItem: (path: string, item: unknown) => void; onRemoveItem: (path: string, i: number) => void; }) {
  return (
    <div className="p-[24px_28px]">
      <div className="flex flex-col gap-[10px]">
        {state.faqs.map((f, i) => (
          <RepeaterCard key={i} title={f.q || "New question"} onDelete={() => onRemoveItem("faqs", i)}>
            <FieldInput label="Question" path={`faqs.${i}.q`} state={state} onChange={onChange} />
            <FieldTextarea label="Answer" path={`faqs.${i}.a`} state={state} onChange={onChange} />
          </RepeaterCard>
        ))}
      </div>
      <button className="mt-[10px] w-full py-[12px] border-[1.5px] border-dashed border-[#e5e7eb] rounded-[10px] text-[13px] font-bold text-[#6b7280] font-[Manrope,sans-serif] cursor-pointer hover:border-[#0f2240] hover:text-[#0f2240] hover:bg-[#eff4fa] transition-all" onClick={() => onAddItem("faqs", { q: "", a: "" })}>+ Add FAQ</button>
    </div>
  );
}

function EditorTimeline({ state, onChange, onAddItem, onRemoveItem }: { state: CmsState; onChange: (path: string, val: unknown) => void; onAddItem: (path: string, item: unknown) => void; onRemoveItem: (path: string, i: number) => void; }) {
  return (
    <div className="p-[24px_28px]">
      <div className="flex flex-col gap-[10px]">
        {state.timeline.map((t, i) => (
          <RepeaterCard key={i} title={`${t.year} — ${t.title}`} onDelete={() => onRemoveItem("timeline", i)}>
            <FieldInput label="Year" path={`timeline.${i}.year`} state={state} onChange={onChange} />
            <FieldInput label="Title" path={`timeline.${i}.title`} state={state} onChange={onChange} />
            <FieldTextarea label="Description" path={`timeline.${i}.desc`} state={state} onChange={onChange} />
          </RepeaterCard>
        ))}
      </div>
      <button className="mt-[10px] w-full py-[12px] border-[1.5px] border-dashed border-[#e5e7eb] rounded-[10px] text-[13px] font-bold text-[#6b7280] font-[Manrope,sans-serif] cursor-pointer hover:border-[#0f2240] hover:text-[#0f2240] hover:bg-[#eff4fa] transition-all" onClick={() => onAddItem("timeline", { year: "", title: "", desc: "" })}>+ Add Milestone</button>
    </div>
  );
}

function EditorSettings({ state, onChange }: { state: CmsState; onChange: (path: string, val: unknown) => void; }) {
  return (
    <div className="p-[24px_28px]">
      <FieldInput label="Brand Name" path="settings.brandName" state={state} onChange={onChange} />
      <FieldInput label="Tagline" path="settings.tagline" state={state} onChange={onChange} />
      <FieldInput label="Site URL" path="settings.siteUrl" state={state} onChange={onChange} />
      <FieldTextarea label="Meta Description" path="settings.metaDesc" hint="for SEO" state={state} onChange={onChange} />
      <div className="mb-[22px] mt-6"><div className="text-[11px] font-bold tracking-[0.1em] uppercase text-[#6b7280]">Social Links</div></div>
      <FieldInput label="Facebook URL" path="settings.facebook" state={state} onChange={onChange} />
      <FieldInput label="Instagram URL" path="settings.instagram" state={state} onChange={onChange} />
      <FieldInput label="YouTube URL" path="settings.youtube" state={state} onChange={onChange} />
    </div>
  );
}

function EditorBrand({ state, onChange }: { state: CmsState; onChange: (path: string, val: unknown) => void; }) {
  const colorField = (label: string, path: string) => {
    const val = String(getNested(state, path) ?? "");
    return (
      <div className="mb-[22px]">
        <div className="text-[11px] font-bold tracking-[0.1em] uppercase text-[#6b7280] mb-2">{label}</div>
        <div className="flex gap-[10px] items-center">
          <input type="color" value={val} onChange={e => onChange(path, e.target.value)} className="w-[60px] h-[40px] border border-[#e5e7eb] rounded-[6px] cursor-pointer bg-white" />
          <input className="flex-1 px-[14px] py-[11px] border border-[#e5e7eb] rounded-lg text-[14px] bg-[#fafafa] text-[#111827] outline-none focus:border-[#0f2240] focus:bg-white transition-all" value={val} onChange={e => onChange(path, e.target.value)} />
        </div>
      </div>
    );
  };
  return (
    <div className="p-[24px_28px]">
      {colorField("Primary Color", "brand.primary")}
      {colorField("Primary Dark", "brand.primaryDark")}
      {colorField("Secondary", "brand.secondary")}
      <FieldInput label="Heading Font" path="brand.fontHead" state={state} onChange={onChange} />
      <FieldInput label="Body Font" path="brand.fontBody" state={state} onChange={onChange} />
    </div>
  );
}

function EditorNavigation({ state, onChange, onAddItem, onRemoveItem }: { state: CmsState; onChange: (path: string, val: unknown) => void; onAddItem: (path: string, item: unknown) => void; onRemoveItem: (path: string, i: number) => void; }) {
  return (
    <div className="p-[24px_28px]">
      <div className="flex flex-col gap-[10px]">
        {state.navigation.map((n, i) => (
          <RepeaterCard key={i} title={n.label || "New link"} onDelete={() => onRemoveItem("navigation", i)}>
            <FieldInput label="Label" path={`navigation.${i}.label`} state={state} onChange={onChange} />
            <FieldInput label="URL" path={`navigation.${i}.url`} state={state} onChange={onChange} />
          </RepeaterCard>
        ))}
      </div>
      <button className="mt-[10px] w-full py-[12px] border-[1.5px] border-dashed border-[#e5e7eb] rounded-[10px] text-[13px] font-bold text-[#6b7280] font-[Manrope,sans-serif] cursor-pointer hover:border-[#0f2240] hover:text-[#0f2240] hover:bg-[#eff4fa] transition-all" onClick={() => onAddItem("navigation", { label: "", url: "" })}>+ Add Menu Item</button>
    </div>
  );
}

// ─── Sidebar nav config ───────────────────────────────────────────────────────
type PageKey = "home" | "services" | "projects" | "about" | "contact" | "testimonials" | "team" | "faqs" | "timeline" | "settings" | "brand" | "navigation";

const PAGE_URL_MAP: Record<PageKey, string> = {
  home: "/", services: "/services", projects: "/projects",
  about: "/about", contact: "/contact", testimonials: "/",
  team: "/about", faqs: "/contact", timeline: "/about",
  settings: "/", brand: "/", navigation: "/",
};

const PAGE_META: Record<PageKey, { crumb: string; title: string; sub: string; }> = {
  home: { crumb: "Pages › Home", title: "Homepage Content", sub: "Edit hero, stats, about preview, and final CTA" },
  services: { crumb: "Pages › Services", title: "Services Page", sub: "Edit page intro and service offerings" },
  projects: { crumb: "Library › Projects", title: "Project Portfolio", sub: "Manage project entries" },
  about: { crumb: "Pages › About", title: "About Page", sub: "Story, mission, vision, values" },
  contact: { crumb: "Pages › Contact", title: "Contact Page", sub: "Office details and page intro" },
  testimonials: { crumb: "Library › Testimonials", title: "Client Testimonials", sub: "Manage review entries" },
  team: { crumb: "Library › Team", title: "Team Members", sub: "Manage team entries" },
  faqs: { crumb: "Library › FAQs", title: "Frequently Asked Questions", sub: "Manage FAQ entries" },
  timeline: { crumb: "Library › Timeline", title: "Company Timeline", sub: "Manage milestone entries" },
  settings: { crumb: "Global › Site Settings", title: "Site Settings", sub: "Brand info, social links, SEO" },
  brand: { crumb: "Global › Brand", title: "Brand & Colors", sub: "Primary palette and typography" },
  navigation: { crumb: "Global › Navigation", title: "Main Navigation", sub: "Menu items and links" },
};

// ─── Main CRM Page ────────────────────────────────────────────────────────────
export default function CrmPage() {
  const [state, setState] = useState<CmsState>(loadState);
  const [dirty, setDirtyState] = useState(false);
  const [saving, setSaving] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageKey>("home");
  const [viewport, setViewport] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [toast, setToast] = useState<{ msg: string; show: boolean }>({ msg: "", show: false });
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Load from server on mount
  useEffect(() => {
    fetch("/api/cms")
      .then(r => r.json())
      .then((data: CmsState) => {
        setState(data);
        localStorage.setItem(CMS_KEY, JSON.stringify(data));
      })
      .catch(() => {/* keep loadState() default */});
  }, []);

  const showToast = useCallback((msg: string) => {
    setToast({ msg, show: true });
    setTimeout(() => setToast(t => ({ ...t, show: false })), 2400);
  }, []);

  const persist = useCallback((s: CmsState) => {
    localStorage.setItem(CMS_KEY, JSON.stringify(s));
  }, []);

  const handleChange = useCallback((path: string, val: unknown) => {
    setState(prev => {
      const next = setNested(prev as unknown as Record<string, unknown>, path, val) as unknown as CmsState;
      setDirtyState(true);
      persist(next);
      iframeRef.current?.contentWindow?.postMessage({ type: "cms-preview-update", cms: next }, "*");
      return next;
    });
  }, [persist]);

  const handleAddItem = useCallback((path: string, item: unknown) => {
    setState(prev => {
      const arr = [...(getNested(prev, path) as unknown[])];
      arr.push(item);
      const next = setNested(prev as unknown as Record<string, unknown>, path, arr) as unknown as CmsState;
      persist(next);
      setDirtyState(true);
      iframeRef.current?.contentWindow?.postMessage({ type: "cms-preview-update", cms: next }, "*");
      return next;
    });
  }, [persist]);

  const handleRemoveItem = useCallback((path: string, i: number) => {
    setState(prev => {
      const arr = [...(getNested(prev, path) as unknown[])];
      arr.splice(i, 1);
      const next = setNested(prev as unknown as Record<string, unknown>, path, arr) as unknown as CmsState;
      persist(next);
      setDirtyState(true);
      iframeRef.current?.contentWindow?.postMessage({ type: "cms-preview-update", cms: next }, "*");
      return next;
    });
  }, [persist]);

  const handleSaveAll = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/cms", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state),
      });
      if (!res.ok) throw new Error(await res.text());
      setDirtyState(false);
      showToast("✓ Published — changes are now live");
    } catch (e) {
      showToast("✗ Save failed: " + String(e));
    } finally {
      setSaving(false);
    }
  };

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "siddhibinayak-content.json";
    a.click();
    showToast("✓ content.json downloaded");
  };

  const handleSelectPage = (page: PageKey) => {
    setCurrentPage(page);
    if (window.innerWidth <= 820) setSidebarOpen(false);
  };

  const previewUrl = PAGE_URL_MAP[currentPage];
  const meta = PAGE_META[currentPage];
  const iframeMaxWidth = viewport === "mobile" ? "390px" : viewport === "tablet" ? "768px" : "100%";

  const sideNav = (items: { page: PageKey; icon: React.ReactNode; label: string; count?: number | string; }[]) =>
    items.map(({ page, icon, label, count }) => (
      <button
        key={page}
        onClick={() => handleSelectPage(page)}
        className={`w-full flex items-center gap-[10px] px-[20px] py-[9px] text-[13px] font-medium cursor-pointer border-l-2 transition-all text-left ${currentPage === page ? "bg-[#eff4fa] border-l-[#0f2240] text-[#0f2240] font-semibold" : "border-l-transparent hover:bg-[#f3f4f6]"}`}
      >
        <span className={`w-4 h-4 shrink-0 ${currentPage === page ? "opacity-100" : "opacity-70"}`}>{icon}</span>
        <span className="flex-1">{label}</span>
        {count !== undefined && (
          <span className={`text-[11px] px-[7px] py-[1px] rounded-full ${currentPage === page ? "bg-[#0f2240] text-white" : "bg-[#e5e7eb] text-[#6b7280]"}`}>{count}</span>
        )}
      </button>
    ));

  const renderEditor = () => {
    const props = { state, onChange: handleChange };
    const listProps = { ...props, onAddItem: handleAddItem, onRemoveItem: handleRemoveItem };
    switch (currentPage) {
      case "home": return <EditorHome {...props} />;
      case "services": return <EditorServices {...listProps} />;
      case "projects": return <EditorProjects {...listProps} />;
      case "about": return <EditorAbout {...props} />;
      case "contact": return <EditorContact {...props} />;
      case "testimonials": return <EditorTestimonials {...listProps} />;
      case "team": return <EditorTeam {...listProps} />;
      case "faqs": return <EditorFaqs {...listProps} />;
      case "timeline": return <EditorTimeline {...listProps} />;
      case "settings": return <EditorSettings {...props} />;
      case "brand": return <EditorBrand {...props} />;
      case "navigation": return <EditorNavigation {...listProps} />;
    }
  };

  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => { if (dirty) { e.preventDefault(); e.returnValue = ""; } };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [dirty]);

  return (
    <div className="flex flex-col h-screen overflow-hidden" style={{ fontFamily: "var(--font-body, 'Work Sans', sans-serif)" }}>

      {/* TOP BAR */}
      <div className="h-14 bg-[#111517] text-white flex items-center px-5 gap-4 shrink-0 border-b border-[#1f2937]">
        {/* Mobile menu btn */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={`md:hidden inline-flex items-center justify-center w-9 h-9 rounded-[6px] border shrink-0 transition-all ${sidebarOpen ? "bg-[#0f2240] border-[#0f2240]" : "bg-white/[0.08] border-white/[0.12] hover:bg-white/[0.16]"}`}
          aria-label="Menu"
        >
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="w-[18px] h-[18px]"><path d="M2 4h12M2 8h12M2 12h12"/></svg>
        </button>

        {/* Brand */}
        <div className="flex items-center gap-[10px] font-[Manrope,sans-serif] font-extrabold text-[15px] tracking-[-0.01em]">
          <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center overflow-hidden shrink-0">
            <Image src="/logo.jpg" alt="" width={28} height={28} className="object-cover" onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
          </div>
          <span>Siddhibinayak CMS</span>
          <span className="text-[9px] font-bold tracking-[0.12em] px-[7px] py-[3px] rounded-full bg-[#0f2240]/20 text-[#ff9f7a] ml-1">CRM</span>
        </div>

        <div className="flex-1" />

        {/* Save status */}
        <div className="text-[12px] text-white/50 items-center gap-2 hidden sm:flex">
          <span className={`w-2 h-2 rounded-full ${dirty ? "bg-[#fbbf24] shadow-[0_0_8px_#fbbf24]" : "bg-[#34d399] shadow-[0_0_8px_#34d399]"}`} />
          <span>{dirty ? "Unsaved changes" : "All changes saved"}</span>
        </div>

        {/* Action buttons */}
        <a href="/" target="_blank" className="inline-flex items-center gap-1.5 bg-white/[0.08] text-white border border-white/[0.12] px-[14px] py-[7px] rounded-[6px] text-[12px] font-bold font-[Manrope,sans-serif] cursor-pointer hover:bg-white/[0.14] transition-all no-underline">
          🔗<span className="hidden sm:inline"> Live Site</span>
        </a>
        <button onClick={handleExport} className="inline-flex items-center gap-1.5 bg-white/[0.08] text-white border border-white/[0.12] px-[14px] py-[7px] rounded-[6px] text-[12px] font-bold font-[Manrope,sans-serif] cursor-pointer hover:bg-white/[0.14] transition-all">
          ⬇<span className="hidden sm:inline"> Export</span>
        </button>
        <button
          onClick={handleSaveAll}
          disabled={saving}
          className="inline-flex items-center gap-1.5 bg-[#0f2240] text-white border border-[#0f2240] px-[14px] py-[7px] rounded-[6px] text-[12px] font-bold font-[Manrope,sans-serif] cursor-pointer hover:bg-[#0a1733] transition-all disabled:opacity-60"
        >
          {saving ? "⏳" : "💾"}<span className="hidden sm:inline">{saving ? " Saving…" : " Publish"}</span>
        </button>
      </div>

      {/* MAIN */}
      <div className="flex-1 min-h-0 overflow-hidden relative" style={{ display: "grid", gridTemplateColumns: "240px 1fr 1fr" }}>

        {/* Mobile backdrop */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 top-14 bg-black/40 z-50 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* SIDEBAR */}
        <aside className={`bg-[#fafafa] border-r border-[#e5e7eb] overflow-y-auto py-4 z-[60] transition-transform duration-250
          md:relative md:translate-x-0
          max-md:fixed max-md:top-14 max-md:bottom-0 max-md:w-[260px] max-md:shadow-[4px_0_16px_rgba(0,0,0,0.08)]
          ${sidebarOpen ? "max-md:translate-x-0" : "max-md:-translate-x-full"}`}>
          <div className="text-[10px] font-bold tracking-[0.12em] uppercase text-[#6b7280] px-5 pb-2 pt-[14px]">Pages</div>
          {sideNav([
            { page: "home", label: "Home", count: 8, icon: <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4"><path d="M2 8L8 2l6 6v6H2V8z"/></svg> },
            { page: "services", label: "Services", count: state.services.items.length, icon: <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4"><rect x="2" y="3" width="12" height="10" rx="1"/><path d="M2 7h12"/></svg> },
            { page: "projects", label: "Projects", count: state.projects.length, icon: <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4"><rect x="2" y="2" width="5" height="5"/><rect x="9" y="2" width="5" height="5"/><rect x="2" y="9" width="5" height="5"/><rect x="9" y="9" width="5" height="5"/></svg> },
            { page: "about", label: "About", count: 6, icon: <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4"><circle cx="8" cy="6" r="2.5"/><path d="M3 14c0-3 2-5 5-5s5 2 5 5"/></svg> },
            { page: "contact", label: "Contact", count: 6, icon: <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4"><path d="M2 4h12v8H2z"/><path d="M2 4l6 5 6-5"/></svg> },
          ])}

          <div className="text-[10px] font-bold tracking-[0.12em] uppercase text-[#6b7280] px-5 pb-2 pt-[14px]">Library</div>
          {sideNav([
            { page: "testimonials", label: "Testimonials", count: state.testimonials.length, icon: <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4"><path d="M3 4h10v6H7l-3 3v-3H3z"/></svg> },
            { page: "team", label: "Team", count: state.team.length, icon: <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4"><circle cx="6" cy="6" r="2"/><circle cx="11" cy="6" r="2"/><path d="M2 13c0-2 2-3 4-3s4 1 4 3M9 13c0-2 1-3 3-3"/></svg> },
            { page: "faqs", label: "FAQs", count: state.faqs.length, icon: <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4"><circle cx="8" cy="8" r="6"/><path d="M6 6.5c0-1 1-2 2-2s2 1 2 2-2 1-2 2.5"/><circle cx="8" cy="11.5" r="0.5" fill="currentColor"/></svg> },
            { page: "timeline", label: "Timeline", count: state.timeline.length, icon: <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4"><path d="M2 8h12"/><circle cx="4" cy="8" r="1.5"/><circle cx="8" cy="8" r="1.5"/><circle cx="12" cy="8" r="1.5"/></svg> },
          ])}

          <div className="text-[10px] font-bold tracking-[0.12em] uppercase text-[#6b7280] px-5 pb-2 pt-[14px]">Global</div>
          {sideNav([
            { page: "settings", label: "Site Settings", icon: <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4"><circle cx="8" cy="8" r="2.5"/><path d="M8 1v2M8 13v2M1 8h2M13 8h2M3 3l1.5 1.5M11.5 11.5L13 13M3 13l1.5-1.5M11.5 4.5L13 3"/></svg> },
            { page: "brand", label: "Brand & Colors", icon: <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4"><circle cx="8" cy="8" r="6"/><circle cx="5" cy="6" r="0.8" fill="currentColor"/><circle cx="11" cy="6" r="0.8" fill="currentColor"/><circle cx="6" cy="10" r="0.8" fill="currentColor"/></svg> },
            { page: "navigation", label: "Navigation", count: state.navigation.length, icon: <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4"><path d="M2 4h12M2 8h12M2 12h12"/></svg> },
          ])}
        </aside>

        {/* EDITOR */}
        <main
          className="bg-white overflow-y-auto border-r border-[#e5e7eb]"
          style={{ display: previewMode ? "none" : "block", gridColumn: previewMode ? undefined : undefined }}
        >
          {/* Sticky header */}
          <div className="px-7 pt-6 pb-4 border-b border-[#e5e7eb] sticky top-0 bg-white z-10">
            <div className="text-[11px] font-bold tracking-[0.1em] uppercase text-[#6b7280] mb-1.5">{meta.crumb}</div>
            <div className="font-[Manrope,sans-serif] text-[22px] font-extrabold tracking-[-0.01em] mb-1">{meta.title}</div>
            <div className="text-[13px] text-[#6b7280]">{meta.sub}</div>
          </div>
          {renderEditor()}
        </main>

        {/* PREVIEW */}
        <section className="bg-[#f6f7f9] flex flex-col min-w-0">
          {/* Preview bar */}
          <div className="h-11 bg-white border-b border-[#e5e7eb] px-4 flex items-center gap-3 shrink-0">
            <div className="flex gap-0.5 bg-[#f3f4f6] rounded-lg p-[3px]">
              {(["desktop", "tablet", "mobile"] as const).map(vp => (
                <button
                  key={vp}
                  onClick={() => setViewport(vp)}
                  className={`px-3 py-[5px] rounded-[6px] text-[11px] font-bold font-[Manrope,sans-serif] cursor-pointer border-none transition-all ${viewport === vp ? "bg-white text-[#111827] shadow-[0_1px_2px_rgba(0,0,0,0.06)]" : "bg-transparent text-[#6b7280] hover:text-[#111827]"}`}
                >
                  {vp === "desktop" ? "🖥 Desktop" : vp === "tablet" ? "📱 Tablet" : "📱 Mobile"}
                </button>
              ))}
            </div>
            <div className="flex-1 font-mono text-[11px] text-[#6b7280] px-3 py-[6px] bg-[#f3f4f6] rounded-[6px] overflow-hidden text-ellipsis whitespace-nowrap">
              {previewUrl}
            </div>
            <button
              className="bg-[#f3f4f6] text-[#111827] border border-[#e5e7eb] px-[14px] py-[7px] rounded-[6px] text-[12px] font-bold font-[Manrope,sans-serif] cursor-pointer hover:bg-[#e5e7eb] transition-all"
              onClick={() => { if (iframeRef.current) iframeRef.current.src = iframeRef.current.src; }}
            >↻</button>
          </div>

          {/* Preview frame */}
          <div className="flex-1 p-4 overflow-auto flex justify-center">
            <iframe
              ref={iframeRef}
              src={previewUrl}
              className="w-full bg-white border border-[#e5e7eb] rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition-[max-width] duration-300"
              style={{ maxWidth: iframeMaxWidth, minHeight: "600px", height: "100%" }}
              title="Live Preview"
              onLoad={() => {
                iframeRef.current?.contentWindow?.postMessage(
                  { type: "cms-preview-update", cms: state },
                  "*"
                );
              }}
            />
          </div>
        </section>
      </div>

      {/* Mobile bottom pane tabs */}
      <div className="md:hidden fixed bottom-[14px] left-1/2 -translate-x-1/2 z-[70] bg-[#111517] p-1 rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.3)] flex gap-0.5">
        <button onClick={() => setPreviewMode(false)} className={`px-4 py-2 rounded-full text-[12px] font-bold font-[Manrope,sans-serif] border-none cursor-pointer flex items-center gap-1.5 ${!previewMode ? "bg-[#0f2240] text-white" : "bg-transparent text-white/60"}`}>✎ Edit</button>
        <button onClick={() => setPreviewMode(true)} className={`px-4 py-2 rounded-full text-[12px] font-bold font-[Manrope,sans-serif] border-none cursor-pointer flex items-center gap-1.5 ${previewMode ? "bg-[#0f2240] text-white" : "bg-transparent text-white/60"}`}>👁 Preview</button>
      </div>

      {/* Toast */}
      <div
        className={`fixed bottom-6 right-6 bg-[#1a3d2c] text-white px-[18px] py-3 rounded-lg text-[13px] font-medium z-[200] flex items-center gap-2 pointer-events-none transition-all duration-300 ${toast.show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
      >
        {toast.msg}
      </div>
    </div>
  );
}
