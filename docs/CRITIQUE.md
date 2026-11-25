# Site critique, 2026-11-23

Design critique of `index.html` (whole page, including the new archive section), measured at
1280x900 and 390x844. `docs/` is not in the deploy list.

**Status (2026-11-25): everything below is committed and live.** The fix round, the sticky
menu, Round 2 and Critique 2's steps 1 to 4 are published. What is left, and its order, is in
`docs/BACKLOG.md`; this file stays the record of why each item exists. The flier with the dates
and the street address removed is now `constellations-flier.jpg` (renamed from `flier.jpg` by
backlog row B9 so cached copies are not reused).

## State of the working tree on 2026-11-23 (all since committed)

Published in `7017120`. Uncommitted at the time, all committed since: this file, and Critique 2 step 1 in `index.html`,
`README.md` and `docs/measure-contrast.js` (see "Step 1, done" at the end).

- `index.html`: new `<section class="archive" id="archive">` ("A Year in Three Acts"), six taped
  Instagram photos, intro copy no longer says "new", "this spring" removed. Plus the fix round
  described under "Fix round" below.
- `index.html` also carries Round 2 (see below).
- `flier.jpg`: replaced with the copy that has the dates and the street address removed (see
  Round 2, item 1). Same file name, so it is already in the deploy list. The spare copies
  `flier-clean.jpg` and `flier-no-address.jpg` are deleted.
- `docs/retouch-flier.py`: the script that makes that `flier.jpg` from the untouched artwork.
- `docs/measure-contrast.js`: 16 rows added for the text Round 2 touched.
- `.claude/launch.json`: local preview only, not deployed.
- `archive/*.jpg`: six 360px photos. `.github/workflows/deploy.yml` uploads them.
- Decided on 2026-11-23: Golden Hour Studio photo keeps a credit line (done); the Nov 18
  "Gratitude" Note to Self line is removed until someone confirms it happened (done).

Preview locally (then open `http://127.0.0.1:8123/`):

```powershell
python -m http.server 8123 --bind 127.0.0.1
```

The `site` entry in `.claude/launch.json` reads its port from the `PORT` environment variable and
has `autoPort` on, so when another server already holds 8123 the preview starts on the next free
port (8124 in the test) and the tab it opens works. Without `PORT` it falls back to 8123.

The `site` entry sends `Cache-Control: no-store` on every response (backlog B15), so a plain
reload shows the edited files. `python -m http.server` above does not, so with it open
`index.html` with a new query string (`/index.html?v=2`).

## Design context (from Nick, in chat)

Very artsy. Geared towards theater and arts people. Nick likes the tape on the Constellations flier.
There is no `.impeccable.md` yet; `/teach-impeccable` would save this permanently.

## Score

Nielsen heuristics: 22 / 40 (scored before the fix round; not re-scored).

| # | Heuristic | Score |
|---|-----------|-------|
| 1 | Visibility of system status | 2 |
| 2 | Match with the real world | 3 |
| 3 | User control and freedom | 2 |
| 4 | Consistency and standards | 2 |
| 5 | Error prevention | 3 |
| 6 | Recognition rather than recall | 3 |
| 7 | Flexibility and efficiency | 1 |
| 8 | Aesthetic and minimalist design | 3 |
| 9 | Error recovery (little applies to a static page) | 2 |
| 10 | Help and documentation | 1 |

## Fix round (all three approved by Nick): DONE 2026-11-23, live

Checked in the browser at 1280x900 and 390x844: no horizontal overflow at either width
(scroll width equals client width, no element pokes past the viewport), every contrast row passes.

### P0. Unreadable text in the hero and intro: fixed

The ink colors moved from `.archive` to `:root`. `--teal-ink` changed from `#1C7A72` to `#176F67`:
the old value only reached about 4.3 on the warm end of the hero gradient and on `--warm`, and a
first deepening to `#19736B` still measured 4.47 on a phone, where the hero's orange disc sits
behind the Instagram link. The archive's teal text is the same variable, so it is a shade deeper
too. `--orange-ink #B4530C` and `--ink #4A2811` are unchanged.

