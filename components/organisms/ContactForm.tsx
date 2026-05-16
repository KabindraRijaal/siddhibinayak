"use client";

import { useState } from "react";
import { toast } from "sonner";

// Design spec: inputs — 8px radius, 1px #e5e7eb border, #fafafa bg, focus: navy border + 3px rgba(15,34,64,0.08) ring
// Labels — 11px / 600 / 0.1em uppercase. Required asterisk in navy.
// iOS: inputs use 16px on mobile (enforced globally in globals.css)
const inputCls = "px-4 py-3 border border-[#e5e7eb] rounded-lg text-[15px] bg-[#fafafa] outline-none focus:border-primary focus:bg-white focus:shadow-[0_0_0_3px_rgba(15,34,64,0.08)] transition-all w-full font-body text-foreground placeholder:text-gray-400";
const labelCls = "text-[11px] font-semibold tracking-[0.1em] uppercase text-[#3e4a5e]";

export function ContactForm() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    toast.success("Message sent! We'll get back to you within 24 hours.");
    (e.target as HTMLFormElement).reset();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className={labelCls}>Full Name *</label>
          <input className={inputCls} type="text" placeholder="Your name" required />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className={labelCls}>Phone Number *</label>
          <input className={inputCls} type="tel" placeholder="+977 98XXXXXXXX" required />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <label className={labelCls}>Email Address</label>
        <input className={inputCls} type="email" placeholder="your@email.com" />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className={labelCls}>Service Required</label>
        <select className={inputCls}>
          <option value="">Select a service…</option>
          <option>Residential Construction</option>
          <option>Architectural Design</option>
          <option>Interior Design</option>
          <option>Commercial Projects</option>
          <option>Renovation &amp; Remodelling</option>
          <option>Roofing Solutions</option>
          <option>Foundation &amp; Civil Works</option>
          <option>Project Management</option>
        </select>
      </div>
      <div className="flex flex-col gap-1.5">
        <label className={labelCls}>Project Details *</label>
        <textarea
          className={`${inputCls} min-h-30 resize-vertical`}
          placeholder="Tell us about your project — location, size, budget range, timeline…"
          required
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="bg-primary text-white font-head font-semibold text-[15px] py-3.5 px-7 rounded-lg hover:bg-[#0a1733] transition-colors flex items-center gap-2 w-fit disabled:opacity-60"
      >
        {loading ? "Sending…" : "Send Message →"}
      </button>
    </form>
  );
}
