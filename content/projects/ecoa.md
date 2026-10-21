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

I'm design lead on two AI-driven internal tools built at Ecoa Institute for Petrobras, one after the other: a compliance assistant, then a knowledge platform. Each one had its own team, its own research and its own pitch, not a shared track split in two.

I worked across both from research through delivery: user interviews, the product and journey design, the interface, and the pitch that got each one approved. I also contributed some front-end implementation.

An NDA covers the internal detail of both products, including the interface itself. What follows is what each one does, why it exists, and what happened when it got pitched.

## compliance-assistant/

::: meta
timeline: 26 mar – 2 jul 2026
pitch_outcome: accepted, pre-approved for build-out
:::

No interface shown here. The NDA covers the actual screens; the diagram and toolbox below are what can be shared about the reasoning behind them.

::: media
items:
- diagram | assets/ecoa/compliance-assistant-flow.svg | Diagram: a partner's repeated question moves through retrieval limited to a knowledge base reviewed by subject-matter experts, to an answer with its exact source passage attached, which is then checked against the manual itself
:::

::: toolbox
items:
- the ask | partners, repeating the same question about a public anp accounting manual
- the fix | every answer cites its source passage, so it can be checked, not just trusted
- the guardrail | answers only come from a knowledge base reviewed by subject-matter experts
- the proof | every answer traceable to the manual itself
:::

## knowledge-platform/

::: meta
timeline: 6 jul – 20 oct 2026
pitch_outcome: accepted, pre-approved for build-out
:::

Same limit here: no interface shown, the NDA covers the screens. The diagram and toolbox below are what can be shared about the reasoning.

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

Petrobras had no obligation to take either product past a pitch. Each one got its own, built and tested like anything else shipped here: the compliance assistant's case first, the knowledge platform's a few months later.

Both were accepted. For two products with different teams, different research and different timelines, that's a meaningful signal that both problems were real.

[todo: adoption numbers, rollout timeline, or a cleared stakeholder line, once available]

## learnings.md

Treating these as two separate tracks instead of one shared narrative made the actual difference between them clearer. They shared a company, not a problem.

Working on the knowledge platform pulled me into decisions about how data gets matched across systems that had never agreed on what counted as the same record. That's further into the stack than interface design usually reaches, and it's where a surprising amount of the real design work ended up living.

Designing an AI tool for a regulated environment turned out to be mostly about earning trust in a specific, checkable answer.

::: credits
items:
  - lope (me) | user research, product and journey design, interface design, pitch design and delivery, plus some front-end implementation
  - engineer | backend and retrieval implementation
  - product-ops lead | scheduled meetings, handled reports and forms and the rest of the administrative load, kept deadlines organized and planned
:::
