"use client";

import { useState } from "react";
import { Navbar } from "@/components/organisms/Navbar";
import { Footer } from "@/components/organisms/Footer";
import { CTABanner } from "@/components/layout/CTABanner";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/atoms/Container";
import { useCms } from "@/components/CmsShell";

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`bg-white rounded-xl border overflow-hidden transition-all duration-200 ${open ? "border-primary shadow-[0_8px_24px_rgba(15,34,64,0.06)]" : "border-[#cdd5e3]"}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left"
      >
        <span className="font-head text-[16px] font-semibold">{q}</span>
        <span className={`w-7 h-7 rounded-full flex items-center justify-center text-[16px] shrink-0 transition-all duration-300 ${open ? "bg-primary text-white rotate-45" : "bg-[#f8f9fa] text-primary"}`}>
          +
        </span>
      </button>
      {open && (
        <div className="px-6 pb-5 text-[14px] text-[#4a5568] leading-[1.7]">{a}</div>
      )}
    </div>
  );
}

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="text-primary font-head font-bold text-lg mb-2">Message sent!</div>
        <div className="text-[14px] text-gray-500">We&apos;ll respond within 24 hours.</div>
      </div>
    );
  }

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
    >
      <div className="grid sm:grid-cols-2 gap-3.5">
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-semibold tracking-widest uppercase text-[#3e4a5e]">Full Name *</label>
          <input required type="text" placeholder="Your name" className="px-3.5 py-3 border border-[#cdd5e3] rounded-lg text-[14px] bg-[#f8f9fa] outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(15,34,64,0.08)] focus:bg-white transition-all" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-semibold tracking-widest uppercase text-[#3e4a5e]">Phone *</label>
          <input required type="tel" placeholder="+977 98XXXXXXXX" className="px-3.5 py-3 border border-[#cdd5e3] rounded-lg text-[14px] bg-[#f8f9fa] outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(15,34,64,0.08)] focus:bg-white transition-all" />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-[11px] font-semibold tracking-widest uppercase text-[#3e4a5e]">Email Address</label>
        <input type="email" placeholder="your@email.com" className="px-3.5 py-3 border border-[#cdd5e3] rounded-lg text-[14px] bg-[#f8f9fa] outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(15,34,64,0.08)] focus:bg-white transition-all" />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-[11px] font-semibold tracking-widest uppercase text-[#3e4a5e]">Service Required</label>
        <select className="px-3.5 py-3 border border-[#cdd5e3] rounded-lg text-[14px] bg-[#f8f9fa] outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(15,34,64,0.08)] focus:bg-white transition-all">
          <option value="">Select a service…</option>
          <option>Residential Construction</option>
          <option>Architectural Design</option>
          <option>Interior Design</option>
          <option>Commercial Projects</option>
          <option>Renovation &amp; Remodelling</option>
          <option>Roofing Solutions</option>
          <option>Foundation &amp; Civil Works</option>
          <option>Project Management</option>
          <option>Other</option>
        </select>
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-[11px] font-semibold tracking-widest uppercase text-[#3e4a5e]">Project Details *</label>
        <textarea required placeholder="Tell us about your project — location, size, budget range, timeline…" className="px-3.5 py-3 border border-[#cdd5e3] rounded-lg text-[14px] bg-[#f8f9fa] outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(15,34,64,0.08)] focus:bg-white transition-all resize-vertical min-h-27.5" />
      </div>
      <button type="submit" className="w-full justify-center bg-primary text-white font-head font-semibold text-[15px] py-3.5 px-6 rounded-lg hover:bg-[#0a1733] transition-colors flex items-center gap-2">
        Send Message →
      </button>
    </form>
  );
}

export function ContactClient() {
  const cms = useCms();
  const { contact, faqs, settings, navigation } = cms;

  const contactInfoItems = [
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="#0f2240" strokeWidth="2">
          <path d="M11 2C7 2 4 5 4 9c0 5 7 11 7 11s7-6 7-11c0-4-3-7-7-7z" />
          <circle cx="11" cy="9" r="2.5" />
        </svg>
      ),
      title: "Office Address",
      lines: contact.address.split("\n"),
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="#0f2240" strokeWidth="2">
          <path d="M4 4h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
          <polyline points="2,6 11,13 20,6" />
        </svg>
      ),
      title: "Email Us",
      links: [
        { href: `mailto:${contact.email1}`, text: contact.email1 },
        { href: `mailto:${contact.email2}`, text: contact.email2 },
      ],
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="#0f2240" strokeWidth="2">
          <path d="M22 17v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 5.5 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.41 2h3a2 2 0 0 1 2 1.72c.13 1 .36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 17z" />
        </svg>
      ),
      title: "Call Us",
      links: [
        { href: `tel:${contact.phone1.replace(/\s/g, "")}`, text: contact.phone1 },
        { href: `tel:${contact.phone2.replace(/\s/g, "")}`, text: contact.phone2 },
      ],
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="#0f2240" strokeWidth="2">
          <circle cx="11" cy="11" r="9" />
          <polyline points="11,6 11,11 14,14" />
        </svg>
      ),
      title: "Office Hours",
      lines: contact.hours.split("\n"),
    },
  ];

  return (
    <>
      <Navbar activePage="contact" navLinks={navigation} brandName={settings.brandName} />

      <PageHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        label="Get In Touch"
        title={<>Let&apos;s <span className="text-primary">Build Something</span><br />Together</>}
        desc={contact.pageDesc}
      />

      <section className="py-30 bg-white">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 mt-10">
            <div className="flex flex-col gap-7">
              {contactInfoItems.map((info) => (
                <div
                  key={info.title}
                  className="flex gap-4 items-start p-6 bg-white rounded-xl border border-[#cdd5e3] hover:border-primary hover:translate-x-1 transition-all duration-200"
                >
                  <div className="w-12 h-12 rounded-[10px] bg-[#eff4fa] flex items-center justify-center shrink-0">
                    {info.icon}
                  </div>
                  <div>
                    <h3 className="font-head text-[16px] font-bold mb-1.5">{info.title}</h3>
                    {"lines" in info && info.lines?.map((l, i) => (
                      <p key={i} className="text-[14px] text-[#4a5568] leading-[1.6]">{l}</p>
                    ))}
                    {"links" in info && info.links?.map((l) => (
                      <a key={l.href} href={l.href} className="text-[14px] text-[#4a5568] leading-[1.6] block hover:text-primary transition-colors">{l.text}</a>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl p-9 border border-[#cdd5e3]">
              <h3 className="font-head text-[22px] font-extrabold mb-2">Send Us a Message</h3>
              <p className="text-[14px] text-[#4a5568] mb-6">Fill in the form below — we&apos;ll get back within 24 hours.</p>
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>

      <div className="px-8 pb-24">
        <div className="max-w-7xl mx-auto rounded-2xl overflow-hidden border border-[#cdd5e3]" style={{ aspectRatio: "21/9" }}>
          <iframe
            src="https://www.openstreetmap.org/export/embed.html?bbox=83.97%2C28.20%2C84.00%2C28.22&layer=mapnik&marker=28.21%2C83.985"
            width="100%"
            height="100%"
            style={{ border: 0, display: "block" }}
            title="Baglung Office Location"
          />
        </div>
      </div>

      <section className="py-30 bg-white">
        <Container>
          <div className="text-[13px] font-semibold tracking-[0.12em] uppercase text-primary mb-3 flex items-center gap-2.5">
            <span className="w-8 h-0.5 bg-primary inline-block" />
            Common Questions
          </div>
          <h2 className="font-head text-[clamp(26px,3vw,38px)] font-bold leading-tight tracking-[-0.01em] mb-12">
            Frequently Asked Questions
          </h2>
          <div className="flex flex-col gap-3 max-w-3xl">
            {faqs.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </Container>
      </section>

      <CTABanner
        title="Prefer to Talk Right Away?"
        desc="Call our office directly between 9 AM and 6 PM — we're happy to answer questions."
        ctaLabel={`📞 ${contact.phone1}`}
        ctaHref={`tel:${contact.phone1.replace(/\s/g, "")}`}
      />

      <Footer cms={cms} />
    </>
  );
}
