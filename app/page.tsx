import { Navbar } from "@/components/organisms/Navbar";
import { Footer } from "@/components/organisms/Footer";
import { CTABanner } from "@/components/layout/CTABanner";
import { Container } from "@/components/atoms/Container";
import { SectionLabel } from "@/components/atoms/SectionLabel";
import { Btn } from "@/components/atoms/Btn";
import { StatCard } from "@/components/molecules/StatCard";
import { ServiceCard } from "@/components/molecules/ServiceCard";
import { ProjectsGrid } from "@/components/organisms/ProjectsGrid";
import { TestimonialsCarousel } from "@/components/organisms/TestimonialsCarousel";
import { ContactForm } from "@/components/organisms/ContactForm";
import type { Project } from "@/components/molecules/ProjectCard";

const SERVICES = [
  {
    icon: (
      <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7">
        <rect x="3" y="10" width="22" height="16" rx="1.5"/><path d="M3 14L14 5l11 9"/><rect x="10" y="18" width="8" height="8"/>
      </svg>
    ),
    title: "Residential Construction",
    desc: "Custom homes built to your lifestyle — from traditional Nepali architecture to contemporary living spaces.",
  },
  {
    icon: (
      <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7">
        <rect x="3" y="3" width="22" height="22" rx="1.5"/><path d="M3 10h22M10 3v22"/><circle cx="18" cy="18" r="3"/>
      </svg>
    ),
    title: "Architectural Design",
    desc: "Thoughtful blueprints and 3D plans that balance aesthetic beauty with structural integrity and local regulations.",
  },
  {
    icon: (
      <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7">
        <path d="M4 24h20M4 20l8-12 5 7 3-4 4 9"/><circle cx="22" cy="6" r="2.5"/>
      </svg>
    ),
    title: "Interior Design",
    desc: "Harmonious interiors that reflect your personality — from space planning to material selection and finishing.",
  },
  {
    icon: (
      <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7">
        <path d="M6 22V12M22 22V8M14 22V4M3 22h22"/><path d="M10 12h-4v10h4"/>
      </svg>
    ),
    title: "Commercial Projects",
    desc: "Office complexes, hotels, and retail spaces crafted for function, brand identity, and lasting impressions.",
  },
  {
    icon: (
      <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7">
        <circle cx="14" cy="14" r="10"/><path d="M14 8v6l4 4"/>
      </svg>
    ),
    title: "Renovation & Remodelling",
    desc: "Breathing new life into existing structures with modern upgrades, retrofits, and structural reinforcement.",
  },
  {
    icon: (
      <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7">
        <path d="M14 3L4 10v15h6v-8h8v8h6V10z"/>
      </svg>
    ),
    title: "Roofing Solutions",
    desc: "Durable roofing systems designed for Nepal's diverse climate — from Himalayan winters to monsoon rains.",
  },
  {
    icon: (
      <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7">
        <path d="M5 23l18-18M10 5H5v5"/><rect x="14" y="14" width="9" height="9" rx="1"/>
      </svg>
    ),
    title: "Foundation & Civil Works",
    desc: "Robust foundation engineering and civil infrastructure ensuring seismic-resilient structures for Nepal's terrain.",
  },
  {
    icon: (
      <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7">
        <path d="M7 21l7-14 7 14"/><path d="M9 17h10"/>
      </svg>
    ),
    title: "Project Management",
    desc: "End-to-end supervision, budgeting, and timeline management ensuring on-time, on-budget delivery.",
  },
];

