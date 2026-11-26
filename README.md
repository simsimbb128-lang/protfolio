# Ebtisam Abdulqader Bajunaid — Portfolio

A bilingual, full-screen portfolio for **ابتسام عبدالقادر باجنيد / Ebtisam Abdulqader Bajunaid**. The site is a six-slide presentation deck rather than a vertically scrolling page: one cinematic viewport at a time, with real projects, certificates, and contact actions.

The visual language keeps the cream `#F5EBDD` identity, deep navy, and icy sky-blue accents, with Arabic display typography, restrained 3D studies, and an “AR-inspired” spatial treatment. The 3D and AR-like visuals are decorative artwork, not real AR tracking.

---

## Quick start

```bash
npm install
npm run dev       # http://127.0.0.1:4173
npm run build     # type-check + production build into dist/
npm run preview   # serve the production build
npm run typecheck # TypeScript project build, no output
```

Requires Node.js 20+ and a modern browser with WebGL for the opening sculpture. The opening slide has a CSS fallback when WebGL is unavailable.

---

## The six slides

1. **Opening** — bilingual name artwork, positioning statement, primary project link, and the spatial 3D glass sculpture.
2. **About** — short verified biography, profile card, and four areas of interest.
3. **Projects** — four project cards with illustrative artwork and direct links.
4. **Certificates** — eight real certificate images in a responsive grid, with an accessible full-size preview dialog.
5. **Contact** — email, telephone, and WhatsApp actions, plus a decorative spatial contact study.
6. **Closing** — return-to-start control, closing statement, identity, and edition metadata.

Projects and links:

| Project | URL |
| --- | --- |
| **FAJR** | `https://fajr-2wt.pages.dev/` |
| **FixHome** | `https://fixhome.smh2030.store/?v=2` |
| **SmartHome** | `https://smarthome.simsimbb128.workers.dev` |
| **Toty Frutty** | `https://totyfruity.bsooma404.workers.dev` |

Every project action is a real link with `target="_blank"` and `rel="noopener noreferrer"`. The project artwork is clearly described as illustrative and is not presented as a live screenshot.

Contact actions:

- `mailto:bsooma404@gmail.com`
- `tel:0532525128`
- `https://wa.me/966532525128` (opens WhatsApp in a new tab)

No placeholder contact methods, projects, certificates, dates, issuers, or achievements are included.

---

## Presentation behavior

- Exactly one active slide at a time. Normal page scrolling is disabled and the deck is sized to `100dvh`.
- Cinematic fade and restrained horizontal/depth transitions. The outgoing slide is `aria-hidden`, `inert`, and unmounted after the transition.
- Previous/next arrows with disabled states, a live `01 / 06` → `06 / 06` counter, an animated progress bar, a slide-index menu, and a return-to-start control.
- Keyboard support: `ArrowRight` next, `ArrowLeft` previous, `Home` first slide, `End` last slide, and `Escape` returns to the opening slide. When a menu or certificate dialog is open, `Escape` closes that surface first and does not change the slide.
- RTL-aware horizontal touch swipes. Swipes that begin on links, buttons, or controls are ignored so taps are never stolen.
- Arabic RTL / English LTR switching applies to every slide, label, counter, menu entry, project, certificate, contact action, and accessibility label. The current slide is preserved when the language changes.
- The locale is persisted in `ebtisam.locale` and reflected in `<html lang>`, `<html dir>`, the document title, and the description meta tag.

### Autoplay

Autoplay advances after an 11-second reading interval. It:

- is available from any slide and restarts at the opening from the last slide;
- can be paused and resumed by the visitor;
- pauses on visitor interaction;
- pauses when the menu or certificate dialog is open;
- pauses while the tab is hidden;
- is disabled under `prefers-reduced-motion: reduce`.

---

## Certificate handling

Eight certificate images from the supplied source files are included in `public/certificates/`, with optimized WebP thumbnails in `public/certificates/thumbs/`.

The full-size preview is a native `<dialog>`:

- the original image is displayed with `object-fit: contain`, so the certificate aspect ratio is preserved;
- the dialog is labelled, traps focus, and starts with focus on its close control;
- `ArrowLeft` and `ArrowRight` move between certificates;
- `Escape` closes the dialog and restores focus to the card that opened it;
- opening or navigating the dialog never advances the deck.

