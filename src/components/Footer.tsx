import { Fragment } from "react";
import { Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { BrandMark } from "@/components/BrandMark";
import { InstagramIcon, WhatsAppIcon } from "@/components/WhatsAppButton";
import { BUSINESS, DESTINATIONS_BY_REGION, INSTAGRAM_LINK, MAIL_LINK, NAV_LINKS, TEL_LINK, waLink } from "@/data/site";

interface FooterProps {
  onExplore: (id: string) => void;
  onPlan: () => void;
}

export function Footer({ onExplore, onPlan }: FooterProps) {
  return (
    <footer className="relative overflow-hidden bg-forest-950 pb-10 pt-20 text-sand-200">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(closest-side,rgba(205,166,89,0.12),transparent)]"
      />

      <div className="shell relative grid gap-12 lg:grid-cols-12">
        {/* Brand */}
        <div className="lg:col-span-5">
          <div className="flex items-start gap-5">
            <span className="block h-20 w-20 shrink-0 rounded-full bg-snow p-1 shadow-lift sm:h-24 sm:w-24">
              <BrandMark className="h-full w-full" />
            </span>
            <div>
              <p className="font-display text-2xl font-medium leading-tight tracking-tight text-snow">
                Journey of <span className="italic">Dev Bhumi</span>
              </p>
              <p className="mt-1.5 text-[10px] font-bold uppercase tracking-[0.24em] text-gold-300">
                Explore · Experience · Belong
              </p>
            </div>
          </div>
          <p className="mt-6 font-display text-2xl font-light italic text-sand-100">Discover. Explore. Experience.</p>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-sand-200/70">
            Personalised journeys across the Himalayas — Himachal Pradesh, Uttarakhand, Jammu &amp; Kashmir, Ladakh and
            Sikkim — plus Punjab, royal Rajasthan, the beaches of Goa and the backwaters of Kerala.
          </p>
          <ul className="mt-6 space-y-3 text-sm">
            <li>
              <a href={TEL_LINK} className="inline-flex items-center gap-3 text-sand-100 transition-colors hover:text-gold-300">
                <Phone className="h-4 w-4 text-gold-400" aria-hidden="true" />
                {BUSINESS.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={MAIL_LINK} className="inline-flex items-center gap-3 break-all text-sand-100 transition-colors hover:text-gold-300">
                <Mail className="h-4 w-4 text-gold-400" aria-hidden="true" />
                {BUSINESS.email}
              </a>
            </li>
            <li>
              <a
                href={INSTAGRAM_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-sand-100 transition-colors hover:text-gold-300"
                aria-label="Follow us on Instagram"
              >
                <InstagramIcon className="h-4 w-4 text-gold-400" />
                @journey_of_devbhumi
              </a>
            </li>
          </ul>
        </div>

        {/* Navigation */}
        <nav aria-label="Footer" className="lg:col-span-3">
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-gold-300">Explore</p>
          <ul className="mt-5 space-y-3 text-[15px]">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a href={link.href} className="text-sand-200/80 transition-colors hover:text-snow">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* CTA */}
        <div className="lg:col-span-4">
          <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6">
            <p className="font-display text-2xl font-light leading-tight text-snow">
              Ready to begin <span className="italic text-gold-300">your</span> journey?
            </p>
            <p className="mt-2 text-sm leading-relaxed text-sand-200/70">
              Tell us where you'd like to go and we'll help plan the rest.
            </p>
            <div className="mt-5 space-y-3">
              <Button onClick={onPlan} variant="gold" className="w-full" arrow>
                Plan Your Trip
              </Button>
              <Button href={waLink()} target="_blank" rel="noopener noreferrer" variant="outline-light" className="w-full" icon={<WhatsAppIcon />}>
                WhatsApp Us
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Destination index, grouped by region */}
      <div className="shell relative mt-14 border-t border-white/10 pt-10">
        <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-gold-300">Destinations by region</p>
        <ul className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2 md:grid-cols-3">
          {DESTINATIONS_BY_REGION.map(({ region, items }) => (
            <li key={region}>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-sand-200/45">{region}</p>
              <p className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[15px] leading-snug">
                {items.map((d, i) => (
                  <Fragment key={d.id}>
                    {i > 0 && (
                      <span aria-hidden="true" className="text-white/20">
                        ·
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => onExplore(d.id)}
                      className="text-sand-200/80 transition-colors hover:text-snow focus-visible:text-gold-300 focus-visible:outline-none"
                    >
                      {d.shortName}
                    </button>
                  </Fragment>
                ))}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className="shell relative mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-sand-200/60 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 {BUSINESS.name}. All Rights Reserved.</p>
        <p>
          Photography via{" "}
          <a href="https://www.pexels.com" target="_blank" rel="noopener noreferrer" className="underline decoration-white/20 underline-offset-4 transition-colors hover:text-snow">
            Pexels
          </a>
        </p>
      </div>
    </footer>
  );
}
