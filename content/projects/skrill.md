---
slug: skrill
order: 3
title: skrill
type: web app, full stack
role: product design, ui, full stack development
status: ongoing
timeline: june 2026 to now
team: solo
built_with: html, css, javascript, supabase, figma, claude code
outcome: 13 seasons in four months, with the group it was built for.
summary: A weekly game that gets a small group of creative friends to make things nobody is making them make.
eyebrow: personal project · product design and development
headline: A weekly game that gets a group of friends to actually do the creative work nobody is asking them for.
live: /skrill/demo
live_label: play
live_text: lope.design/skrill
cover: assets/skrill/skrill-cover.webm
cover_alt: Looping motion piece: the Skrill title screen window closes, then the app plays a declared goal and a Skrill Time reveal, before dissolving back to the start
cover_caption: // the whole thing is dressed as a desktop app from about 1996, which is the joke and also the reason people open it
---

## overview.md

::: statement
text: Nobody asks you to practice, so you don't.
:::

Skrill is a weekly game for people who want to make things they are not paid to make. Each season you declare what you will do and how hard it is. You deliver proof. Everything stays blurred until a short call where the group reveals it together and hands each other points.

I designed the rules, the points economy, the interface and the mascot, and built the whole stack myself. It has run since June 2026 with the five of us it was built for.

::: gallery
items:
- assets/skrill/skrill-vid.webp | wide | A walkthrough of the Skrill app | // [todo: write this caption]
- assets/skrill/mockup.webp | landscape | Skrill shown as a desktop app mockup | // [todo: write this caption]
- assets/skrill/add-goal.webp | wide | The screen for declaring a weekly goal with a difficulty | // declaring a goal and its difficulty is one screen, because the difficulty is the price and you should set it before you know how the week goes
- assets/skrill/leader-board.webp | wide | The Skrill leaderboard with a podium and rankings | // [todo: write this caption]
:::

## why.md

I make games with an artist friend. Our paid work comes with deadlines. Practice does not: drawing for fun, writing a track, learning a new tool. No client wants it, so it loses to everything that does have a client.

We already met every week to show what we had made, but we had no way to count it. A goal that lives in your head is easy to drop, and a vague intention with no date is the easiest of all. About half of us have ADHD, me included, and for us a vague plan with a distant payoff is the easiest thing in the world to drop. I needed something with a short loop, other people in it and a reason to show up on a specific day. Skrill is that, and it changed how much I make.

What the research I found agrees on is simple. Writing down what you will do, and by when, makes you more likely to do it: a meta-analysis of 94 tests found a medium to large effect for this kind of plan (Gollwitzer and Sheeran, 2006). Telling someone makes it stronger. In a study at Dominican University, people who wrote their goals and sent a friend weekly updates completed 76% of them, against 43% for people who only thought about them. That study was small and self-reported, so I treat it as a direction, not a law.

The tools for this were all wrong. Notion boards and ClickUp lists feel like work, and this was the opposite of work. The brief became a system with a deadline, a bit of rivalry and a reason to show up, that felt like play and not like a spreadsheet.

## how-it-works/

Four decisions carry most of the design.

::: decision 01-declare-in-public-deliver-in-secret
title: everyone sees you delivered, nobody sees what
subtitle: The reveal is the reason the meeting exists.
body:
  You declare a goal with what and by when, which is the cheapest nudge there is. When you deliver, the proof appears in everyone's feed, but blurred until the weekly call. You can see that your friends are working. You cannot see what they made.

  That gives the group pressure without spoilers, and it turns a status check into a ritual. The call, called Skrill Time, is 15 minutes at most: everyone marks ready, the blur drops, you react and the points are handed out.
media:
  - compare | assets/skrill/feed-blurred.webp ; assets/skrill/feed-revealed.webp | The delivery feed with every image blurred ; the same feed after the reveal | before the reveal ; after the reveal
:::

::: decision 02-difficulty-is-the-price
title: you set the difficulty before you know how the week goes
subtitle: Simple goals pay 2 points, complex ones pay 5.
body:
  Choosing the difficulty is part of declaring the goal, on the same screen. That is on purpose. If you could pick afterwards, everyone would call everything hard. Setting it up front makes you price your own ambition, and makes a failed complex goal cost something.

  An extra tier pays no base points at all and scores only through the group, for things you do just because. Some seasons a bounty appears, a prompt for something to make, such as a sci-fi piece, a sticker for the group or a classic painting in your own style. The chance of one rises every season it does not show up, so they stay a surprise. If a friend takes it, you want to as well, because you do not want them to take all the points.
media:
  - full | assets/skrill/declare-goal-difficulty.webm | Screen recording: declaring a goal, choosing simple or complex, and the points shown on each | // [todo: write this caption]
:::

::: decision 03-points-from-your-friends
title: part of your score is given to you by the group
subtitle: Every person gets a small pool of bonus points to hand out.
body:
  The base points are fixed, so the interesting part is the bonus. Each person receives a pool of half the number of players, rounded down, and must spend all of it on other people's work, anonymously. You can score yourself, but you are spending from the same pool.

  This stops the leaderboard from being just a count of tasks. It rewards the work the group actually thought was good, and it keeps the reveal alive, because nobody knows who got what until the end.
media:
  - full | assets/skrill/peer-bonus-rating.webm | Screen recording: a bonus pool being split between four deliveries, with the pool counter running down to zero | // [todo: write this caption]
:::

::: decision 04-deliberately-unserious
title: it looks like a desktop app from 1996
subtitle: The friendliness is the product.
body:
  The pixel fonts, the Windows 95 windows and the mascot are not decoration. They are what keeps this from feeling like work. The mascot walks along the bottom of every page and can be thrown around with a click.

  You cannot upload a profile photo. You have to draw one, in a small black and white pixel canvas. It is a limited, slightly clumsy tool, and that is the point.
media:
  - full | assets/skrill/draw-your-avatar.webm | Screen recording: drawing a profile picture in the pixel canvas, then the avatar appearing on the leaderboard podium | // [todo: write this caption]
:::

## outcome.md

::: outcomes
items:
  - 13 | seasons revealed since june 2026, with the same five people
  - 119 | goals declared across them
  - 85% | delivered, 101 of 119
:::

The system has held up for the people it was built for. The weekly call used to be a chat with nothing to count. Now it is a reveal of what each person made, with points on it. I make more than I did before it existed.

::: quote
text: [todo: one line from a member of the group about what Skrill changed]
name: [todo: who said it]
role: [todo: what they do]
:::

## project-info.md

::: credits
items:
  - Pedro Lopes | product design, ui, full stack development, mascot
:::
