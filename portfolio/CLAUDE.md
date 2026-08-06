# Portfolio v2 (`/portfoliov2`) — build & content guide

Static site (no build step), served from `lope.design/portfoliov2/`. Vanilla HTML/CSS/JS,
**no GSAP** (v1's GSAP was replaced by CSS scroll-driven animations + a small
IntersectionObserver in `js/reveal.js`). One page, one case-study overlay. Everything
lives inside `/portfoliov2`. See `README.md` for the hero reel pipeline and scope notes.

## v2 architecture rules

- **Baked static cards:** the project cards and skills grid exist as static HTML in
  `index.html` between `<!-- baked:...:start/end -->` markers, generated from
  `js/templates.js` by `node tools/bake-static.mjs`. Never hand-edit those blocks;
  regenerate after changing project data, skill data or templates. The runtime renderer
  (`js/render.js`) uses the same template functions, only on language switch.
- **Sticky hero:** `.hero` is `position: sticky` and the `.sheet` wrapper slides over it.
  Never add `overflow`, `transform`, `filter` or `contain` to `<main>` or any other
  ancestor of `.hero`, or the pin breaks.
- **Motion gates:** scroll recede lives in `css/scroll.css` behind
  `@supports (animation-timeline: scroll())` and `prefers-reduced-motion: no-preference`.
  Reveal hidden states only exist under `html.js-reveal`. Content must stay visible with
  JS off, reduced motion on, or in browsers without scroll-driven animations.
- **Hero reel:** `assets/reel/` files may not exist yet; `js/hero.js` keeps the poster on
  load failure. Video is `preload="none"` with no autoplay attribute by design, and
  `js/hero.js` only starts it after `load`, on a capable client, while the hero is
  uncovered and the tab is visible.

## Performance rules (this page was once unusably janky — keep it that way fixed)

- **No `mix-blend-mode` on anything full-viewport or moving.** The grain (`body::after`)
  and the cursor glow both used one; a blended layer can't be composited on its own, so
  the browser re-reads and re-blends the backdrop every frame. Plain alpha instead.
- **No `backdrop-filter` on the fixed nav.** It re-snapshots and re-blurs the strip of
  page under the bar on every scroll frame. The bar is near-opaque navy instead.
- **Keep `.hero-media`'s blur radius small.** It's a full-viewport filter that the scroll
  recede keeps re-scaling, so the blurred raster is rebuilt as you scroll. It stays
  promoted via `will-change`; don't raise the radius back up.
- **No animated GIFs as card covers.** A GIF decodes frame by frame on the main thread
  the whole time it's on screen. Use a static `.webp`, or a muted looping `<video>`.
- **rAF loops must stop.** `js/cursor.js` runs only until the glow catches the pointer.
- **No `getBoundingClientRect()` per frame.** `js/mascot.js` caches eye rects and
  invalidates them from passive `scroll`/`resize` listeners; reading layout mid-frame
  while scroll-driven animations are running stalls the frame.
- **`will-change` is for the one or two elements that really animate**, never for
  short-lived clones (the cursor stickers would promote a layer each).

## Bilingual content — EN primary, PT toggle

The site ships in **English (default)** with a **PT** toggle (persisted in `localStorage`
as `lope-portfolio-lang`). English is the professional voice recruiters read first, so it
must be clean and idiomatic — never a literal word-for-word translation of the Portuguese.

Every human-readable string is a `{ en, pt }` object:
- UI labels → `js/data/strings.js`
- Project + case-study content → `js/data/projects.js`
- Static markup → `data-i18n="<key>"` attributes resolved from `strings.js`

`js/i18n.js` exposes `t(obj)` (returns `obj[lang]`, passes plain strings/numbers through)
and `tk(key)`. Table cells may be a plain string/number **or** a `{ en, pt }` object; the
renderer only translates object cells.

## Translation rules (PT → EN) when adding or editing content

1. **Always provide both `en` and `pt`.** Never leave a PT-only string. Write EN first and
   natural; adapt phrasing, don't transliterate.
2. **Translate everything user-facing**, including things that are easy to forget:
   - **Formulas** — translate variable and function names, not just prose. Keep the math
     identical. E.g. `HP_ideal(sala) ÷ Hits_alvo` → `ideal_HP(room) ÷ hits_target`;
     `DMG_boss(ataque)` → `DMG_boss(attack)`; `salas_limpas` → `rooms_cleared`.
   - **Table cell labels** — enemy names, attack names, categories. Make those cells
     `{ en, pt }`. E.g. Guerreiro→Warrior, Mago→Mage, Estagiário→Intern,
     Vassourada→Broom (melee), Balde→Bucket, Sabonete→Soap.
   - **Captions, headers, chips, buttons, section labels.**
3. **Do NOT translate proper nouns.** Keep as-is in both languages:
   - Game titles: `Esqueleto Chico: Ossos do Ofício`
   - Studios/labs: `Prisma Game Lab`; person names: `Vinícius`, `Chico`
   - Tools: Unity, Godot, Google Sheets, Figma, Photoshop, Illustrator, Blender
4. **Numbers stay identical** across languages. In tables keep the dot decimal (e.g. `26.5`)
   in both `en` and `pt` so columns line up; prose may use PT comma decimals (`26,5`).
5. **Tone:** concise, confident, systems-focused. Prefer active voice and concrete design
   verbs (designed, tuned, derived, prototyped). Avoid filler and literal PT idioms.

### Glossary (PT → EN)
sala → room · salas limpas → rooms cleared · dano → damage / DMG · vida → HP ·
disparos por seg / cadência → fire rate · precisão → accuracy · chefe → boss ·
andar → floor · planilha → spreadsheet · escalonamento → scaling ·
escalonamento logarítmico → logarithmic scaling · balanceamento → balancing ·
progressão → progression · build → build · playtest → playtest ·
core loop → core loop · atributos → attributes

## Case-study schema (all `caseStudy.*` fields optional; renderer skips what's absent)

`heroImage {src, alt}` · `overview` · `role` · `responsibilities [{group, items[]}]` ·
`challenge` · `coreLoop {steps[], note}` · `systems [{title, body}]` · `progression` ·
`combat {formula, body}` · `balancing {formula?, tables[]|table, body}` ·
`implementation` · `gallery [{src, alt}]` · `learnings` · `links [{label, url, kind}]`

`combat.formula` and `balancing.formula` accept a string or `{ en, pt }` (rendered in the
`.case-formula` panel). `balancing.tables` renders multiple tables; `balancing.table`
(single) still works.

## Mascot dog

`assets/img/cachorro.webp` has a **transparent eye socket**; the white eye + pupil sit
**behind** the image (`img z-index:2`, `.eye z-index:1`) and show through the hole. Ratios
in `css/mascot.css` are calibrated to the asset (center left 70.4% / top 41.2%, disc 35.5%).
If the image is swapped, re-measure the socket and update the `width`/`height` attrs in
`index.html`. Page grain lives at `assets/img/noise.svg` (referenced by `base.css` — don't move it).
