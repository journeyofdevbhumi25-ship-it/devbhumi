import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/Reveal";
import { useParallax } from "@/hooks/useParallax";
import { IMAGES, px, pxSet } from "@/data/site";

interface EmotionalProps {
  onPlan: () => void;
}

export function Emotional({ onPlan }: EmotionalProps) {
  const { sectionRef, targetRef } = useParallax<HTMLImageElement>(0.22);

  return (
    <section ref={sectionRef} className="relative flex min-h-[80svh] items-center overflow-hidden bg-forest-950 py-32 text-snow lg:min-h-[90svh] lg:py-44">
      <div className="absolute inset-0 overflow-hidden">
        <img
          ref={targetRef}
          src={px(IMAGES.emotional, 1920, 1152)}
          srcSet={pxSet(IMAGES.emotional, [960, 1440, 1920, 2400], 5 / 3)}
          sizes="100vw"
          alt="A lone road winding beside a river through the mountains of Ladakh"
          loading="lazy"
          decoding="async"
          className="h-full w-full scale-[1.15] object-cover will-change-transform"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-forest-950/45" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-forest-950/70 via-transparent to-forest-950/80" />
      </div>

      <div className="shell relative">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-gold-300">Travel, remembered</p>
            <h2 className="mt-5 text-balance font-display text-5xl font-light italic leading-[1.02] tracking-[-0.02em] sm:text-6xl lg:text-7xl xl:text-[5.25rem]">
              Some journeys become memories.
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <p className="mx-auto mt-7 max-w-2xl text-pretty text-base leading-relaxed text-sand-100/85 sm:text-lg">
              Travel is not only about the places you visit. It's about the people you travel with, the roads you take,
              the views that stop you in your tracks, and the memories you bring home.
            </p>
          </Reveal>
          <Reveal delay={260}>
            <div className="mt-10">
              <Button onClick={onPlan} variant="gold" size="lg" arrow>
                Start Your Journey
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
