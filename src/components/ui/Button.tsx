import type { MouseEventHandler, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/utils/cn";

type Variant = "primary" | "gold" | "light" | "outline" | "outline-light" | "ghost" | "whatsapp";
type Size = "sm" | "md" | "lg";

interface ButtonProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  icon?: ReactNode;
  className?: string;
  href?: string;
  target?: string;
  rel?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  id?: string;
  onClick?: MouseEventHandler<HTMLElement>;
  "aria-label"?: string;
}

const base =
  "group/btn inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight whitespace-nowrap transition-all duration-300 ease-out-expo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-forest-800 text-snow shadow-soft hover:bg-forest-900 hover:shadow-lift hover:-translate-y-0.5",
  gold: "bg-gold-500 text-earth-950 shadow-soft hover:bg-gold-400 hover:shadow-lift hover:-translate-y-0.5",
  light: "bg-snow text-forest-900 shadow-soft hover:bg-white hover:shadow-lift hover:-translate-y-0.5",
  outline: "border border-forest-800/30 text-forest-900 hover:border-forest-800 hover:bg-forest-800 hover:text-snow",
  "outline-light": "border border-white/50 text-white backdrop-blur-sm hover:border-white hover:bg-white hover:text-forest-900",
  ghost: "text-forest-800 hover:bg-forest-50 hover:text-forest-900",
  whatsapp: "bg-whatsapp text-white shadow-soft hover:brightness-105 hover:shadow-lift hover:-translate-y-0.5",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-5 text-sm",
  md: "h-12 px-6 text-[15px]",
  lg: "h-14 px-8 text-base",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  arrow = false,
  icon,
  className,
  href,
  target,
  rel,
  type = "button",
  disabled,
  id,
  onClick,
  "aria-label": ariaLabel,
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  const content = (
    <>
      {icon && <span className="shrink-0 [&>svg]:h-[18px] [&>svg]:w-[18px]">{icon}</span>}
      <span>{children}</span>
      {arrow && (
        <ArrowUpRight
          aria-hidden="true"
          className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
        />
      )}
    </>
  );

  if (href) {
    return (
      <a href={href} target={target} rel={rel} id={id} onClick={onClick} aria-label={ariaLabel} className={classes}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} id={id} disabled={disabled} onClick={onClick} aria-label={ariaLabel} className={classes}>
      {content}
    </button>
  );
}
