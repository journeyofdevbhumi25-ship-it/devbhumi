import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
}

export function Eyebrow({ children, tone = "dark", className }: { children: ReactNode; tone?: "dark" | "light"; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.24em]",
        tone === "dark" ? "text-gold-600" : "text-gold-300",
        className,
      )}
    >
      <span aria-hidden="true" className={cn("h-px w-8", tone === "dark" ? "bg-gold-500" : "bg-gold-300")} />
      {children}
    </span>
  );
}

export function SectionHeading({ eyebrow, title, subtitle, align = "center", tone = "dark", className }: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div className={cn("max-w-3xl", centered && "mx-auto text-center", className)}>
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
      <h2
        className={cn(
          "mt-4 text-balance font-display text-4xl font-light leading-[1.05] tracking-[-0.015em] sm:text-5xl lg:text-[3.5rem]",
          tone === "dark" ? "text-forest-950" : "text-snow",
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-5 text-pretty text-base leading-relaxed sm:text-lg",
            tone === "dark" ? "text-earth-500" : "text-sand-200/85",
            centered && "mx-auto max-w-2xl",
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
