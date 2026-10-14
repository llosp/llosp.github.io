---
slug: yura
order: 4
title: hakkotai
type: web design, branding
role: branding, web design, motion direction
status: concept
timeline: 2026
team: solo
built_with: html, css, javascript, figma, claude code
outcome: A single-product page, with a clickable front-end store behind it, for a guitar I built by hand.
summary: A single-product storefront page for a guitar I painted by hand, and the design decisions behind every section of it.
eyebrow: personal project · web design and branding
headline: A product page for a guitar I painted by hand, designed to show how it glows in the dark.
live: /yura
live_label: visit
live_text: lope.design/yura
cover: assets/yura/yura-cover.webm
cover_alt: Looping motion piece: the YURA star spins in and slams down beside the YURA wordmark over a dim shot of the guitar, the letters swap out for HAKKOTAI, then the lights go out and the logo blinks back on in glow-in-the-dark green
---

## README.md

HAKKOTAI is a guitar I made by hand: pink paint, a cracked skull, glow-in-the-dark vinyl. YURA is the fictional brand and product page I built to sell it to someone who cannot hold it.

I did the brand, the page design and the motion direction, working solo. Claude Code wrote the first pass of the code. I directed every scene, hand-tuned the animation timings, the spacing and the copy, and made the cuts.

It is a live concept at lope.design/yura with no sales and no user test, so it cannot show conversion. The store around the page (cart, search, an account panel, checkout) is a front-end mock: the cart lives in localStorage, there is no backend and no real payment, but you can click through the whole flow.

## why.md

::: statement
text: The glow is the one thing a photo can't show, so the page turns the lights off.
:::

HAKKOTAI is a guitar I made. It started as an ordinary red superstrat for a design course in 2024. I stripped it, sanded it, painted it pink, wrapped it in glow-in-the-dark vinyl and wired it back together by hand.

I kept asking how I would sell it on a storefront page, and how to make that page worth visiting. So I built a fictional brand around it, YURA, and a product page in the style of the big flagship launches, where one object gets the whole screen.

The brand is a costume for the page. Hold the guitar and you get it immediately: the pink, the skull, the green that keeps shining after the lights go out. A browser gives you none of that, with no weight, no light switch and no way to turn it over in your hands.

I designed for a stranger who has never held the guitar and has a few seconds to decide whether it is real. The page has to make that stranger believe the guitar is real enough to click Buy. I never interviewed this stranger; they are my assumption. Each scene answers one doubt I guessed they would have: what is it, why does it matter, is it a render, is it really handmade.

## the-brand.md

YURA is named after the band behind the song the guitar came from, HAKKOTAI (1998) by Yura Yura Teikoku.

The system is small on purpose. True black, so every section controls its own light. One hot pink for the body and the buttons, and one lime green that only ever means glow. Four typefaces with one job each: Bebas Neue for the loud lines, Inter for everything that has to be read, M PLUS 1p for the kanji and Martian Mono for labels. The structure borrows from the flagship product page, which already says "this is a real product with a real price".

## the-page/

::: decision 01-the-hero-is-a-photo-shoot
title: the hero is staged like a photo shoot, not laid out like a page
subtitle: Light, smoke and a guitar you can almost pick up.
body:
  The guitar lies across the frame and bleeds off the left edge, and the wordmark sits low and right so the neck runs through the gap in the type. The scene is one fixed-ratio stage, so the guitar and the type scale together.

  It is lit, not placed on black: a pink light behind the body, real smoke footage drifting across, and a lime paint splash behind the guitar that quietly previews the glow to come. Only the kanji 発光体, "a luminous body", gets a faint green glow.

  Move the pointer and the guitar tilts toward it on a spring, so a quick change of direction keeps its momentum instead of snapping. The tilt only runs with a fine pointer and without reduced motion; on touch the guitar stays still. The price sits right under the call to action, "From $300 or $33.99/mo.", because a product page that hides its price reads as a concept, not a store.
media:
  - full | assets/yura/hero-pointer-tilt.webm | Screen recording: the hero loading in, then the guitar tilting in 3D as the pointer moves across it, with smoke drifting behind
:::

::: decision 02-a-sentence-you-cannot-skip
title: one sentence you cannot scroll past, then it breaks
subtitle: The manifesto lights letter by letter, then shatters into the next scene.
body:
  Right after the hero comes the idea behind the guitar: take away the blood, the sweat and the tears, and what remains is pure and luminous. The section is three screens tall and the black panel holding it stays pinned for all of them. The first stretch of scroll lights the letters in reading order, so nobody can scroll past the text before reading it. That takes control of the scroll away for three screens, a real cost I chose to pay because this is the one sentence the page cannot afford to skip.

  The last stretch breaks it. The panel cracks from an impact point into shards, each carrying its own slice of the sentence as it falls away.

  An earlier version faded white up from the floor while the last words lit. I cut it because it competed with the break. The section now stays black until the break, and the break is the transition.
media:
  - full | assets/yura/statement-lights-then-shatters.webm | Screen recording: the manifesto paragraph lighting letter by letter on scroll, then the panel cracking into shards that fall away onto a white room
:::