Measured ratios (4.5:1 is the minimum for body text, 3:1 for large text). Where the two widths
differ the lower one is shown; hero backgrounds are the gradient at the element's bottom edge,
with the 8% decorative disc blended in where it sits behind the text.

| Element | Before | Now | Colors now |
|---------|--------|-----|------------|
| `.intro h2` "Hello, Friends!" | 1.3 | 5.59 | cream on `#176F67` |
| `.intro` paragraph | 2.76 | 5.99 | white on `#176F67` (opacity removed) |
| Hero tagline 12px | 2.57 | 4.76 (phone), 5.12 (desktop) | `#176F67` on gradient |
| Hero Instagram link 13.6px | 2.57 | 4.73 (phone), 5.09 (desktop) | `#176F67` on gradient |
| `.donate-btn` text 13.6px | 2.86 | 5.02 | white on filled `#B4530C` |
| "What's Next" eyebrow 11.2px | 2.86 | 4.69 | `#B4530C` on cream |
| `.show-presented` 12px | 3.8 | 9.58 | white 70% on `#0d0d1a` |
| `.date-item.past` | about 3.3 | removed | replaced by the run line, 16.04 |

New or touched text, also measured: hero nav links 11.38 (phone) and 12.23; run sub-label "Seven
performances" 10.02; show blurb 9.58; venue 6.24; credits 5.33; "Opening Night" heading 4.99 (was
2.29, fixed because it became a real heading); Upcoming placeholder 12.23 (was about 4.1 at 60%
opacity, fixed because the block was edited); "see the year so far" link 4.69; Upcoming and archive
Instagram links 5.59; archive stage directions 5.59; "Back to the top" 4.69.

The intro band and the two waves around it are now `#176F67` (the wave fills are hard-coded hex
in the SVGs; change all three together).

### P1. The page tells an out-of-date story in the wrong order: fixed as decided

