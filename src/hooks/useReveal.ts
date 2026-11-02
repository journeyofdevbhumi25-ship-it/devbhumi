import { useEffect, useRef, useState } from "react";

interface Options {
  threshold?: number;
  rootMargin?: string;
}

/**
 * Reveals an element once it scrolls into view.
 * Falls back to "visible" when IntersectionObserver is unavailable.
 */
export function useReveal<T extends HTMLElement>({ threshold = 0.12, rootMargin = "0px 0px -6% 0px" }: Options = {}) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, visible };
}
