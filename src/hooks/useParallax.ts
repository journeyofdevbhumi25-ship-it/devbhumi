import { useEffect, useRef } from "react";

/**
 * Gentle vertical parallax for a background image inside a section.
 * Respects prefers-reduced-motion and only runs while the section is on screen.
 */
export function useParallax<T extends HTMLElement>(speed = 0.18) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const targetRef = useRef<T | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const target = targetRef.current;
    if (!section || !target) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const viewport = window.innerHeight;
      if (rect.bottom < 0 || rect.top > viewport) return;
      const progress = (rect.top + rect.height / 2 - viewport / 2) / viewport; // -1..1
      target.style.transform = `translate3d(0, ${(-progress * speed * 100).toFixed(2)}px, 0) scale(1.15)`;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [speed]);

  return { sectionRef, targetRef };
}
