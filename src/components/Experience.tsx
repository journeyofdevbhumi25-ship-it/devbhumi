import { BedDouble, Car, Handshake, Heart, MountainSnow, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/Reveal";

interface ExperienceProps {
  onPlan: () => void;
}

interface ExperienceItem {
  icon: LucideIcon;
  title: string;
  text: string;
}

const EXPERIENCES: ExperienceItem[] = [
  {
    icon: MountainSnow,
    title: "Scenic Mountain Journeys",
    text: "Routes chosen for the views — winding passes, river valleys and viewpoints worth stopping for.",
  },
  {
    icon: Heart,
    title: "Personalized Travel Experiences",
    text: "Every itinerary is shaped around you: your pace, your interests and your kind of holiday.",
  },
  {
    icon: Car,
    title: "Comfortable Transportation",
    text: "Well-planned travel between destinations, so you can relax and enjoy the road.",
  },
  {
    icon: BedDouble,
    title: "Handpicked Stay Options",
    text: "Stays chosen to suit your comfort, your budget and the character of each place.",
  },
  {
    icon: Handshake,
    title: "Friendly Travel Assistance",
    text: "A friendly point of contact from your first enquiry to the journey home.",
  },
];

export function Experience({ onPlan }: ExperienceProps) {
  return (
    <section className="relative overflow-hidden bg-forest-900 py-24 text-snow lg:py-32">
      {/* Ambient light & ridge line */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_10%_0%,rgba(205,166,89,0.16),transparent_60%),radial-gradient(50%_40%_at_100%_100%,rgba(63,125,96,0.35),transparent_60%)]"
      />
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        className="pointer-events-none absolute bottom-0 left-0 h-40 w-full text-forest-950/50 lg:h-56"
      >
        <path
          fill="currentColor"
          d="M0 260 L120 190 L220 240 L360 130 L470 210 L600 90 L720 200 L860 120 L980 190 L1100 100 L1240 210 L1340 160 L1440 230 L1440 320 L0 320 Z"
        />
      </svg>

      <div className="shell relative grid gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <Reveal>
            <Eyebrow tone="light">The Experience</Eyebrow>
            <h2 className="mt-4 text-balance font-display text-4xl font-light leading-[1.05] tracking-[-0.015em] sm:text-5xl lg:text-[3.5rem]">
              More Than <span className="italic text-gold-300">Just a Trip</span>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-6 text-pretty text-base leading-relaxed text-sand-200/85 sm:text-lg">
              We don't just hand you a package. We listen to how you like to travel — the pace, the places, the people
              you're going with — and shape a journey around it. Then we stay with you, from the first message to the
              drive home.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button onClick={onPlan} variant="gold" size="lg" arrow>
                Plan Your Trip
              </Button>
              <p className="font-display text-lg italic text-sand-200/80">Your journey begins here.</p>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <ul className="divide-y divide-white/10 border-y border-white/10">
            {EXPERIENCES.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 80}>
                <li className="group flex items-start gap-5 py-6 sm:items-center sm:gap-7 lg:py-7">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/[0.07] text-gold-300 ring-1 ring-white/10 transition-all duration-500 ease-out-expo group-hover:-translate-y-0.5 group-hover:bg-gold-500/15 group-hover:ring-gold-400/40">
                    <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <div className="flex-1">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="font-display text-2xl font-light tracking-tight text-snow">{title}</h3>
                      <span className="hidden text-xs font-bold tracking-[0.2em] text-white/25 sm:block">0{i + 1}</span>
                    </div>
                    <p className="mt-1.5 max-w-xl text-pretty text-sm leading-relaxed text-sand-200/75 sm:text-[15px]">{text}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
