import type { Metadata } from "next";
import { Manrope, Work_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { QuoteModalProvider } from "@/components/organisms/QuoteModal";
import { Toaster } from "@/components/ui/sonner";
import { CmsPreviewProvider } from "@/lib/cms-preview";

const manrope = Manrope({
  variable: "--font-head",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const workSans = Work_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Siddhibinayak Nirman Sewa",
  description:
    "Professional construction company based in Baglung, Nepal. Building your vision into reality.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${workSans.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CmsPreviewProvider>
          <QuoteModalProvider>
            {children}
            <Toaster richColors position="bottom-center" />
          </QuoteModalProvider>
        </CmsPreviewProvider>
      </body>
    </html>
  );
}
