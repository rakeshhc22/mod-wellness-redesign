import type { Metadata } from "next";
import "@fontsource-variable/fraunces";
import "@fontsource-variable/manrope";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "./globals.css";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Chatbot from "@/components/ui/Chatbot";
import BackToTop from "@/components/ui/BackToTop";
import SmoothScrollProvider from "@/lib/animations/SmoothScrollProvider";
import { brand } from "@/data/siteContent";

export const metadata: Metadata = {
  title: `${brand.name} — Wellness, Reimagined`,
  description:
    "MOD Wellness and Care is a premium personal care brand spanning hair care, skin care, sun care, beauty and wellness — formulated without sulphates, parabens or silicones, and never tested on animals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-linen text-ink">
        <SmoothScrollProvider>
          <AnnouncementBar />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <Chatbot />
          <BackToTop />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