const PROJECTS: Project[] = [
  {
    name: "Tara Khola Villa",
    category: "Residential",
    location: "Tara Khola, Baglung",
    type: "4-storey Residence",
    year: 2023,
    description:
      "A luxury residential villa with panoramic views of Kali Gandaki River. Features modern interiors blending traditional Newari craftsmanship with contemporary finishes.",
  },
  {
    name: "Himalaya Business Hub",
    category: "Commercial",
    location: "Baglung Bazaar",
    type: "Office Complex",
    year: 2022,
    description:
      "A modern 8-storey commercial complex featuring office spaces, a rooftop café, and underground parking.",
  },
  {
    name: "Annapurna Boutique Hotel",
    category: "Interior",
    location: "Bhakunde, Baglung",
    type: "Hospitality Interior",
    year: 2023,
    description:
      "Complete interior design and fit-out for a 32-room boutique hotel inspired by Gandaki culture.",
  },
  {
    name: "Mountain View Residences",
    category: "Residential",
    location: "Galkot, Baglung",
    type: "12-unit Townhouse",
    year: 2021,
    description:
      "A community of 12 modern townhouses with Annapurna range views, earthquake-resistant construction, and eco-friendly features.",
  },
  {
    name: "Heritage Home Renovation",
    category: "Renovation",
    location: "Old Bazaar, Baglung",
    type: "Heritage Restoration",
    year: 2024,
    description:
      "Sensitive restoration of a 60-year-old traditional Newari home, upgrading structural safety while preserving original woodwork.",
  },
  {
    name: "Gandaki Wellness Center",
    category: "Commercial",
    location: "Kali Gandaki Riverside, Baglung",
    type: "Wellness & Hospitality",
    year: 2024,
    description:
      "A premium spa and wellness center with 18 treatment rooms, a hydrotherapy pool, and meditation pavilion.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Siddhibinayak delivered our dream home in Baglung exactly as envisioned. Their attention to detail, transparent communication, and quality of work far exceeded our expectations.",
    name: "Ramesh Adhikari",
    role: "Homeowner, Tara Khola",
    rating: 5,
  },
  {
    quote:
      "Our hotel project was completed on time and within budget. The team understood our brand vision and transformed it into a stunning space that our guests love.",
    name: "Sita Gurung",
    role: "Managing Director, Annapurna Boutique Hotel",
    rating: 5,
  },
  {
    quote:
      "The civil works on our commercial complex were completed with exceptional precision. Siddhibinayak's engineers brought both expertise and genuine care to the project.",
    name: "Dinesh Sharma",
    role: "Director, Himalaya Business Hub",
    rating: 5,
  },
  {
    quote:
      "From the initial consultation to the final handover, the professionalism was outstanding. They respected our heritage property and delivered a beautiful restoration.",
    name: "Kamala Poudel",
    role: "Homeowner, Old Bazaar",
    rating: 5,
  },
  {
    quote:
      "The project management team kept everything on track during our renovation. Regular updates and no surprise costs — exactly what we needed.",
    name: "Bikash Thapa",
    role: "Property Developer, Galkot",
    rating: 5,
  },
];

const PROCESS_STEPS = [
  {
    num: "01",
    title: "Consultation & Brief",
    desc: "We start by deeply understanding your vision, requirements, budget, and timeline through an in-depth consultation session.",
  },
  {
    num: "02",
    title: "Design & Planning",
    desc: "Our architects develop detailed blueprints, 3D renders, and structural plans — refined until they perfectly match your vision.",
  },
  {
    num: "03",
    title: "Construction",
    desc: "Expert crews execute the plan with precision. Regular site updates and quality inspections ensure standards are maintained throughout.",
  },
  {
    num: "04",
    title: "Handover & Support",
    desc: "Final inspection, complete documentation, and a dedicated post-completion support period to ensure your total satisfaction.",
  },
];

