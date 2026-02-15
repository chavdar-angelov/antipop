# Concept

## What is Antipop?

  <!-- One-paragraph elevator pitch. What does the platform do and who is it for? -->

Antipop is a marketplace type platform for independant (clothing) brand owners.
A brand owner can create a brand profile, list all the products and sell them to online customers.
Influencers can take pictures with the listed clothes and tag them in their personal Antipop profiles.

## Target Users

  <!-- Who are the primary users? (e.g., independent streetwear brands, vintage resellers, end consumers) -->

Independant clothing brands, influencers, end customers

## Core User Flows

  <!-- Describe the key journeys, e.g.: -->
  <!-- 1. Seller onboarding: how does a seller sign up, create a brand, and list products? -->

1. Sign-up
2. Changes role from a customer to a brand owner
3. Fills the brand information
4. Start adding products

I'll will elaborate more on that later.

  <!-- 2. Buyer browsing: how does a customer discover and browse products? -->

1. Opens the site
2. Scroling through random images of products
3. Clicks a product to see details

I'll will elaborate more on that later.

  <!-- 3. Purchase: cart → checkout → payment → confirmation -->

Currently there won't be any payment option in the platform, only orders.
The payment process will be covered by the brand owner, probably cach on delivery.

  <!-- 4. Order fulfillment: who ships? how does the seller get notified? -->

All the processes after the order completion will be managed by the brand owner.
There will be statuses that will be marked like "purchased", "order processed", "order fulfilled" etc.

## Product Model

  <!-- What kinds of products are sold? (physical, digital, both?) -->

Only physical products

  <!-- What variants matter? (size, color, material?) -->

Currently only size and color

  <!-- How is pricing handled? (per-variant, currency, discounts?) -->

It's per variant only now. The currency is EUR.

  <!-- How is inventory tracked? -->

The brand owner/moderator can either add the number of items per variant or bypass it as untracked

## Authentication & Authorization

  <!-- How do users sign up / log in? (email+password, OAuth, magic link?) -->

Just email & password for now

  <!-- How are roles assigned? (self-service, invite-only, admin-granted?) -->

The default role is "customer". The customers can change the role to brand owner.
There will be brand moderators that can only be invited by email.
The super-admins will be set on the database lever for now.

  <!-- Can one user have multiple roles? -->

I think yes but will see. For example, a person might be a customer and brand moderator but functionally maybe there should be a profile switcher.

## Payments

  <!-- Which payment provider(s)? (Stripe, etc.) -->
  <!-- Who receives the money — platform or sellers directly? (marketplace split?) -->
  <!-- Any plans for subscriptions or seller fees? -->

No payments for now

## Tech Preferences & Constraints

  <!-- Database choice? (MongoDB, Firestore, Postgres with JSON, etc.) -->

I was thinking about MongoDB or SurrealDB but you might have an opinion on that so feel free to suggest

  <!-- Hosting target? (self-hosted, Vercel, Railway, etc.) -->

I'll chose later.

  <!-- Any external services already decided? (email, file storage, search) -->

Probably AWS S3 for files storage or Bunny CDN but not sure yet.

  <!-- Any UI library or component kit preference? (Skeleton, shadcn-svelte, custom?) -->

Custom for now.

## Design Direction

  <!-- Any visual references, mood boards, or existing designs? -->
  <!-- Brand tone: minimal, bold, playful, luxury? -->
  <!-- Mobile-first? -->

There is a design already. It will be implemented later.

## Approach

If not too complicated, I'd like this to be build using DDD, event sourcing and CQRS or similar alternative

## Out of Scope (for now)

  <!-- What are you explicitly NOT building in the MVP? -->

No payments!