- Constellations reads as a past show: past-tense blurb, one run line ("May 8–23, 2026", "Seven
  performances"), venue without the street address. Flier, credits and the opening-night gallery
  are kept. The blurb's em dash and heart emoji went with the rewrite.
- "Upcoming Events" now has a link down to the archive ("In the meantime, see the year so far").
- Section order is unchanged (Upcoming, Constellations, archive); the anchor row makes the archive
  one click from the top.
- Fixed later (see Round 2, item 1): the flier image itself no longer shows the dates or "15147
  Hamlin Street".

### P1. No way to get around: fixed

- Anchor row (`<nav class="site-nav" aria-label="On this page">`): What's next, Constellations,
  The year so far. Fraunces italic, one line at both widths, links 44px tall on desktop and 42px
  on a phone. It began inside the hero and is now the sticky menu described in the next section.
- `<h1>` wraps the logo image (its alt text is the name), hero is a `<header>`, content is in
  `<main id="main">`, and a skip link appears on the first Tab press. `id="top"` is on the teal
  band at the very top of the page.
- "Constellations" is an `<h2>` and "Opening Night" an `<h3>`. Outline: H1 Takes a Village LA; H2
  Hello, Friends!, Upcoming Events, Constellations (H3 Opening Night), A Year in Three Acts (H3
  Prologue and the three acts).
- "Back to the top" link in the archive's curtain call.
- "Hello, Friends!" is used twice (intro H2 and an archive H4). Nick decided to keep both.

## Sticky menu and back-to-top button (asked for by Nick): DONE 2026-11-23, live

Checked at 1280x900 and 390x844: no horizontal overflow at either width.

- The menu is a full-width bar (`.site-nav`) that sits outside the hero, directly under the teal
  top band, with `position: sticky; top: 0`. Background `#fff8ee` (the hero gradient's first
  stop), a double brown rule underneath. It has to stay outside `.hero`, which clips its overflow
  and would stop it sticking. Measured at the top of the window at every scroll position; height
  47px on desktop, 45px on a phone. Link text contrast 12.42.
- `html { scroll-padding-top: 3.75rem }` so a section jumped to from the menu stops 60px down,
  clear of the bar (measured: section top 60, bar bottom 45 to 47).
- Round back-to-top button (`.to-top`, 48x48, cream arrow on brown, about 10:1) in the bottom
  right corner. No JavaScript: it is `position: sticky; bottom: 1rem` inside `.to-top-track`, an
  absolutely positioned strip that starts 150vh down the page, so the button is hidden at the top
  and appears after about half a screen of scrolling. `body` is `position: relative` for this.
- On screens up to 700px wide the footer has 5rem of bottom padding, so the button does not cover
  the copyright line at the end of the page.
- Added without being asked: smooth scrolling for in-page links, only when the visitor has not
  asked for reduced motion. Remove the `scroll-behavior` rule to undo.
- The text link "Back to the top" in the curtain call stays (Nick: keep both).
- Page height is now 5,900px on desktop and 8,419px on a phone.
- Browser cache: after editing, open `http://127.0.0.1:8123/index.html` or hard-reload; a plain
  reload of `/` served a stale copy once.

## Round 2 (approved by Nick): DONE 2026-11-23, live

Checked in the browser at 1280x900 and 390x844: no horizontal overflow at either width (scroll
width equals client width, 1265 and 390; no element pokes past the viewport), the menu stays on
one line, and every contrast row passes. Page height is now 5,879px on desktop and 8,594px on a
phone.

### What was done

1. Flier, **done, swapped in on Nick's yes (2026-11-23)**: `flier.jpg` (926x1158, 259 KB) has the
   dates and the "15147 Hamlin Street" line removed; the title, "The Village, Van Nuys, CA" and
   the credits stay. Nick asked on 2026-11-23 for a better removal of the dates. What was wrong:
   the committed `flier.jpg` is the May 19 patch (commits `0d86866`, `c886c0c`), which left the
   dates as dark ghost lettering and also blackened every star of the same colour in that band,
   including two stars of the left constellation. `flier-no-address.jpg` (Round 2's first try,
   now deleted) was built on top of that and left a smudge where the address was.

   The new copy starts again from the untouched artwork in git (`0edda09`), so those stars
   are back as drawn. `docs/retouch-flier.py` repaints only the letter shapes (plus 6px of edge)
   with the local average and real grain from neighbouring pixels, and lifts the soft dark halo
   the artwork has around its lettering (about 15px) so no dark cloud is left. Measured: median
   brightness is flat (17 to 18) from the old letters out to 20px for the dates, 19 to 21 for the
   address; away from the two blocks nothing changes beyond JPEG re-saving (mean 1 level).
   Looked at full size and at 3.5x: no letter traces. To rebuild it (needs `opencv-python`):

   ```powershell
   python docs\retouch-flier.py git:0edda09:flier.jpg flier.jpg
   ```

   The page uses `flier.jpg` in two places: the big flier and the small poster in the archive's
   Scene 2. No other image shows the address: the playbill in gallery photo 7 has the same artwork
   but no address line, and `archive/` has no copy of the flier. `deploy.yml` needs no change
   because the file name stays the same. `flier.jpg` now shows as modified in git and is not
   committed; the May 19 version is still in git history if it is ever wanted back:

   ```powershell
   git checkout -- flier.jpg
   ```

2. Tiny labels: stub top and foot, act label, scene kind, intermission note and archive masthead
   are all 12px (`.75rem`), with letter-spacing tightened so none of them wraps at 390px (the
   widest stub label, "Monthly", is 59px in a 70px stub). The copyright line was under 12px too
   and failed contrast (about 2.46); it is now 12px at 85% opacity, 4.95. It was not on the list.
3. Tap targets, by padding, same look. Measured at both widths: menu links 45px tall (the bar is
   48px on a phone, under the 60px `scroll-padding-top`); Instagram links 170x45; Donate 184x46;
   "see the year so far", "See the production" and "Back to the top" 45px tall; footer Instagram
   link 167x44; the links in the large photo view 45px tall.
4. One visual language: the three eyebrows ("What's Next", "Past Production", "The Archive ·
   Season One") share one rule, Fraunces italic 600 at 18.4px. "Opening Night" is Fraunces italic
   too. The logo and the big flier are taped (item 5 and below). Waves cut from six to two: the
   four after the intro are gone, the two around the intro (`#176F67`, keep in step with
   `--teal-ink`) remain.
   The big flier: `.flier-frame`, tilted 1.5 degrees, 8px white paper edge, hard offset shadow,
   orange tape. The rounded corners and the glow are gone.
5. Logo: `.logo-frame` inside the `<h1>`, tilted 2 degrees, 10px white paper edge, hard offset
   shadow, teal tape. The pop-in animation moved from the image to the `<h1>`.
6. Gallery:
   - Alt text written for all eight photos after looking at each one.
   - Large view on click or tap, without JavaScript: each thumbnail links to a `:target` overlay
     (`.lightbox`, ids `photo-1` to `photo-8`) with Previous, "N of 8", Next and Close. The
     overlays and the close target (`#photos`) are `position: fixed`, so opening and closing do
     not move the page (measured: scroll position 2272 before, during and after at 390px; 1845
     at 1280px). Large image 491x643 at 1280x900, 306x626 at 390x844.
   - Scroll cue: the strip fades out at both edges (`mask-image`) and a stage-direction line under
     the heading reads "[Eight photographs from the night. Swipe sideways for more. Tap or click
     one to see it larger.]". The "Swipe sideways" sentence hides at 1900px and wider, where the
     strip (1,802px) fits.
   - The thumbnails are taped snapshots like the archive's (white edge, hard shadow, alternating
     tilt and tape color).
