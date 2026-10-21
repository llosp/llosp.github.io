---
slug: oracle
order: 2
title: oracle
type: product design, ux research
role: ux research, ux/ui, product design, design system
status: prototype
timeline: 2025 to 2026
team: group project. research, the idea and documentation were shared. design and the prototype were mine.
built_with: figma, claude code
outcome: Field research to a prototype tested with a game master and a short play session.
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

## takeaways/

Each decision answers one of the three findings in research.md.

::: decision 01-use-what-is-already-in-the-room
title: the room is already a stage
subtitle: Price was the barrier, so Oracle uses what people already own.
body:
  Players found tabletop products good but too expensive, so I made nothing to buy. Oracle pairs with the lights, air conditioner, blinds and TV already in the home, grouped by room.

  The ceiling on flashing and temperature is set once, during that same setup, so nobody has to think about it mid-session.
media:
  - full | assets/oracle/pairing-devices.webm | Motion recording: Oracle scanning the home and finding devices one by one, choosing which to add and which room they go in, then the setup code and integrations paths | // nothing to buy, just pair what is already there | tall
:::

::: decision 02-device-by-device
title: a scene is a set of devices, not one setting
subtitle: Each device has its own editor and shows its own state.
body:
  A scene is five or six devices, and they do not take the same input. A light needs a colour and an effect, an air conditioner a temperature, a TV a piece of media.

  Each device gets its own editor, and its tile shows what it will do without opening it. Sounds and images come from a built-in library or the GM's own files, in folders and favourites.
media:
  - full | assets/oracle/ice-cave-build.webm | Screen recording: the Ice Cave scene built from empty on a phone, with the light, air conditioner, TV and sound tiles filling in one by one | // each tile carries its state, so the scene reads without opening anything | tall
:::

::: decision 03-run-the-table
title: the game master runs the table mid-sentence
subtitle: Running a session is not the same job as building one.
body:
  The live console puts the effect pads and sound mix up front, because those are what a GM reaches for mid-sentence.

  Applying a scene shows progress device by device. If the fifth stalls, the GM sees which one and can retry it.
media:
  - full | assets/oracle/live-console.webm | Screen recording: the live console applying a scene, five devices ticking green, the fourth failing and recovering on retry, then the wind pad and the sound mix | // the broken path is designed too, so a failed device never ends the scene | tall
:::

::: decision 04-describe-a-scene
title: automate the setup, keep the judgement
subtitle: AI drafts the scene from a sentence. The GM reviews it per device.
body:
  Typing a sentence should be faster than building six devices by hand.

  The result arrives as a reviewable set of per-device changes, and the app never changes the room on its own. The GM can preview, apply or undo before the lights change on a table full of people.
media:
  - full | assets/oracle/describe-it.webm | Screen recording: a sentence typed into Oracle, the drafted per-device diff, a preview in the room, then apply and undo | // automate the setup, keep the judgement | tall
:::

## research.md

We started with one question: why does an in-person table feel less immersive than it could, and what could fix that without breaking what makes it social?

We ran 27 interviews at game stores, Niterói Expo Geek 2025 and CINE RPG, a school for game masters, with players and professionals aged 18 to 26 and 30 to 45, nine of them in the older group. We checked what we heard against the Censo RPG Brasil 2023. Everyone was already at a game event or a game school, so these are committed players, not casual ones.

::: outcomes
items:
  - 980+ | responses in the Censo RPG Brasil 2023
  - 12M | Brazilian homes with smart devices, per the IBGE. Context for the market size, and wider than our audience
:::

The interviews gave us three findings.

::: media
items:
  - full | assets/oracle/c2-gap.webm | Animated map of immersive tools against physical presence, with Oracle landing in the empty corner
:::

**01. Everyone wants the in-person table.** Both age groups prefer it and treat online as a fallback. Younger players want light, sound and visuals, older players are happy with narration. Any tool had to be optional, never the center of the table.

**02. The atmosphere exists, but not in the room.** Online adds sound and image but invites distraction. In person is social, but immersion rests on the GM's voice alone. Foundry and Roll20 put a screen in the middle of the table, and the hardware that avoids that is expensive and mostly imported. Nothing affordable does both.

**03. The disappointment comes late.** A new player arrives expecting the intensity they saw online and gets a table that depends on one voice. Long, flat sessions wear on their motivation to keep playing, and Oracle is aimed at that gap.

The brief became: add atmosphere to the in-person table, cheaply, without a screen in the middle.

## design-system.md

Oracle runs on one small system. The design file has four variable collections: Primitives, Semantic with a dark and a light mode, Scale for space and radius, and Mood, one palette per scene. Type comes from three families: Fraunces for names and chapters, Inter for controls and body, Geist Mono for live numbers.

Components carry their own states, so the failed device is drawn as carefully as the working one.

::: media
items:
  - full | assets/oracle/oracle-ds-foundations.webp | The Oracle design tokens: semantic colours for surface, text, action and status, six mood palettes, the type ramp in Fraunces, Inter and Geist Mono, and the space, radius and touch scales | | natural
  - full | assets/oracle/oracle-ds-components.webp | Four components shown in every state: SceneBanner idle and live, RoomMap off, applying and live, TabBar with three active tabs, and the LiveIsland | | natural
  - full | assets/oracle/oracle-ds-annotated.webp | The live console and the partial failure screen side by side, with ten numbered notes on hierarchy, type roles, the single lime action and how the error state is written | | natural
:::

## testing.md

We tested twice. A game master used the prototype for a usability and navigation test. Then we ran a short play session where team members changed the room by hand, following the presets the game master had made, to stand in for what the app would do.

::: quote
text: Once you've made one scene, you know how to make all the others. After I made my first one, I could make more without any trouble.
name: Lucas Marcel Toledo
role: game master and design student
:::

The limits: one game master, one short session, and we changed the devices by hand instead of through the app. That tells us how one person used it, and it is too small to count as a usability study.

## project-info.md

I did the design and the prototype: 60 screens across 8 flows in Figma, the design system behind them, and the prototype we tested. Built with Figma and Claude Code.

The field research, the idea and the documentation were shared across the team, and the findings in research.md are theirs as much as mine.
