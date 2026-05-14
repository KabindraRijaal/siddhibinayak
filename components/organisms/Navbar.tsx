"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/atoms/Container";
import { Btn } from "@/components/atoms/Btn";
import { useQuote } from "@/components/organisms/QuoteModal";
import { cn } from "@/lib/utils";

const DEFAULT_NAV_LINKS = [
  { label: "Services", url: "/services" },
  { label: "About", url: "/about" },
  { label: "Projects", url: "/projects" },
  { label: "Contact", url: "/contact" },
];

interface NavbarProps {
  activePage?: string;
  navLinks?: { label: string; url: string }[];
  brandName?: string;
}

export function Navbar({ activePage, navLinks, brandName }: NavbarProps) {
  const NAV_LINKS = navLinks ?? DEFAULT_NAV_LINKS;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { open: openQuote } = useQuote();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 transition-shadow duration-300",
          scrolled && "shadow-md"
        )}
      >
        <Container>
          <div className="flex items-center justify-between h-[72px]">
            <Link href="/" className="flex items-center gap-3 text-decoration-none">
              <Image
                src="/logo.jpg"
                alt="Siddhibinayak Nirman Sewa"
                width={48}
                height={48}
                className="rounded-full object-contain bg-white border border-gray-100"
              />
              <div>
                <div className="font-head font-extrabold text-primary text-[18px] leading-tight">
                  {brandName ?? "Siddhibinayak"}
                </div>
                <div className="text-[11px] uppercase tracking-widest text-secondary font-medium">
                  Nirman Sewa
                </div>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.url}
                  href={l.url}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary relative pb-1",
                    activePage === l.label.toLowerCase()
                      ? "text-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary after:rounded"
                      : "text-foreground"
                  )}
                >
                  {l.label}
                </Link>
              ))}
            </div>

            <div className="hidden lg:block">
              <Btn onClick={() => openQuote()}>Get a Quote →</Btn>
            </div>

            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden p-2 text-foreground"
              aria-label="Toggle menu"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </Container>
      </nav>

      {open && (
        <div className="fixed top-[72px] inset-x-0 z-40 bg-white border-b border-gray-200 py-6 px-5 flex flex-col gap-5 lg:hidden shadow-md">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.url}
              href={l.url}
              className="text-base font-medium text-foreground hover:text-primary"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Btn
            onClick={() => {
              setOpen(false);
              openQuote();
            }}
            className="self-start"
          >
            Get a Quote →
          </Btn>
        </div>
      )}
    </>
  );
}
