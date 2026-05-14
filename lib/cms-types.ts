// Client-safe: no Node.js imports

export interface StatItem { num: string; suffix: string; label: string; }

export interface ServiceItem {
  title: string;
  desc: string;
  price: string;
  priceLabel: string;
  features: string[];
}

export interface Project {
  id: string;
  name: string;
  category: string;
  location: string;
  year: string;
  area: string;
  desc: string;
  featured: boolean;
  image: string;
}

export interface Testimonial { name: string; role: string; quote: string; }
export interface TeamMember { name: string; role: string; initials: string; image: string; imageId: string; }
export interface FaqItem { q: string; a: string; }
export interface TimelineItem { year: string; title: string; desc: string; }
export interface NavItem { label: string; url: string; }

export interface CmsState {
  home: {
    heroLabel: string;
    heroTitle1: string;
    heroTitle2: string;
    heroTitle3: string;
    heroDesc: string;
    heroPrimaryCta: string;
    heroSecondaryCta: string;
    heroBadge: string;
    heroImage: string;
    stats: StatItem[];
    aboutTitle: string;
    aboutP1: string;
    aboutP2: string;
    aboutImage: string;
    finalCtaTitle: string;
    finalCtaDesc: string;
    finalCtaBtn: string;
  };
  services: {
    pageTitle: string;
    pageDesc: string;
    items: ServiceItem[];
  };
  about: {
    pageTitle: string;
    pageDesc: string;
    storyP1: string;
    storyP2: string;
    storyP3: string;
    mission: string;
    vision: string;
    values: string;
    storyImage: string;
  };
  contact: {
    pageTitle: string;
    pageDesc: string;
    address: string;
    email1: string;
    email2: string;
    phone1: string;
    phone2: string;
    hours: string;
  };
  projects: Project[];
  testimonials: Testimonial[];
  team: TeamMember[];
  faqs: FaqItem[];
  timeline: TimelineItem[];
  settings: {
    brandName: string;
    tagline: string;
    siteUrl: string;
    metaDesc: string;
    facebook: string;
    instagram: string;
    youtube: string;
  };
  brand: {
    primary: string;
    primaryDark: string;
    secondary: string;
    fontHead: string;
    fontBody: string;
  };
  navigation: NavItem[];
}

