import { Car, Compass, Heart, MessageSquareText, Phone, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { WhatsAppIcon } from "@/components/WhatsAppButton";
import { TEL_LINK, waLink } from "@/data/site";

const REASONS = [
  {
    icon: Heart,
    title: "Personalized Trips",
    text: "Trips planned around your preferences, schedule and travel style.",
  },
  {
    icon: Compass,
    title: "Local Destination Knowledge",
    text: "Explore destinations with guidance focused on making your journey comfortable and memorable.",
  },
  {
    icon: Car,
    title: "Comfortable Travel",
    text: "Travel with carefully planned transportation and stay options.",
  },
  {
    icon: MessageSquareText,
    title: "Transparent Planning",
    text: "Clear communication and straightforward trip planning.",
  },
  {
    icon: Sparkles,
    title: "Memorable Experiences",
    text: "We focus on creating journeys you'll remember long after you return home.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="relative bg-sand-50 py-24 lg:py-32">
      <div className="shell">
        <Reveal>
          <SectionHeading
            eyebrow="Why Us"
            title={
              <>
                Why Travel With <span className="italic">Journey of Dev Bhumi?</span>
              </>
            }
            subtitle="Thoughtful planning, honest communication and a genuine love for these mountains — so that you can simply enjoy the journey."
          />
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {REASONS.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={(i % 3) * 90}>
              <article className="group relative h-full overflow-hidden rounded-[1.5rem] border border-sand-200/80 bg-white p-7 shadow-soft transition-all duration-500 ease-out-expo hover:-translate-y-1 hover:shadow-lift lg:p-8">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-gold-200/40 opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100"
                />
                <span className="relative flex h-13 w-13 items-center justify-center rounded-2xl bg-forest-50 text-forest-800 ring-1 ring-forest-100 transition-colors duration-500 group-hover:bg-forest-900 group-hover:text-gold-300">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="relative mt-6 font-display text-2xl font-light tracking-tight text-forest-950">{title}</h3>
                <p className="relative mt-2.5 text-pretty text-[15px] leading-relaxed text-earth-500">{text}</p>
              </article>
            </Reveal>
          ))}

          {/* Conversion card */}
          <Reveal delay={180}>
            <article className="relative flex h-full flex-col justify-between overflow-hidden rounded-[1.5rem] bg-forest-900 p-7 text-snow shadow-lift lg:p-8">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_100%_0%,rgba(205,166,89,0.22),transparent_60%)]"
              />
              <div className="relative">
                <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-gold-300">Ready when you are</p>
                <h3 className="mt-3 font-display text-3xl font-light leading-tight tracking-tight">
                  Let's talk about <span className="italic text-gold-300">your</span> journey.
                </h3>
                <p className="mt-3 text-pretty text-[15px] leading-relaxed text-sand-200/80">
                  Tell us a little about where you'd like to go and we'll get back to you with a personalised plan.
                </p>
              </div>
              <div className="relative mt-8 grid grid-cols-2 gap-3">
                <Button href={TEL_LINK} variant="light" icon={<Phone />}>
                  Call Us
                </Button>
                <Button href={waLink()} target="_blank" rel="noopener noreferrer" variant="whatsapp" icon={<WhatsAppIcon />}>
                  WhatsApp
                </Button>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
