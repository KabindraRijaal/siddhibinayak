import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/atoms/Container";
import type { CmsState } from "@/lib/cms-types";

const COMPANY_LINKS = [
  { label: "About Us", url: "/about" },
  { label: "Services", url: "/services" },
  { label: "Projects", url: "/projects" },
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16">
          <div className="lg:col-span-1">
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
              Building your vision into reality. Professional construction services in Baglung, Nepal since 2009.
            </p>
            <div className="flex gap-3">
              {[
                { key: "f", href: facebook },
                { key: "in", href: instagram },
                { key: "yt", href: youtube },
              ].map((s) => (
                <a
                  key={s.key}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/8 flex items-center justify-center text-white/50 hover:bg-primary hover:text-white transition-all text-xs font-bold uppercase"
                >
                  {s.key}
                </a>
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
              Contact
            </h4>
            <div className="flex flex-col gap-3 text-sm text-white/70">
              <div className="whitespace-pre-line">📍 {address.split("\n").slice(0, 2).join("\n")}</div>
              <a href={`tel:${phone.replace(/\s/g, "")}`} className="hover:text-gold transition-colors">
                📞 {phone}
              </a>
              <a href={`mailto:${email}`} className="hover:text-gold transition-colors">
                ✉️ {email}
              </a>
              <div>🕐 {hours.split("\n")[0]}</div>
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
