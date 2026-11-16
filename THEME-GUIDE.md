# New Flower Decoration Training Institute — Branding & Theme Guide

## 1. Changing the theme

**Everything lives in one file: `src/theme.css`.**

No component contains a hard-coded colour, font, radius or shadow. All 443
previously hard-coded values now resolve to tokens defined there.

The file is in six commented sections:

| Section | What it holds |
|---|---|
| 1. Raw brand ramps | The literal brand colours (`--nfd-gold`, `--nfd-deep`, …) |
| 2. Semantic roles | `@theme` block — what each colour *means* (`--color-brand-accent`, …) |
| 3. Derived values | Gradients, glows and tints, all computed from section 1 |
| 4. Gold-on-light readability | Keeps gold text legible on ivory sections |
| 5. Brand primitives | Reusable classes (`.nfd-gold-text`, `.nfd-logo`) |

**To re-skin the whole site**, change the values in **section 1** and save.
To change what a colour is *used for* without changing the palette, repoint an
alias in **section 2**.

## 2. Using tokens in components

Tailwind v4 turns every `--color-*` token into real utility classes:

```jsx
<div className="bg-brand-deep text-brand-champagne border-brand-gold/30">
```

In inline styles or SVG attributes, use the variable directly:

```jsx
<circle fill="var(--color-brand-gold)" />
```

Available: `brand-gold`, `brand-gold-light`, `brand-gold-deep`, `brand-gold-pale`,
`brand-primary`, `brand-primary-soft`, `brand-deep`, `brand-ink`, `brand-cream`,
`brand-cream-light`, `brand-champagne`, `brand-champagne-soft`, `brand-muted`,
`brand-muted-dark`, plus the role aliases `brand-bg`, `brand-surface`,
`brand-text`, `brand-text-invert`, `brand-border`, `brand-accent`,
`brand-accent-hover`.

## 3. The logo

Defined once, in the `BrandLogo` component in `src/Home.jsx`. Used by the
navbar, mobile nav, footer, loader and the form/course page crests.

Three files in `/public` — **replace these to change the logo everywhere**:

| File | Ratio | Used for |
|---|---|---|
| `logo-horizontal.png` | 4.31:1 | Navbar, footer |
| `logo.png` | 1.15:1 | Loading screen |
| `logo-mark.png` | 1.84:1 | Crests, favicons |

The `.nfd-logo` class sets `width: auto` + `object-fit: contain`, so the logo
can never be stretched or squashed. Pass height only:
`<BrandLogo className="h-12 md:h-16" />`.

Favicons (`favicon.ico`, 16/32px, `apple-touch-icon`, `android-chrome` 192/512,
`favicon.svg`) are generated from the logo mark: gold emblem on the brand dark
tone, so it reads on both light and dark browser tabs.

**Brand colour is repeated in two non-CSS places** — keep them in sync with
`--nfd-deep` if you change it: the `theme-color` meta in `index.html`, and
`theme_color` in `public/site.webmanifest`.

## 4. Palette

Sampled directly from the official logo artwork.

| Role | Hex |
|---|---|
| Bronze (gold on light backgrounds) | `#A9761A` |
| **Core brand gold** | `#D4A32B` |
| Gold light (hover) | `#EFC96B` |
| Gold pale (hairlines, glows) | `#F7E9A8` |
| Primary (mid dark surface) | `#453A22` |
| Deep (navbar, footer) | `#251E12` |
| Ink (deepest) | `#14100A` |
| Cream (page background) | `#FBF7EF` |
| Champagne (text on dark) | `#F5EAD6` |

Fonts: **Playfair Display** (display) / **Poppins** (body), tokenised as
`--font-display` and `--font-body`. The webfont `<link>` is injected by
`GlobalStyles` in `src/Home.jsx`.

## 5. Running it

```bash
npm install
npm run dev      # development
npm run build    # production build into dist/
```
