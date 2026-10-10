---
slug: oracle
order: 1
title: oracle
type: product design, ux research
role: ux research, ux/ui, product design, design system
status: prototype, tested once
timeline: 2025 to 2026
team: group project
built_with: figma, claude code
outcome: Field research to a tested prototype.
cover_ratio: 1 / 1
summary: Oracle is a phone app that lets a tabletop RPG game master change the room with a tap, built from field research.
eyebrow: ux research and product design · 2025 to 2026
cover: assets/oracle/oracle-cover.webm
cover_alt: the Oracle wordmark and a phone showing the live console for a scene called Ice Cave, with the tagline "One tap, whole room."
---

## overview.md

::: statement
text: Game masters could have friends in a room, or atmosphere on a screen. Not both.
:::

Players prefer to play in person, but the tools that add atmosphere are built for screens, and screens pull people out of the room.

Oracle is a phone app that lets the game master control the room itself. One tap sets the lights, air conditioner, blinds, TV and sound, using smart devices people already own.

::: media
items:
  - compare | ; | ; | the old way ; the oracle way
:::

[todo: COMPARE PAIR. Left: a flat, silent table with a paper map and a phone playing a playlist, the GM juggling five apps and tabs. Right: the same table with Oracle, one panel, the room already changed. Same angle, same people. Animate the left as a cluttered 5-app switch, the right as one tap]

## research.md

We went where RPG happens: a game store (Falha Crítica), Niterói Expo Geek 2025 and CINE RPG, a school for game masters. We interviewed players and professionals aged 18 to 26 and 30 to 45, and compared it with the Censo RPG Brasil 2023.

::: outcomes
items:
  - 980+ | responses in the Censo RPG Brasil 2023
  - 12M | Brazilian homes with smart devices, per the IBGE
:::

::: media
items:
  - full | assets/oracle/c1-interviews.webm | Animated chart: in person and online, one pair per age group, both preferring in person
:::

Both age groups prefer in person and treat online as a fallback. They disagree on what makes a table feel alive.

- Younger players want light, sound and visuals.
- Older players are happy with narration and imagination.

::: media
items:
  - full | assets/oracle/c2-gap.webm | Animated map of immersive tools against physical presence, with Oracle landing in the empty corner
:::

Online adds sound and image but invites distraction. In person is social and focused, but immersion rests on the GM's voice alone. Nothing affordable does both.

::: media
items:
  - full | assets/oracle/c3-journey.webm | Animated user journey of a new player, from discovery to the frustration where Oracle steps in
:::

The frustration comes late. A new player arrives expecting the intensity they saw online, and the table they get depends on one voice. That gap is where Oracle sits.

## takeaways/

What the research taught us, and what we built because of it.

::: decision 01-use-what-is-already-in-the-room
title: the room is already a stage
subtitle: Price was the barrier, so Oracle uses what people already own.
body:
  Players found tabletop products good but too expensive, so we made nothing to buy. Oracle pairs with the lights, air conditioner, blinds and TV already in the home, grouped by room.

  Safety and comfort limits live in the same setup, so the ceiling on flashing and temperature is set once, not mid-scene.
:::

::: decision 02-device-by-device
title: a scene is a set of devices, not one setting
subtitle: Each device has its own editor and shows its own state.
body:
  A scene is five or six devices, and they do not take the same input. A light needs a colour and an effect, an air conditioner a temperature, a TV a piece of media.

  Each device gets its own editor, and its tile shows what it will do without opening it. Sounds and images come from a built-in library or the GM's own files, in folders and favourites.
media:
  - full | | [todo: SCREEN RECORDING 12s. Build Ice Cave from nothing. Add light, set ice blue and flicker, add AC, set 18C, add TV, pick a frozen cavern from the library, add a wind sound. The scene tiles fill in one by one] | // each tile carries its state, so the scene reads without opening anything
:::

::: decision 03-run-the-table
title: the game master runs the table mid-sentence
subtitle: Running a session is not the same job as building one.
body:
  The live console puts the effect pads and sound mix up front, because those are what a GM reaches for mid-sentence.

  Applying a scene shows progress device by device. If the fifth stalls, the GM sees which one and can retry it.
media:
  - full | | [todo: SCREEN RECORDING 10s. Live console, a scene applies, five devices tick green in turn, the fourth turns red with a retry, a tap, it turns green. Then a wind sound pad and a thunder one-shot, with the sound mix levels moving] | // the broken path is designed too, so a failed device never ends the scene
:::

::: decision 04-describe-a-scene
title: automate the setup, keep the judgement
subtitle: AI drafts the scene from a sentence. The GM reviews it per device.
body:
  Typing a sentence is faster than building six devices by hand.

  The result arrives as a reviewable set of per-device changes, not something the app does to the room on its own. The GM can preview, apply or undo before the lights change on a table full of people.
media:
  - full | | [todo: SCREEN RECORDING 12s. Type an ice cave. freezing, blue, water dripping somewhere far off. The agent answers, a per-device diff appears, red lines out and green lines in. Preview runs the scene for two seconds in the room cutaway, then Apply. Undo returns it] | // automate the setup, keep the judgement
:::

## project-info.md

::: credits
items:
  - Pedro Lopes | ux research, ux/ui, product design, design system
:::
