import { Compass, Heart, Leaf, Mountain, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { WhatsAppIcon } from "@/components/WhatsAppButton";
import { IMAGES, px, pxSet, waLink } from "@/data/site";

interface WelcomeProps {
  onPlan: () => void;
}

const TRAVEL_STYLES = [
  { icon: Users, label: "Family holidays" },
  { icon: Heart, label: "Romantic escapes" },
  { icon: Mountain, label: "Adventures with friends" },
  { icon: Leaf, label: "Peaceful mountain getaways" },
];

export function Welcome({ onPlan }: WelcomeProps) {
  return (
    <section id="about" className="relative overflow-hidden bg-snow py-24 lg:py-32">
      {/* Warm ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-10 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(closest-side,rgba(205,166,89,0.16),transparent)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 bottom-0 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(closest-side,rgba(63,125,96,0.10),transparent)]"
      />

      <div className="shell relative grid items-center gap-16 lg:grid-cols-12 lg:gap-12">
        {/* Copy */}
        <div className="lg:col-span-6 xl:col-span-5">
          <Reveal>
            <Eyebrow>Welcome</Eyebrow>
            <h2 className="mt-4 text-balance font-display text-4xl font-light leading-[1.05] tracking-[-0.015em] text-forest-950 sm:text-5xl lg:text-[3.5rem]">
              Welcome to <span className="italic">Journey of Dev Bhumi</span>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-6 text-pretty text-base leading-relaxed text-earth-700 sm:text-lg">
              From peaceful Himalayan valleys and breathtaking mountain roads to royal palaces, quiet backwaters and sunlit
              beaches, Journey of Dev Bhumi helps you discover some of India's most beautiful destinations. Whether you are planning a family holiday, a romantic escape,
              an adventure with friends, or a peaceful mountain getaway, we help turn your travel plans into memorable
              journeys.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {TRAVEL_STYLES.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-3 rounded-2xl border border-sand-200 bg-sand-50/70 px-4 py-3 text-sm font-semibold text-forest-900"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-gold-600 shadow-soft">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  {label}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={280}>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button onClick={onPlan} size="lg" arrow>
                Start Planning Your Trip
              </Button>
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-forest-800 transition-colors hover:text-forest-600"
              >
                <WhatsAppIcon className="h-4 w-4 text-whatsapp" />
                Or say hello on WhatsApp
              </a>
            </div>
          </Reveal>
        </div>

        {/* Imagery */}
        <div className="relative lg:col-span-6 xl:col-span-7">
          <Reveal className="relative mx-auto max-w-xl lg:ml-auto lg:max-w-none">
            <div className="relative pb-16 pr-10 sm:pr-16 lg:pb-20">
              {/* Main image */}
              <div className="relative overflow-hidden rounded-[2rem] shadow-lift">
                <img
                  src={px(IMAGES.welcomeMain, 900, 1125)}
                  srcSet={pxSet(IMAGES.welcomeMain, [480, 720, 960, 1200], 4 / 5)}
                  sizes="(min-width: 1024px) 45vw, 90vw"
                  alt="A traveller with a backpack gazing at snow-capped Himalayan peaks at sunset"
                  loading="lazy"
                  decoding="async"
                  className="reveal-img aspect-[4/5] w-full object-cover"
                />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-forest-950/30 to-transparent" />
              </div>

              {/* Secondary image */}
              <div className="absolute bottom-0 right-0 w-[52%] overflow-hidden rounded-[1.5rem] border-[6px] border-snow shadow-lift sm:w-[46%]">
                <img
                  src={px(IMAGES.welcomeSecondary, 600, 750)}
                  srcSet={pxSet(IMAGES.welcomeSecondary, [360, 540, 720], 4 / 5)}
                  sizes="(min-width: 1024px) 22vw, 45vw"
                  alt="A traveller enjoying a golden sunset over the hills of Shimla"
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>

              {/* Floating badge */}
              <div className="absolute -left-3 top-8 flex items-center gap-3 rounded-2xl bg-snow/95 px-4 py-3 shadow-lift backdrop-blur sm:-left-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-forest-900 text-gold-300">
                  <Compass className="h-5 w-5" aria-hidden="true" />
                </span>
                <div className="leading-tight">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-600">Personally planned</p>
                  <p className="font-display text-base font-medium text-forest-950">Journeys shaped around you</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
