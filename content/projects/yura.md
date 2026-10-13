---
slug: yura
order: 4
title: yura
type: web design, branding
role: branding, web design, front-end development, guitar build
status: concept
timeline: 2024 to 2026
team: solo
built_with: html, css, javascript, figma, claude code, spray paint, vinyl, a soldering iron
outcome: A storefront built to sell one guitar I made by hand, cart, checkout and all.
summary: The storefront built to sell one guitar I made by hand, with a working cart, checkout and accounts, not a landing page.
live: /yura
live_label: visit
live_text: lope.design/yura
eyebrow: web design, branding and front-end development · 2024 to 2026
headline: A single-product storefront, built to sell a guitar I made by hand.
---

## overview.md

HAKKOTAI is a guitar. One unit, hand-painted and rewired for a design course in 2024. There is no second one to sell, which means there is no stock to point to and no catalogue to disappear into if a buyer does not believe what they are looking at.

This case study is the storefront built to sell it. Not a page with a buy button bolted on, but a store: a cart and checkout that actually complete a purchase, and the accounts, search and legal pages a buyer expects to exist before they trust a stranger with a card number.

## why.md

The guitar came out of a design course assignment at PUC-Rio in 2024: pick a song, write a manifesto about it, and build an object that carries it. I picked HAKKOTAI by Yura Yura Teikoku, and the idea that survived the manifesto was simple: strip everything away and what remains should glow.

Once the course ended, the guitar needed a way to be sold, and that is where the real design problem started. A one-off object has no catalogue to hide inside and no other buyers to vouch for it. A landing page can only ask someone to admire it. Selling it means building the parts a landing page skips: a product page that proves its claim instead of stating it, a cart and checkout that complete a purchase, and the accounts, regions and search a buyer expects from a real store before they trust it with a card number.

## decisions/

::: decision 01-the-layout-steps-back
title: the layout steps back so the guitar does the selling
subtitle: A store that competes with its own product for attention loses the sale.
body:
  The old page tried to be as loud as the guitar and ended up competing with it. The new one steps back: a slim glass bar stays pinned and shows where the buyer is, the headline is set tight and large, and each section makes one point about the guitar and then gets out of the way for the next.

  The design section lays out what is actually for sale: pink-not-red vinyl, the neck, the humbuckers, the tuners, a player shot. The name gets its own section too, broken into the three kanji it is built from, because a buyer paying this much attention to a guitar's wiring will read its name as well.
media:
  - full | | the product page hero, HAKKOTAI in large type over the guitar
  - full | | the name section: the three kanji with their meanings
  - full | | the design section as a bento grid of photo and text tiles
:::

::: decision 02-the-cart-and-checkout-work
title: the cart and checkout have to complete the sale
subtitle: There is one guitar for sale. If the cart drops it, there is no sale left to recover.
body:
  Adding the guitar to the bag opens a real drawer: quantity, a running subtotal, a link straight to checkout. That state is written to localStorage, so it survives a reload or a closed tab, the way an actual store's cart has to.

  Checkout is a shipping form and a payment form, both with real validation, feeding a summary that recalculates as the buyer fills it in. Finishing an order clears the cart, generates an order number, and lands on a confirmation screen instead of going quiet, because a store that stops responding after "submit" is not one anyone trusts with a second purchase.
media:
  - full | | the cart drawer open with the HAKKOTAI added, quantity and subtotal shown
  - full | | the checkout page with shipping and payment filled in and a live order summary
  - full | | the order confirmation screen after a successful checkout, with an order number
:::

::: decision 03-accounts-regions-and-search
title: accounts, regions and search make it a store, not a demo
subtitle: The parts a brand concept usually skips are the parts a buyer checks before trusting it with a card.
body:
  A sign-in modal and a create-account modal sit behind the same icon, switching tabs instead of navigating away. A region modal swaps the storefront between six currencies. A search overlay filters the one-item catalogue live as the buyer types, because a real store's search has to work even when there is barely anything to find.

  None of this changes what is for sale. It changes whether a buyer reads the site as software or as a mockup of software, and that read decides whether they trust the next page enough to put a card number into it.
media:
  - compare | | the account modal on its sign-in tab ; the same modal on its create-account tab | sign in ; create account
  - compare | | the region modal swapping the store between six currencies ; the search overlay filtering the catalogue live as you type | region ; search
:::

::: decision 04-the-build-is-the-only-proof
title: the build is the only proof a one-off object has
subtitle: There is no factory and no reviews to borrow trust from. The work itself has to be the evidence.
body:
  A mass-produced guitar sells on a spec sheet and other people's reviews. A hand-painted one-off has neither, so the storefront walks through the build instead, in the same order it actually happened: stripped electronics, sanding, pink paint, vinyl art.

  A couple of steps did not go as planned. Some vinyl had weak adhesive and lifted, and a thicker sheet tore in the cutting machine. A spec sheet would hide that. Proof of a handmade object does not get to.
media:
  - full | | the body with its original electronics stripped out
  - full | | the body sanded down to bare wood
  - full | | the body in pink paint
  - full | | vinyl art applied to the body
:::

## learnings.md

The pages that took the longest were not the hero or the glow scene. They were the boring ones: the cart logic, the checkout validation and the legal pages had to work and read like a real store, not a mockup, or no buyer would trust the page past the homepage.

Cart and account state live in localStorage and have to survive a reload without duplicating a line item or losing the selected currency. Getting that boring reliability right took more iterations than any single visual decision on the site.

The physical build is the smaller half of the project. Painting, finishing and soldering the electronics back in were all new skills, learned mostly by redoing steps that went wrong the first time.

Given another pass, the next test is a second product. Right now the storefront only has to sell a catalogue of one, and adding a second item would be the real test of whether the selling logic generalizes or was only ever built to fit this one guitar.

## project-info.md
