import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/atoms/Container";
import type { CmsState } from "@/lib/cms-types";

const COMPANY_LINKS = [
  { label: "About Us", url: "/about" },
  { label: "Our Services", url: "/services" },
  { label: "Our Projects", url: "/projects" },
  { label: "Our Process", url: "/#process" },
  { label: "Testimonials", url: "/#testimonials" },
  { label: "Contact", url: "/contact" },
];

const SERVICE_LINKS = [
  { label: "Residential Construction", url: "/services#residential" },
  { label: "Commercial Construction", url: "/services#commercial" },
  { label: "Interior Design", url: "/services#interior" },
  { label: "Renovation & Retrofit", url: "/services#renovation" },
  { label: "Civil Works", url: "/services#civil" },
];

interface FooterProps {
  cms?: CmsState;
}

export function Footer({ cms }: FooterProps) {
  const brandName = cms?.settings.brandName ?? "Siddhibinayak";
  const address = cms?.contact.address ?? "Main Road, Baglung-04\nBaglung District, Nepal";
  const phone = cms?.contact.phone1 ?? "+977 68-XXXXXX";
  const email = cms?.contact.email1 ?? "info@siddhibinayak.com.np";
  const hours = cms?.contact.hours ?? "Sun–Fri: 9am – 6pm";
  const facebook = cms?.settings.facebook ?? "#";
  const instagram = cms?.settings.instagram ?? "#";
  const youtube = cms?.settings.youtube ?? "#";
  return (
    <footer className="bg-[#111517] pt-20 pb-10">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-8 lg:gap-15 mb-15">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <Image
                src="/logo.jpg"
                alt={brandName}
                width={48}
                height={48}
                className="rounded-full object-contain bg-white border border-white/20 p-0.5"
              />
              <div>
                <div className="font-head font-extrabold text-white text-[18px] leading-tight">
                  {brandName}
                </div>
                <div className="text-[11px] uppercase tracking-widest text-white/40 font-medium">
                  Nirman Sewa
                </div>
              </div>
            </div>
            <p className="text-sm text-white/50 leading-relaxed mb-6">
              Building Baglung&apos;s future with precision, heritage, and heart. Your trusted construction partner in Gandaki Province, Nepal since 2009.
            </p>
            <div className="flex gap-3">
              <a href={facebook} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/8 flex items-center justify-center text-white/50 hover:bg-primary hover:text-white transition-all">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href={instagram} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/8 flex items-center justify-center text-white/50 hover:bg-primary hover:text-white transition-all">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href={youtube} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/8 flex items-center justify-center text-white/50 hover:bg-primary hover:text-white transition-all">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/></svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-head text-[13px] font-bold uppercase tracking-widest text-white/40 mb-5">
              Services
            </h4>
            <div className="flex flex-col gap-3">
              {SERVICE_LINKS.map((l) => (
                <Link
                  key={l.url}
                  href={l.url}
                  className="text-sm text-white/70 hover:text-gold transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-head text-[13px] font-bold uppercase tracking-widest text-white/40 mb-5">
              Company
            </h4>
            <div className="flex flex-col gap-3">
              {COMPANY_LINKS.map((l) => (
                <Link
                  key={l.url}
                  href={l.url}
                  className="text-sm text-white/70 hover:text-gold transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-head text-[13px] font-bold uppercase tracking-widest text-white/40 mb-5">
              Contact
            </h4>
            <div className="flex flex-col gap-4 text-sm text-white/70">
              <div className="flex items-start gap-2.5">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="shrink-0 mt-0.5 text-white/40"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
                <span className="whitespace-pre-line leading-relaxed">{address.split("\n").slice(0, 2).join("\n")}</span>
              </div>
              <a href={`tel:${phone.replace(/\s/g, "")}`} className="flex items-center gap-2.5 hover:text-[#f4b400] transition-colors">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="shrink-0 text-white/40"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 5.5 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.41 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                {phone}
              </a>
              <a href={`mailto:${email}`} className="flex items-center gap-2.5 hover:text-[#f4b400] transition-colors">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="shrink-0 text-white/40"><path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/><polyline points="2,6 12,13 22,6"/></svg>
                {email}
              </a>
              <div className="flex items-center gap-2.5">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="shrink-0 text-white/40"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>
                {hours.split("\n")[0]}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[13px] text-white/35">
          <span>© {new Date().getFullYear()} Siddhibinayak Nirman Sewa. All rights reserved.</span>
          <span>Baglung, Nepal</span>
        </div>
      </Container>
    </footer>
  );
}
