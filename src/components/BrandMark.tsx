import { useId, useState } from "react";
import { cn } from "@/utils/cn";

/**
 * Drop-in slot for the official logo artwork. Place the file at
 * `public/images/logo.png` and it will be used automatically everywhere.
 * If the file is missing, the vector recreation below is used instead.
 */
export const LOGO_IMAGE_SRC = "images/logo.png";

/* ------------------------------------------------------------------ */
/*  Vector recreation of the Journey of Dev Bhumi badge                */
/* ------------------------------------------------------------------ */

function Pine({ x, y, s = 1, fill = "#1c4b2c" }: { x: number; y: number; s?: number; fill?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill={fill}>
      <path d="M 0 -26 L 7 -13 L 3 -13 L 9 -3 L 5 -3 L 12 2 L -12 2 L -5 -3 L -9 -3 L -3 -13 L -7 -13 Z" />
      <rect x="-1.6" y="1" width="3.2" height="5" rx="1" />
    </g>
  );
}

function TrekIcon({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M -11 8 L -4 -7 L 1 1 L 4 -4 L 11 8 Z" fill="#1c4b2c" />
    </g>
  );
}

function TourIcon({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`} stroke="#1c4b2c" strokeWidth="1.9" fill="none" strokeLinejoin="round" strokeLinecap="round">
      <path d="M -11 2 L -11 -2 L -6 -7 L 6 -7 L 10 -2 L 11 -2 L 11 3" />
      <path d="M -11 3 L 11 3" />
      <circle cx="-6" cy="5.5" r="2.4" />
      <circle cx="6" cy="5.5" r="2.4" />
    </g>
  );
}

function StayIcon({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`} stroke="#1c4b2c" strokeWidth="1.9" fill="none" strokeLinejoin="round" strokeLinecap="round">
      <path d="M -11 9 L -11 -7" />
      <path d="M -11 1 L 11 1" />
      <path d="M -11 9 L 11 9" />
      <path d="M 11 1 L 11 9" />
      <rect x="-8" y="-5.5" width="8" height="6.5" rx="2.2" fill="#1c4b2c" stroke="none" />
    </g>
  );
}

