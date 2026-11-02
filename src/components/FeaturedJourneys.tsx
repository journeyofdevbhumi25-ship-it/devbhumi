import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { JOURNEYS, REGIONS, px, pxSet, waLink, type Journey, type RegionFilter as Filter } from "@/data/site";
import { RegionFilter } from "@/components/ui/RegionFilter";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { WhatsAppIcon } from "@/components/WhatsAppButton";

interface FeaturedJourneysProps {
  onPlan: (payload: { destination?: string; message?: string }) => void;
}

function JourneyCard({ journey, onPlan }: { journey: Journey; onPlan: FeaturedJourneysProps["onPlan"] }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-sand-200/80 bg-white shadow-soft transition-all duration-500 ease-out-expo hover:-translate-y-1 hover:shadow-lift">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={px(journey.imageId, 800, 600)}
          srcSet={pxSet(journey.imageId, [420, 640, 800, 1000], 4 / 3)}
          sizes="(min-width: 640px) 380px, 82vw"
          alt={journey.name}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out-expo group-hover:scale-[1.06]"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-forest-950/40 via-transparent to-transparent" />
        <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md">
          <Sparkles className="h-3 w-3 text-gold-300" aria-hidden="true" />
          Customisable
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-bold uppercase tracking-[0.22em] text-gold-600">
          <span>{journey.region}</span>
          <span aria-hidden="true" className="h-1 w-1 rounded-full bg-gold-400" />
          <span className="text-earth-500">{journey.idealFor}</span>
        </p>
        <h3 className="mt-2 font-display text-2xl font-light leading-tight tracking-tight text-forest-950">{journey.name}</h3>
        <ul className="mt-3 flex flex-wrap gap-x-2 gap-y-1 text-sm text-earth-500">
          {journey.highlights.map((h, i) => (
            <li key={h} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden="true" className="h-1 w-1 rounded-full bg-gold-400" />}
              {h}
            </li>
          ))}
        </ul>

        <div className="mt-auto grid gap-2.5 pt-6">
          <a
            href={waLink(`Hello Journey of Dev Bhumi, I would like to get package details for the ${journey.name}.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-forest-800 px-4 text-sm font-semibold text-snow shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:bg-forest-900 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Get Package Details
          </a>
          <button
            type="button"
            onClick={() => onPlan({ destination: journey.destination, message: `I'm interested in the ${journey.name}.` })}
            className="inline-flex h-11 w-full items-center justify-center rounded-full border border-forest-800/25 px-4 text-sm font-semibold text-forest-900 transition-all duration-300 hover:border-forest-800 hover:bg-forest-800 hover:text-snow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
          >
            Enquire Now
          </button>
        </div>
      </div>
    </article>
  );
}

export function FeaturedJourneys({ onPlan }: FeaturedJourneysProps) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [filter, setFilter] = useState<Filter>("All");

  const counts = useMemo(() => {
    const map = new Map<Filter, number>([["All", JOURNEYS.length]]);
    for (const region of REGIONS) map.set(region, JOURNEYS.filter((j) => j.region === region).length);
    return map;
  }, []);

  const visible = useMemo(() => (filter === "All" ? JOURNEYS : JOURNEYS.filter((j) => j.region === filter)), [filter]);

  /* Start from the first card whenever the region changes */
  useEffect(() => {
    scrollerRef.current?.scrollTo({ left: 0 });
  }, [filter]);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const amount = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <section id="tours" className="relative overflow-hidden bg-snow py-24 lg:py-32">
      <div className="shell">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow="Featured Journeys"
              title={
                <>
                  Journeys We Love <span className="italic">Planning</span>
                </>
              }
              subtitle="Popular routes to spark ideas — every journey is shaped around your dates, pace and travel style."
            />
          </Reveal>
          <Reveal delay={120} className="hidden md:block">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => scrollBy(-1)}
                aria-label="Scroll journeys left"
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-forest-900/15 bg-white text-forest-900 shadow-soft transition hover:bg-forest-900 hover:text-snow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => scrollBy(1)}
                aria-label="Scroll journeys right"
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-forest-900/15 bg-white text-forest-900 shadow-soft transition hover:bg-forest-900 hover:text-snow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </Reveal>
        </div>

        <Reveal delay={100}>
          <RegionFilter
            value={filter}
            onChange={setFilter}
            counts={counts}
            label="Filter journeys by region"
            allLabel="All journeys"
            align="start"
            className="mt-8"
          />
        </Reveal>
      </div>

      <Reveal delay={150}>
        <div
          ref={scrollerRef}
          className="no-scrollbar mt-8 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-5 pb-6 pt-2 sm:px-8 lg:px-[max(2.5rem,calc((100vw-80rem)/2+2.5rem))]"
        >
          {visible.map((journey) => (
            <div key={journey.id} data-card className="w-[82vw] max-w-[380px] shrink-0 snap-start sm:w-[380px]">
              <JourneyCard journey={journey} onPlan={onPlan} />
            </div>
          ))}
          <div aria-hidden="true" className="w-px shrink-0" />
        </div>
      </Reveal>

      {visible.length > 1 && (
        <div className="shell mt-4 flex items-center justify-between text-sm text-earth-500 md:hidden">
          <span>Swipe to see more journeys</span>
          <span aria-hidden="true">→</span>
        </div>
      )}
    </section>
  );
}
