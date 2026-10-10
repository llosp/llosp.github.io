---
slug: oracle
order: 2
title: oracle
type: product design, ux research
role: ux research, ux/ui, product design, design system
status: prototype
timeline: 2025 to 2026
team: group project
built_with: figma, claude code
outcome: Field research to a tested prototype.
cover_ratio: 1 / 1
summary: Oracle is a phone app that lets a tabletop RPG game master change the room with a tap, built from field research.
eyebrow: ux research and product design · 2025 to 2026
cover: assets/oracle/oracle-cover.webm
nav_image: assets/oracle/oracle-nav.webp
cover_alt: the Oracle wordmark and a phone showing the live console for a scene called Ice Cave, with the tagline "One tap, whole room."
---

## overview.md

::: statement
text: Game masters could have friends in a room, or atmosphere on a screen. Not both.
:::

Players prefer to play in person, but the tools that add atmosphere are built for screens, and screens pull people out of the room.

Oracle is a phone app that lets the game master control the room itself. One tap sets the lights, air conditioner, blinds, TV and sound, using smart devices people already own.

## research.md

We started with one question: why does an in-person table feel less immersive than it could, and what could fix that without breaking what makes it social?

To find out we went where RPG happens: at game stores, Niterói Expo Geek 2025 and CINE RPG, a school for game masters. We interviewed players and professionals aged 18 to 26 and 30 to 45, and checked what we heard against the Censo RPG Brasil 2023.

::: outcomes
items:
  - 980+ | responses in the Censo RPG Brasil 2023
  - 12M | Brazilian homes with smart devices, per the IBGE
:::

**What we found.** Three things came out of the interviews.

::: media
items:
  - full | assets/oracle/c1-interviews.webm | Animated chart: in person and online, one pair per age group, both preferring in person
:::

**01. Everyone wants the in-person table.** Both age groups prefer it and treat online as a fallback. What they disagree on is atmosphere: younger players want light, sound and visuals, while older players are happy with narration and imagination. Any tool had to be optional, never the center of the table.

::: media
items:
  - full | assets/oracle/c2-gap.webm | Animated map of immersive tools against physical presence, with Oracle landing in the empty corner
:::

**02. The atmosphere exists, but not in the room.** Online adds sound and image but invites distraction. In person is social and focused, but immersion rests on the GM's voice alone. Tools like Foundry and Roll20 put a screen in the middle of the table, and the hardware that avoids that is expensive. Players also called tabletop products good but too pricey, since most are imported. Nothing affordable does both.

::: media
items:
  - full | assets/oracle/c3-journey.webm | Animated user journey of a new player, from discovery to the frustration where Oracle steps in
:::

**03. The disappointment comes late.** A new player arrives expecting the intensity they saw online, and the table they get depends on one voice. Long, flat sessions wear on their motivation to keep playing. That gap is where Oracle sits.

So the brief became: add atmosphere to the in-person table, cheaply, without a screen in the middle. Four decisions followed.

## takeaways/

Each decision answers one of those findings.

::: decision 01-use-what-is-already-in-the-room
title: the room is already a stage
subtitle: Price was the barrier, so Oracle uses what people already own.
body:
  Players found tabletop products good but too expensive, so we made nothing to buy. Oracle pairs with the lights, air conditioner, blinds and TV already in the home, grouped by room.

  Safety and comfort limits live in the same setup, so the ceiling on flashing and temperature is set once, not mid-scene.
media:
  - full | assets/oracle/pairing-devices.webm | Motion recording: Oracle scanning the home and finding devices one by one, choosing which to add and which room they go in, then the setup code and integrations paths | // nothing to buy, just pair what is already there
:::

::: decision 02-device-by-device
title: a scene is a set of devices, not one setting
subtitle: Each device has its own editor and shows its own state.
body:
  A scene is five or six devices, and they do not take the same input. A light needs a colour and an effect, an air conditioner a temperature, a TV a piece of media.

  Each device gets its own editor, and its tile shows what it will do without opening it. Sounds and images come from a built-in library or the GM's own files, in folders and favourites.
media:
  - full | assets/oracle/ice-cave-build.webm | Screen recording: the Ice Cave scene built from empty on a phone, with the light, air conditioner, TV and sound tiles filling in one by one | // each tile carries its state, so the scene reads without opening anything
:::

::: decision 03-run-the-table
title: the game master runs the table mid-sentence
subtitle: Running a session is not the same job as building one.
body:
  The live console puts the effect pads and sound mix up front, because those are what a GM reaches for mid-sentence.

  Applying a scene shows progress device by device. If the fifth stalls, the GM sees which one and can retry it.
media:
  - full | assets/oracle/live-console.webm | Screen recording: the live console applying a scene, five devices ticking green, the fourth failing and recovering on retry, then the wind pad and the sound mix | // the broken path is designed too, so a failed device never ends the scene
:::

::: decision 04-describe-a-scene
title: automate the setup, keep the judgement
subtitle: AI drafts the scene from a sentence. The GM reviews it per device.
body:
  Typing a sentence is faster than building six devices by hand.

  The result arrives as a reviewable set of per-device changes, not something the app does to the room on its own. The GM can preview, apply or undo before the lights change on a table full of people.
media:
  - full | assets/oracle/describe-it.webm | Screen recording: a sentence typed into Oracle, the drafted per-device diff, a preview in the room, then apply and undo | // automate the setup, keep the judgement
:::

## project-info.md

::: credits
items:
  - Pedro Lopes | ux research, ux/ui, product design, design system
:::
