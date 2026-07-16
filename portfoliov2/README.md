# Portfolio v2 — hero reel + scroll redesign

Redesign of `/portfolio`: the hero is now a fullscreen muted gameplay reel
(blurred and darkened behind the LOPE wordmark), and on scroll the hero
recedes into depth while the projects section slides up over it like a
sheet. Vanilla HTML/CSS/JS, no build step, no GSAP (v1's GSAP was removed;
all motion is CSS scroll-driven animations plus a small IntersectionObserver).

Served from `lope.design/portfoliov2/`. v1 at `/portfolio` is untouched.

## Hero reel: how to produce and drop in the assets

The hero expects these files (they are NOT in the repo yet; until they
exist the hero shows a poster image and `js/hero.js` silently ignores the
failed video load):

| File | Spec |
| --- | --- |
| `assets/reel/reel.mp4` | H.264, 1280x720, 30fps, no audio |
| `assets/reel/reel.webm` | VP9, 1280x720, 30fps, no audio |
| `assets/reel/poster.webp` | first frame, 1280x720, under 120 KB |

Budget: **mp4 + webm together under 4 MB.** The video is blurred to 6px and
darkened to 45% brightness on the page, so compression artifacts are
invisible; 720p and aggressive CRF are plenty.

### 1. Record the clips

Capture 10 to 15 seconds of raw gameplay from 3 or 4 games (Esqueleto
Chico, Maguitos, ClicaChorro, plus anything new). Pick moments with visible
motion (combat, UI feedback, clicking) since the blur kills fine detail.

### 2. Trim and normalize each clip

For each capture, cut the segment you want (`-ss` start, `-t` duration) and
normalize to 1280x720 at 30fps with no audio:

```sh
ffmpeg -ss 00:00:04 -t 4 -i capture1.mp4 \
  -vf "scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,fps=30" \
  -an -c:v libx264 -crf 18 clip1.mp4
```

Repeat for clip2.mp4, clip3.mp4, clip4.mp4 (3 to 4 seconds each is enough;
the whole loop should be 10 to 15 seconds).

### 3. Concatenate into a master

Create `list.txt`:

```
file 'clip1.mp4'
file 'clip2.mp4'
file 'clip3.mp4'
file 'clip4.mp4'
```

Then:

```sh
ffmpeg -f concat -safe 0 -i list.txt -c:v libx264 -crf 18 -an reel_master.mp4
```

### 4. Encode the two delivery files

```sh
ffmpeg -i reel_master.mp4 -an -c:v libx264 -profile:v high -pix_fmt yuv420p \
  -preset slow -crf 28 -movflags +faststart reel.mp4

ffmpeg -i reel_master.mp4 -an -c:v libvpx-vp9 -crf 42 -b:v 0 -row-mt 1 reel.webm
```

### 5. Extract the poster

```sh
ffmpeg -i reel.mp4 -frames:v 1 -vf scale=1280:720 -c:v libwebp -q:v 80 poster.webp
```

### 6. Check the budget and drop the files in

Check the combined size of `reel.mp4` + `reel.webm`. If over 4 MB, raise
the CRFs (mp4 to 30, webm to 46) or drop to `scale=960:540`. Then:

1. Move the three files into `assets/reel/`.
2. In `index.html`, point `.hero-poster`'s `src` and the `<video>`'s
   `poster` attribute at `./assets/reel/poster.webp` (see the TODO comment
   in the hero section).

## Regenerating the baked project cards

The project cards and skills grid exist as static HTML in `index.html`
(so the page works with JavaScript disabled) and are re-rendered at runtime
only on language switch. Both come from the same template functions in
`js/templates.js`. After changing `js/data/projects.js`,
`js/data/strings.js` or the templates, regenerate the baked markup:

```sh
node tools/bake-static.mjs
```

## Scope note: what v2 intentionally did NOT change

- Copy of the About, Toolbox and Contact sections
- The case-study system, its content, and hash routing
- Project content in `js/data/projects.js` (only `playable` and `playUrl`
  fields were added) and the project order (Esqueleto Chico stays first as
  the flagship case study; the browser-playable ClicaChorro gets priority
  through visual treatment: yellow frame and "Play in browser" tag)
- The EN/PT i18n mechanism (`data-i18n`, `langchange`, localStorage key)
- The mascot eye calibration in `css/mascot.css`
- Brand palette and font families (fonts are now self-hosted, same faces)
- Cursor FX, film grain, section labels 01 to 04 (they enumerate a real
  Projects to Contact sequence)
- `/portfolio` (v1) is fully intact

What was removed by design: the word marquee (the reel proves what it was
claiming), the three role sticker blocks (one positioning line now), the
"dog is watching your cursor" hint, cursor-following for the hero dog
(demoted to a small blinking corner stamp), and the GSAP dependency.
