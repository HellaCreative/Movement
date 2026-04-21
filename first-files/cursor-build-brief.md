# Movement — Cursor Build Brief
*Version 1.0 — April 2026 | Rick Smith*

---

## What You're Building

An artist relationship platform for independent musicians. Not a streaming service. Not a ticketing tool. Not a social network.

**The problem it solves:**
Live music creates high-intensity, low-continuity connection. The show ends and the relationship disappears. Movement closes that gap.

**The positioning line:**
> Not a platform. A scene.

**The one thing to never forget:**
Spotify owns the audience. Ticketmaster owns the venues. Movement lets the artist own both the relationship and the room. That is the entire product argument.

---

## Core Concepts (Read This Before Building Anything)

### The Four Destinations
Everything lives under four named sections. Functional, not editorial.

| Destination | What it is |
|---|---|
| **The Stage** | Homepage. Discovery. Artist pulse. Shows near you. |
| **The Vault** | Paid subscription content. The backstage pass that never expires. |
| **The Collective** | Artist-backed labels. Band supports band. All ships rise. |
| **The Fund** | Hype Coins economy. Fan energy converts to real revenue. |

### The Two Fan Tiers
**Follow (free)** — artist profile visible, public posts, clips, merch, tickets, show listings. This is the marketing surface. No barrier to entry.

**Subscribe (paid)** — The Vault unlocks. Live sessions, writing sessions, unreleased demos, early access, subscriber-only chat. Artist sets their own price. Platform sets nothing.

### The Three Artist Tiers
Driven entirely by audience behavior. Zero platform curation.

- **Up & coming** — new, claim count growing, short time on platform
- **Ready to break** — claim velocity accelerating, momentum building
- **Established** — high claim count sustained over time

### The Claim Mechanic
One claim per fan per artist. Finite, intentional, public. Not a like. Not a follow. A declaration: I back this artist. Claim count is the primary signal that drives tier placement. The audience decides who rises.

### Hype Coins
Fans earn coins by sharing artist content. Each fan has a unique referral link per artist. Every click driven back to an artist page earns coins. Coins are spent to unlock subscription access. The platform converts coins to real subscription revenue at 80% to the artist. Value circulates inside the ecosystem instead of leaking out.

### The Label (inside The Collective)
Established artists can create a named Label. They invite and back emerging artists. Their name lives permanently on the backed artist's profile. Real skin in the game. The fan of the established artist discovers new artists through trust, not algorithm.

---

## Economics

- Artist: 80% of all subscription revenue
- Platform: 20%, transparent and flat
- Artist sets their own subscription price
- Merch and tickets: artist-controlled, platform facilitates
- Hype Coins convert to real revenue at 80/20 split
- No platform-level subscription fee for fans

---

## Pages to Build

### Priority order: Stage → Artist Profile → Vault → Collective → Fund → Dashboard → Onboarding

---

### PAGE 1: The Stage (Homepage)

**Purpose:** Discovery. What's happening. Who to follow.

**Sections top to bottom:**

**Nav**
- Logo (left)
- Links: The Stage · The Vault · The Collective · The Fund
- Right: Sign In (ghost button) · Join Free (orange filled)
- Sticky. Backdrop blur on scroll.

**Ticker strip**
- Full-width orange bar, black text
- Scrolling marquee: artist name / city — current activity
- Infinite loop, CSS animation

**Hero (two-column)**
- Left: eyebrow (monospace, orange) → headline "Not a platform. A scene." (condensed display, 80px, italic orange on "A scene.") → subtext → two CTAs
- Right: featured artist card (art block + artist name + genre/city + pulse activity + claim count + follow button)
- Below headline: three platform stats (artists on platform / % to artist / Hype Coins in circulation)

**Controls bar**
- Tier tabs: All · Up & coming · Ready to break · Established
- Genre chips: All genres · Indie · Punk · Folk · Metal · Hip-hop · Electronic · Country (+ more)
- Both are interactive filters. They update the artist grid below.

