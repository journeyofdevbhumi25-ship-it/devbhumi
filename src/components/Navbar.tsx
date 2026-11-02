import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { cn } from "@/utils/cn";
import { BUSINESS, INSTAGRAM_LINK, NAV_LINKS, TEL_LINK, waLink } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/Logo";
import { InstagramIcon, WhatsAppIcon } from "@/components/WhatsAppButton";

interface NavbarProps {
  onPlan: () => void;
}

export function Navbar({ onPlan }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("home");

  /* Solid header after the hero starts to scroll away */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Track which section is in view */
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const sections = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.2, 0.5, 1] },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  /* Lock scroll & close on Escape while the mobile menu is open */
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const light = !scrolled;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out-expo",
          scrolled
            ? "border-b border-forest-900/5 bg-snow/85 py-3 shadow-[0_8px_30px_-18px_rgba(23,48,42,0.35)] backdrop-blur-xl"
            : "py-4 sm:py-6",
        )}
      >
        <div className="shell flex items-center justify-between gap-6">
          <Logo tone={light ? "light" : "dark"} />

          {/* Desktop navigation */}
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const isActive = active === link.id;
                return (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      className={cn(
                        "relative rounded-full px-4 py-2 text-[15px] font-medium transition-colors duration-300",
                        light ? "text-white/85 hover:text-white" : "text-earth-700 hover:text-forest-900",
                        isActive && (light ? "text-white" : "text-forest-900"),
                      )}
                    >
                      {link.label}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute inset-x-4 -bottom-0.5 h-px origin-left bg-gold-400 transition-transform duration-500 ease-out-expo",
                          isActive ? "scale-x-100" : "scale-x-0",
                        )}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={TEL_LINK}
              className={cn(
                "hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition-colors duration-300 md:inline-flex",
                light ? "text-white/90 hover:text-white" : "text-forest-900 hover:text-forest-700",
              )}
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              <span className="hidden xl:inline">{BUSINESS.phoneDisplay}</span>
              <span className="xl:hidden">Call</span>
            </a>

            <Button
              onClick={onPlan}
              variant={light ? "gold" : "primary"}
              size="sm"
              className="hidden sm:inline-flex"
            >
              Plan Your Trip
            </Button>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              className={cn(
                "inline-flex h-11 w-11 items-center justify-center rounded-full border transition-colors duration-300 lg:hidden",
                light
                  ? "border-white/30 bg-white/10 text-white backdrop-blur hover:bg-white/20"
                  : "border-forest-900/10 bg-white text-forest-900 hover:bg-forest-50",
              )}
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className={cn(
          "fixed inset-0 z-[60] flex flex-col bg-forest-950 text-snow transition-all duration-500 ease-out-expo lg:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_50%_at_80%_0%,rgba(205,166,89,0.18),transparent_60%)]"
        />
        <div className="shell relative flex items-center justify-between py-4 sm:py-6">
          <Logo tone="light" />
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition hover:bg-white/15"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <nav aria-label="Mobile" className="shell relative flex-1 overflow-y-auto pt-6">
          <ul className="space-y-1">
            {NAV_LINKS.map((link, i) => (
              <li
                key={link.id}
                className={cn(
                  "transition-all duration-500 ease-out-expo",
                  open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
                )}
                style={{ transitionDelay: open ? `${120 + i * 60}ms` : "0ms" }}
              >
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between border-b border-white/10 py-4 font-display text-3xl font-light tracking-tight text-snow/90 transition-colors hover:text-gold-300"
                >
                  {link.label}
                  <span className="text-xs font-sans font-semibold uppercase tracking-[0.2em] text-white/30">0{i + 1}</span>
                </a>
              </li>
            ))}
          </ul>

          <div
            className={cn(
              "mt-8 space-y-3 transition-all duration-500 ease-out-expo",
              open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
            )}
            style={{ transitionDelay: open ? "460ms" : "0ms" }}
          >
            <Button
              onClick={() => {
                setOpen(false);
                onPlan();
              }}
              variant="gold"
              size="lg"
              className="w-full"
              arrow
            >
              Plan Your Trip
            </Button>
            <div className="grid grid-cols-2 gap-3">
              <Button href={TEL_LINK} variant="outline-light" icon={<Phone />}>
                Call Us
              </Button>
              <Button href={waLink()} target="_blank" rel="noopener noreferrer" variant="whatsapp" icon={<WhatsAppIcon />}>
                WhatsApp
              </Button>
            </div>
          </div>
        </nav>

        <div className="shell relative py-6 text-sm text-white/50">
          <p className="font-display italic text-base text-sand-200/80">Your journey. Your memories. Our responsibility.</p>
          <p className="mt-2">{BUSINESS.phoneDisplay} · {BUSINESS.email}</p>
          <a
            href={INSTAGRAM_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 text-white/60 transition-colors hover:text-gold-300"
            aria-label="Follow us on Instagram"
          >
            <InstagramIcon className="h-4 w-4" />
            <span>@journey_of_devbhumi</span>
          </a>
        </div>
      </div>
    </>
  );
}