Certificate issuer names and dates are taken from the legible certificate content. Dates that could not be confirmed are omitted rather than invented. The two images that were code/console screenshots rather than certificates were excluded.

---

## Content authenticity

- The Arabic name artwork is the primary bilingual identity on the opening slide.
- Project names, URLs, and descriptions come from the supplied project set. Artwork is clearly labelled as illustrative.
- Certificate titles, issuers, and dates come from the supplied certificate images.
- The contact details are the three supplied channels only.
- The spatial scenes are original procedural / CSS studies. They are described as 3D and AR-inspired, never as genuine AR tracking or device AR.
- The SmartHome URL supplied for the portfolio returned HTTP `404` during the final external-link check on 23 October 2026. The card keeps the exact supplied URL instead of substituting or inventing an address.

---

## Architecture

`Deck` owns presentation state:

```text
activeIndex ──> active slide
     │
     ├── leavingIndex (for the transition)
     ├── direction (next / previous / initial)
     ├── menuOpen
     ├── certificateDialogOpen
     ├── autoplay
     └── focusToken
```

- `slideIds` is the stable source of truth: `opening`, `about`, `projects`, `certificates`, `contact`, `closing`.
- Navigation changes React state only; it does **not** update the URL, hash, or history.
- The swipe handler is attached natively in the capture phase so gestures that begin over the WebGL canvas still work.
- Focus moves into the newly active slide after a header link or menu jump. Control-only navigation leaves focus on the control the visitor used.
- `aria-live` announces the current slide number and title.

```text
ebtisam-portfolio/
├─ index.html
├─ public/
│  ├─ certificates/              # eight originals + optimized thumbnails
│  ├─ projects/                  # four illustrative project SVGs
│  └─ favicon.svg
├─ src/
│  ├─ main.tsx
│  ├─ App.tsx
│  ├─ i18n/
│  │  ├─ translations.ts         # typed Arabic/English dictionaries
│  │  └─ LanguageContext.tsx
│  ├─ styles/
│  │  ├─ tokens.css
│  │  ├─ base.css
│  │  ├─ hero.css
│  │  ├─ sections.css
│  │  ├─ scenes.css              # content slides, certificate dialog, short landscape
│  │  └─ deck.css                # shell, transitions, controls, menu
│  ├─ components/
│  │  ├─ presentation/
│  │  │  ├─ Deck.tsx
│  │  │  ├─ DeckControls.tsx
│  │  │  ├─ SlideAtmosphere.tsx
│  │  │  └─ SlideMenu.tsx
│  │  ├─ hero/
│  │  │  ├─ Hero.tsx
│  │  │  ├─ SpatialStage.tsx
│  │  │  ├─ SpatialScene.tsx
│  │  │  ├─ StaticSculpture.tsx
│  │  │  └─ SceneErrorBoundary.tsx
│  │  ├─ sections/
│  │  │  ├─ AboutSlide.tsx
│  │  │  ├─ ProjectsSlide.tsx
│  │  │  ├─ CertificatesSlide.tsx
│  │  │  ├─ CertificateDialog.tsx
│  │  │  ├─ ContactSlide.tsx
│  │  │  └─ SectionShell.tsx
│  │  ├─ layout/
│  │  │  ├─ Header.tsx
│  │  │  └─ Footer.tsx
│  │  └─ ui/
│  │     └─ LanguageSwitch.tsx
│  └─ hooks/                     # WebGL, reduced motion, visibility, viewport, parallax
├─ vite.config.ts
└─ package.json
```

---

## Design system

`src/styles/tokens.css` is the single source of truth:

- Cream `#F5EBDD`, warm off-whites, deep navy `#081927`, icy blues, and restrained blush accents.
- Display serif (Cormorant Garamond), UI sans (Manrope), Arabic body (IBM Plex Sans Arabic), Arabic display (Alexandria).
- Shared spacing, radius, shadow, easing, header, control-height, and deck-transition tokens.
- Logical CSS properties (`inset-inline`, `margin-inline`, logical text alignment) throughout, with RTL-specific typography, icon mirroring, and swipe direction.

