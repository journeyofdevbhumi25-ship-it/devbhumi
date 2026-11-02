import { ArrowRight, Mail, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { WhatsAppIcon } from "@/components/WhatsAppButton";
import { BUSINESS, DESTINATIONS_BY_REGION, MAIL_LINK, TEL_LINK, waLink } from "@/data/site";

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-sand-50 py-24 lg:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-1/2 h-[30rem] w-[30rem] -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(205,166,89,0.14),transparent)]"
      />

      <div className="shell relative grid items-center gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-6">
          <Reveal>
            <Eyebrow>Contact</Eyebrow>
            <h2 className="mt-4 text-balance font-display text-4xl font-light leading-[1.05] tracking-[-0.015em] text-forest-950 sm:text-5xl lg:text-[3.5rem]">
              Let's Plan Your <span className="italic">Next Adventure</span>
            </h2>
            <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-earth-700 sm:text-lg">
              Have a destination in mind — or just a feeling of wanting to be in the mountains? Reach out and we'll help
              you plan the rest.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-10 rounded-[1.75rem] border border-sand-200 bg-white p-7 shadow-soft sm:p-8">
              <p className="font-display text-2xl font-medium tracking-tight text-forest-950">{BUSINESS.name}</p>
              <p className="mt-1 text-sm text-earth-500">{BUSINESS.regions.join(" · ")}</p>

              <ul className="mt-6 space-y-4">
                <li>
                  <a href={TEL_LINK} className="group flex items-center gap-4 text-earth-900 transition-colors hover:text-forest-800">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-forest-50 text-forest-800 ring-1 ring-forest-100 transition-colors group-hover:bg-forest-900 group-hover:text-gold-300">
                      <Phone className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-earth-500">Call</span>
                      <span className="text-lg font-semibold">{BUSINESS.phoneDisplay}</span>
                    </span>
                  </a>
                </li>
                <li>
                  <a href={MAIL_LINK} className="group flex items-center gap-4 text-earth-900 transition-colors hover:text-forest-800">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-forest-50 text-forest-800 ring-1 ring-forest-100 transition-colors group-hover:bg-forest-900 group-hover:text-gold-300">
                      <Mail className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-earth-500">Email</span>
                      <span className="block break-all text-lg font-semibold">{BUSINESS.email}</span>
                    </span>
                  </a>
                </li>
              </ul>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <Button href={TEL_LINK} variant="primary" icon={<Phone />}>
                  Call Us
                </Button>
                <Button href={waLink()} target="_blank" rel="noopener noreferrer" variant="whatsapp" icon={<WhatsAppIcon />}>
                  WhatsApp Us
                </Button>
                <Button href="#plan" variant="outline" icon={<Send />}>
                  Send Enquiry
                </Button>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Quick WhatsApp enquiry */}
        <div className="lg:col-span-6">
          <Reveal delay={160}>
            <div className="relative overflow-hidden rounded-[2rem] bg-forest-900 p-7 text-snow shadow-lift sm:p-9 lg:ml-6 lg:p-10">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_100%_0%,rgba(205,166,89,0.22),transparent_60%),radial-gradient(50%_50%_at_0%_100%,rgba(63,125,96,0.4),transparent_60%)]"
              />
              <div className="relative">
                <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-gold-300">Quick enquiry</p>
                <h3 className="mt-3 font-display text-3xl font-light leading-tight tracking-tight">
                  Tap a region to start a <span className="italic text-gold-300">WhatsApp</span> chat.
                </h3>
                <p className="mt-3 text-pretty text-[15px] leading-relaxed text-sand-200/80">
                  We'll open WhatsApp with a ready-to-send message — just add your destination and dates and hit send.
                </p>

                <ul className="mt-7 flex flex-wrap gap-2.5">
                  {DESTINATIONS_BY_REGION.map(({ region, items }) => (
                    <li key={region}>
                      <a
                        href={waLink(`Hello Journey of Dev Bhumi, I would like to enquire about a trip to ${region}.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 py-2 pl-4 pr-3 text-sm font-medium text-snow/90 backdrop-blur transition-all duration-300 hover:border-gold-300/60 hover:bg-white/10 hover:text-white"
                      >
                        {region}
                        <span className="text-[11px] font-bold text-white/35 tabular-nums">{items.length}</span>
                        <ArrowRight className="h-3.5 w-3.5 text-gold-300 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
                      </a>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-sand-200/75">Want to share more details?</p>
                  <a
                    href="#plan"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-gold-300 transition-colors hover:text-gold-200"
                  >
                    Use the trip planner
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
