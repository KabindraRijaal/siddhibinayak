---
name: ui-conventions
description: 'Enforces Siddhibinayak Nirman Sewa UI design system patterns. Use whenever building new React/Next.js UI components, creating pages, styling elements, or writing copy for the project. Triggers on "design", "style", "components", "pages", or "UI".'
argument-hint: "UI element or page to build/review"
---

# Siddhibinayak UI Design Conventions

This skill ensures that all generated UI matches the precise design principles, layout scales, typography, and brand voice of the Siddhibinayak Nirman Sewa design system.

## When to Use

- Creating new page sections or layouts (`app/**/*.tsx`)
- Building or refactoring reusable UI components (`components/**/*.tsx`)
- Writing or reviewing component copy and responsive styles
- Ensuring elements match the legacy `components.html` spec natively in React/Tailwind

## Core Principles

1. **Brand & Voice**: Located in Baglung, Nepal. Grounded, trustworthy, precise engineering. Use active voice, specific numbers. No playful emojis.
2. **Palette (60/30/10 Rule)**:
   - Primary: Navy `var(--primary)` `#0f2240` (Dominant for auth/trust, headers, buttons).
   - Accent: Gold `var(--accent)` `#f4b400` (Sparingly for highlights, stars - max 10%).
   - Never combine gold and red in the same composition.
3. **Typography**:
   - `font-head` (Manrope) for Display, H1-H3, buttons, and labels. Use tight letter-spacing (`tracking-tighter`).
   - `font-body` (Work Sans) for reading text, descriptions, lists. Generous line-height (`leading-relaxed`).
4. **Spacing (4px Grid)**: Use strict Tailwind spacing tokens (gap-2, gap-4, gap-6, gap-8, gap-[100px]). Never invent arbitrary values. Layout is done primarily with `flex` or `grid` and `gap`. No per-element margins.
5. **Soft Radii & Shadows**: Sharp corners look industrial; use `rounded-lg` (8px for buttons/inputs), `rounded-2xl` (16px for cards), and low/soft shadows (`shadow-sm` on rest, up to `shadow-xl` floating).
6. **Icons**: Use geometric inline SVGs (or `lucide-react`) inheriting `currentColor` with a consistent `stroke-width` of 1.8.

## Development Checklist

Whenever you implement a new feature or design, follow this checklist sequentially:

### 1. Layout & Rhythm

- [ ] Is the section wrapped in a max-width container (e.g., `<Container />`)?
- [ ] Is spacing applied via `flex` or `grid` with `gap` instead of arbitrary padding/margins on children?
- [ ] Does the section follow the "Triad" rule if applicable (Eyebrow `<SectionLabel />` + Headline H2 `font-head` + Description paragraph `font-body`)?

### 2. Interaction & Mobile-First

- [ ] Are hover states subtle? Buttons/cards lift slightly (`hover:-translate-y-0.5` or `-y-1`) with a low shadow rather than heavy bounces?
- [ ] Are transition durations between 150ms-300ms using `ease-out`?
- [ ] Are mobile touch targets at least 44x44px?
- [ ] Do text inputs use a minimum of 16px font size on mobile to prevent iOS zoom?

### 3. Copy & Imagery

- [ ] Does the text reference "Baglung" and local landmarks (Tara Khola) properly when acting as placeholders?
- [ ] Are we using specific numbers instead of rounded claims (e.g., "17 years" vs "Many years")?
- [ ] Are CTAs verb-led and title-cased (e.g., "Start Your Project →")?
- [ ] If images are missing, are you providing a grey placeholder with a monospace label of what should go there (e.g., `<div className="bg-gray-200 font-mono text-xs text-gray-500 flex items-center justify-center aspect-[4/3]">residential villa 4:3</div>`)?

### 4. Accessibility Check

- [ ] Do we have text contrast of WCAG AA or better?
- [ ] Does every interactive element have focus indicators?
- [ ] Are forms labeled clearly _above_ the field, avoiding placeholder-only labels?
- [ ] Is confirmation given through a gentle toast rather than a blocking `alert()`?

## Error/Block Check

If the design contains rounded arbitrary `<div onclick>`, pure absolute-positioned chaotic layouts, standard system generic fonts without configuring the custom variables, or mixes Red and Gold on the same element — **stop and rewrite it.**