7. Intro: the two em dashes are commas, same words ("...where the village itself began, alongside
   you, in our backyard, with our first production...").
8. `.claude/launch.json`: see the preview note at the top of this file. Tested with 8123 already
   taken: the preview came up on 8124 and both ports answered 200.

### Measured contrast

`docs/measure-contrast.js`, run after finishing the page's animations, `fails` empty at both
widths. Remeasured 2026-11-25 (backlog B11) on the page as it now stands: the show section is on
paper, so its rows no longer read against navy. 4.5 is the minimum for body text, 3 for large
text. Where the widths differ, both are shown, 1280 first.

| Text | Size, 1280 / 390 | Ratio | Needs |
|---|---|---|---|
| Menu link | 16.3 / 15.2px | 12.42 | 4.5 |
| Back-to-top button arrow | 16px | 10.1 | 4.5 |
| Hero tagline | 16 / 12.8px | 5.21 / 5.22 | 4.5 |
| Hero sentence (what the company does) | 23.2 / 19.2px | 11.21 / 10.41 | 4.5 |
| Hero Instagram link | 13.6px | 5.08 / 4.72 | 4.5 |
| Donate button text | 13.6px | 5.02 | 4.5 |
| Intro heading | 41.6 / 28.8px | 5.59 | 3 |
| Intro paragraph | 18.4 / 16px | 5.99 | 4.5 |
| "What's next" line under the intro | 19.2 / 16.8px | 5.59 | 4.5 |
| "What's next" Instagram link | 19.2 / 16.8px | 5.99 | 4.5 |
| Show title (Constellations) | 54.4 / 35.2px | 4.18 | 3 |
| `.show-presented` | 12px | 10.91 | 4.5 |
| Run line | 22.4px | 9.01 | 4.5 |
| Run sub-label | 12px | 4.99 | 4.5 |
| Show blurb | 15.2px | 10.91 | 4.5 |
| Venue | 13.6px | 10.91 | 4.5 |
| Credits | 12.5px | 10.91 | 4.5 |
| "Opening Night" heading | 27.2px | 4.99 | 3 |
| Archive stage direction | 17.6px | 5.59 | 4.5 |
| Archive Instagram link | 13.6px | 5.59 | 4.5 |
| Back to the top | 13.1px | 4.69 | 4.5 |
| "Past Production" eyebrow | 18.4px | 4.99 | 4.5 |
| Gallery cue line | 16px | 10.91 | 4.5 |
| Archive eyebrow | 18.4px | 4.69 | 4.5 |
| Archive masthead | 12px | 12.23 | 4.5 |
| Act label | 12px | 5.59 | 4.5 |
| Stub top (orange stub) | 12px | 7.09 | 4.5 |
| Stub top (teal stub) | 12px | 7.91 | 4.5 |
| Stub foot (orange stub) | 12px | 7.09 | 4.5 |
| Stub foot (teal stub) | 12px | 7.91 | 4.5 |
| Scene kind | 12px | 4.69 | 4.5 |
| "See the production" link | 13.1px | 4.69 | 4.5 |
| Intermission note | 12px | 12.23 | 4.5 |
| Footer Instagram link | 14.4px | 5.04 | 4.5 |
| Copyright line | 12px | 4.95 | 4.5 |
| Photo view links | 16.8px | 14.72 | 4.5 |
| Photo view count | 16.8px | 13.13 | 4.5 |

The photo view rows are measured over white, the lightest thing the 94% dark sheet can sit on.

### Left as it was

- ~~The navy `#0d0d1a` show section and the glowing orange "Constellations" title.~~ Closed by
  backlog B4: the show section is on paper, the glow is gone.
- ~~Baloo 2 for the main headings.~~ Closed by backlog B2: headings are in Fraunces.
- The hero's two soft discs (the measuring script accounts for them). Open: backlog B17.

These are the rest of "one visual language, all the way". They change the look of the page more
than tape and eyebrows do, so they wait for Nick to see this round first.

### Limits of the large photo view

It has no JavaScript, so: Escape does not close it (Close, a tap on the photo or the dark area, or
the browser's Back button do), and every photo opened adds a step to the browser's Back history.
Backlog B18 holds the choice of adding a few lines of JavaScript for this.

### Follow-ups, not done

- ~~The big flier's alt text is thin and has an em dash.~~ Done by backlog B10: it now
  describes the art.
- ~~Em dashes remain in the `<title>` and the meta descriptions.~~ Done by backlog B10.
- The gallery originals are 512px tall, so the large view is soft on a big screen. Larger
  originals would fix it. Backlog B19, waiting for the photos.
- ~~`python -m http.server` lets the browser reuse an old copy of the page.~~ Done by backlog
  B15: the `launch.json` one-liner sends `Cache-Control: no-store`.

### Planned additions (asked for by Nick 2026-11-23): now backlog B5a to B5d

- **Drum circle offerings:** a page about them. Content to come from Nick.
- **Acting classes:** something about them. Open: its own page, or a section on an existing one.
- **Inquiry button, or perhaps a form.** Open: which of the two. A button needs somewhere to
  send people (the contact email below is still undecided). A form needs something to receive
  it, and the site has no JavaScript and no server code today.

Whatever is built: the site is one page now, so new pages need links in the menu, and every new
file needs a `put` line in `.github/workflows/deploy.yml`.

### Decided, no change

- Donate button: leave it alone, no line about what it funds and no tax note.
- Contact email: later. Stays on this list until Nick has an address to use.
- "Hello, Friends!" twice: keep both.
- "Back to the top" text link and the round button: keep both.

## Critique 2, 2026-11-24: steps 1 to 4 live, the rest in `docs/BACKLOG.md`

Whole page as published, viewed at 1280x900 and 390 wide. Nielsen score **27/40** (was 22).
No P0. One AI-slop tell left (the glowing title on navy), which Nick has now decided to remove.

### Issues

- **P1. The page opens with nothing.** Hero is a logo and a Donate button, then an empty
  "Upcoming Events" section; the archive starts about 2,500px down (desktop).
- **P1. The hero never says what the company does.** The only description is the 12px
  tracked-caps tagline, and "Nonprofit Theater" hides the drum circles and workshops that are
  five of the eight archive scenes.
- **P1. No route to book or ask anything except Instagram.**
- **P2. The navy show section and its glowing title** break the paper-and-tape language.
- **P2. Constellations is told three times** (intro, show section, archive Act I Scene 2).
- **P2. Phone archive:** the ticket-stub column takes about a quarter of a 390px screen, leaving
  a text column of roughly 30 characters and a dead gutter under every stub.
- **P2. One section, three names** (menu "The year so far", eyebrow "The Archive", heading
  "A Year in Three Acts"); the menu shows no current section.
- **P2. Gallery picks:** photos 3, 4 and 5 are near-duplicates; photo 2 is an Instagram story
  screenshot with the app's buttons in it.
- **P3.** `.scene:hover .stub` straightens and grows the stub although a scene is not a link;
  footer copyright leaves "Organization" alone on a line at 390px; the Unmasked poster is
  unreadable at thumbnail size; `README.md` still describes struck-through dates and has no
  archive row; a returning visitor's browser may still hold the old `flier.jpg` (it kept its
  file name), so a new name such as `flier-2.jpg` would force the clean copy.

### Decided by Nick, 2026-11-24

- **Upcoming Events:** nothing is dated yet. Shrink the empty section to one line under the
  intro so the archive moves up.
- **Show section:** move it off navy onto the paper look, with the taped flier as the only dark
  object, and drop the title glow. (Closes the first line of "Left as it was".)
- **Headings:** set section headings in Fraunces; keep Baloo 2 only where it echoes the logo.
  (Closes the second line of "Left as it was". The hero's two discs are still undecided.)
- **Offerings:** one second page for drum circles and acting classes, with the inquiry on it,
  linked from the menu and the hero. (Closes the "its own page, or a section" question.)
- **Inquiry:** an email link (`mailto:`), no form. Blocked until Nick has the contact address.

### Next steps, in order (each its own session)

1. [x] `/onboard`: one-line Upcoming note, a plain sentence in the hero saying what the company
   does, archive moved up. Done 2026-11-24, uncommitted; see "Step 1, done" below.
2. [x] `/normalize`: show section onto paper, glow removed (backlog B4); fold the repeated
   Constellations telling (B6).
3. [x] `/typeset`: section headings to Fraunces, hero tagline larger (B2).
4. [x] `/adapt`: phone layout of archive scenes (B3). Footer line is B13; menu room for a fourth
   link is B5d.
5. Build the Offerings page (needs Nick's content and the contact address), with a design note
   here first since it adds a page, menu links and `put` lines in the deploy workflow.
6. `/polish` last.

### Step 1, done 2026-11-24 (live)

- **Upcoming Events section removed.** In its place one line closes the Intro, `p.next-note`,
  which carries `id="upcoming"` so the menu's "What's next" still lands on it (84px down, clear of
  the 48px menu, at both widths): "What's next: a new production is in the works. Follow
  @takes.a.village.la on Instagram for the announcement." The section's "see the year so far"
  link went with it; the menu has that link.
- **Hero sentence** (`p.hero-line`, Fraunces italic, under the tagline), chosen by Nick from
  three: "We stage plays in a Van Nuys backyard, lead drum circles and teach arts workshops."
  Not chosen: "We put on plays, lead drum circles and teach workshops in acting, art and rhythm."
  and "Backyard theater, drum circles and arts workshops, made together the way a village makes
  things."
- **Waves:** the wave under the Intro now runs teal to navy (fill below `#0d0d1a`, above
  `#176F67`). Step 2 moves the show section onto paper, so that fill changes again then.
- **Measured** with `docs/measure-contrast.js` (36 rows, none failing, none missing) at 1280x900
  and 390x844; no horizontal overflow, menu on one line at both.

  | Text | 1280 | 390 |
  |---|---|---|
  | Hero sentence, `#4a2811` on the hero gradient | 23.2px, 11.21 | 19.2px, 10.41 (over the orange disc) |
  | "What's next" line, `#fff6e8` on `#176f67` | 19.2px, 5.59 | 16.8px, 5.59 |
  | Its Instagram link, `#ffffff` on `#176f67` | 19.2px, 5.99 | 16.8px, 5.99 |

- **How far the archive moved:** it starts at 2,389px at 1280 wide (was 2,567) and 2,791px at
  390 (was 2,948). The rest of the distance is the Constellations section and its gallery, about
  1,150px on desktop, which is step 2's to shorten.
- `README.md`: section table and the "Announce a new production" note updated. Its Past
  Production row still described struck-through dates and there was no archive row (the P3
  above); backlog B11 fixed both on 2026-11-25.
