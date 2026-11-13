# Orbital assets

Generated with the built-in image generation tool on 2026-11-04, using the user's supplied BIG STUDIO screenshot as visual inspiration. No source-site logos or UI are shipped. All visible interface text is HTML.

- `design/orbital-concept.png`: generated layout reference; no user approval is implied.
- `public/orbital/station.webp`: standalone generated station environment, converted with Sharp at quality 88. 189 KB.
- `public/orbital/explorer.webp`: standalone generated transparent explorer, resized to 850px high and converted with Sharp at quality 90, retaining alpha. 90 KB.

## Station prompt
Edit this concept into a production website background artwork ONLY. Remove ALL text, letters, UI, buttons, header, navigation, lines separating sections, bottom section preview, and remove astronaut character completely (will be a separate layer). Keep entire beautiful cinematic space station landscape with nebula, chrome planet, floating satellite, luminous amber platform and station architecture on right. Fill entire 1536x1024 landscape with the seamless scene. Left 40 percent is very dark navy negative space for live HTML text, right 60 percent detailed nebula space world, round platform lower right. No text anywhere. Preserve exact art direction, quality, palette, lighting and composition.

## Explorer prompt
Extract just the small ivory astronaut explorer from the reference concept, full body, same 3/4 view facing left, polished ivory helmet with dark reflective visor and amber circular earpiece, ivory spacesuit with amber backpack accent, little antenna, chunky boots. Character centered isolated with ample transparent padding around whole silhouette, no floor no backdrop no text no shadow plane, premium cinematic 3D render exact style and lighting of reference. Transparent background. Character occupies 85 percent height.

## Visual comparison
- Copy: existing hero copy and all navigation labels preserved. Case changed through CSS; motion control and explorer accessibility labels added.
- Composition: full-width station scene, left text, right explorer, lower-right destinations match concept hierarchy.
- Palette: midnight navy, ivory and solar yellow with pink/blue nebula preserved.
- Assets: production scene and separate alpha explorer derived from concept. No screenshot-as-UI.
- Typography: deliberate deviation retains local Bricolage/DM Sans and existing wordmark. Condensed-font download was blocked by network.
- Controls: retains accessible pause/reset and destination descriptions from existing functionality.
- Continuation: actual project content retained; concept's invented planet strip omitted. Mobile stacks copy above art.

## Verification
Playwright Chrome fallback (no built-in browser tool). All five routes checked at 1440, 390 and 320px without horizontal overflow. Destination links, pause/resume, reduced motion, mobile navigation, project filters, hobbies, contact validation, email handoff and clipboard passed without runtime errors. TypeScript and component ESLint passed. Dev preview uses webpack after Turbopack exhausted system resources.
