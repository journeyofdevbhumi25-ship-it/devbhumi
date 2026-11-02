# Logo drop-in slot

Place the official **Journey of Dev Bhumi** logo file here as:

```
public/images/logo.png
```

It is picked up automatically everywhere the brand mark appears (header, mobile
menu, footer) and replaces the built-in vector recreation of the badge.

## Guidelines

- **Format:** PNG (transparent background preferred) or JPG.
- **Shape:** the mark is rendered as a circle, so a square or round canvas works best.
- **Size:** at least 800×800 px so it stays crisp in the footer (96 px) and on
  high-density screens.
- **Fallback:** if the file is missing or fails to load, the site automatically
  uses the hand-drawn SVG badge in `src/components/BrandMark.tsx`, which is a
  faithful, fully scalable recreation of the logo. Edit that file to tweak the
  vector version — colours, the "Explore · Experience · Belong" line and the
  curved "Discover the divine lands" text all live there.

Rebuild after adding the file (`npm run build`) so it is copied into `dist/`.
