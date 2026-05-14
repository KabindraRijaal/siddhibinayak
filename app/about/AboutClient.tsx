"use client";

import { Navbar } from "@/components/organisms/Navbar";
import { Footer } from "@/components/organisms/Footer";
import { CTABanner } from "@/components/layout/CTABanner";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/atoms/Container";
import { useCms } from "@/components/CmsShell";

const VALUES = [
  { num: "01", title: "Excellence in Every Detail", desc: "From foundation to finishing, each element is crafted with meticulous precision. We never cut corners." },
  { num: "02", title: "Transparent Partnership", desc: "Honest pricing, clear timelines, and weekly progress updates. No surprises, no hidden costs." },
  { num: "03", title: "Local Expertise", desc: "17 years of building in Baglung's unique terrain — we understand soil, seismic, and climate factors." },
  { num: "04", title: "Cultural Sensitivity", desc: "We honor traditional Newari craftsmanship while integrating modern construction technology." },
];

export function AboutClient() {
  const cms = useCms();
  const { about, team, timeline, settings, navigation } = cms;

  return (
    <>
      <Navbar activePage="about" navLinks={navigation} brandName={settings.brandName} />

      <PageHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "About" }]}
        label="Our Story"
        title={<>Built on <span className="text-primary">Trust,</span><br />Crafted with Heart</>}
        desc={about.pageDesc}
      />

      <section className="py-24 bg-white">
        <Container>
          <div className="grid lg:grid-cols-2 gap-20 items-center mt-0">
            <div className="hidden lg:flex rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 items-center justify-center font-mono text-sm text-gray-400" style={{ aspectRatio: "4/5", minHeight: "400px" }}>
              {about.storyImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={about.storyImage} alt="Our Story" className="w-full h-full object-cover" />
              ) : (
                "team / founder photo"
              )}
            </div>
            <div>
              <div className="text-[13px] font-semibold tracking-[0.12em] uppercase text-primary mb-3 flex items-center gap-2.5">
                <span className="w-8 h-0.5 bg-primary inline-block" />
                Our Beginning
              </div>
              <h2 className="font-head text-[clamp(26px,3vw,38px)] font-bold leading-tight tracking-tight mb-5">
                From a Small Baglung Studio to a Trusted Regional Partner
              </h2>
              <p className="text-[16px] text-[#4a5568] leading-[1.8] mb-[18px]">{about.storyP1}</p>
              <p className="text-[16px] text-[#4a5568] leading-[1.8] mb-[18px]">{about.storyP2}</p>
              <p className="text-[16px] text-[#4a5568] leading-[1.8] mb-6">{about.storyP3}</p>
              <a href="/projects" className="inline-flex items-center gap-2 bg-primary text-white font-head font-semibold text-[15px] px-7 py-3.5 rounded-lg hover:bg-[#0a1733] transition-colors">
                Explore Our Projects →
              </a>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-24 bg-[#f8f9fa]">
        <Container>
          <div className="text-[13px] font-semibold tracking-[0.12em] uppercase text-primary mb-3 flex items-center gap-2.5">
            <span className="w-8 h-0.5 bg-primary inline-block" />
            What Drives Us
          </div>
          <h2 className="font-head text-[clamp(26px,3vw,38px)] font-bold leading-tight tracking-tight mb-16">
            Mission, Vision &amp; Values
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#0f2240" strokeWidth="2"><path d="M14 2l3 9h9l-7.5 5.5L21 26l-7-5.5L7 26l2.5-9.5L2 11h9z" /></svg>,
                title: "Mission", desc: about.mission,
              },
              {
                icon: <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#0f2240" strokeWidth="2"><circle cx="14" cy="14" r="11" /><path d="M14 7v7l4 4" /></svg>,
                title: "Vision", desc: about.vision,
              },
              {
                icon: <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#0f2240" strokeWidth="2"><path d="M3 24l5-10 5 5 5-7 5 12" /></svg>,
                title: "Values", desc: about.values,
              },
            ].map((p) => (
              <div key={p.title} className="bg-white rounded-2xl p-8 border border-[#cdd5e3] hover:border-primary hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.06)] transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-[#eff4fa] flex items-center justify-center mb-5">{p.icon}</div>
                <h3 className="font-head text-[20px] font-bold mb-3">{p.title}</h3>
                <p className="text-[14px] text-[#4a5568] leading-[1.7]">{p.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24 bg-white">
        <Container>
          <div className="text-[13px] font-semibold tracking-[0.12em] uppercase text-primary mb-3 flex items-center gap-2.5">
            <span className="w-8 h-0.5 bg-primary inline-block" />
            Our Journey
          </div>
          <h2 className="font-head text-[clamp(26px,3vw,38px)] font-bold leading-tight tracking-tight mb-16">
            Milestones Along the Way
          </h2>
          <div className="relative pl-10" style={{ paddingLeft: "40px" }}>
            <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-[#cdd5e3]" />
            {timeline.map((t, i) => (
              <div key={t.year} className={`relative ${i < timeline.length - 1 ? "pb-10" : ""}`}>
                <div className="absolute -left-[29px] top-1 w-3.5 h-3.5 rounded-full bg-primary border-[3px] border-white" style={{ left: "-34px" }} />
                <div className="text-[13px] font-bold tracking-[0.08em] uppercase text-primary mb-1.5">{t.year}</div>
                <div className="font-head text-[18px] font-bold mb-2">{t.title}</div>
                <div className="text-[14px] text-[#4a5568] leading-[1.6]">{t.desc}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24 bg-[#f8f9fa]">
        <Container>
          <div className="text-[13px] font-semibold tracking-[0.12em] uppercase text-primary mb-3 flex items-center gap-2.5">
            <span className="w-8 h-0.5 bg-primary inline-block" />
            Why Clients Choose Us
          </div>
          <h2 className="font-head text-[clamp(26px,3vw,38px)] font-bold leading-tight tracking-tight mb-16">
            Our Core Principles
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {VALUES.map((v) => (
              <div key={v.num} className="flex gap-5 items-start">
                <div className="font-head text-[32px] font-extrabold text-primary opacity-40 leading-none shrink-0 min-w-[60px]">{v.num}</div>
                <div>
                  <h3 className="font-head text-[18px] font-bold mb-2">{v.title}</h3>
                  <p className="text-[14px] text-[#4a5568] leading-[1.7]">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24 bg-white">
        <Container>
          <div className="text-[13px] font-semibold tracking-[0.12em] uppercase text-primary mb-3 flex items-center gap-2.5">
            <span className="w-8 h-0.5 bg-primary inline-block" />
            Meet the Team
          </div>
          <h2 className="font-head text-[clamp(26px,3vw,38px)] font-bold leading-tight tracking-tight mb-16">
            The People Behind Every Project
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((m) => (
              <div key={m.name} className="bg-white rounded-2xl overflow-hidden border border-[#cdd5e3] hover:-translate-y-1.5 hover:shadow-[0_20px_60px_rgba(0,0,0,0.10)] transition-all duration-300">
                <div className="aspect-square bg-gradient-to-br from-[#e7e8e9] to-[#d9dadb] flex items-center justify-center font-head text-[40px] font-extrabold text-primary opacity-60 overflow-hidden relative">
                  {m.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={m.image} alt={m.name} className="w-full h-full object-cover absolute inset-0" />
                  ) : m.initials}
                </div>
                <div className="p-5">
                  <div className="font-head text-[16px] font-bold">{m.name}</div>
                  <div className="text-[13px] text-[#3e4a5e] mt-0.5">{m.role}</div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTABanner
        title="Ready to Work With Us?"
        desc="Let's discuss your project. Free consultation, no obligations."
        ctaLabel="Get in Touch →"
        ctaHref="/contact"
      />

      <Footer cms={cms} />
    </>
  );
}
