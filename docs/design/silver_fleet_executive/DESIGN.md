---
name: Silver Fleet Executive
colors:
  surface: '#111417'
  surface-dim: '#111417'
  surface-bright: '#37393d'
  surface-container-lowest: '#0b0e11'
  surface-container-low: '#191c1f'
  surface-container: '#1d2023'
  surface-container-high: '#272a2e'
  surface-container-highest: '#323538'
  on-surface: '#e1e2e7'
  on-surface-variant: '#c2c6d7'
  inverse-surface: '#e1e2e7'
  inverse-on-surface: '#2e3134'
  outline: '#8c90a0'
  outline-variant: '#424655'
  surface-tint: '#b0c6ff'
  primary: '#b0c6ff'
  on-primary: '#002d6e'
  primary-container: '#558dff'
  on-primary-container: '#002661'
  inverse-primary: '#0058ca'
  secondary: '#c6c6c6'
  on-secondary: '#2f3131'
  secondary-container: '#484949'
  on-secondary-container: '#b8b8b8'
  tertiary: '#c5c6cc'
  on-tertiary: '#2e3135'
  tertiary-container: '#8e9196'
  on-tertiary-container: '#272a2e'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d9e2ff'
  primary-fixed-dim: '#b0c6ff'
  on-primary-fixed: '#001945'
  on-primary-fixed-variant: '#00429b'
  secondary-fixed: '#e3e2e2'
  secondary-fixed-dim: '#c6c6c6'
  on-secondary-fixed: '#1a1c1c'
  on-secondary-fixed-variant: '#464747'
  tertiary-fixed: '#e1e2e8'
  tertiary-fixed-dim: '#c5c6cc'
  on-tertiary-fixed: '#191c20'
  on-tertiary-fixed-variant: '#44474b'
  background: '#111417'
  on-background: '#e1e2e7'
  surface-variant: '#323538'
typography:
  display:
    fontFamily: Manrope
    fontSize: 36px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  h1:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  h2:
    fontFamily: Manrope
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.4'
  data-mono:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.02em
  label-caps:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '700'
    lineHeight: '1'
    letterSpacing: 0.08em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  container-padding: 24px
  component-gap: 16px
  tight-gap: 8px
  grid-columns: '12'
  gutter: 16px
---

## Brand & Style

This design system is engineered for institutional-grade financial analysis, prioritizing precision, speed, and executive sophistication. The brand personality is clinical and authoritative, evoking the atmosphere of a high-frequency trading floor or an elite private equity war room. 

The aesthetic follows a **Minimalist-Corporate** hybrid. It avoids unnecessary decoration in favor of high data density and functional clarity. The "Silver Fleet" ethos is reflected through a monochromatic foundation punctuated by high-energy electric accents, creating a UI that feels both heavy and fast. Visual complexity is managed through rigorous alignment and a disciplined color application that directs attention toward performance metrics and market shifts.

## Colors

The palette is anchored in a **Strict Dark Mode** architecture. The primary background (#0B0E11) provides a deep, obsidian base that eliminates glare during extended sessions. Surfaces (#1A1D21) use a subtle tonal lift to establish hierarchy without relying on heavy shadows.

**Accents & Semantics:**
- **Electric Blue (#2979FF):** Used for primary actions, active states, and focus indicators. It represents movement and connectivity.
- **Silver (#C0C0C0):** Utilized for secondary text, iconography, and subtle borders. It provides a premium, "precious metal" finish to the interface.
- **Neon Green (#00E676) & Soft Red (#FF5252):** Reserved exclusively for performance indicators (gains/losses). These colors are high-chroma to ensure they remain legible against the dark background even at small sizes.

## Typography

The typography system balances the modern, refined personality of **Manrope** for headlines with the utilitarian precision of **Inter** for UI elements and data display. 

To achieve high data density, line heights are kept tight, and font sizes lean smaller than consumer applications. **Inter** is specifically chosen for its high legibility in tabular data and numeric displays. For portfolio values and percentage changes, a semi-bold weight is preferred to ensure immediate recognition. Letter spacing is slightly tightened for large headlines to maintain a professional "editorial" look, while labels utilize expanded tracking and uppercase transformations for clear categorisation in dense sidebars and tooltips.

## Layout & Spacing

This design system employs a **Fluid Grid** model with a focus on maximum screen utilization. The layout utilizes a 12-column system with tight 16px gutters to permit more information on screen simultaneously.

A 4px baseline grid governs all spacing decisions. Content is grouped into logical "Modules" or "Pods" that occupy variable column spans (e.g., 3-column spans for small metrics, 9-column spans for main time-series charts). Vertical spacing is aggressive; padding within cards is kept at 16px to ensure that as much data as possible is visible "above the fold" without sacrificing the sophistication of the visual hierarchy.

## Elevation & Depth

In this dark-mode environment, depth is communicated through **Tonal Layering** and **Low-Contrast Outlines** rather than traditional shadows. 

1. **Base Layer (#0B0E11):** The canvas.
2. **Surface Layer (#1A1D21):** Cards, navigation sidebars, and header areas.
3. **Overlay Layer (#262A31):** Tooltips, dropdown menus, and modal dialogs.

Borders are the primary separators. Use 1px solid borders in a muted charcoal (#2D3139) for standard card boundaries. For active or hovered states, the border color shifts to Silver (#C0C0C0) or Electric Blue (#2979FF). Subtle backdrop blurs (8px to 12px) may be applied to floating overlays to maintain context while ensuring legibility.

## Shapes

The shape language is disciplined and "Soft-Rectangular." Using a `roundedness: 1` (0.25rem) standard, the UI maintains a sharp, professional edge while avoiding the harshness of 0px corners. 

- **Cards & Containers:** 0.5rem (rounded-lg) for the outer container, 0.25rem for internal elements.
- **Buttons & Inputs:** 0.25rem constant.
- **Selection Indicators:** Use vertical pills (2px wide) on the left edge of navigation items to indicate active states, rather than fully rounded buttons.

This geometric consistency reinforces the "Fleet" metaphor—streamlined, efficient, and engineered.

## Components

**Buttons:**
Primary buttons use a solid Electric Blue background with white text. Secondary buttons utilize a ghost style with a Silver border and text. Sizes should be compact (32px-36px height) with Lucide React icons set to a 1.5px stroke width.

**Data Visualization (Recharts Style):**
- **Lines:** 2px stroke width. Primary series in Electric Blue, benchmark series in Silver (dashed).
- **Areas:** Use subtle gradients from Electric Blue to transparent (opacity 0.1).
- **Tooltips:** Custom components using the Surface Layer (#1A1D21) with a Silver border and mono-spaced typography for values.

**Inputs & Fields:**
Search bars and filter inputs should be dark-filled (#0B0E11) with a 1px border. Focus states must trigger an Electric Blue glow (1px ring). Use Lucide icons (e.g., `Search`, `Filter`, `ChevronDown`) in Silver to minimize visual noise.

**Investment Chips:**
Small tags for asset classes (e.g., "Equity", "Fixed Income") should use a 10px uppercase label with a very subtle background tint of the accent colors (10% opacity) to categorize without overwhelming the data.

**Lists & Tables:**
Rows should use a subtle hover state (#262A31) and be separated by 1px horizontal lines. High-density "Sparklines" should be integrated directly into table cells to show 24h trends using the semantic Green/Red colors.