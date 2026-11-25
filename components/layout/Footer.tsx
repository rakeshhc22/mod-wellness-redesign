import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import Container from "./Container";
import { mainNav, socialLinks } from "@/data/navigation";
import { categories } from "@/data/products";
import { brand, contact, footerContent } from "@/data/siteContent";

export default function Footer() {
  const year = new Date().getFullYear();

  const quickLinks = mainNav.filter((item) => !item.children);

  return (
    <footer className="bg-moss text-linen">
      <Container className="py-16 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1 flex flex-col gap-4">
            <span className="font-display text-2xl">{brand.name}</span>
            <p className="text-sm text-linen/95 leading-relaxed max-w-xs">
              {footerContent.brandBlurb}
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <span className="eyebrow text-linen/80">Quick Links</span>
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-linen/95 hover:text-linen focus-visible:text-linen transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-linen/60 focus-visible:ring-offset-2 focus-visible:ring-offset-moss"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <span className="eyebrow text-linen/80">Categories</span>
            <ul className="flex flex-col gap-2.5">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={cat.href}
                    className="text-sm text-linen/95 hover:text-linen focus-visible:text-linen transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-linen/60 focus-visible:ring-offset-2 focus-visible:ring-offset-moss"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <span className="eyebrow text-linen/80">Contact</span>
            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-2.5 text-sm text-linen/95">
                <MapPin size={16} strokeWidth={1.75} className="shrink-0 mt-0.5" />
                <span>{contact.address}</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-linen/95">
                <Mail size={16} strokeWidth={1.75} className="shrink-0" />
                <a
                  href={`mailto:${contact.email}`}
                  className="hover:text-linen focus-visible:text-linen transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-linen/60 focus-visible:ring-offset-2 focus-visible:ring-offset-moss"
                >
                  {contact.email}
                </a>
              </li>
            </ul>

            {socialLinks.length > 0 && (
              <ul className="flex gap-4 pt-1">
                {socialLinks.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      className="text-sm text-linen/95 hover:text-linen focus-visible:text-linen transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-linen/60 focus-visible:ring-offset-2 focus-visible:ring-offset-moss"
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-linen/15 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-linen/80">
            © {year} {brand.legalName}. All rights reserved.
          </p>
          <p className="eyebrow text-linen/70">Demo Concept — Not the Live Store</p>
        </div>
      </Container>
    </footer>
  );
}
