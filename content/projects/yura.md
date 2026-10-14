---
slug: yura
order: 4
title: yura
type: web design, branding
role: branding, web design, motion, front-end development
status: concept
timeline: 2026
team: solo
built_with: html, css, javascript, figma, claude code
outcome: A product page that has to make a guitar look as good on a screen as it does in your hands.
summary: A single-product storefront page for a guitar I painted by hand, and the design decisions behind every section of it.
eyebrow: personal project · web design and branding
headline: A guitar that sells itself in person. A page that has to do it without the guitar in the room.
live: /yura
live_label: visit
live_text: lope.design/yura
cover: assets/yura/yura-cover.webm
cover_alt: Looping motion piece: the YURA star and wordmark appear over a dim shot of the guitar, a light sweeps across, and the wordmark charges up in glow-in-the-dark green
---

## why.md

::: statement
text: In person, the guitar sells itself. On a screen, it has to be proved.
:::

HAKKOTAI is a guitar I made. It started as an ordinary red superstrat for a design course in 2024, and I stripped it, sanded it, painted it pink, wrapped it in glow-in-the-dark vinyl and wired it back together by hand. Then the course ended and it went into a corner.

I kept coming back to one question: how would I sell this thing on a storefront page, and make that page worth visiting? So I built a fictional brand around it, YURA, and a product page in the register of the big flagship launches, the kind where one object gets the whole screen.

The brand is the costume. The page is the project. Hold the guitar and you get it immediately: the pink, the skull, the green that keeps shining after the lights go out. A browser gives you none of that. No weight, no light switch, no way to turn it over in your hands. Every section on this page exists to win back one of those things, and most of the work went into the main page, over many iterations, as an excuse to push how far motion and scroll can carry a product story.

## the-brand.md

YURA is named after the band behind the song the guitar came from, HAKKOTAI (1998) by Yura Yura Teikoku. The product took the song's name, and the brand took the band's.

The system is small on purpose. True black, so every section controls its own light. One hot pink for the body and the buttons, and one lime green that only ever means glow. Bebas Neue for the loud lines, Inter for everything that has to be read, M PLUS 1p for the kanji and Martian Mono for labels. The structure borrows from the flagship product page: a slim product bar, a hero, a bento of features, a spec table, accessories and a closing call to buy. That pattern already tells a visitor "this is a real product with a real price", which is the one thing a fictional brand cannot say about itself.

The rest of the store is there so the main page is never a dead end. The cart, checkout, accounts, search, region picker and legal pages all work, and the footnotes say plainly that nothing is ever charged or shipped.

## the-page/

The page reads top to bottom as one argument: here it is, here is what it means, now watch it glow, here is the proof, here is how it was made, here is the price.

::: decision 01-the-bar-carries-almost-nothing
title: the top bar carries almost nothing
subtitle: The guitar gets the first screen, not the navigation.
body:
  The only bar on the page is a slim glass strip: the YURA star, the product name, search, bag, account and a pink Buy button. No section links. A single-product page does not have enough places to go to justify a menu above the fold, and every link up there is something competing with the guitar.

  The index still exists, it just waits. Once you reach the build steps, a pill rises from the bottom of the screen with the product name and an Explore button. Closed, it is one line. Open, it holds every section and a second Buy button, so the visitor who has scrolled that far always has a way back and a way out.
media:
  - full | assets/yura/product-bar-and-floating-nav.webm | Screen recording: the glass product bar at the top, then the floating pill rising at the build steps and opening into the section index
:::

::: decision 02-the-hero-is-a-photo-shoot
title: the hero is staged like a photo shoot, not laid out like a page
subtitle: Light, smoke and a guitar you can almost pick up.
body:
  The guitar lies across the frame and bleeds off the left edge, and the wordmark sits low and right so the neck runs through the gap in the lock-up and the headstock clears the kanji. The whole scene is one fixed-ratio stage sized with container units, so the guitar and the type scale as one locked composition instead of drifting apart at each breakpoint.

  It is lit, not placed on black. A pink key light sits behind the body, real smoke footage drifts across the frame on a screen blend so only the smoke shows, and a lime paint splash sits behind the guitar to quietly preview the glow that comes later. Of the two title lines, only the kanji 発光体, "a luminous body", gets a faint green glow.

  Move the pointer and the guitar tilts toward it. That runs on a real spring rather than a CSS transition, so a quick change of direction carries its momentum instead of snapping. It is the closest a screen gets to tilting the guitar in your hands. The price sits right under the call to action, "From $300 or $33.99/mo.", because a product page that hides its price reads as a concept, not a store.