**Artist grid**
- 4 columns
- Each card: square art block (initials placeholder) → tier flag (top-left corner) → artist name (condensed display) → genre + city (mono, orange) → pulse line (what's actively happening, left-bordered in orange) → claim count + follow button
- Hover: translateY(-3px) + border brightens

**Shows Near Me**
- 3 columns
- Each card: date block (month + day number, large) + artist + venue + genre tag + price
- Location-aware (hardcode Halifax for prototype)
- Section header: "Shows near Halifax" + "Change location →"

**Hype Coins strip**
- Full-width, orange left border
- Left: eyebrow "The Fund — Hype Coins" → headline → body explaining earn/spend mechanic
- Right: coin balance block (for logged-in users, show 240 coins for prototype)

**The Collective preview**
- 3 label cards
- Each: founder avatar (initials, orange bg) + founder name + label name (mono) + roster description

---

### PAGE 2: Artist Profile Page

**Purpose:** The artist's owned space. Fans see what's free. Subscribers see everything.

**Layout:**

**Artist header**
- Full-width, dark surface
- Large condensed name (display type, 60–80px)
- Genre + city (mono, orange)
- Stats row: Followers · Subscribers · Cities played · Claims
- Action buttons: Follow (free, ghost) · Subscribe ($X/mo, filled orange) · Tip (ghost)
- Claim button: visually distinct, "Back this artist" — one per fan, toggles to claimed state

**Tab bar**
Five tabs: Live · Clips · Vault · Merch · About

**Live tab (default)**
- If streaming: embed player + subscriber chat panel
- If not streaming: schedule of upcoming sessions
- Non-subscribers see a teaser + subscribe prompt for subscriber sessions

**Clips tab**
- Grid of 15-second clips
- Each has share button that generates fan's unique referral link
- Public — no subscription needed to view

**Vault tab**
- Grid of content cards: writing sessions, demos, early access, recorded live sets
- Subscriber sees content
- Non-subscriber sees blurred card + price + subscribe CTA
- Not a wall. A window. They can see the shape of what's there.

**Merch tab**
- Show-specific drops + ongoing store
- City-stamped items visible here
- Buy button links to checkout (placeholder for prototype)

**About tab**
- Minimal. Artist-controlled.
- Short bio, social links, press contact

---

### PAGE 3: The Vault (subscriber hub)

**Purpose:** Logged-in subscriber's feed of all subscribed artist content.

**Layout:**
- Feed of new Vault content from subscribed artists
- Reverse chronological
- Content type tags: Writing Session / Live Recording / Demo / Early Access / Chat Session
- Filter bar: by artist (chips) + by content type
- Empty state (not subscribed to anyone): "Nothing in the vault yet" + CTA back to The Stage

---

### PAGE 4: The Collective

**Purpose:** Browse artist-backed labels. Discovery through trust.

**Layout:**
- Page hero: "The scene is back." + short explainer of the mechanic
- Label grid (3-column): founder avatar + label name + founding artist + roster + genre tags
- Genre filter
- Label detail page (click through): founding artist summary + full roster + founding statement + "Follow all" button

---

### PAGE 5: The Fund

**Purpose:** Explain Hype Coins. Show fan their balance. Let them earn and spend.

**Sections:**
- Explainer: what they are, how to earn (share clips, drive clicks), how to spend (subscribe to artists)
- For logged-in fans: balance display + earn history table (shares / clicks / coins earned)
- Spend flow: artist browser with "Use coins to subscribe" CTA per artist
- Platform stats: total coins in circulation, artists supported via coins

---

### PAGE 6: Artist Dashboard (auth-gated, artist role)

**Build this last.** It is driven by what the front end needs to manage.

**Panels:**
- Revenue: this month + all time, subscriber count
- Top referrers: fans driving the most clicks (Hype Coins attribution)
- Content: post to Vault, schedule live session, manage clips
- Merch: create drops, set prices
- Shows: add upcoming dates, set ticket link
- Label: (if established tier) invite artists, manage backing

---

### PAGE 7: Onboarding

**Fan flow:**
1. Email + password or social auth
2. Pick 3+ genres
3. Follow 3+ artists
4. Land on personalized Stage

**Artist flow:**
1. Email + password
2. Artist name, genre, city
3. Profile image + header
4. Set subscription price
5. Post first piece of content
6. Land on Artist Dashboard

---

## Design System Tokens

Use these as CSS custom properties throughout. Never hardcode.

```css
:root {
  --black: #0c0b0a;
  --surface: #141210;
  --surface-2: #1c1a17;
  --orange: #e05c20;
  --orange-dim: rgba(224, 92, 32, 0.12);
  --orange-mid: rgba(224, 92, 32, 0.4);
  --white: #f2ede8;
  --muted: rgba(242, 237, 232, 0.45);
  --sub: rgba(242, 237, 232, 0.22);
  --border: rgba(242, 237, 232, 0.08);
  --border-hover: rgba(242, 237, 232, 0.16);
  --ease: cubic-bezier(0.16, 1, 0.3, 1);
}
```

**Fonts (Google Fonts):**
- Display: `Barlow Condensed` — weights 600, 700, 800. Italic 700, 800.
- Body: `Barlow` — weights 300, 400, 500
- Mono/labels: `DM Mono` — weights 400, 500

**Type scale:**
- Hero headline: 80px, weight 800, uppercase, Barlow Condensed
- Section header: 13px, weight 700, uppercase, letter-spacing 0.14em
- Artist name (card): 20px, weight 800, uppercase, Barlow Condensed
- Genre/city: 9–10px, DM Mono, uppercase, color: var(--orange)
- Body copy: 14–16px, weight 300, line-height 1.65
- UI labels: 9–11px, DM Mono, uppercase, letter-spacing 0.12em
- Stat numbers: 28–36px, weight 800, Barlow Condensed, color: var(--orange)

**Spacing:**
- Base unit: 8px
- Section padding: 32px top, 40px horizontal
- Container: full width, 40px padding each side. No max-width wrapper — full bleed is intentional.
- Card internal padding: 12–14px

**Borders and surfaces:**
- All borders: `0.5px solid var(--border)` default, `var(--border-hover)` on hover
- Border radius: `2px` everywhere. Sharp, editorial. Not rounded.
- Cards: `background: var(--surface)`, `border: 0.5px solid var(--border)`
- No drop shadows. Surface separation by border only.

**Buttons:**
- Primary (filled): `background: var(--orange)`, `color: var(--white)`, `border-radius: 2px`, `padding: 7px 20px`
- Ghost: `background: none`, `border: 0.5px solid var(--border-hover)`, `color: var(--muted)`
- Hover primary: `opacity: 0.85`
- Hover ghost: `color: var(--white)`, `border-color: rgba(242,237,232,0.3)`
- Active/click: `transform: scale(0.97)`, 80ms

**Motion:**
- Default easing: `cubic-bezier(0.16, 1, 0.3, 1)`
- Hover lift (cards): `transform: translateY(-3px)`, `transition: transform 180ms var(--ease), border-color 180ms var(--ease)`
- Active (cards): `transform: translateY(-1px)`
- Never use `transition: all`
- Ticker: `animation: ticker 28s linear infinite`

---

## Anti-Patterns — Never Do These

- `border-radius: 8px` on anything (use 2px)
- `transition: all 0.3s ease` (property-specific only)
- White or light backgrounds
- Drop shadows on cards
- Purple gradients
- Cards with equal height, equal width, equal rounding — no card soup
- System fonts (San Francisco, Segoe, etc.)
- `color: #3B82F6` (Tailwind blue-500) anywhere
- Centered hero with heading + subtitle + two buttons and nothing else

---

## Tech Stack

**Frontend:** Next.js 14 (App Router)
**Styling:** Tailwind CSS + CSS custom properties for design tokens
**Auth:** NextAuth or Clerk (TBD)
**Database:** Supabase (Postgres + auth + realtime)
**Payments:** Stripe Connect (artist payouts, fan subscriptions)
**Video/streaming:** Mux (V2 — not in prototype scope)
**Video embeds (prototype):** YouTube unlisted or Vimeo
**Deployment:** Vercel
**Image hosting:** Cloudinary or Supabase Storage

---

## Prototype Scope (What to Actually Build First)

The prototype proves the experience, not the logic. Build the shell. Fake the gates.

**In scope for prototype:**
- The Stage (homepage) — fully interactive filters, working ticker, real artist cards
- One Artist Profile page — all five tabs, Vault content blurred for non-subscriber
- The Collective page — label grid
- The Fund page — Hype Coins explainer + coin balance UI
- Nav + footer consistent across all pages
- Responsive: desktop primary (1280px), tablet passable (768px)

**Out of scope for prototype:**
- Real auth
- Real payment processing (Stripe not wired)
- Real video streaming
- Real Hype Coins tracking
- Artist Dashboard
- Onboarding flows

**Placeholder strategy:**
- Artist art: colored surfaces with large initials in display type
- Content in Vault: blurred placeholder cards
- Coin balance: hardcoded to 240
- Location: hardcoded to Halifax
- Stats: hardcoded platform numbers

---

## Band as One — Brand voice

Direct, human, music-first. Speaks like an artist who's been burned by the industry, not a platform that's trying to sound cool. Short sentences. Present tense. Never corporate, never algorithmic, never passive. The platform is invisible — the artist and the fan are the story.

**In practice:**

- "Own your stage." not "Empower your music career."
- "Your fans. Your terms." not "Monetize your audience."
- "The show ends. The connection doesn't." not "Maintain engagement post-event."
- "Not a platform. A scene." not "A comprehensive music ecosystem."

**What it never says:** leverage, monetize, ecosystem, content creators, engagement, optimize, seamless, robust, innovative, solution.

Cursor uses this voice every time it writes placeholder copy, button labels, empty states, or any UI text.

---

## Cursor Instructions

When you open this project in Cursor, treat this document as the source of truth. Any time you're about to make a design or UX decision not covered here, stop and ask.

Specific rules for Cursor:

1. **Design tokens first.** Create `styles/tokens.css` with all CSS custom properties before writing a single component. Never hardcode a color, never hardcode a radius.

2. **Fonts before layout.** Import Barlow Condensed, Barlow, and DM Mono via Google Fonts at the top of the global stylesheet. Confirm they're loading before building any component.

3. **Start with The Stage.** Build the homepage to 100% before touching any other page. Get the ticker, the hero, the grid, the controls all working. This is the design language reference for everything else.

4. **Component naming convention:**
   - `StageHero` — homepage hero section
   - `ArtistCard` — grid card component
   - `TierBadge` — up & coming / ready to break / established flag
   - `PulseLine` — the current activity line on each card
   - `GenreChip` — filter chip
   - `TierTab` — tier filter button
   - `TickerStrip` — scrolling marquee
   - `ShowCard` — show listing card
   - `HypeStrip` — Hype Coins banner
   - `LabelCard` — Collective label card
   - `VaultCard` — subscriber content card (locked + unlocked states)

5. **Two states for every content card.** Every piece of subscriber content needs a locked state (blurred, price visible, subscribe CTA) and an unlocked state. Build both before moving on.

6. **The Vault blurred state.** Use CSS blur filter + overlay for locked content cards. Do not use a hard grey block. The user should be able to see the shape of what they're missing, not a blank wall.

7. **Ticker implementation.** Pure CSS animation only. No JS scroll libraries. Two copies of the content concatenated, `animation: ticker Xs linear infinite`. Pause on hover.

8. **No placeholder text.** Use the real artist names and real pulse lines from this document in the prototype. It reads dramatically better than Lorem ipsum.

---

## Sample Content for Prototype

**Artists:**

| Name | Genre | City | Tier | Pulse activity | Claims |
|---|---|---|---|---|---|
| Maren Fold | Indie Folk | Halifax, NS | Ready to break | New vault track dropped — subscribers only | 2,140 |
| Pale Wire | Post-punk | Toronto, ON | Up & coming | Merch vote open — choose the next shirt | 318 |
| Velvet Static | Alt-rock | Vancouver, BC | Established | Writing session Thursday, subscribers first | 18,900 |
| Gravel Hours | Country | Calgary, AB | Up & coming | New single — early access before platforms | 84 |
| Otis Brook | Acoustic | Memphis, TN | Ready to break | Acoustic set recorded last night | 4,210 |
| Tender Iron | Americana | Nashville, TN | Established | Radio show live this Friday | 22,400 |

**Shows near Halifax:**

| Date | Artist | Venue | Genre | Price |
|---|---|---|---|---|
| May 3 | Maren Fold | The Seahorse Tavern | Folk | $15 |
| May 9 | Pale Wire | The Marquee Club | Punk | $12 |
| May 17 | Velvet Static | Casino Nova Scotia Stage | Alt-rock | $28 |

**Labels (The Collective):**

| Founded by | Label name | Backing |
|---|---|---|
| Velvet Static | Backcountry Records | Maren Fold, Gravel Hours + 2 others |
| River Kite | Midnight Faction | Pale Wire, The Lowland Set |
| Dusk Harbor | Open Water | Gravel Hours + 3 emerging artists |

---

## File Structure

```
/movement
  /app
    /page.tsx               ← The Stage (homepage)
    /artist/[slug]/page.tsx ← Artist Profile
    /vault/page.tsx         ← The Vault
    /collective/page.tsx    ← The Collective
    /fund/page.tsx          ← The Fund
    /layout.tsx             ← Root layout with nav + footer
  /components
    /nav/Nav.tsx
    /stage/TickerStrip.tsx
    /stage/StageHero.tsx
    /stage/ArtistGrid.tsx
    /stage/ArtistCard.tsx
    /stage/TierBadge.tsx
    /stage/PulseLine.tsx
    /stage/GenreChip.tsx
    /stage/TierTab.tsx
    /stage/ShowsSection.tsx
    /stage/ShowCard.tsx
    /stage/HypeStrip.tsx
    /collective/LabelCard.tsx
    /vault/VaultCard.tsx
    /artist/ArtistHeader.tsx
    /artist/ArtistTabs.tsx
  /styles
    /tokens.css             ← All CSS custom properties
    /globals.css            ← Font imports + resets
  /lib
    /data.ts                ← Hardcoded prototype data
  /public
    /fonts                  ← If self-hosting fonts
```

---

*Movement — Concept brief and build document. Confidential.*
*Rick Smith + Claude, April 2026*
