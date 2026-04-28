---
name: The Design System
colors:
  surface: '#fff8f2'
  surface-dim: '#dfd9d3'
  surface-bright: '#fff8f2'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f9f2ec'
  surface-container: '#f3ede7'
  surface-container-high: '#eee7e1'
  surface-container-highest: '#e8e1dc'
  on-surface: '#1e1b18'
  on-surface-variant: '#4e4446'
  inverse-surface: '#33302c'
  inverse-on-surface: '#f6f0ea'
  outline: '#807476'
  outline-variant: '#d1c3c5'
  surface-tint: '#6d595d'
  primary: '#6d595d'
  on-primary: '#ffffff'
  primary-container: '#f2d8dc'
  on-primary-container: '#705d60'
  inverse-primary: '#d9c0c4'
  secondary: '#745a27'
  on-secondary: '#ffffff'
  secondary-container: '#fedb9b'
  on-secondary-container: '#795f2b'
  tertiary: '#6e5959'
  on-tertiary: '#ffffff'
  tertiary-container: '#f4d8d7'
  on-tertiary-container: '#725d5c'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#f6dce0'
  primary-fixed-dim: '#d9c0c4'
  on-primary-fixed: '#26181b'
  on-primary-fixed-variant: '#544246'
  secondary-fixed: '#ffdea4'
  secondary-fixed-dim: '#e4c285'
  on-secondary-fixed: '#261900'
  on-secondary-fixed-variant: '#5a4312'
  tertiary-fixed: '#f9dcdb'
  tertiary-fixed-dim: '#dbc0bf'
  on-tertiary-fixed: '#271817'
  on-tertiary-fixed-variant: '#554242'
  background: '#fff8f2'
  on-background: '#1e1b18'
  surface-variant: '#e8e1dc'
typography:
  headline-xl:
    fontFamily: notoSerif
    fontSize: 48px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: notoSerif
    fontSize: 32px
    fontWeight: '500'
    lineHeight: '1.3'
  headline-md:
    fontFamily: notoSerif
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.4'
  body-lg:
    fontFamily: plusJakartaSans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: plusJakartaSans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: plusJakartaSans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  gutter: 20px
  margin: 32px
---

## Brand & Style

This design system embodies a modern "her" aesthetic—a curated fusion of coquette charm and polished barbiecore. The brand personality is unapologetically feminine, playful, and aspirational, targeting a demographic that values both whimsy and sophisticated digital craftsmanship. 

The visual language is defined by **Soft Minimalism** combined with **Glassmorphism**. It prioritizes heavy whitespace and a luminous atmosphere to evoke a sense of "glow." Layers are treated as translucent veils rather than solid blocks, creating a dreamy, ethereal depth. Interactions should feel fluid and lightweight, utilizing subtle motion to reinforce the "soft girl" emotional response.

## Colors

The palette is anchored by a flagship soft pink (#F2D8DC), used extensively for primary surfaces and brand markers. This is supported by a luxe gold accent (#C9A96E) to provide a "silk-like" sophistication. The background is a warm, breathable cream (#FDF6F0) rather than a sterile white, ensuring the interface feels inviting.

For high-contrast elements and legibility, a deep espresso (#1C0E0E) is used for primary typography. Vibrant energy is introduced through the use of **pink-tinted gradients** and **glowing outer shadows**, moving the interface from "flat" to "vibrant."

## Typography

The typography strategy relies on a high-contrast pairing: a traditional, elegant serif for headers and a soft, contemporary sans-serif for functional text. 

**notoSerif** is used for headlines to provide a literary, editorial feel. It should be typeset with slightly tighter letter-spacing in larger sizes to emphasize its stylish silhouettes. **plusJakartaSans** serves as the workhorse for body and UI labels; its naturally rounded apertures perfectly complement the "soft girl" aesthetic while maintaining high readability. Labels should occasionally use increased tracking and uppercase styling for a premium, boutique-inspired look.

## Layout & Spacing

This design system utilizes a **fluid grid** with generous internal padding to maintain a "light" feel. The layout should avoid density, instead opting for "breathing room" that allows the glassmorphic elements to shine.

The spacing rhythm is based on an 8px scale, but emphasizes larger increments (24px, 48px) for section headers and container margins. Elements are often centered to create a symmetrical, balanced, and orderly aesthetic typical of high-end fashion or beauty editorials.

## Elevation & Depth

Depth is achieved through **Glassmorphism** and **Ambient Shadows** rather than traditional stacking. 

1.  **Backdrop Blurs:** High-elevation containers (like modals and navigation bars) use a `backdrop-filter: blur(20px)` with a semi-transparent white or soft pink fill (15–30% opacity).
2.  **Luminous Outlines:** Surfaces are often defined by a 1px solid white border at low opacity (40%), creating a "shimmer" effect on the edges.
3.  **Tinted Shadows:** Instead of gray shadows, this system uses ultra-diffused shadows tinted with the primary pink color (`rgba(242, 216, 220, 0.5)`). This creates a "glow" rather than a drop-shadow, making components feel as if they are radiating light onto the cream background.

## Shapes

The shape language is defined by **Rounded** corners that soften the overall interface. While a `0.5rem` (8px) base is the standard, larger containers like cards and primary buttons should lean toward the `rounded-xl` (24px) territory to emphasize the playful, friendly nature of the aesthetic. 

Avoid sharp 90-degree angles entirely. Circular elements are encouraged for avatars, icon backgrounds, and floating action buttons to reinforce the organic, coquette-inspired visual theme.

## Components

### Buttons
Primary buttons are vibrant pink with white text, featuring a subtle inner white glow to look "plump" or "squishy." Secondary buttons use the gold accent or a simple glassmorphic style with a pink border.

### Cards
Cards are the primary expression of the system's depth. They should feature a soft pink-tinted glass background, a thin white "shimmer" border, and a wide, pink-tinted ambient shadow.

### Input Fields
Inputs use the cream neutral background with a subtle inset shadow to appear recessed. On focus, the border transitions to a glowing pink with a soft outer glow.

### Chips & Tags
Chips are pill-shaped and use high-saturation versions of the primary pink or gold, often with a slight gradient to mimic silk or satin ribbons.

### Navigation
The navigation bar should be a fixed glassmorphic element at the top or bottom of the screen, utilizing the backdrop blur to allow content to scroll beautifully beneath it. Icons should be thin-stroke, feminine, and elegant.