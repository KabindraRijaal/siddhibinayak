import { Container } from "@/components/atoms/Container";
import { Btn } from "@/components/atoms/Btn";

interface CTABannerProps {
  title: string;
  desc: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export function CTABanner({
  title,
  desc,
  ctaLabel = "Start Your Project →",
  ctaHref = "/contact",
}: CTABannerProps) {
  return (
    <section className="bg-linear-to-br from-primary to-primary-dark py-20 text-center">
      <Container>
        <div className="max-w-2xl mx-auto">
          <h2 className="font-head text-[40px] font-extrabold text-white mb-4">{title}</h2>
          <p className="text-[17px] text-white/80 mb-9 leading-relaxed">{desc}</p>
          <Btn variant="white" href={ctaHref}>
            {ctaLabel}
          </Btn>
        </div>
      </Container>
    </section>
  );
}