media:
  - full | assets/yura/hero-pointer-tilt.webm | Screen recording: the hero loading in, then the guitar tilting in 3D as the pointer moves across it, with smoke drifting behind
:::

::: decision 03-a-sentence-you-cannot-skip
title: one sentence you cannot scroll past, then it breaks
subtitle: The manifesto lights letter by letter, then shatters into the next scene.
body:
  Right after the hero comes the idea behind the guitar, in one paragraph: take away the blood, the sweat and the tears, and what remains is pure and luminous. The section is three screens tall and the plate holding it is pinned for all of them. The first stretch of scroll lights the letters in reading order, so the text cannot be scrolled past before it has been read.

  The last stretch breaks it. The plate cracks from an impact point into shards, and each shard carries its own slice of the sentence as it falls away. The throw accelerates instead of easing out, so the cracks stay hairline for a moment and you read the sentence breaking before it is gone. Behind it, the guitar's own light comes through the cracks first, then the white room of the next scene.

  An earlier version faded white up from the floor while the last words lit. It was cut after feedback. The section now stays black until the break, and the break is the transition.
media:
  - full | assets/yura/statement-lights-then-shatters.webm | Screen recording: the manifesto paragraph lighting letter by letter on scroll, then the plate cracking into shards that fall away onto a white room
:::

::: decision 04-the-page-turns-the-lights-off
title: the page turns the lights off for you
subtitle: The one feature a photo cannot show, played out on scroll.
body:
  The guitar's main trick is that the cream art glows green in the dark. A still photo of that only proves someone took a photo in the dark. So the glow scene does it in front of you: it opens in a lit white room on "Loud in the light.", and as you scroll the lamps stutter, the room goes black and the headline changes to "Luminous in the dark." while the vinyl charges up on the body.

  "The lights go out" is not one crossfade. A single black layer over white spends the middle of the section at flat grey with nothing happening. Instead the room darkens from the edges in, then the last light leaves the guitar, then the vinyl starts to glow, as separate overlapping beats. The lamps flicker twice before they give out, and the headline swap lands on the second flicker, so the sign changes on the same beat the power cuts.

  Most of the iteration here was about legibility. Any text that changes colour while its background changes colour will cross it somewhere and vanish for a few frames, so the room commits to black during the exact window where one headline has left and the other has not arrived. Each line only ever lives over one kind of room. The guitar dims with brightness instead of opacity, because opacity made it look like the photo turning translucent rather than a lamp going out.
media:
  - full | assets/yura/glow-scene-lights-out.webm | Screen recording: the lit white room, the lamps flickering, the room going black and the guitar's art glowing green as the headline changes
  - compare | assets/yura/glow-scene-lit.webp ; assets/yura/glow-scene-dark.webp | The glow scene at its start, guitar in a lit white room under "Loud in the light." ; the same scene at its end, black room, art glowing green under "Luminous in the dark." | lights on ; lights off
:::

::: decision 05-then-prove-it-is-real
title: then prove it is not a render
subtitle: A scripted effect invites one question, and the next section answers it.
body:
  After a scene that good, the natural reaction is doubt. So the next thing on the page is three real photos of the guitar glowing in a dark room, with one line under them: "Not a render. Photographed in a dark room."

  The photos come up the same way the vinyl does, dim first and then charged, and a bloom carries over from the glow scene so it feels like the same dark room you just left.
media:
  - full | assets/yura/proof-photos-in-the-dark.webp | The three photos of the guitar glowing green in a dark room, with the caption "Not a render. Photographed in a dark room."
:::

