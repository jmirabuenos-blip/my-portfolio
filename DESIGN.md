---
name: Jaymer Mirabuenos Portfolio
description: An editorial gallery of working software and a copper digital sculpture.
colors:
  primary: "#d69a76"
  background: "#121210"
  foreground: "#eeeae2"
  muted: "#a5a39a"
  line: "#35352e"
  surface: "#1b1c18"
typography:
  display:
    fontFamily: "Bricolage Grotesque, sans-serif"
    fontSize: "clamp(80px, 8.8vw, 140px)"
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Bricolage Grotesque, sans-serif"
    fontSize: "clamp(48px, 5.2vw, 80px)"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "-0.04em"
  body:
    fontFamily: "DM Sans, sans-serif"
    lineHeight: 1.75
  editorial:
    fontFamily: "Georgia, 'Times New Roman', serif"
    fontWeight: 400
    letterSpacing: "-0.04em"
rounded:
  field: "0px"
  control: "50%"
spacing:
  section-inset: "8%"
  mobile-inset: "6%"
components:
  button-primary:
    backgroundColor: "{colors.foreground}"
    textColor: "{colors.background}"
    padding: "17px 22px"
  button-primary-hover:
    backgroundColor: "{colors.primary}"
  sculpture-control:
    rounded: "{rounded.control}"
    height: "44px"
  field:
    backgroundColor: "transparent"
    textColor: "{colors.foreground}"
    rounded: "{rounded.field}"
    padding: "12px 0 18px"
---

# Design System: Jaymer Mirabuenos Portfolio

## Overview

**Creative North Star: "The Digital Sculpture Gallery"**

A quiet, spacious gallery pairs warm metal with ivory editorial typography. Large project screenshots provide the evidence; restrained controls keep the work prominent. The implemented direction was developed in code after the image generation service failed; no generated concept image established the design.

**Key Characteristics:**
- Near-black surfaces and a warm copper accent.
- Oversized sans-serif headings with italic serif emphasis.
- Open project stages and fine dividing lines.
- One interactive sculpture with deliberate motion controls.

## Colors

### Primary
- **Burnished Copper** (`primary`): emphasized words, selected states, links on hover, and keyboard focus.

### Neutral
- **Gallery Black** (`background`): page canvas.
- **Warm Ivory** (`foreground`): headings, navigation, and the primary action fill.
- **Stone Gray** (`muted`): descriptions and metadata.
- **Olive Charcoal** (`line`): section and control boundaries.
- **Raised Charcoal** (`surface`): mobile navigation surface.

## Typography

**Display Font:** Bricolage Grotesque with sans-serif fallback. **Body Font:** DM Sans with sans-serif fallback. Georgia and Times New Roman supply italic editorial emphasis.

The display and headline roles in frontmatter describe the desktop hero and section headings. Mobile hero type uses `clamp(54px,12vw,80px)`. Body sizing varies by context: hero copy is 15px desktop and 14px mobile; project descriptions are 14px desktop and 13px mobile. Small uppercase metadata uses 11px with .045em tracking. Headings use tight tracking, while paragraphs retain generous leading.

## Layout

The header and hero use 5% desktop margins. Content sections have a 1600px maximum width and the section inset token. At 1000px and below, content insets become 6%; at 700px and below, editorial and contact grids collapse to one column and navigation becomes a menu. A 1700px breakpoint bounds the header and hero.

Desktop project stages use a 1.94 aspect ratio and 6.5%/9% padding. Mobile stages use 1.25 and 12%/6%/18% padding. Section openings and project spacing use 115px on desktop; mobile work starts at 65px and project spacing becomes 70px. This is a contextual spacing system, not a uniform invented scale.

## Elevation & Depth

Tonal surfaces and fine borders organize the page. Project screenshots alone receive an ambient shadow (`0 25px 60px #0005`) and slight perspective rotation. Hover or keyboard focus straightens and enlarges them. The sculpture provides actual geometric depth through a native WebGL renderer.

## Shapes

Project stages and fields have square edges. Lighting and playback controls are circular, with a 44px minimum width and 44px height. Underlines and single-pixel dividers provide structure; project tags are plain text rather than filled pills.

## Components

- **Buttons:** ivory-filled email handoff action with copper hover; text links use a bottom rule and an expanding arrow gap. Keyboard focus uses a 2px copper outline with 6px offset.
- **Fields:** transparent, square, bottom-bordered inputs with 16px text. The contact form opens an email client; its visual status must not imply message delivery.
- **Navigation:** 14px desktop links, copper hover/current-page states, and a vertically stacked mobile menu with 23px links.
- **Project stages:** large screenshot presentations, separate metadata, titles, descriptions, and plain technology tags. Filters use underlined text with `aria-pressed` selection.
- **Sculpture:** locally generated geometry and shaders in `src/lib/sculpture.ts`, dynamically loaded by `HeroExperience.tsx`. Native WebGL adds no rendering dependency. Copper, silver, and olive lighting, pointer dragging, arrow-key rotation, and pause/play controls expose the interaction. Device pixel ratio is capped at 1.5; animation stops offscreen and when the document is hidden. Reduced motion disables automatic rotation, scroll rotation, pointer dragging, CSS animations, and transitions; explicit keyboard rotation and lighting selection remain available.
- **Fallback and provenance:** `public/sculpture-still.png` is a locally rendered WebGL frame authored from `src/lib/sculpture.ts`, not an AI-generated image. It appears when scene initialization fails. Existing project imagery in `public/projects` is preserved source material.

## Do's and Don'ts

### Do:
- **Do** retain visible keyboard focus and meaningful selected states.
- **Do** preserve actual project imagery and truthful content.
- **Do** keep motion optional and content readable without animation.

### Don't:
- **Don't** describe the renderer as React Three Fiber or add a rendering dependency merely to match that description.
- **Don't** label the local sculpture still as AI-generated artwork.
- **Don't** imply that the email handoff sends a message through a backend.
