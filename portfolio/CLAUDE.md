# Portfolio (`/portfolio`) — build & content guide

Static site (no build step), served from `lope.github.io/portfolio/`. Vanilla HTML/CSS/JS
+ GSAP via CDN. One page, one case-study overlay. Everything lives inside `/portfolio`.

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