::: decision 06-the-name-is-content
title: the name gets its own section
subtitle: Most visitors cannot read it, so the page reads it for them.
body:
  HAKKOTAI is a word most visitors will not know, and a name you cannot read is a name you will not remember. So the name becomes content: three kanji, each with its reading and meaning, emission, light, body, adding up to "a luminous body".

  Hovering a character slides a lime band up through it, like a glow-in-the-dark charge, so even the typography section repeats the one thing the product does.
media:
  - full | assets/yura/the-name-kanji-hover.webm | Screen recording: the three kanji of the name with their readings, a lime band sliding up through each one on hover
:::

::: decision 07-specs-as-reasons
title: the features are written as reasons, not specs
subtitle: A bento grid where every tile says why, not just what.
body:
  The design section is a bento of six tiles, mixing a studio cut-out, photos, big statements and spec numbers. Each tile turns a fact into a reason to care. Pink paint becomes "Pink, not red. Change the colour of the blood and the tragedy turns into a party." Basswood becomes "Comfortable for hours, not minutes." Two humbuckers become a one-line promise about tone.

  One tile has no spec at all: "A guitar is just a guitar." It is there because the art is a cracked skull with goo bursting out, and the page would rather say it has no hidden meaning than leave a visitor to guess.

  The full spec table comes later and is deliberately plain. After a page of spectacle, a calm list of facts reads as honesty.
media:
  - full | assets/yura/design-bento.webp | The design section: a bento grid of six tiles mixing a studio cut-out of the body, photos of the neck and a player, and stat tiles for the pickups and tuners
:::

::: decision 08-handmade-as-a-hand-of-cards
title: the build is dealt like a hand of cards
subtitle: Seven steps, from a red guitar to a pink one, without a paragraph of explanation.
body:
  "Handmade" is the claim that separates this guitar from anything in a catalogue, and it is also the easiest claim to make and not mean. So the build gets the longest scroll on the page. The seven steps are dealt in from the right one by one, on an arc toward the viewer, and each one knocks the card underneath back into the stack, so the row reads as a pile of work rather than a strip of thumbnails.

  The room takes the colour of whichever card is on top. It starts red with the stock guitar, warms through sanding, goes cold grey at the primer and ends hot pink, so the colour of the light tells the story of the paint job by itself. A huge step number rolls behind the cards like an odometer, and ticks under the deck jump straight to any step.

  Under it, a footnote admits that some stickers had weak glue and others tore in the cutter, and that the scars stayed in. A catalogue photo would hide that. A handmade object is better off saying it.
media:
  - full | assets/yura/build-deck-dealing.webm | Screen recording: the seven build photos dealt in one by one on scroll, the room light shifting from red to grey to pink as each lands
:::

::: decision 09-a-store-past-the-product
title: the end of the page sells the brand, not just the guitar
subtitle: Accessories, a closer and the honest small print.
body:
  Before the last call to buy, the page shows a strap, a combo amp and a braided cable, all in YURA pink and all marked "Coming soon". They are not for sale. They are there because one product on its own reads as a project, and a product with a rig around it reads as a brand.

  The closer repeats the kanji, the price and the Buy button over a photo of the guitar on its amp, so whoever reaches the bottom has everything they need without scrolling back up. Under it, three footnotes say where the name comes from, that it started as a design course project, and that YURA is a concept brand. The fiction is the point of the page, but the page never pretends it is not one.
media:
  - full | assets/yura/accessories-and-closer.webp | The accessories row with the strap, amp and cable marked coming soon, above the closing section with the price and Buy button over a photo of the guitar on its amp
:::

::: decision 10-every-scene-has-a-still
title: every scene still works with the motion off
subtitle: The animation is the delivery, not the content.
body:
  Each scroll scene was built with a fallback that tells the same story standing still. With reduced motion turned on, nothing pins: the statement is simply readable, the build is a plain grid of the same cards, and the glow scene still goes dark on scroll without flying anything in. Without JavaScript, the glow scene settles straight into the state it is about, the dark room with the vinyl lit, instead of reserving three screens of scroll it can no longer use.

  It matters for the argument as much as for access. If the page only works when everything moves, the motion is carrying the sale. If it still works when nothing moves, the motion is just making a good case better.
media:
  - full | assets/yura/reduced-motion-page.webp | The page with reduced motion turned on: the statement as plain readable text and the build steps as a static grid of cards
:::

## project-info.md
