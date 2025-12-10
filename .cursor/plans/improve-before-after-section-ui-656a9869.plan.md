---
name: Conversion Optimization Plan
overview: ""
todos:
  - id: b097a272-82c9-4c8d-9b37-262be566aef5
    content: Create LogoCloud component in src/components/ui/logo-cloud.tsx
    status: pending
  - id: 654230d8-c2c0-41f1-9dbd-787b948ca1f7
    content: Create TestimonialsSection component in src/components/ui/testimonials-section.tsx
    status: pending
  - id: 058e293e-9b5b-48b0-8e2b-e28a5586e9cd
    content: Create CTASection component in src/components/ui/cta-section.tsx
    status: pending
  - id: 6832f7cd-e4d4-4c2b-84a4-463c1da83756
    content: Integrate LogoCloud, Testimonials, and CTASection into src/app/page.tsx
    status: pending
  - id: 446da547-9b9f-433c-af50-5c2860b8385f
    content: Add 'No credit card required' text to Hero2 component
    status: pending
---

# Conversion Optimization Plan

## 1. Social Proof: Trusted Companies (Logo Cloud)

- **Location**: Immediately below the Hero section (inside `Hero2` or as a new component between Hero and Features).
- **Implementation**:
- Create `src/components/ui/logo-cloud.tsx`.
- Add 5-6 grayscale logos (use placeholders or generic tech/logistics logos).
- Add "Trusted by 500+ sourcing teams" text.

## 2. Social Proof: Testimonials Section

- **Location**: Between `BeforeAfterSection` and `PricingSection`.
- **Implementation**:
- Create `src/components/ui/testimonials-section.tsx`.
- Add 3 card-style testimonials with:
  - User avatar/name/role.
  - Star rating (5 stars).
  - Quote highlighting a specific benefit (e.g., "Saved us 20 hours/week").
- Use `Marquee` or simple grid layout.

## 3. Final Call-to-Action (CTA) Section

- **Location**: Between `FAQSection` and `Footer`.
- **Implementation**:
- Create `src/components/ui/cta-section.tsx`.
- Design: High-contrast background (primary color or dark theme).
- Content:
  - Heading: "Ready to streamline your sourcing?"
  - Subheading: "Join thousands of agents growing their business with SourSync."
  - Primary Button: "Start Your Free Trial" (link to signup).
  - Secondary Link: "Talk to Sales".

## 4. Minor CTA Tweaks

- **Hero Section**: Add "No credit card required" text below the "Start Free" button in `Hero2`.
- **Header**: Ensure the header "Get Started" button is prominent.

## Implementation Steps

1. Create `LogoCloud` component.
2. Create `TestimonialsSection` component.
3. Create `CTASection` component.
4. Integrate all new sections into `src/app/page.tsx`.
5. Add "No credit card required" micro-copy to Hero.