---

## Responsive behavior

- **Desktop:** two-column opening with the spatial stage, wide content scenes, and four-column certificate grid.
- **Tablet ≤ 920 px:** stacked opening and compact content scenes.
- **Phone ≤ 700 px:** full-width actions, simplified stage, compact controls and typography.
- **Short phones:** the opening stage is hidden at very short heights so the name, statement, and actions remain above the fixed controls.
- **Short landscape (≤ 520 px tall, ≥ 701 px wide):** a dedicated compact layout; the opening becomes a focused typographic scene, projects use one row of four cards, certificates use a four-by-two grid, and contact channels become compact rows.
- **Very narrow phones ≤ 350 px:** reduced display type and smaller controls.

Automated layout audits cover both languages at `1440×1000`, `1280×800`, `1024×768`, `390×844`, `360×640`, `320×700`, `320×568`, `375×667`, and `844×390`.

---

## Accessibility

- Skip link to `#main-content`.
- One `h1`; labelled slide regions; `header`, `main`, `footer`, `nav`, `figure`, and dialog semantics.
- Visible `:focus-visible` outlines, including on light and dark surfaces.
- Language buttons are real buttons with `aria-pressed` and localized accessible names.
- The slide menu and certificate preview are native modal dialogs with `Escape` handling and focus restoration.
- Decorative visuals are hidden from assistive technology; all meaningful information is available as text.
- Reduced motion disables slide transitions, entrance effects, ambient motion, and progress-bar transitions.
- Autoplay is disabled when the visitor prefers reduced motion and pauses when the tab is hidden.

---

## Performance

- Initial production JS is about **286 kB** (about **85 kB** gzip).
- The lazy spatial scene is about **918 kB** (about **244 kB** gzip), loaded only for the opening slide.
- Production CSS is about **111 kB** (about **21 kB** gzip).
- `SpatialScene` is lazy-loaded, keeping Three.js out of the initial JavaScript chunk.
- `frameloop` is active only while the scene is in view and the tab is visible; it becomes `never` otherwise.
- Google Fonts are loaded with preconnect; system fallbacks are defined.

---

## Verification

Checked against the production build in Chrome with Puppeteer:

| Check | Result |
| --- | --- |
| `npm run build` | TypeScript and Vite production build pass |
| Active slide and counter | Exactly one active slide; `01 / 06` → `06 / 06` |
| One-slide viewport | No page scrolling at the tested desktop, tablet, phone, and short-landscape sizes |
| Projects | Four cards; exact supplied URLs; safe new-tab attributes; artwork loaded |
| Certificates | Eight real images loaded; original-aspect-ratio modal; focus restoration; arrow navigation; `Escape` |
| Contact | Exact `mailto:`, `tel:`, and WhatsApp URLs; WhatsApp opens in a new tab |
| Keyboard | `ArrowRight`, `ArrowLeft`, `Home`, `End`, and `Escape` behave as specified |
| Menu | Six entries; opens, navigates, closes on `Escape`, restores focus, and does not advance the deck by itself |
| Language | Arabic RTL and English LTR across all six slides; current slide preserved |
| Autoplay | 11-second interval; starts, pauses on interaction, hidden-tab pause, and restart from the closing slide |
| Reduced motion | Autoplay disabled; slide animation disabled |
| Touch | LTR and RTL swipes navigate; swipes beginning on links/buttons do not navigate |
| External links | FAJR, FixHome, and Toty Frutty returned HTTP `200`; SmartHome returned `404` |
| Console | No page errors or failed local requests during the final functional run |

---

## Known limitations

- **No deep links.** Navigation is intentionally state-only. Adding URL/hash deep links would be a separate tested feature.
- **3D is decorative.** It is not content, cannot be manipulated, and is excluded from the accessibility tree.
- **SmartHome availability.** The supplied SmartHome URL returned `404` during final verification. The exact supplied link is retained and is not replaced with an unverified alternative.
- **Google Fonts dependency.** Fonts require network access on first load; system fallbacks are defined.
- **No committed automated test suite yet.** Final verification used temporary Puppeteer scripts against the production build.
- **Certificate dates.** Only legible, confirmed dates are shown; unconfirmed dates remain blank.
