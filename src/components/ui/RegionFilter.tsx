import { cn } from "@/utils/cn";
import { REGIONS, type RegionFilter as Filter } from "@/data/site";

interface RegionFilterProps {
  value: Filter;
  onChange: (value: Filter) => void;
  counts: ReadonlyMap<Filter, number>;
  /** Accessible name for the group of buttons */
  label: string;
  allLabel?: string;
  align?: "center" | "start";
  className?: string;
}

const FILTERS: Filter[] = ["All", ...REGIONS];

/**
 * Region pill bar. Scrolls horizontally in a single row on phones; from `md`
 * up the pills wrap onto extra lines so every region stays visible without
 * scrolling.
 */
export function RegionFilter({ value, onChange, counts, label, allLabel = "All", align = "center", className }: RegionFilterProps) {
  const centered = align === "center";
  return (
    <div className={cn("flex", centered ? "justify-center" : "justify-start", className)}>
      <div
        role="group"
        aria-label={label}
        className={cn(
          "no-scrollbar flex max-w-full gap-1 overflow-x-auto rounded-[1.5rem] border border-sand-200 bg-white/80 p-1.5 shadow-soft backdrop-blur",
          "md:flex-wrap md:overflow-visible",
          centered && "md:justify-center",
        )}
      >
        {FILTERS.map((f) => {
          const count = counts.get(f) ?? 0;
          if (f !== "All" && count === 0) return null;
          const active = value === f;
          return (
            <button
              key={f}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(f)}
              className={cn(
                "inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-2 text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400",
                active ? "bg-forest-900 text-snow shadow-soft" : "text-earth-700 hover:bg-sand-100 hover:text-forest-900",
              )}
            >
              {f === "All" ? allLabel : f}
              <span className={cn("text-[11px] font-bold tabular-nums", active ? "text-gold-300" : "text-earth-300")}>{count}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
