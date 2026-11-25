"use client";

import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import Container from "@/components/layout/Container";
import RevealOnScroll from "@/lib/animations/RevealOnScroll";
import TextReveal from "@/lib/animations/TextReveal";
import { contact, contactPage } from "@/data/siteContent";

const inputClasses =
  "w-full bg-linen border border-stone px-4 py-3 text-sm text-ink placeholder:text-sage/70 focus:outline-none focus:border-moss transition-colors rounded-sm";

export default function ContactPage() {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    // No backend functionality yet — this is a placeholder form.
    e.preventDefault();
  }

  return (
    <section>
      <Container className="pt-16 pb-24 sm:pt-24 sm:pb-32">
        <RevealOnScroll trigger="mount" direction="left" distance={30}>
          <span className="eyebrow text-brass">Contact</span>
        </RevealOnScroll>
        <TextReveal
          as="h1"
          trigger="mount"
          delay={0.1}
          className="font-display text-5xl sm:text-6xl leading-[0.98] text-ink mt-4 max-w-2xl"
          lines={[contactPage.heading]}
        />
        <RevealOnScroll trigger="mount" direction="left" distance={30} delay={0.35}>
          <p className="text-base sm:text-lg text-sage leading-relaxed max-w-xl mt-5">
            {contactPage.intro}
          </p>
        </RevealOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-14 lg:gap-20 mt-16">
          <RevealOnScroll direction="left" className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <span className="eyebrow text-ink/50">Address</span>
              <div className="flex items-start gap-3">
                <MapPin size={18} strokeWidth={1.75} className="text-moss shrink-0 mt-0.5" />
                <p className="text-base text-ink leading-relaxed">{contact.address}</p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <span className="eyebrow text-ink/50">Email</span>
              <div className="flex items-center gap-3">
                <Mail size={18} strokeWidth={1.75} className="text-moss shrink-0" />
                <a
                  href={`mailto:${contact.email}`}
                  className="text-base text-ink hover:text-moss transition-colors"
                >
                  {contact.email}
                </a>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll direction="right" delay={0.1}>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="eyebrow text-ink/60">
                  Name
                </label>
                <input id="name" name="name" type="text" className={inputClasses} placeholder="Your name" />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="phone" className="eyebrow text-ink/60">
                  Phone
                </label>
                <input id="phone" name="phone" type="tel" className={inputClasses} placeholder="Your phone number" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="eyebrow text-ink/60">
                Email
              </label>
              <input id="email" name="email" type="email" className={inputClasses} placeholder="you@example.com" />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="eyebrow text-ink/60">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                className={`${inputClasses} resize-none`}
                placeholder="How can we help?"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-sm font-label text-xs uppercase tracking-[0.14em] bg-moss text-linen border border-moss hover:bg-moss-deep hover:border-moss-deep transition-colors duration-300"
              >
                Send Message
                <ArrowUpRight
                  size={15}
                  strokeWidth={2}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </button>
            </div>
          </form>
          </RevealOnScroll>
        </div>
      </Container>
    </section>
  );
}
