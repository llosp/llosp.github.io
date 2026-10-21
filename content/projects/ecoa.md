---
slug: ecoa
order: 6
title: ecoa × petrobras
type: product design, ux research
role: ux research, product and journey design, interface design, pitch design and delivery, some front-end implementation
status: ongoing
timeline: 2026
team: two separate cross-functional trios, one per product: an engineer, a product-ops lead, and me as design lead
built_with: figma, user research, llm-based retrieval, html, css, javascript
outcome: Two AI-driven internal tools, built back to back for Petrobras, both accepted and pre-approved for full build-out.
summary: Design lead on two AI-driven internal tools built at Ecoa Institute for Petrobras, each with its own team, its own research and its own case to pitch.
cover: assets/ecoa/ecoa-cover.webm
nav_image: assets/ecoa/ecoa-nav.webp
cover_alt: Looping motion piece: on white, the Ecoa mark appears and its wordmark slides out beside it, the Petrobras logo and wordmark take their place, then both brands reduce to just their marks and a teal and green cross is drawn between them
---

## README.md

I'm design lead on two AI-driven internal tools built at Ecoa Institute for Petrobras, one after the other: a compliance assistant, then a knowledge platform. Each one had its own team, its own research and its own pitch.

I worked across both from research through delivery: user interviews, the product and journey design, the interface, and the pitch that got each one approved. I also contributed some front-end implementation.

An NDA covers the internal detail of both products, including the screens. The two sections below show the flow and the reasoning instead of the interface.

## compliance-assistant/

::: meta
timeline: 26 mar to 2 jul 2026
pitch_outcome: accepted, pre-approved for build-out
:::

::: media
items:
- diagram | assets/ecoa/compliance-assistant-flow.svg | Diagram: a partner's repeated question moves through retrieval limited to a knowledge base reviewed by subject-matter experts, to an answer with its exact source passage attached, which is then checked against the manual itself
:::

::: toolbox
items:
- the ask | partners, repeating the same question about a public anp accounting manual
- the fix | every answer cites its source passage, so a partner can check it against the manual
- the guardrail | answers only come from a knowledge base reviewed by subject-matter experts
- the proof | every answer traceable to the manual itself
:::

::: quote
text: The best demo presentation of the day. A simple solution that could bring a lot of value.
name: Julio Leite
role: general manager, strategic rd&i management at petrobras
:::

## knowledge-platform/

::: meta
timeline: 6 jul to 20 oct 2026
pitch_outcome: accepted, pre-approved for build-out
:::

::: media
items:
- diagram | assets/ecoa/knowledge-platform-flow.svg | Diagram: a legacy system is retired, its data is aligned to FAIR principles before any interface is built on top of it, and one question can then pull from every system, from every year that ever touched the record
:::

::: toolbox
items:
- the ask | knowledge stranded every time a legacy system gets retired
- the fix | align the data to FAIR principles before building any interface on top of it
- the payoff | one question now pulls from every system, from every year, that ever touched it
- the standard | fair-aligned: findable, accessible, interoperable, reusable
:::

## outcome.md

Petrobras had no obligation to take either product past a pitch. Each one was pitched on its own case, built and tested like anything else shipped here: the compliance assistant first, the knowledge platform a few months later.

Both were accepted and pre-approved for build-out. Neither is in use yet, so there are no adoption numbers to report.

## learnings.md

I kept these as two separate projects instead of one engagement split in two, which made the difference between them clearer. They shared a company; the problems they solved had nothing in common.

Working on the knowledge platform pulled me into decisions about how data gets matched across systems that had never agreed on what counted as the same record. That's further into the stack than interface design usually reaches, and a lot of the design work ended up there.

In a regulated environment, most of the design effort went into making every answer checkable against its source.

::: credits
items:
  - lope (me) | user research, product and journey design, interface design, pitch design and delivery, plus some front-end implementation
  - engineer | backend and retrieval implementation
  - product-ops lead | scheduled meetings, handled reports and forms and the rest of the administrative load, kept deadlines organized and planned
:::