function ExperienceIcon({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`} stroke="#1c4b2c" strokeWidth="1.9" fill="none" strokeLinejoin="round">
      <circle cx="0" cy="0" r="9" />
      <path d="M 4.5 -4.5 L -1.5 -1.5 L -4.5 4.5 L 1.5 1.5 Z" fill="#1c4b2c" />
    </g>
  );
}

export function LogoBadge({ className }: { className?: string }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const id = (n: string) => `${n}-${uid}`;
  const rowX = [116, 167, 218, 269];
  const rowLabels = ["TREKS", "TOURS", "STAYS", "EXPERIENCES"];

  return (
    <svg viewBox="0 0 400 400" className={className} role="img" aria-labelledby={`t-${uid}`}>
      <title id={`t-${uid}`}>Journey of Dev Bhumi — Explore. Experience. Belong. Discover the divine lands.</title>
      <defs>
        <linearGradient id={id("sky")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7fbde6" />
          <stop offset="40%" stopColor="#cbe6f4" />
          <stop offset="76%" stopColor="#f0e3c2" />
          <stop offset="100%" stopColor="#f8d9a2" />
        </linearGradient>
        <radialGradient id={id("sun")} cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#ffe0a0" />
          <stop offset="58%" stopColor="#f9b552" />
          <stop offset="100%" stopColor="#eda036" />
        </radialGradient>
        <clipPath id={id("field")}>
          <circle cx="200" cy="200" r="184" />
        </clipPath>
        <path id={id("arc")} d="M 100 344 A 176 176 0 0 0 300 344" fill="none" />
      </defs>

      {/* White field */}
      <circle cx="200" cy="200" r="184" fill="#ffffff" />

      <g clipPath={`url(#${id("field")})`}>
        {/* Sky */}
        <rect x="0" y="0" width="400" height="220" fill={`url(#${id("sky")})`} />

        {/* Sun */}
        <circle cx="210" cy="94" r="52" fill={`url(#${id("sun")})`} />

        {/* Soft clouds */}
        <g fill="#ffffff" opacity="0.5">
          <ellipse cx="92" cy="86" rx="50" ry="9" />
          <ellipse cx="122" cy="76" rx="32" ry="7" />
          <ellipse cx="316" cy="74" rx="44" ry="8" />
          <ellipse cx="286" cy="104" rx="28" ry="6" />
        </g>

        {/* Far range */}
        <path d="M -10 212 L 52 112 L 104 164 L 152 88 L 206 172 L 262 114 L 318 168 L 366 118 L 410 172 L 410 250 L -10 250 Z" fill="#cfdff0" />
        {/* Mid range with the main peak */}
        <path d="M -10 224 L 38 148 L 92 194 L 148 114 L 205 50 L 258 148 L 306 104 L 358 184 L 410 154 L 410 258 L -10 258 Z" fill="#a9c6dd" />
        {/* Snow caps */}
        <g fill="#ffffff">
          <path d="M 205 50 L 234 108 L 221 98 L 208 112 L 195 96 L 180 114 Z" />
          <path d="M 148 114 L 168 154 L 158 147 L 148 157 L 138 146 L 128 158 Z" />
          <path d="M 306 104 L 326 142 L 317 136 L 306 146 L 296 135 L 287 144 Z" />
          <path d="M 52 112 L 70 148 L 61 142 L 52 151 L 43 141 L 35 150 Z" />
        </g>
        {/* Near ridges */}
        <path d="M -10 238 L 28 182 L 84 220 L 138 174 L 196 224 L 252 178 L 302 218 L 356 174 L 410 220 L 410 280 L -10 280 Z" fill="#86aac6" />

        {/* Mist */}
        <g fill="#ffffff" opacity="0.55">
          <ellipse cx="200" cy="204" rx="200" ry="12" />
          <ellipse cx="112" cy="188" rx="104" ry="8" />
          <ellipse cx="308" cy="194" rx="112" ry="9" />
        </g>

        {/* Forested hills rising above the banner */}
        <path d="M -10 230 L 26 176 L 78 152 L 132 186 L 172 232 L 172 250 L -10 250 Z" fill="#2f6142" />
        <path d="M 232 250 L 262 190 L 312 154 L 366 186 L 410 168 L 410 250 Z" fill="#2f6142" />
        <path d="M -10 250 L 30 200 L 88 186 L 146 232 L 172 250 Z" fill="#25513a" opacity="0.85" />

        {/* Pines along the ridges */}
        <g>
          <Pine x={18} y={196} s={1.15} />
          <Pine x={44} y={176} s={1} />
          <Pine x={72} y={158} s={1.3} />
          <Pine x={100} y={172} s={1} />
          <Pine x={126} y={192} s={1.1} />
          <Pine x={150} y={216} s={0.9} />
          <Pine x={252} y={200} s={1.05} />
          <Pine x={282} y={172} s={1.3} />
          <Pine x={312} y={158} s={1.05} />
          <Pine x={342} y={178} s={1.2} />
          <Pine x={372} y={186} s={1} />
          <Pine x={396} y={172} s={1.15} />
        </g>

        {/* Hillside village */}
        <g>
          {[
            [258, 186],
            [276, 172],
            [296, 182],
            [318, 166],
            [338, 178],
            [356, 168],
          ].map(([x, y]) => (
            <g key={`${x}-${y}`}>
              <rect x={x} y={y} width="14" height="10" rx="1" fill="#f6f0e4" />
              <path d={`M ${x - 2.5} ${y} L ${x + 7} ${y - 7} L ${x + 16.5} ${y} Z`} fill="#b4593c" />
            </g>
          ))}
        </g>

        {/* Birds */}
        <g stroke="#2a4d63" strokeWidth="2.6" fill="none" strokeLinecap="round">
          <path d="M 286 70 q 8 -8 15 -1 q 7 -7 15 1" />
          <path d="M 318 88 q 6 -6 11 -1 q 5 -5 11 1" />
        </g>

        {/* Hiker silhouette */}
        <g fill="#12262f">
          <path d="M 42 236 C 48 212 62 198 86 200 C 108 202 124 214 130 236 Z" />
          <path d="M 58 138 C 58 129 67 125 76 128 L 84 138 L 84 172 L 64 172 C 59 166 57 148 58 138 Z" />
          <path d="M 78 132 C 90 127 99 135 100 146 L 104 174 L 82 176 Z" />
          <circle cx="93" cy="121" r="10" />
          <path d="M 81 117 C 83 107 102 106 104 116 L 112 119 L 81 121 Z" />
          <path d="M 98 168 L 110 184 L 114 212 L 103 214 L 97 186 L 90 174 Z" />
          <path d="M 84 170 L 79 188 L 67 208 L 57 203 L 69 182 L 75 170 Z" />
          <path d="M 97 140 L 110 151 L 107 158 L 94 147 Z" />
          <path d="M 110 144 L 115 144 L 124 210 L 119 211 Z" />
        </g>
      </g>

      {/* White banner */}
      <path d="M 8 208 C 90 176 310 176 392 208 L 392 400 L 8 400 Z" fill="#ffffff" />

      {/* Peak mark above the wordmark */}
      <path d="M 200 156 L 218 188 L 208 183 L 200 193 L 192 183 L 182 188 Z" fill="#16283c" stroke="#ffffff" strokeWidth="3.2" strokeLinejoin="round" />

      {/* Wordmark */}
      <text
        x="200"
        y="214"
        textAnchor="middle"
        fill="#16283c"
        fontFamily="'Fraunces', Georgia, serif"
        fontSize="24"
        fontWeight="600"
        letterSpacing="3.2"
      >
        JOURNEY OF
      </text>
      <text
        x="200"
        y="262"
        textAnchor="middle"
        fill="#1c4b2c"
        fontFamily="'Fraunces', Georgia, serif"
        fontSize="50"
        fontWeight="700"
        textLength="282"
        lengthAdjust="spacingAndGlyphs"
      >
        DEVBHUMI
      </text>

      {/* Winding road flourish + pines, clear of the wordmark */}
      <path
        d="M 70 274 C 132 285 248 285 306 272 C 332 265 344 260 350 252"
        fill="none"
        stroke="#1c4b2c"
        strokeWidth="6.5"
        strokeLinecap="round"
      />
      <Pine x={352} y={248} s={0.72} fill="#1c4b2c" />
      <Pine x={366} y={254} s={0.5} fill="#1c4b2c" />

      {/* Tagline row */}
      <text
        x="200"
        y="294"
        textAnchor="middle"
        fill="#1c4b2c"
        fontFamily="'Manrope', sans-serif"
        fontSize="12"
        fontWeight="800"
        letterSpacing="2.2"
      >
        EXPLORE · EXPERIENCE · BELONG
      </text>

      {/* Service icons row */}
      <g stroke="#1c4b2c" strokeWidth="1.2" opacity="0.5">
        <path d="M 141.5 298 L 141.5 326" />
        <path d="M 192.5 298 L 192.5 326" />
        <path d="M 243.5 298 L 243.5 326" />
      </g>
      <TrekIcon x={rowX[0]} y={310} />
      <TourIcon x={rowX[1]} y={310} />
      <StayIcon x={rowX[2]} y={310} />
      <ExperienceIcon x={rowX[3]} y={310} />
      {rowLabels.map((label, i) => (
        <text
          key={label}
          x={rowX[i]}
          y="326"
          textAnchor="middle"
          fill="#1c4b2c"
          fontFamily="'Manrope', sans-serif"
          fontSize="7.5"
          fontWeight="800"
          letterSpacing="0.6"
        >
          {label}
        </text>
      ))}

      {/* Curved base line */}
      <text fill="#1c4b2c" fontFamily="'Manrope', sans-serif" fontSize="11" fontWeight="700" letterSpacing="1.6">
        <textPath href={`#${id("arc")}`} startOffset="50%" textAnchor="middle">
          DISCOVER THE DIVINE LANDS
        </textPath>
      </text>

      {/* Flanking arcs */}
      <g fill="none" stroke="#1c4b2c" strokeWidth="2.2" strokeLinecap="round" opacity="0.8">
        <path d="M 33 261 A 178 178 0 0 0 68 319" />
        <path d="M 367 261 A 178 178 0 0 1 332 319" />
      </g>

      {/* Rings */}
      <circle cx="200" cy="200" r="184" fill="none" stroke="#1c4b2c" strokeWidth="2.5" />
      <circle cx="200" cy="200" r="192" fill="none" stroke="#1e4d2b" strokeWidth="13" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Brand mark: official artwork when available, vector badge if not   */
/* ------------------------------------------------------------------ */

interface BrandMarkProps {
  className?: string;
  alt?: string;
}

export function BrandMark({ className, alt = "Journey of Dev Bhumi" }: BrandMarkProps) {
  const [failed, setFailed] = useState(false);

  if (failed) return <LogoBadge className={className} />;

  return (
    <img
      src={LOGO_IMAGE_SRC}
      alt={alt}
      onError={() => setFailed(true)}
      className={cn("rounded-full object-contain", className)}
    />
  );
}
