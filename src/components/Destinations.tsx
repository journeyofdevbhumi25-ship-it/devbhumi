import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/utils/cn";
import { DESTINATIONS, FEATURED_DESTINATION_IDS, REGIONS, px, pxSet, type Destination, type RegionFilter as Filter } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { RegionFilter } from "@/components/ui/RegionFilter";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/Reveal";

const FEATURED_WIDE_ID = "leh-ladakh";

/** Curated preview shown in the collapsed "All destinations" view. */
const FEATURED: Destination[] = FEATURED_DESTINATION_IDS.map((id) => DESTINATIONS.find((d) => d.id === id)).filter(
  (d): d is Destination => d !== undefined,
);

interface DestinationsProps {
  filter: Filter;
  onFilterChange: (filter: Filter) => void;
  onExplore: (id: string) => void;
  onPlan: (destinationName: string) => void;
}

/**
 * Column span on the 3-column (lg) grid, chosen so every row is completely
 * filled no matter how many destinations the active filter returns.
 */
function spanFor(index: number, count: number, ids: string[]): 1 | 2 | 3 {
  if (count === 1) return 3;
  const remainder = count % 3;
  if (remainder === 0) return 1;
  if (remainder === 2) {
    // One wide card needed — prefer the featured one if it can start in column 1 or 2.
    const featured = ids.indexOf(FEATURED_WIDE_ID);
    const wideIndex = featured !== -1 && featured % 3 !== 2 ? featured : count - 1;
    return index === wideIndex ? 2 : 1;
  }
  // remainder === 1 — two wide cards needed: the first and the last.
  return index === 0 || index === count - 1 ? 2 : 1;
}

const SPAN_CLASS: Record<1 | 2 | 3, string> = {
  1: "",
  2: "lg:col-span-2",
  3: "sm:col-span-2 lg:col-span-3",
};

function DestinationCard({
  destination,
  wide,
  onExplore,
  onPlan,
}: {
  destination: Destination;
  wide?: boolean;
  onExplore: (id: string) => void;
  onPlan: (name: string) => void;
}) {
  const ratio = wide ? 16 / 9 : 4 / 5;
  return (
    <article
      onClick={() => onExplore(destination.id)}
      className="group relative flex h-full min-h-[440px] cursor-pointer flex-col justify-end overflow-hidden rounded-[1.75rem] bg-forest-900 shadow-soft transition-shadow duration-500 hover:shadow-lift sm:min-h-[480px]"
    >
      <img
        src={px(destination.imageId, wide ? 1400 : 800, wide ? 788 : 1000)}
        srcSet={pxSet(destination.imageId, wide ? [720, 1080, 1400, 1800] : [420, 640, 800, 1000], ratio)}
        sizes={wide ? "(min-width: 1024px) 66vw, (min-width: 640px) 50vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
        alt={`${destination.name} — ${destination.tagline}`}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out-expo group-hover:scale-[1.06]"
      />

      {/* Gradients */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-forest-950/95 via-forest-950/35 to-forest-950/10 transition-opacity duration-500"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-forest-950/0 transition-colors duration-500 group-hover:bg-forest-950/10"
      />

      {/* Region tag */}
      <span className="absolute left-5 top-5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/90 backdrop-blur-md">
        {destination.region}
      </span>

      {/* Explore icon */}
      <span
        aria-hidden="true"
        className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition-all duration-500 ease-out-expo group-hover:bg-gold-400 group-hover:text-earth-950 group-hover:border-gold-400"
      >
        <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </span>

      {/* Content — in normal flow so the card grows instead of clipping on narrow screens */}
      <div className="relative z-10 p-6 pt-24 text-snow sm:p-7 sm:pt-28">
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-gold-300">{destination.tagline}</p>
        <h3 className="mt-2 text-balance font-display text-[1.75rem] font-light leading-[1.1] tracking-tight transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5 sm:text-3xl lg:text-[2rem]">
          {destination.name}
        </h3>
        <p className={cn("mt-3 text-pretty text-sm leading-relaxed text-sand-100/85", wide ? "max-w-xl" : "max-w-md")}>
          {destination.description}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPlan(destination.name);
            }}
            className="inline-flex h-11 flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-gold-500 px-5 text-sm font-semibold text-earth-950 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-300 sm:h-10 sm:flex-none"
          >
            Plan This Trip
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onExplore(destination.id);
            }}
            className="inline-flex h-11 flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-white/30 bg-white/5 px-4 text-sm font-semibold text-white backdrop-blur transition-all duration-300 hover:border-white hover:bg-white hover:text-forest-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-300 sm:h-10 sm:flex-none"
          >
            Explore Destination
          </button>
        </div>
      </div>
    </article>
  );
}

