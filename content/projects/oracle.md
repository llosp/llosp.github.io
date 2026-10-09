---
slug: oracle
order: 1
title: oracle
type: product design, ux/ui
role: ux/ui, product design, design system
status: in design
timeline: 2026
team: solo
built_with: figma, claude code
outcome: [todo: one line on what the redesign proved]
summary: Oracle is a phone app for tabletop RPG game masters that turns the room into part of the table.
cover: assets/oracle/cover.webp
cover_fit: contain
cover_alt: Three Oracle screens: a session's scene list, the Ice Cave scene editor and the live console
cover_caption: // three states of one session: picking a scene, building it device by device, and running it live
---

## README.md

Oracle is a phone app for tabletop RPG game masters. The GM builds scenes out of smart home states and sounds, so an ice cave sets the air conditioner to 18°C, closes the blinds, drops the lights to a flickering blue, puts a frozen cavern on the TV and starts a howling wind, all with one tap.

I redesigned it from a version that had drifted into a music player. I rebuilt the scene editor to work device by device, added a live console for actually running a session, gave the app a way to put the house back when the session ends, and drew the design system it is built on.

[todo: third line. what came out of it. if you have not tested it with a real GM yet, say that instead of reaching for a number.]

## problem.md

The version I started from had drifted into a music player. Sound had taken over the interface, and the smart home side of the product, which is the part that actually makes the room change, had been reduced to an afterthought.

That shaped three constraints:

- A scene is not one setting, it is five or six devices that each need their own controls. A colour wheel and a flicker effect are not the same kind of input as a target temperature.
- Smart home calls fail in the middle. A scene can apply to four devices and stall on the fifth, and the GM is mid-sentence when it happens.
- The app controls the lights and the air conditioner in a room with people in it, so flashing and temperature need hard limits rather than trust.

[todo: the part only you know. who you talked to, what you watched a GM actually struggle with at the table, or that this is a self-directed concept with no user research behind it yet. say which, plainly.]

## decisions/

::: decision 01-device-by-device
title: edit the scene device by device, not as one preset
body:
  The scene editor lists the devices a scene touches and gives each one its own editor, because the inputs are not interchangeable. The light editor is a colour wheel plus an effect like flicker. The air conditioner editor is a target temperature and a fan speed. The TV is a piece of media and a display mode.

  Adding a device is a separate sheet rather than a hidden menu, so the number of devices a scene drives stays visible while you build it.
before_alt: the old scene-wide editor it replaced
before_caption: // [todo: export a frame of the version this replaced, even a rough one. the before is what makes the decision legible]
after: assets/oracle/scene-editor.webp
after_alt: The scene editor with its device tiles, the add-device sheet, the light editor with colour wheel and flicker effect, and the AC editor set to 18°C
after_caption: // every device carries its own state on the tile, so the scene is readable without opening anything
:::

::: decision 02-live-console
title: a separate console for running the game, not the same screen you build on
body:
  Building a scene and running a session are different jobs with different pressures, so they are different screens. The live console puts the sound mix and the one-shot effect pads up front, because the GM reaches for those while they are mid-sentence and cannot go hunting through an editor.

  Applying a scene shows progress device by device rather than as a single spinner, so a partial failure names the device that stalled and offers a retry instead of leaving the GM guessing which part of the room did not change.
before_alt: the previous run-time screen, where sound controls had taken over
before_caption: // [todo: caption once you have the before frame]
after: assets/oracle/live-session.webp
after_alt: Running a session: the live console, a scene applying device by device, a partial failure with a retry, and ending the session by restoring the home
after_caption: // the same screen handles the good path and the broken one, so a failed device never becomes a dead end
:::

::: decision 03-put-the-house-back
title: ending a session restores the home
body:
  A session leaves the house in a state nobody wants to sleep in. Ending the session is an explicit action that puts the devices back rather than something the GM has to undo by hand, device by device, at midnight.
before_alt: the old end-of-session flow, if there was one
before_caption: // [todo: caption once you have the before frame]
after: assets/oracle/home-devices.webp
after_alt: Smart home setup: devices grouped by room, scanning for new devices, linked integrations and the safety and comfort limits
after_caption: // safety and comfort limits live in setup, so the ceiling on flashing and temperature is set once rather than negotiated per scene
:::

::: decision 04-the-library-stays-local
title: the library stays on the device
body:
  Sounds live in folders on the phone, as the GM's own files, with a few official packs alongside them. [todo: why local rather than a cloud library. licensing, offline play at a table with bad wifi, or something else. this is the kind of constraint studios read closely, so it is worth a sentence.]
before_alt: the old library, organised as a music player playlist
before_caption: // [todo: caption once you have the before frame]
after: assets/oracle/library.webp
after_alt: The local library of sounds in folders, a folder after an upload, the official packs list and a pack with its scene templates
after_caption: // folders rather than playlists, because a GM files sounds by scene and not by artist
:::

::: decision 05-describe-a-scene
title: describe a scene in words and review it per device before it applies
body:
  Building a six-device scene by hand is slow, and the GM is often doing it between sessions with the next encounter already in their head. Describing it in a sentence is faster.

  The part that matters is what happens next. The result arrives as a reviewable set of per-device changes rather than something the app silently does to the room, so the GM sees exactly which devices are about to move and can preview, apply or undo before the lights change on a table full of people.
:::

::: ai-exchange
prompt: an ice cave. freezing, blue, water dripping somewhere far off
agent: oracle
output: built "ice cave" across 5 devices. review before applying.
diff:
- ac.living          cool 22°c, auto fan
+ ac.living          cool 18°c, high fan
- lights.ceiling     warm white 2700k
+ lights.ceiling     ice blue 40%, flicker
- blinds.living      open
+ blinds.living      closed
+ tv.living          "frozen cavern", full screen
+ mix.ambience       howling wind, loop, 60%
actions: preview, apply, undo
note: [todo: say whether this is built, prototyped in figma, or a proposed direction. be explicit. a studio will ask.]
:::

## outcome.md

[todo: results. if there are none yet because it is still in design, write that sentence instead of leaving this empty. "not yet tested with GMs" is a real answer and reads better than a gap.]

[todo: if you ran any kind of check at all, even showing it to one GM friend, that is worth more here than nothing.]

## next.md

[todo: what you would change. two or three things. the honest ones, including anything you think is still wrong with it.]