export const DEFAULTS: CmsState = {
  home: {
    heroLabel: "Baglung, Nepal",
    heroTitle1: "Building",
    heroTitle2: "Your Vision",
    heroTitle3: "Into Reality",
    heroDesc: "From architectural design to complete construction — Siddhibinayak delivers premium craftsmanship rooted in Nepali heritage and modern precision. Your dream space, built to last.",
    heroPrimaryCta: "Start Your Project →",
    heroSecondaryCta: "View Our Work",
    heroBadge: "15+ Years Experience",
    heroImage: "",
    stats: [
      { num: "200", suffix: "+", label: "Projects Completed" },
      { num: "180", suffix: "+", label: "Happy Clients" },
      { num: "45", suffix: "+", label: "Team Members" },
      { num: "17", suffix: "+", label: "Years in Baglung" },
    ],
    aboutTitle: "Baglung's Trusted Partner in Modern Construction",
    aboutP1: "For over a decade and a half, Siddhibinayak Nirman Sewa has been shaping Baglung's skyline — combining traditional Nepali craftsmanship with engineering precision to create spaces that endure for generations.",
    aboutP2: "Our team of architects, engineers, and skilled craftsmen approach each project with the same dedication, whether it's a family home in Tara Khola or a commercial complex on Main Road.",
    aboutImage: "",
    finalCtaTitle: "Ready to Build Something Extraordinary?",
    finalCtaDesc: "Join 200+ satisfied clients across Baglung and Gandaki Province who trusted Siddhibinayak to bring their vision to life.",
    finalCtaBtn: "Schedule Free Consultation →",
  },
  services: {
    pageTitle: "End-to-End Construction Services in Baglung",
    pageDesc: "From the first sketch to the final handover key — Siddhibinayak delivers complete construction and design solutions for residential, commercial, and civil projects across the Gandaki Province.",
    items: [
      { title: "Residential Construction", desc: "Custom homes, villas, and apartments crafted to your lifestyle — from foundation to finishing.", price: "From NPR 2,200/sqft", priceLabel: "Standard residential builds", features: ["Custom architectural design", "Seismic-resistant RCC construction", "MEP (mechanical, electrical, plumbing)", "Premium interior finishing", "Landscaping and outdoor works", "Government approvals and permits"] },
      { title: "Architectural Design", desc: "Detailed blueprints, 3D renders, and structural plans that balance aesthetic beauty with engineering integrity.", price: "From NPR 80/sqft", priceLabel: "Full design package", features: ["Concept design and feasibility study", "Floor plans and elevations", "3D walkthroughs and renders", "Working drawings for construction", "Structural design and calculations", "Building bylaw compliance"] },
      { title: "Interior Design", desc: "Harmonious interiors that reflect your personality — space planning, materials, lighting, and bespoke furniture.", price: "From NPR 1,500/sqft", priceLabel: "Full interior fit-out", features: ["Space planning and zoning", "Material and finish selection", "Custom furniture and joinery", "Lighting design", "Soft furnishings and styling", "Project supervision and handover"] },
      { title: "Commercial Projects", desc: "Office complexes, hotels, and retail spaces crafted for function, brand identity, and lasting impressions.", price: "From NPR 3,000/sqft", priceLabel: "Commercial construction", features: ["Multi-storey commercial buildings", "Retail and showroom fit-out", "Hotel and hospitality construction", "Office tower development", "Mixed-use complexes", "Compliance with commercial codes"] },
      { title: "Renovation & Remodelling", desc: "Breathing new life into existing structures — modern upgrades, retrofits, and structural reinforcement.", price: "Starts NPR 4 lakhs", priceLabel: "Project-based pricing", features: ["Structural assessment and audit", "Seismic retrofitting", "Heritage restoration", "Layout reconfiguration", "Modern utilities upgrade", "Aesthetic modernisation"] },
      { title: "Roofing Solutions", desc: "Durable roofing systems engineered for Nepal's diverse climate — from Himalayan winters to monsoon rains.", price: "From NPR 350/sqft", priceLabel: "Material + installation", features: ["Slate, tile, and CGI roofing", "RCC slab roofing", "Insulation and waterproofing", "Skylights and dormers", "Gutter and drainage systems", "Solar-ready roof structures"] },
      { title: "Foundation & Civil Works", desc: "Robust foundation engineering and civil infrastructure ensuring seismic-resilient structures for Nepal's terrain.", price: "Custom quote", priceLabel: "Based on site conditions", features: ["Soil investigation and testing", "Pile and raft foundations", "Retaining walls and gabions", "Site grading and earthworks", "Drainage and sewer systems", "Roads, paving, and access works"] },
      { title: "Project Management", desc: "End-to-end supervision, budgeting, and timeline management ensuring on-time, on-budget delivery.", price: "8–12% of project", priceLabel: "PM fee structure", features: ["Detailed project planning", "Cost estimation and budgeting", "Vendor and contractor management", "Quality control and inspections", "Weekly progress reports", "Risk management and reporting"] },
    ],
  },
  about: {
    pageTitle: "Built on Trust, Crafted with Heart",
    pageDesc: "For 17 years, Siddhibinayak has shaped Baglung's skyline — combining traditional Nepali craftsmanship with engineering precision.",
    storyP1: "Founded in 2009 by a small group of engineers and architects who shared a vision for building responsibly in Nepal, Siddhibinayak began with a single residential project in Tara Khola, Baglung.",
    storyP2: "What started as a 4-person studio has grown into a 45-strong team of architects, engineers, project managers, and skilled craftsmen — completing over 200 projects.",
    storyP3: "Today, we remain rooted in the same values that started us: deep respect for Nepali architectural heritage, uncompromising quality, and genuine care for every client.",
    mission: "To deliver exceptional construction services that exceed client expectations through quality craftsmanship, sustainable practices, and transparent partnerships.",
    vision: "To be the most trusted design and construction partner in Nepal — setting the benchmark for quality, innovation, and cultural sensitivity.",
    values: "Integrity, craftsmanship, sustainability, and respect — for our clients, our craft, our heritage, and the land on which we build.",
    storyImage: "",
  },
  contact: {
    pageTitle: "Let's Build Something Together",
    pageDesc: "Whether you're planning a new home, a commercial project, or a heritage restoration — we'd love to hear about your vision.",
    address: "Main Road, Baglung-04\nBaglung District, Gandaki Province\nNepal 33700",
    email1: "info@siddhibinayak.com.np",
    email2: "design@siddhibinayak.com.np",
    phone1: "+977 68-520000",
    phone2: "+977 98XXXXXXXX",
    hours: "Sunday – Friday: 9:00 AM – 6:00 PM\nSaturday: 10:00 AM – 2:00 PM",
  },
  projects: [
    { id: "project-0", name: "Tara Khola Villa", category: "Residential", location: "Tara Khola, Baglung", year: "2024", area: "4,200 sqft", desc: "A flagship luxury residence overlooking Kali Gandaki River.", featured: true, image: "" },
    { id: "project-1", name: "Himalaya Business Hub", category: "Commercial", location: "Baglung Bazaar", year: "2023", area: "28,000 sqft", desc: "Landmark 8-storey commercial complex.", featured: false, image: "" },
    { id: "project-2", name: "Mountain View Suites", category: "Hospitality", location: "Sarangkot Road", year: "2024", area: "16,500 sqft", desc: "Boutique hotel with panoramic Annapurna views.", featured: false, image: "" },
    { id: "project-3", name: "Newari Heritage Home", category: "Renovation", location: "Old Bazaar, Baglung", year: "2023", area: "3,400 sqft", desc: "Sensitive restoration of a 60-year-old Newari home.", featured: false, image: "" },
    { id: "project-4", name: "Kali Gandaki Restaurant & Bar", category: "Interior", location: "Baglung Bazaar", year: "2024", area: "2,800 sqft", desc: "Himalayan-inspired hospitality interior.", featured: false, image: "" },
    { id: "project-5", name: "Seti Gandaki Bridge Approach", category: "Civil Works", location: "Bhakunde Beni, Baglung", year: "2022", area: "380m bridge", desc: "Bridge approach earthworks and retaining structures.", featured: false, image: "" },
  ],
  testimonials: [
    { name: "Rajesh Kumar Sharma", role: "Residential Client, Tara Khola", quote: "Siddhibinayak transformed our family's dream home into a stunning reality. The team's attention to detail was extraordinary." },
    { name: "Sunita Pradhan", role: "Hotel Owner, Bagar", quote: "We entrusted Siddhibinayak with our boutique hotel project and they exceeded every expectation." },
    { name: "Binod Thapa", role: "Heritage Home Owner, Old Bazaar", quote: "The renovation of our heritage home was handled with such sensitivity and expertise." },
    { name: "Anita Rana", role: "Commercial Developer, Baglung Bazaar", quote: "From the initial consultation to final handover, the Siddhibinayak team was communicative and professional." },
    { name: "Kamal Gurung", role: "Wellness Center Owner, Damside", quote: "The wellness center Siddhibinayak built for us has received glowing reviews from every guest." },
  ],
  team: [
    { name: "Ramesh Subedi", role: "Founder & Principal Architect", initials: "RS", image: "", imageId: "team-rs" },
    { name: "Priya Gurung", role: "Head of Design", initials: "PG", image: "", imageId: "team-pg" },
    { name: "Dipak Thapa", role: "Senior Structural Engineer", initials: "DT", image: "", imageId: "team-dt" },
    { name: "Sarita Poudel", role: "Project Manager", initials: "SP", image: "", imageId: "team-sp" },
  ],
  faqs: [
    { q: "How long does a typical residential project take?", a: "A standard 3-storey home takes approximately 12–18 months from groundbreaking to handover, depending on size, finish level, and site conditions. We provide a detailed Gantt chart at project kickoff." },
    { q: "Do you handle government approvals and permits?", a: "Yes — we manage all municipal approvals, building permits, and bylaw compliance on behalf of our clients. This is included in our standard service." },
    { q: "What is your payment structure?", a: "We work with milestone-based payments tied to construction stages: design (15%), foundation (20%), structure (35%), finishing (20%), handover (10%). All terms are documented in your contract." },
    { q: "Do you offer post-completion warranty?", a: "Yes — every project includes a 12-month defects liability period and a 5-year structural warranty on RCC works, plus manufacturer warranties on all installed materials." },
    { q: "Can I visit one of your completed projects?", a: "Absolutely — with prior arrangement and client consent, we organise site visits to recently completed projects so you can see our quality firsthand." },
    { q: "Do you work outside Baglung?", a: "We operate primarily across the Gandaki Province (Baglung, Beni, Kushma, Burtibang, Galkot). For larger projects, we have undertaken work as far as Kathmandu and Chitwan." },
  ],
  timeline: [
    { year: "2009", title: "Siddhibinayak Founded", desc: "Established as a small architectural studio in Tara Khola, Baglung with a team of four." },
    { year: "2013", title: "First Commercial Project", desc: "Completed our first multi-storey commercial building — Himalaya Plaza in Prithvi Chowk." },
    { year: "2016", title: "Post-Earthquake Recovery", desc: "Led seismic retrofit programs across 12 schools and community buildings as a community contribution." },
    { year: "2019", title: "100th Project Milestone", desc: "Crossed 100 completed projects across residential, commercial, and civil categories." },
    { year: "2023", title: "Heritage Restoration Award", desc: "Recognised for the sensitive restoration of a 60-year-old Newari home in Baglung's Old Bazaar." },
    { year: "2026", title: "200+ Projects, 17 Years Strong", desc: "A team of 45, over 200 projects delivered, and a growing portfolio across Nepal." },
  ],
  settings: {
    brandName: "Siddhibinayak",
    tagline: "Design & Construction",
    siteUrl: "https://siddhibinayak.com.np",
    metaDesc: "Premium design & construction services in Baglung, Nepal.",
    facebook: "https://facebook.com/siddhibinayak",
    instagram: "https://instagram.com/siddhibinayak",
    youtube: "https://youtube.com/@siddhibinayak",
  },
  brand: {
    primary: "#0f2240",
    primaryDark: "#0a1733",
    secondary: "#505f77",
    fontHead: "Manrope",
    fontBody: "Work Sans",
  },
  navigation: [
    { label: "Services", url: "/services" },
    { label: "About", url: "/about" },
    { label: "Projects", url: "/projects" },
    { label: "Process", url: "/#process" },
    { label: "Contact", url: "/contact" },
  ],
};