export function Destinations({ filter, onFilterChange, onExplore, onPlan }: DestinationsProps) {
  const [expanded, setExpanded] = useState(false);

  /* Collapse again whenever the region changes */
  useEffect(() => setExpanded(false), [filter]);

  const counts = useMemo(() => {
    const map = new Map<Filter, number>([["All", DESTINATIONS.length]]);
    for (const region of REGIONS) map.set(region, DESTINATIONS.filter((d) => d.region === region).length);
    return map;
  }, []);

  const list = useMemo(
    () => (filter === "All" ? DESTINATIONS : DESTINATIONS.filter((d) => d.region === filter)),
    [filter],
  );
  const collapsible = filter === "All" && list.length > FEATURED.length;
  const visible = collapsible && !expanded ? FEATURED : list;
  const visibleIds = visible.map((d) => d.id);

  const collapse = () => {
    setExpanded(false);
    document.getElementById("destinations")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="destinations" className="relative bg-sand-50 py-24 lg:py-32">
      <div className="shell">
        <Reveal>
          <SectionHeading
            eyebrow="Destinations"
            title="Where Will Your Journey Take You?"
            subtitle="From the Queen of Hills and the Land of High Passes to royal Rajasthan, Goa's shores and Kerala's backwaters — discover destinations made for unforgettable memories."
          />
        </Reveal>

        <Reveal delay={100}>
          <RegionFilter
            value={filter}
            onChange={onFilterChange}
            counts={counts}
            label="Filter destinations by region"
            allLabel="All destinations"
            className="mt-10"
          />
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {visible.map((destination, i) => {
            const span = spanFor(i, visible.length, visibleIds);
            return (
              <Reveal key={`${filter}-${destination.id}`} delay={(i % 3) * 90} className={cn("h-full", SPAN_CLASS[span])}>
                <DestinationCard destination={destination} wide={span > 1} onExplore={onExplore} onPlan={onPlan} />
              </Reveal>
            );
          })}
        </div>

        {collapsible && (
          <div className="mt-10 flex flex-col items-center gap-3">
            {expanded ? (
              <Button variant="outline" size="lg" onClick={collapse} icon={<ChevronUp />}>
                Show fewer destinations
              </Button>
            ) : (
              <>
                <Button variant="primary" size="lg" onClick={() => setExpanded(true)} icon={<ChevronDown />}>
                  Show all {list.length} destinations
                </Button>
                <p className="text-sm text-earth-500">
                  Showing {FEATURED.length} highlights from {REGIONS.length} regions — or pick a region above.
                </p>
              </>
            )}
          </div>
        )}

        <Reveal delay={120}>
          <p className="mt-10 text-center text-sm text-earth-500">
            Don't see your dream destination?{" "}
            <button
              type="button"
              onClick={() => onPlan("Not sure yet – help me decide")}
              className="font-semibold text-forest-800 underline decoration-gold-400 decoration-2 underline-offset-4 transition-colors hover:text-forest-600"
            >
              Tell us where you'd like to go
            </button>{" "}
            and we'll help plan it.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