::: decision 03-the-page-turns-the-lights-off
title: the page turns the lights off for you
subtitle: The one feature a photo cannot show, played out on scroll.
body:
  The guitar's main trick is that the cream art glows green in the dark. A still photo of that only proves someone took a photo in the dark. So the glow scene does it in front of you: it opens in a lit white room on "Loud in the light.", and as you scroll the lamps stutter, the room goes black and the headline changes to "Luminous in the dark." while the vinyl charges up on the body.

  "The lights go out" is not one crossfade, which would leave the middle of the section at flat grey. The room darkens from the edges in, then the last light leaves the guitar, then the vinyl starts to glow, as separate overlapping beats. The lamps flicker twice, and the headline swap lands on the second flicker, on the same beat the power cuts.

  Most of the iteration was about legibility. Text that changes colour while its background changes colour will vanish for a few frames where the two cross, so the room goes fully black in the exact window where one headline has left and the other has not arrived. The guitar dims with brightness instead of opacity, because opacity made it look like a photo turning translucent rather than a lamp going out.
media:
  - full | assets/yura/glow-scene-lights-out.webm | Screen recording of one slow scroll through the scene: the lit white room under "Loud in the light.", the lamps flickering twice, the room going black and the guitar's art glowing green as the headline changes to "Luminous in the dark."
:::

::: decision 04-then-prove-it-is-real
title: then prove it is not a render
subtitle: A scripted effect invites one question, and the next section answers it.
body:
  After a scene that good, the natural reaction is doubt. So the next thing on the page is three real photos of the guitar glowing in a dark room, with one line under them: "Not a render. Photographed in a dark room."

  The photos come up the same way the vinyl does, dim first and then charged, and a bloom carries over from the glow scene so it feels like the same dark room you just left.
media:
  - full | assets/yura/proof-photos-in-the-dark.webm | Screen recording: the three photos of the guitar coming up dim and then charged under the line "Not a render. Photographed in a dark room."
:::

::: decision 05-the-copy-does-the-work
title: the name and the features are written as reasons
subtitle: Most visitors cannot read the name, and a spec sheet gives them no reason to care.
body:
  HAKKOTAI is a word most visitors will not know, and a name you cannot read is a name you will not remember. So the name becomes content: three kanji, each with its reading and meaning, emission, light, body, adding up to "a luminous body". Hovering a character slides a lime band up through it, like a glow-in-the-dark charge.

  The design section is a grid of six tiles, and each turns a fact into a reason to care. Pink paint becomes "Pink, not red. Change the colour of the blood and the tragedy turns into a party." One tile has no spec at all: "A guitar is just a guitar."

  The full spec table comes later and is deliberately plain. After a page of spectacle, a calm list of facts reads as honest.
media:
  - full | assets/yura/name-and-bento.webm | Screen recording: the three kanji with a lime band sliding up through each one on hover, then a scroll through the six tiles
:::

::: decision 06-handmade-as-a-hand-of-cards
title: the build is dealt like a hand of cards
subtitle: Seven steps, from a red guitar to a pink one, without a paragraph of explanation.
body:
  "Handmade" is what sets this guitar apart from anything in a catalogue, and anyone can claim it. So the build gets the longest scroll on the page. The seven steps are dealt in from the right one by one, on an arc toward the viewer, and each one knocks the card underneath back into the stack, so the row reads as a pile of work, not a strip of thumbnails.

  The room takes the colour of whichever card is on top. It starts red with the stock guitar, warms through sanding, goes cold grey at the primer and ends hot pink, so the colour of the light tells the story of the paint job without any caption.

  Under it, a footnote admits that some stickers had weak glue and others tore in the cutter, and that the scars stayed in. A catalogue photo would hide that, and I left it in.
media:
  - full | assets/yura/build-deck-dealing.webm | Screen recording: the seven build photos dealt in one by one on scroll, the room light shifting from red to grey to pink as each lands
:::

::: decision 07-a-frame-around-the-product
title: a quiet bar at the top, a brand at the bottom
subtitle: The guitar gets the first screen, and the end of the page sells more than one object.
body:
  The only bar on the page is a slim glass strip with a pink Buy button and no section links, because every link up there competes with the guitar. The cost is discoverability, and I have not added a skip link. To make up for it, once you reach the build steps a pill rises from the bottom of the screen with an Explore button that opens every section, and a second Buy button.

  At the other end, a strap, a combo amp and a braided cable, all in YURA pink and marked "Coming soon", turn one product into a brand. The closer repeats the kanji, the price and the Buy button, and three footnotes say where the name comes from, that it started as a design course project, and that YURA is a concept brand.
media:
  - full | assets/yura/bar-and-closer.webm | Screen recording: the glass product bar at the top staying bare through the hero, the floating pill rising at the build steps and opening into the section index with "Handmade" highlighted, then a scroll down to the coming-soon accessories and the closing call to buy
:::

::: decision 08-every-scene-has-a-still
title: every scene still works with the motion off
subtitle: The animation delivers the story, and the story survives without it.
body:
  Each scroll scene has a fallback that tells the same story standing still. With reduced motion turned on, the statement stops pinning and is simply readable, and the build is a plain grid of the same cards. The glow scene still pins and goes dark on scroll, but nothing flies in. Without JavaScript, the glow scene settles straight into the state it is about, the dark room with the vinyl lit, instead of reserving three screens of scroll it can no longer use.

  This is also a check on the design. If the page only works when everything moves, the motion is carrying the sale. The motion preference is read once on load, so changing it mid-visit needs a reload.
media:
  - full | assets/yura/reduced-motion-scroll.webm | Screen recording: one scroll through the page with reduced motion turned on, the statement as plain readable text, the glow scene going dark without anything flying in, and the build steps as a static grid
:::
