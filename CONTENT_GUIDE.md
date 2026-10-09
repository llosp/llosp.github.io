# content guide

The site is generated. You write markdown in `content/`, run the build, and
commit the HTML it produces.

```sh
node tools/build.mjs
```

That reads `content/about.md` and every file in `content/projects/`, and
writes `index.html` plus one `work/<slug>/index.html` per project. It needs
nothing installed. At the end it prints every unwritten placeholder it found,
grouped by page.

Nothing else should be edited by hand. `index.html` and `work/*/index.html`
are build output and get overwritten.

## adding a project

Create `content/projects/<slug>.md`. The filename is not the slug, the
frontmatter is.

```md
---
slug: my-project
order: 3
title: my project
type: product design, ui
role: what you actually did
status: shipped
timeline: 2026
team: solo
built_with: figma, claude code
outcome: the one line that goes in the work index
summary: one sentence, used as the page meta description
live: https://example.com
live_label: visit
live_text: example.com
cover: assets/my-project/cover.webp
cover_fit: cover
cover_alt: what is in the cover image
cover_caption: // a code comment about why the cover is this image
---
```

`order` sets the position in the work index. `cover_fit` is `cover` or
`contain`: use `contain` when the cover is artwork that must not be cropped,
`cover` when it is a photograph or a centred mark that crops safely. The
`live_*` fields are optional and only appear if `live` is set.

The work index is the covers and nothing else. Each cover is a link straight
to its case study. Under each one it prints the `title`, then `type · status`,
then `outcome` underneath. Those four are the only fields that show there, so
write `type` and `status` as two or three words and `outcome` as one sentence
that makes sense with no heading above it. The tile is a quarter of the page
wide, so keep all four short. `role`, `timeline`, `team`, `built_with` and
`summary` appear on the case study instead, and `cover_caption` sits under the
hero there.

## cover shapes

The index is four columns of covers, and each cover keeps the shape of its own
image. That is what staggers the columns, so a set of covers that are all the
same shape will produce four flat columns with no rhythm. Vary them.

The build reads the width and height out of the `.webp` itself, so there is
nothing to declare and nothing to keep in sync when you replace a file. If
you need to override it, `cover_ratio: 4 / 3` wins. A missing cover or a
video one falls back to 16:9.

The case study hero is always 16:9 regardless, and the cover morphs between
the two shapes on the way in. `cover_fit` is what keeps that from distorting,
so it has to be right: `contain` artwork rescales inside the growing box,
`cover` photography re-crops.

## sections

A `##` heading starts a section. The heading becomes the filename shown in
the left column of the case study, so keep the file-system naming.

```md
## README.md

Three lines. What it is, what you did, what came out of it.

## problem.md

The constraint you were actually designing against.

## decisions/

(decision blocks go here)

## outcome.md

## next.md
```

Plain paragraphs render as body copy. Body copy is sentence case. Lowercase
is for nav, labels, filenames and captions only.

## blocks

Blocks are fenced with `:::` and take `key: value` fields. A value can run
over several lines as long as the continuation lines are indented.

### decision

One per decision, inside `## decisions/`. The `arg` after the type is the
filename, so number them.

```md
::: decision 01-device-by-device
title: edit the scene device by device, not as one preset
body:
  Why you did it. Two short paragraphs at most.

  A blank line starts a new paragraph.
before: assets/my-project/before.webp
before_alt: what the old version looked like
before_caption: // what was wrong with it
after: assets/my-project/after.webp
after_alt: what the new version looks like
after_caption: // what the change bought you
:::
```

The before/after pair sits side by side on desktop and stacks on mobile. A
missing image renders as a grey block carrying its own placeholder, so the
layout still works before the asset exists.

### ai-exchange

A drawing of an AI edit flow. It is presentational: there are no real calls
behind it, and the action row is not clickable.

```md
::: ai-exchange
prompt: an ice cave. freezing, blue, water dripping somewhere far off
agent: oracle
output: built "ice cave" across 5 devices. review before applying.
diff:
- ac.living          cool 22°c, auto fan
+ ac.living          cool 18°c, high fan
+ tv.living          "frozen cavern", full screen
actions: preview, apply, undo
note: say here whether this is built, prototyped or proposed
:::
```

Lines in `diff` starting with `-` render red, `+` render green, anything else
renders as context. The `+` and `-` characters stay in the text, so the diff
is still readable without colour.

### gallery

```md
::: gallery
items:
- assets/my-project/one.webp | wide | alt text | // the caption
- assets/my-project/two.webm | portrait | alt text | // the caption
:::
```

Four fields separated by `|`: source, shape, alt text, caption. Shapes are
`wide`, `landscape`, `portrait`, `square` and `natural`. Videos autoplay
muted while they are on screen. Clicking any item opens it across two
columns.

Keep gallery counts divisible by four, because the grid is four columns on
desktop and two on mobile. Four or eight items fill cleanly; five leaves a
hole.

### toolbox and meta

`::: toolbox` takes `label | items` rows, `::: meta` takes plain key/value
pairs. Both are used in `content/about.md`.

## captions

Captions are code comments, not filenames. They should say why the image is
there, not what it is.

```
// the live console puts the effect pads up front, because the gm reaches
// for those while they are mid-sentence
```

Not `cover.webp`. Not "screenshot of the console". The alt text is where you
describe what is in the picture.

## placeholders

Never invent a number, a quote or an outcome. Write a placeholder instead.

```
[todo: how many sessions this has run]
```

Anywhere that syntax appears in a markdown file, the build emits an HTML
comment and a highlighted `[todo: ...]` on the page. Yellow against a black
and white site is deliberate: it is there so a gap cannot be shipped by
accident.

The build prints a count per page when it runs. That number should be zero
before the site goes out.

## rules

- No em dashes. The build warns when it finds one.
- No invented content. A placeholder is a real answer; a made-up metric is not.
- Body copy in sentence case, labels and captions lowercase.
- Every image needs alt text. The build will not stop you, but a reader using
  a screen reader will notice.

## assets

Images live in `assets/<slug>/`. Use `.webp` for stills and `.webm` for
video. Paths in markdown are written relative to the repo root
(`assets/oracle/cover.webp`); the build makes them absolute so they resolve
from `/work/<slug>/`.

Covers keep their own shape on the work index and are framed at 16:9 on the
case study hero. See "cover shapes" above for what that means when you are
choosing one.

### video covers

A `cover` may be a `.webm` or `.mp4` instead of a `.webp`, and nothing else
in the frontmatter changes. In the work index it becomes a muted looping clip
that plays only while the cursor is over it. On the case study it fills the
hero and plays whenever it is on screen, because there the clip is the
subject of the page rather than a label on a link. The morph between the two
carries the video, not a still frame.

Keep the clips short and small. Every cover on the index preloads its
metadata, so five long videos cost five round trips before anything plays.
`cover_alt` is still used: it becomes the accessible label on the hero.