export default function HomePage() {
  return (
    <>
      <Navbar activePage="home" />

      {/* HERO */}
      <section className="min-h-screen pt-[72px] flex items-center relative overflow-hidden" style={{ background: "linear-gradient(135deg, #fff 0%, #f8f9fa 50%, #fff8e1 100%)" }}>
        <div className="absolute -top-[100px] -right-[200px] w-[700px] h-[700px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(15,34,64,0.06) 0%, transparent 70%)" }} />
        <Container>
          <div className="grid lg:grid-cols-2 gap-20 items-center py-20">
            <div>
              <div className="flex items-center gap-2.5 text-[13px] font-semibold tracking-[0.12em] uppercase text-primary mb-5 font-head">
                <span className="w-8 h-0.5 bg-primary inline-block" />
                Baglung, Nepal
              </div>
              <h1 className="font-head text-[clamp(42px,5vw,64px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-foreground mb-6">
                Building<br />
                <span className="text-primary">Your Vision</span><br />
                Into Reality
              </h1>
              <p className="text-[17px] text-[#4a5568] leading-[1.7] mb-10 max-w-[480px]">
                From architectural design to complete construction — Siddhibinayak delivers premium craftsmanship rooted in Nepali heritage and modern precision. Your dream space, built to last.
              </p>
              <div className="flex flex-wrap gap-4">
                <Btn href="/contact">Start Your Project →</Btn>
                <Btn variant="outline" href="/projects">View Our Work</Btn>
              </div>
            </div>

            <div className="hidden lg:block relative">
              <div className="rounded-[20px] overflow-hidden w-full bg-gradient-to-br from-[#e7e8e9] to-[#d9dadb] flex flex-col items-center justify-center gap-3 text-[#6b7585] font-mono text-[13px]" style={{ aspectRatio: "4/5" }}>
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#6b7585" strokeWidth="1.5" className="opacity-40">
                  <rect x="4" y="16" width="40" height="28" rx="2"/><path d="M4 20L24 8l20 12"/><rect x="18" y="28" width="12" height="16"/>
                </svg>
                architectural photography<br />hero image
              </div>
              <div className="absolute bg-white rounded-2xl px-6 py-5 shadow-[0_8px_40px_rgba(0,0,0,0.12)] flex flex-col gap-1" style={{ bottom: "-20px", left: "-20px" }}>
                <div className="font-head font-extrabold text-[36px] leading-none text-primary">15<span className="text-[#f4b400]">+</span></div>
                <div className="text-[13px] text-[#3e4a5e] font-medium">Years Experience</div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* STATS BAR */}
      <section className="bg-primary-dark py-14">
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <StatCard num={200} label="Projects Completed" />
            <StatCard num={180} label="Happy Clients" />
            <StatCard num={45} label="Team Members" />
            <StatCard num={17} label="Years Experience" />
          </div>
        </Container>
      </section>

      {/* SERVICES */}
      <section className="py-24 bg-white">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <SectionLabel>What We Do</SectionLabel>
              <h2 className="font-head text-[clamp(28px,3.5vw,48px)] font-bold text-foreground leading-[1.2] tracking-tight mb-5">
                Services Tailored<br />to Your Needs
              </h2>
              <p className="text-[17px] text-gray-500 leading-[1.7] max-w-140">
                We provide end-to-end construction and design solutions — from concept to handover — with uncompromising quality.
              </p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SERVICES.map((s) => (
              <ServiceCard key={s.title} {...s} />
            ))}
          </div>
        </Container>
      </section>

      {/* ABOUT */}
      <section className="py-24 bg-gray-50">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative hidden lg:flex items-center justify-center">
              <div className="rounded-2xl overflow-hidden aspect-3/4 w-full bg-gray-200 flex items-center justify-center text-gray-400 text-sm font-mono">
                team / construction site photo
              </div>
              <div className="absolute bottom-6 -right-4 bg-white rounded-2xl p-5 shadow-xl border border-gray-100">
                <div className="font-head font-extrabold text-4xl text-primary">
                  17<span className="text-gold">+</span>
                </div>
                <div className="text-[12px] text-gray-500 uppercase tracking-wider mt-1">
                  Years Building Baglung
                </div>
              </div>
            </div>
            <div>
              <SectionLabel>About Siddhibinayak</SectionLabel>
              <h2 className="font-head text-[clamp(28px,3.5vw,44px)] font-bold leading-tight tracking-tight mb-5">
                Building Baglung's Future Since 2009
              </h2>
              <p className="text-[17px] text-gray-600 leading-relaxed mb-8">
                Siddhibinayak Nirman Sewa was founded with a singular purpose: to deliver world-class
                construction quality with a deep respect for Nepal's architectural heritage. Based in
                the heart of Baglung, we have grown from a small team of passionate engineers to one
                of the region's most trusted construction firms.
              </p>
              <div className="flex flex-col gap-4">
                {[
                  {
                    icon: (
                      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="#0f2240" strokeWidth="1.8">
                        <path d="M11 2l2.4 7.4H21l-6.2 4.5 2.4 7.4L11 17l-6.2 4.3 2.4-7.4L1 9.4h7.6z"/>
                      </svg>
                    ),
                    title: "Our Mission",
                    desc: "To provide exceptional construction services that exceed client expectations through quality craftsmanship and transparent partnerships.",
                  },
                  {
                    icon: (
                      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="#0f2240" strokeWidth="1.8">
                        <circle cx="11" cy="11" r="9"/><path d="M11 6v5l3 3"/>
                      </svg>
                    ),
                    title: "Our Vision",
                    desc: "To be the most trusted design and construction partner in Nepal, setting the benchmark for quality and cultural sensitivity.",
                  },
                  {
                    icon: (
                      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="#0f2240" strokeWidth="1.8">
                        <path d="M3 19l4-8 4 4 4-6 4 10"/>
                      </svg>
                    ),
                    title: "Our History",
                    desc: "Founded in 2009 in Baglung, we've completed 200+ projects across residential, commercial, and cultural categories in the Gandaki Province.",
                  },
                ].map((p) => (
                  <div key={p.title} className="flex items-start gap-4 p-5 bg-white rounded-xl border border-[#cdd5e3]">
                    <div className="w-10 h-10 rounded-lg bg-[#eff4fa] flex items-center justify-center shrink-0">
                      {p.icon}
                    </div>
                    <div>
                      <div className="font-head font-bold text-[15px] mb-1">{p.title}</div>
                      <div className="text-[13px] text-gray-500 leading-relaxed">{p.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Btn href="/about">Learn More About Us →</Btn>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* PROJECTS */}
      <section className="py-24 bg-white">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <SectionLabel>Our Portfolio</SectionLabel>
              <h2 className="font-head text-[clamp(28px,3.5vw,44px)] font-bold leading-tight tracking-tight">
                Featured Construction Projects
              </h2>
              <p className="text-[17px] text-gray-600 mt-3 max-w-xl">
                Explore our portfolio where innovative design and quality craftsmanship come together.
              </p>
            </div>
            <Btn variant="outline" href="/projects">View All Projects</Btn>
          </div>
          <ProjectsGrid projects={PROJECTS} />
        </Container>
      </section>

      {/* WHY US */}
      <section className="py-30 bg-[#2e3f5c]">
        <Container>
          <div className="flex items-center gap-2.5 text-[13px] font-semibold tracking-[0.12em] uppercase text-[#f4b400] mb-4 font-head">
            <span className="w-8 h-0.5 bg-[#f4b400] inline-block" />
            Why Choose Us
          </div>
          <h2 className="font-head text-[clamp(28px,3.5vw,48px)] font-bold text-white leading-[1.2] tracking-tight mb-5">
            Quality That Speaks<br />For Itself
          </h2>
          <p className="text-[17px] text-white/65 leading-relaxed max-w-140 mb-16">
            Our craftsmanship and attention to detail are evident in every project, ensuring
            long-lasting results that reflect our commitment to excellence.
          </p>
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="hidden lg:flex rounded-2xl overflow-hidden aspect-3/4 bg-white/5 items-center justify-center">
              <div className="flex flex-col items-center gap-3 text-white/40 font-mono text-xs">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5">
                  <rect x="6" y="16" width="36" height="26" rx="2"/><path d="M6 20L24 8l18 12"/><rect x="16" y="28" width="16" height="14"/>
                </svg>
                team at work / quality photo
              </div>
            </div>
            <div className="flex flex-col gap-5">
              {[
                { title: "Excellence In Every Detail", desc: "From foundation to finishing, each element is crafted with meticulous precision. We never cut corners — your structure is built to last generations." },
                { title: "Trusted Expertise, Proven Results", desc: "15+ years building in Baglung's unique terrain. Our engineers understand local soil, seismic requirements, and climate to deliver structures that endure." },
                { title: "Innovative Solutions Tailored for You", desc: "We blend modern construction technology with traditional Nepali design principles to deliver spaces that are uniquely yours." },
                { title: "Your Vision, Our Commitment", desc: "We listen deeply to your needs, maintain transparent communication throughout, and ensure your project is delivered on time and within budget." },
              ].map((point) => (
                <div key={point.title} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#f4b400] flex items-center justify-center shrink-0 mt-0.5">
                    <svg viewBox="0 0 16 16" fill="none" stroke="#fff" strokeWidth="2.5" className="w-4 h-4">
                      <path d="M3 8l3.5 3.5L13 4"/>
                    </svg>
                  </div>
                  <div>
                    <div className="font-head text-[17px] font-bold text-white mb-1">{point.title}</div>
                    <div className="text-[14px] text-white/60 leading-relaxed">{point.desc}</div>
                  </div>
                </div>
              ))}
              <div className="mt-2">
                <Btn variant="primary" href="/contact">Start Your Project →</Btn>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* PROCESS */}
      <section className="py-24 bg-gray-50">
        <Container>
          <div className="text-center mb-14">
            <SectionLabel>How We Work</SectionLabel>
            <h2 className="font-head text-[clamp(28px,3.5vw,44px)] font-bold leading-tight tracking-tight">
              Our Construction Process
            </h2>
            <p className="text-[17px] text-gray-600 mt-3 max-w-xl mx-auto">
              A clear, transparent process from first consultation to final handover.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            <div className="hidden lg:block absolute top-8 left-[10%] right-[10%] h-px bg-linear-to-r from-primary to-[#b08800]" />
            {PROCESS_STEPS.map((step) => (
              <div key={step.num} className="relative text-center z-10">
                <div className="w-16 h-16 rounded-full bg-white border-2 border-primary flex items-center justify-center mx-auto mb-5 font-head text-xl font-extrabold text-primary">
                  {step.num}
                </div>
                <h3 className="font-head font-bold text-[16px] mb-2">{step.title}</h3>
                <p className="text-[13px] text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-white">
        <Container>
          <div className="text-center mb-12">
            <SectionLabel>Client Stories</SectionLabel>
            <h2 className="font-head text-[clamp(28px,3.5vw,44px)] font-bold leading-tight tracking-tight">
              What Our Clients Say
            </h2>
          </div>
          <TestimonialsCarousel items={TESTIMONIALS} />
        </Container>
      </section>

      {/* CONTACT */}
      <section className="py-24 bg-gray-50">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <SectionLabel>Get In Touch</SectionLabel>
              <h2 className="font-head text-[clamp(28px,3.5vw,44px)] font-bold leading-tight tracking-tight mb-5">
                Start Your Project Today
              </h2>
              <p className="text-[17px] text-gray-600 leading-relaxed mb-10">
                Ready to build? Get in touch with our team and we'll arrange a free consultation.
              </p>
              <div className="flex flex-col gap-8">
                {[
                  {
                    icon: (
                      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="#0f2240" strokeWidth="1.8">
                        <path d="M11 2C7.13 2 4 5.13 4 9c0 5.25 7 11 7 11s7-5.75 7-11c0-3.87-3.13-7-7-7z"/><circle cx="11" cy="9" r="2.5"/>
                      </svg>
                    ),
                    label: "Our Office",
                    value: "Main Road, Baglung-04\nBaglung District, Gandaki Province\nNepal 33700",
                  },
                  {
                    icon: (
                      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="#0f2240" strokeWidth="1.8">
                        <path d="M4 4h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/><polyline points="2,6 11,13 20,6"/>
                      </svg>
                    ),
                    label: "Email Us",
                    value: "info@siddhibinayak.com.np\ndesign@siddhibinayak.com.np",
                  },
                  {
                    icon: (
                      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="#0f2240" strokeWidth="1.8">
                        <path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 21 7.95M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 5.5 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.41 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                      </svg>
                    ),
                    label: "Call Us",
                    value: "+977 68-520000\n+977 98XXXXXXXX",
                  },
                  {
                    icon: (
                      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="#0f2240" strokeWidth="1.8">
                        <circle cx="11" cy="11" r="9"/><polyline points="11,6 11,11 14,14"/>
                      </svg>
                    ),
                    label: "Office Hours",
                    value: "Sunday – Friday: 9:00 AM – 6:00 PM\nSaturday: 10:00 AM – 2:00 PM",
                  },
                ].map((info) => (
                  <div key={info.label} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-[10px] bg-[#eff4fa] flex items-center justify-center shrink-0">
                      {info.icon}
                    </div>
                    <div>
                      <div className="font-head font-bold text-[15px] mb-1">{info.label}</div>
                      <div className="text-[14px] text-gray-500 whitespace-pre-line">{info.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <h3 className="font-head font-bold text-xl mb-6">Send Us a Message</h3>
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>

      <CTABanner
        title="Ready to Build Your Dream?"
        desc="Let's discuss your project. Our team is ready to bring your vision to life with quality, precision, and care."
        ctaLabel="Get a Free Consultation →"
        ctaHref="/contact"
      />

      <Footer />
    </>
  );
}
