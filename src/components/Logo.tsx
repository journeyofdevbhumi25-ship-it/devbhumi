import { cn } from "@/utils/cn";
import { BUSINESS } from "@/data/site";
import { BrandMark } from "@/components/BrandMark";

interface LogoProps {
  tone?: "dark" | "light";
  className?: string;
  showTagline?: boolean;
  size?: "sm" | "lg";
}

export function Logo({ tone = "dark", className, showTagline = true, size = "sm" }: LogoProps) {
  const light = tone === "light";
  return (
    <a
      href="#home"
      className={cn("group inline-flex items-center gap-3 focus-visible:outline-none", className)}
      aria-label={`${BUSINESS.name} — back to top`}
    >
      <span
        className={cn(
          "relative block shrink-0 rounded-full shadow-soft ring-1 ring-forest-900/10 transition-transform duration-500 ease-out-expo group-hover:-rotate-3",
          size === "lg" ? "h-20 w-20" : "h-11 w-11",
        )}
      >
        <BrandMark className="h-full w-full" />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "whitespace-nowrap font-display text-[0.95rem] font-semibold tracking-tight min-[400px]:text-[1.15rem] sm:text-xl",
            light ? "text-snow" : "text-forest-950",
            size === "lg" && "text-xl sm:text-2xl",
          )}
        >
          Journey of <span className="italic font-medium">Dev Bhumi</span>
        </span>
        {showTagline && (
          <span
            className={cn(
              "mt-1 hidden text-[9px] font-bold uppercase tracking-[0.28em] sm:block",
              light ? "text-gold-300/90" : "text-gold-600",
            )}
          >
            Explore · Experience · Belong
          </span>
        )}
      </span>
    </a>
  );
}
