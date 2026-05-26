---
name: Premium Elegance
colors:
  surface: '#fcf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fcf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0eded'
  surface-container-high: '#eae7e7'
  surface-container-highest: '#e4e2e1'
  on-surface: '#1b1c1c'
  on-surface-variant: '#514343'
  inverse-surface: '#303030'
  inverse-on-surface: '#f3f0f0'
  outline: '#847373'
  outline-variant: '#d6c2c1'
  surface-tint: '#845051'
  primary: '#845051'
  on-primary: '#ffffff'
  primary-container: '#bd8282'
  on-primary-container: '#461e1f'
  inverse-primary: '#f8b6b6'
  secondary: '#735c00'
  on-secondary: '#ffffff'
  secondary-container: '#fed65b'
  on-secondary-container: '#745c00'
  tertiary: '#5f5e5b'
  on-tertiary: '#ffffff'
  tertiary-container: '#93918d'
  on-tertiary-container: '#2a2a27'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad9'
  primary-fixed-dim: '#f8b6b6'
  on-primary-fixed: '#340f11'
  on-primary-fixed-variant: '#68393a'
  secondary-fixed: '#ffe088'
  secondary-fixed-dim: '#e9c349'
  on-secondary-fixed: '#241a00'
  on-secondary-fixed-variant: '#574500'
  tertiary-fixed: '#e5e2dd'
  tertiary-fixed-dim: '#c8c6c2'
  on-tertiary-fixed: '#1c1c19'
  on-tertiary-fixed-variant: '#474743'
  background: '#fcf9f8'
  on-background: '#1b1c1c'
  surface-variant: '#e4e2e1'
  warm-rose: '#BD8282'
  soft-gold: '#D4AF37'
  ivory-surface: '#F9F6F1'
  deep-charcoal: '#2D2D2D'
  pure-white: '#FFFFFF'
  success-sage: '#7A9E7E'
typography:
  headline-xl:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-md:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
  button:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
---

## Brand & Style
The brand personality is rooted in high-end hospitality and professional beauty management. It targets salon owners in the Pakistani market who value sophistication, cultural resonance, and modern efficiency. The emotional response should be one of "effortless luxury"—making the complex task of salon management feel as calm and refined as a spa treatment.

The design system employs a **Minimalist** foundation with **Glassmorphism** accents. It utilizes heavy whitespace to convey a sense of "premium breathing room," while subtle translucent layers and soft blurs add a modern, digital-first depth. The aesthetic is intentionally feminine but remains grounded through structured layouts and professional, crisp typography to establish immediate trust.

## Colors
The palette is inspired by natural skin tones and premium salon interiors. **Warm Rose** serves as the primary brand driver, used for key actions and brand moments. **Soft Gold** is reserved for premium accents, highlights, and "VIP" status indicators, adding a metallic-inspired warmth.

**Ivory Surface** is the backbone of the UI, used for large background areas to provide a softer, more elegant alternative to pure white, while **Deep Charcoal** provides the necessary contrast for high readability. The color mode is strictly light to maintain a clean, airy, and sanitary feel associated with beauty environments.

## Typography
The typography strategy creates a distinct contrast between high-fashion editorial aesthetics and functional SaaS utility. **Playfair Display** is used for all headlines to evoke the feeling of a luxury beauty magazine. It should be used with tighter letter spacing in larger formats to maintain its elegance.

**Inter** handles all functional UI, body copy, and data-heavy tables. It is chosen for its exceptional legibility at small sizes and its neutral character, which allows the headlines to shine. All labels use a slight letter spacing increase to enhance professional clarity, particularly when using the uppercase transform for section headers.

## Layout & Spacing
The design system utilizes a **Fixed Grid** model for desktop to ensure content remains centered and curated, reflecting the premium nature of the service. A 12-column grid is standard, with generous 24px gutters to prevent information density from feeling overwhelming.

Spacing follows a strict 8px linear scale. For luxury layouts, err on the side of "over-spacing"—specifically increasing vertical margins between sections to 80px or 120px to create a sense of exclusivity. On mobile, the grid collapses to 4 columns with reduced margins, but internal component padding remains generous to ensure "finger-friendly" touch targets for salon staff on the move.

## Elevation & Depth
This design system avoids heavy, dark shadows in favor of **Tonal Layers** and **Tinted Ambient Shadows**. Depth is primarily established by placing Pure White cards atop Ivory backgrounds.

When shadows are required for interactive elements or modals, they must use a soft, diffused spread (20px-40px blur) with a very low opacity (5-10%) and a subtle Warm Rose or Charcoal tint. This prevents the "dirty" look of standard gray shadows. Glassmorphism is applied to navigation bars and floating action buttons, using a 12px backdrop blur and a 1px soft-white inner border to simulate polished glass.

## Shapes
The shape language is defined by **Rounded** geometry. Hard corners are avoided to maintain the "soft and feminine" brand attribute. Standard components like input fields and small buttons use a 0.5rem (8px) radius.

Larger container elements, such as feature cards or appointment modules, utilize a 1rem (16px) radius to feel more approachable and modern. Specific "lifestyle" elements or secondary tags may use a pill-shaped (full-radius) style to distinguish them from functional UI controls.

## Components
- **Buttons:** Primary buttons use a solid Warm Rose background with White text. Secondary buttons use a Soft Gold outline with 1px thickness. All buttons have a minimum height of 48px to feel substantial and premium.
- **Cards:** Cards are pure White with a 1px Ivory border. They use "soft-gold-tinted" shadows only on hover to indicate interactivity. Padding inside cards should be at least 24px.
- **Input Fields:** Fields use a very light Ivory fill and a 1px border that transitions to Warm Rose on focus. Labels sit clearly above the field in the `label-lg` style.
- **Chips/Badges:** Used for service categories (e.g., "Hair," "Nails"). These are pill-shaped with low-saturation versions of the primary color to keep the UI from becoming too colorful.
- **Appointment Lists:** Use a clean, row-based layout with significant vertical padding (16px+) and subtle dividers.
- **Modals:** Use a heavy backdrop blur (20px) to maintain the Glassmorphism theme, ensuring the focus remains entirely on the salon management task at hand.