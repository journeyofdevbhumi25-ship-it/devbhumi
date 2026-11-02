import { useEffect, useRef } from "react";
import { CalendarDays, MapPin, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/WhatsAppButton";
import { px, pxSet, waLink, type Destination } from "@/data/site";

interface DestinationModalProps {
  destination: Destination | null;
  onClose: () => void;
  onPlan: (destinationName: string) => void;
}

export function DestinationModal({ destination, onClose, onPlan }: DestinationModalProps) {
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const open = destination !== null;

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const focusTimer = window.setTimeout(() => closeRef.current?.focus({ preventScroll: true }), 50);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(focusTimer);
    };
  }, [open, onClose]);

  /* Start each destination's details from the top */
  useEffect(() => {
    if (destination) scrollRef.current?.scrollTo({ top: 0 });
  }, [destination]);

  if (!destination) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="destination-modal-title"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-forest-950/70 backdrop-blur-sm animate-fade-in [animation-duration:400ms]"
      />

      {/* Panel — column on phones (bottom sheet), row on tablets & desktops */}
      <div className="modal-panel relative flex w-full max-w-5xl flex-col overflow-hidden rounded-t-[2rem] bg-snow shadow-lift animate-modal-in sm:rounded-[2rem] md:flex-row">
        {/* Close */}
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close destination details"
          className="absolute right-3 top-3 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-forest-900 shadow-soft ring-1 ring-forest-900/10 backdrop-blur transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 sm:right-4 sm:top-4"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        {/* Image — pinned header on phones, full-height column on md+ */}
        <div className="relative h-[clamp(9.5rem,28vh,15rem)] w-full flex-none md:h-full md:w-[44%]">
          <img
            src={px(destination.imageId, 1000, 1250)}
            srcSet={pxSet(destination.imageId, [600, 900, 1200], 4 / 5)}
            sizes="(min-width: 768px) 40vw, 100vw"
            alt={`${destination.name} — ${destination.tagline}`}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-forest-950/70 via-forest-950/10 to-forest-950/20 md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-forest-950/10"
          />
          {/* Sheet handle (phones) */}
          <span aria-hidden="true" className="absolute left-1/2 top-2.5 h-1.5 w-12 -translate-x-1/2 rounded-full bg-white/70 md:hidden" />
          <div className="absolute bottom-4 left-5 flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md md:hidden">
            <MapPin className="h-3.5 w-3.5 text-gold-300" aria-hidden="true" />
            {destination.region}
          </div>
        </div>

        {/* Details — the only part that scrolls */}
        <div ref={scrollRef} className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain md:h-full">
          <div className="my-auto p-6 sm:p-8 lg:p-10">
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-gold-600">{destination.tagline}</p>
            <h3
              id="destination-modal-title"
              className="mt-2 font-display text-3xl font-light leading-tight tracking-tight text-forest-950 sm:text-4xl md:pr-10"
            >
              {destination.name}
            </h3>
            <p className="mt-1 hidden items-center gap-1.5 text-sm font-medium text-earth-500 md:inline-flex">
              <MapPin className="h-3.5 w-3.5 text-gold-600" aria-hidden="true" />
              {destination.region}
            </p>

            <p className="mt-5 text-pretty text-[15px] leading-relaxed text-earth-700 sm:text-base">{destination.story}</p>

            <div className="mt-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-earth-500">Highlights</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {destination.highlights.map((h) => (
                  <li key={h} className="rounded-full border border-sand-300 bg-sand-50 px-3 py-1.5 text-sm font-medium text-forest-900">
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex items-start gap-3 rounded-2xl bg-forest-50 p-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-forest-700 shadow-soft">
                <CalendarDays className="h-4 w-4" aria-hidden="true" />
              </span>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-forest-700">Best time to visit</p>
                <p className="mt-1 text-sm font-medium text-forest-950">{destination.bestTime}</p>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button onClick={() => onPlan(destination.name)} variant="gold" size="lg" className="flex-1" arrow>
                Plan This Trip
              </Button>
              <Button
                href={waLink(`Hello Journey of Dev Bhumi, I would like to enquire about a trip to ${destination.name}.`)}
                target="_blank"
                rel="noopener noreferrer"
                variant="whatsapp"
                size="lg"
                icon={<WhatsAppIcon />}
                className="flex-1"
              >
                WhatsApp Us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
