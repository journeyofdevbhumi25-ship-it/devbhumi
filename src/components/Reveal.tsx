import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/utils/cn";
import { useReveal } from "@/hooks/useReveal";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger delay in milliseconds */
  delay?: number;
  style?: CSSProperties;
}

export function Reveal({ children, className, delay = 0, style }: RevealProps) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={cn("reveal", visible && "is-visible", className)}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </div>
  );
}
