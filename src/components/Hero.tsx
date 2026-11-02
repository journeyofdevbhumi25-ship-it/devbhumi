import { useEffect, useRef } from "react";
import { MapPin, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { IMAGES, REGIONS, px, pxSet, type RegionFilter } from "@/data/site";

interface HeroProps {
  onPlan: () => void;
  onRegion: (region: RegionFilter) => void;
}

export function Hero({ onPlan, onRegion }: HeroProps) {
  const imgRef = useRef<HTMLImageElement | null>(null);

  /* Gentle parallax on the hero image while it's in view */
  useEffect(() => {
    const img = imgRef.current;
    if (!img || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      if (y > window.innerHeight * 1.2) return;
      img.style.transform = `translate3d(0, ${(y * 0.22).toFixed(1)}px, 0) scale(1.06)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section id="home" className="relative flex min-h-[100svh] items-end overflow-hidden bg-forest-950 text-snow lg:items-center">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          ref={imgRef}
          src={px(IMAGES.hero, 1920, 1080)}
          srcSet={pxSet(IMAGES.hero, [768, 1280, 1920, 2560], 16 / 9)}
          sizes="100vw"
          alt="Golden sunrise light on the snow-covered peaks of Himachal Pradesh"
          fetchPriority="high"
          decoding="async"
          className="h-full w-full scale-[1.06] object-cover object-center animate-fade-in will-change-transform"
        />
        {/* Readability overlays */}
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/45 to-forest-950/25" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-forest-950/70 via-forest-950/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="shell relative z-10 pb-24 pt-36 sm:pb-28 lg:py-44">
        <div className="max-w-3xl">
          <p
            className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-bold uppercase leading-relaxed tracking-[0.28em] text-gold-300 animate-fade-up"
            style={{ animationDelay: "150ms" }}
          >
            <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span>Mountains · Deserts · Beaches · Backwaters · Heritage</span>
          </p>

          <h1
            className="mt-6 text-balance font-display text-[2.85rem] font-light leading-[1.02] tracking-[-0.02em] sm:text-6xl lg:text-7xl xl:text-[5.6rem] animate-fade-up"
            style={{ animationDelay: "300ms" }}
          >
            Discover the Beauty of <em className="font-normal italic text-gold-300">Dev Bhumi</em>
          </h1>

          <p
            className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-sand-100/85 sm:text-lg animate-fade-up"
            style={{ animationDelay: "450ms" }}
          >
            Explore breathtaking mountains, peaceful valleys, spiritual destinations and unforgettable experiences with
            Journey of Dev Bhumi.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center animate-fade-up" style={{ animationDelay: "600ms" }}>
            <Button onClick={onPlan} variant="gold" size="lg" arrow>
              Plan Your Journey
            </Button>
            <Button href="#destinations" variant="outline-light" size="lg">
              Explore Destinations
            </Button>
          </div>

          <div
            className="mt-8 inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/10 py-2 pl-3 pr-4 text-sm text-white/90 backdrop-blur-md animate-fade-up"
            style={{ animationDelay: "750ms" }}
          >
            <ShieldCheck className="h-4 w-4 text-gold-300" aria-hidden="true" />
            <span className="font-medium">Your journey. Your memories. Our responsibility.</span>
          </div>
        </div>

        {/* Quick region strip */}
        <div className="mt-14 border-t border-white/15 pt-6 animate-fade-up lg:mt-20" style={{ animationDelay: "900ms" }}>
          {/* Chips wrap on phones (so none hide behind the floating WhatsApp button) and scroll in one row on larger screens */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <span className="shrink-0 text-[11px] font-bold uppercase tracking-[0.22em] text-white/50">Explore by region</span>
            <ul className="no-scrollbar flex flex-wrap items-center gap-2 sm:flex-nowrap sm:overflow-x-auto">
              {REGIONS.map((region) => (
                <li key={region} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => onRegion(region)}
                    className="inline-flex rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-sm text-white/80 backdrop-blur transition-colors duration-300 hover:border-gold-300/60 hover:bg-white/15 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-300"
                  >
                    {region}
                  </button>
                </li>
              ))}
              {/* Breathing room so the last chip clears the floating WhatsApp button when the row scrolls */}
              <li aria-hidden="true" className="hidden w-20 shrink-0 sm:block lg:hidden" />
            </ul>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#about"
        aria-label="Scroll to the welcome section"
        className="absolute bottom-6 right-6 z-10 hidden flex-col items-center gap-2 text-white/60 transition-colors hover:text-white lg:flex"
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.28em]">Scroll</span>
        <span className="relative flex h-10 w-6 items-start justify-center rounded-full border border-white/40 p-1.5">
          <span className="h-2 w-1 rounded-full bg-gold-300 animate-scroll-dot" />
        </span>
      </a>
    </section>
  );
}
