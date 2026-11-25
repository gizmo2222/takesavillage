# Backlog

Built 2026-11-24 from `docs/CRITIQUE.md` ("Critique 2" issues and next steps, "Follow-ups, not
done", "Planned additions", "Left as it was"). This repo has had no overhaul, so there are no
`docs/overhaul-*.md` or `docs/research.md` files to draw from. `docs/CRITIQUE.md` stays the record
of why each item exists; this file is the order of work and its status.

Every session reads this file first and writes to it last.

## Rules for this repo (they replace the general ones where they differ)

- **A push to `master` deploys the live site** (`.github/workflows/deploy.yml`, SFTP to DreamHost).
  Nick said on 2026-11-25 that batch sessions push, so every row goes live as it lands. Run the
  row's checks before the merge, push, then confirm the deploy run succeeded and note it in the row.
- **There is no test suite.** "The suite passes" here means: the page is opened at 1280x900 and
  390x844 with a fresh query string, no horizontal overflow, no console errors, and
  `docs/measure-contrast.js` reports no fails and no missing rows at both widths (add rows for any
  text a change touches). `docs/CRITIQUE.md`, "Measured contrast", says how it is run.
- Every new file that must reach the server needs a `put` line in the deploy workflow.
- Decided, do not reopen (`docs/CRITIQUE.md`, "Decided, no change"): the Donate button stays as
  it is, both "Hello, Friends!" headings stay, both back-to-top controls stay.
- Design context: very artsy, for theater and arts people; taped snapshots, paper edges, the
  script and stage-direction voice. Nick likes the tape on the Constellations flier.

## Items

Ordered by value (3 high), then size (S under an hour, M a session, L several sessions).

| id | item | source | size | value | status |
|---|---|---|---|---|---|
| B1 | Save the design context to `.impeccable.md` so later sessions do not stop to ask for it | Critique 2, open point | S | 3 | done 2026-11-25. `.impeccable.md` holds users, voice, palette, type rules, Nick's decisions and five principles, written from `docs/CRITIQUE.md` without asking. Not deployed (a repo doc, no `put` line). Update it when Nick decides something new. Deploy run 45558316111 succeeded. |
| B2 | Section headings in Fraunces (Baloo 2 only where it echoes the logo); hero tagline larger | Critique 2, decided; step 3 | S | 3 | done 2026-11-25. Intro, show, archive, scene and curtain-call headings now upright Fraunces 700-800 (font link adds upright 600..800); Baloo 2 kept only on the Donate button and ticket stubs. Tagline 12px to `clamp(0.8rem, 2.6vw, 1rem)`, one line at 390, ratio 5.21/5.22. B4 still owns the show title's glow and colour. Deploy run 45558509226 succeeded. |
| B3 | Phone layout of archive scenes: ticket stub above the photo, text at full width | Critique 2, P2; step 4 | S | 3 | done 2026-11-25. At 520px and below `.scene` is one column and the stub lies on its side (month, day, year in a row, dashed divider on the left) above the photo; scene text 262px to 350px wide at 390. Desktop unchanged. B12 (stub hover) still applies at all widths. Deploy run 45558692141 succeeded. |
| B4 | Show section off navy onto paper, taped flier the only dark object, title glow removed; waves and contrast rows redone | Critique 2, decided; step 2 | M | 3 | done 2026-11-25. Show section on `--warm`, one sheet with the gallery below; ink text, flier shadow brown; title `--orange-ink` with the archive title's teal print offset (4.18, large). Intro wave now teal to `#fde8c0`; contrast script has a show-title row, no fails at both widths. Done directly, not with workers (one section of one file). `docs/CRITIQUE.md` contrast table still lists navy ratios (B11). Deploy run 45559176338 succeeded. |
| B5a | Offerings page, design note for Nick to approve: page outline, what the menu and hero links say, where the email link sits. Write it under "Offerings page" below and mark this row needs-decision | Planned additions; Critique 2, P1; step 5 | S | 3 | needs-decision 2026-11-25. Note written under "Offerings page": page outline, menu label (recommend "Classes & drums"), hero sentence words become the links, email link only on the Offerings page. Nick approves it and sends text, photos and the address. |
| B5b | Move the shared CSS out of `index.html` into one stylesheet with its `put` line; prove the home page is unchanged at both widths | Split of B5 | M | 3 | done 2026-11-25. All CSS now in `site.css` (linked as `site.css?v=1`; deploy puts it before `index.html`); README and `.impeccable.md` updated. New `docs/style-fingerprint.js` hashes every element's box and styles: identical before and after at 1280 and 390. Later rows that edit CSS edit `site.css` and bump `?v=`. Deploy run 45559442206 succeeded; live `site.css` serves 200. |
| B5c | Build `offerings.html` for drum circles and acting classes | Split of B5 | M | 3 | blocked: needs B5a approved and Nick's text |
| B5d | Email inquiry link, menu and hero links on both pages, room for a fourth menu link at 390px | Split of B5 | S | 3 | blocked: needs B5c and the contact address |
| B6 | Tell Constellations once: keep the show section as the telling, cut archive Act I Scene 2 to its bill and a pointer | Critique 2, P2 | S | 2 | done 2026-11-25. Archive Act I Scene 2 keeps its stub, kind, title, place, stage direction, bill and the "See the production" link; its poster thumbnail and paragraph are gone (the "party after" detail went with it). `flier.jpg` is now used only by the show section's flier, which makes B9 a one-place change. Deploy run 45559831851 succeeded. |
| B7 | One name for the archive section across the menu link, eyebrow and heading | Critique 2, P2 | S | 2 | done 2026-11-25. Menu link "The year so far" is now "The Archive", matching the eyebrow "The Archive · Season One" and `#archive`; the heading "A Year in Three Acts" stays as the title. Menu still one line at 390 and shorter, which leaves B5d room for a fourth link. Deploy run 45559963640 succeeded. |
| B8 | Gallery picks: drop the near-duplicate audience shots (3, 4, 5 down to one), crop the app buttons out of photo 2; renumber the large views and the deploy list | Critique 2, P2 | S | 2 | done 2026-11-25. Six photos: kept 3 (warm, wide) over 4 and 5; photo 2 cropped in place to the story card (202x360, `?v=2`), alt rewritten; large views renumbered 1-6 with wrap-around; cue says "Six". `gallery (4).jpg` and `(5).jpg` are unused but left in the repo and on the server (no deleting data); photo 2's original is in history at 7ef2c24; B19 keeps `?v=` on replaced images. Deploy run 45560305858 succeeded. |
| B9 | Rename `flier.jpg` so returning visitors cannot be served the old copy with the street address; update `index.html`, social meta and the deploy list | Critique 2, P3 | S | 2 | done 2026-11-25. `flier.jpg` is now `constellations-flier.jpg`; `index.html` and the deploy list updated, its `put` moved before `index.html` so the page never points at a file not yet uploaded. Social meta uses `logo.png`, so it needed no change. The old `flier.jpg` (the clean copy) stays on the server, unused; Nick may delete it. Deploy run 45560768718 succeeded; live file serves 200. |
| B10 | Flier alt text (thin, has an em dash); em dashes in `<title>` and the meta descriptions | Follow-ups | S | 2 | done 2026-11-25. Flier alt now describes the art (two silhouetted faces against a starry sky traced with constellations); credits are not repeated since they sit beside it. `<title>`, `og:title` and `twitter:title` use a middot, the description a colon; `index.html` has no em dashes left. Deploy run 45560894573 succeeded; live title checked. |
| B11 | Docs catch-up: `README.md` Past Production row and a row for the archive; stale status lines in `docs/CRITIQUE.md` | Critique 2, P3 | S | 2 | done 2026-11-25. README: menu and archive rows, current Past Production and gallery rows, closed-production and add-photo notes. CRITIQUE: status lines say live, closed items point at their backlog rows, contrast table remeasured at both widths (37 rows, no fails). Docs only, not deployed; deploy run 45561190289 succeeded. |
| B12 | Remove the hover effect on ticket stubs (`.scene:hover .stub`), since a scene is not a link | Critique 2, P3 | S | 1 | done 2026-11-25. Removed `.scene:hover .stub` and the stub's now-unused transition from `site.css`; stubs keep their tilt and no longer move on hover at any width. `site.css?v=2`. Deploy run 45561662952 succeeded. |
| B13 | Footer copyright leaves "Organization" alone on a line at 390px | Critique 2, P3 | S | 1 | done 2026-11-25. The copyright line is three spans; at 520px and below the name and "Nonprofit Organization" each take a line and the dot is hidden, wider it stays one line (checked at 390, 540, 1280). `site.css?v=3`. Deploy run 45561870028 succeeded. |
| B14 | Unmasked poster is unreadable at thumbnail size: give it a large view like the gallery photos | Critique 2, P3 | S | 1 | done 2026-11-25. The poster thumbnail links to `#poster-unmasked`, a large view built like the gallery's (CSS `:target`, no JS) at the end of the archive section; it closes to `#poster-closed` and the page does not move. New `--cap` on `.lightbox img` keeps it at the image's own 360px (3x the thumbnail), so no upscaling. Adds a Back step like the gallery (B18). `site.css?v=4`; README row updated. Deploy run 45562178072 succeeded. |
| B15 | `Cache-Control: no-store` in the `.claude/launch.json` preview one-liner, to end stale reloads | Follow-ups | S | 1 | done 2026-11-25. The `site` one-liner in `.claude/launch.json` builds a handler subclass that adds `Cache-Control: no-store` to every response (checked on `/`, `site.css`, `logo.png`), so a plain reload shows edits. `docs/CRITIQUE.md` preview note and follow-up updated. Local only, nothing deployed; deploy run 45562540297 succeeded. |
| B16 | A not-found page in the site's look (`404.html` plus whatever DreamHost needs to serve it) | Critique 2, heuristic 9 | S | 1 | done 2026-11-25. Named `missing.html`, not `404.html`: DreamHost's Apache already points its 404 ErrorDocument there, so no `.htaccess` (none touched). Paper hero, small taped logo, stage direction, "This scene isn't in the script", one home button; root-absolute paths, `noindex`; `site.css?v=5`, `put` line, README note, contrast script has its rows (no fails at 1280 and 390). Deploy run 45562864123 succeeded; live `/nope-xyz` and `/some/deep/path.html` return 404 with the page. |
| B17 | The hero's two soft discs: keep, restyle or remove | Left as it was | S | 1 | done 2026-11-25 (Nick took the recommendation: remove). The `.hero::before/::after` discs are gone from `site.css`, so both `index.html` and `missing.html` lose them; `site.css?v=6`. `docs/measure-contrast.js` no longer blends discs in; phone hero rows rose (sentence 11.2, Instagram link 5.07), CRITIQUE "Left as it was" closed. No fails at 1280 and 390 on both pages. Deploy run 45568832824 succeeded. |
| B18 | Escape closes a large photo, and photos stop adding Back steps. Needs a few lines of JavaScript on a site that has none | Limits of the large photo view | S | 1 | done 2026-11-25 (Nick took the recommendation). New deferred `site.js?v=1`, linked from `index.html` only (`missing.html` has no large views), with its `put` line: clicks on `.shot`, `.poster-open` and links inside `.lightbox` go through `location.replace(hash)`, and Escape follows the open view's backdrop link, so no Back steps are added and the page does not move (checked: history length and scroll unchanged). Without JS the views work as before via `:target`. README's "No JavaScript" line corrected. Deploy run 45569230063 succeeded; live `site.js` serves 200. |
| B19 | Larger gallery originals (the current ones are 512px tall, so the large view is soft) | Follow-ups | S | 1 | blocked: needs larger original photos from Nick |
| B20 | Final `/polish` pass over the home page and `missing.html` as they stand | Critique 2, step 6 | M | 1 | done 2026-11-25 (done directly, as B4 was, not with workers). `.archive` is `overflow: clip` (hidden as fallback) so the act marks finally stick, at 4.5rem to clear the menu; Nunito 700, never loaded, set to 600 everywhere; focus ring is `--orange-ink`, cream on the teal intro, orange2 in the footer and large views; the logo pop-in eases out instead of bouncing; the gallery cue hides from 1400px (the strip fits there) instead of 1900px; `missing.html` gets the apple-touch-icon. `site.js` now moves keyboard focus into a large view (Close, or the same Previous/Next when stepping) and back to its photo or poster on close or Escape. `site.css?v=7`, `site.js?v=2`; no new files. Checked at 1280x900 and 390x844 on both pages: no overflow, no console errors, contrast script no fails or missing rows. Deploy run 45572719395 succeeded. Left as is: the skip link is 40px tall and the not-found home button 43px. |
| B21 | `/polish` pass over `offerings.html` once it is built | Split of B20 | S | 1 | blocked: needs B5c and B5d |
| B22 | Typographic apostrophes and quotes in the copy ("isn't", "Actor's", "We're" use straight `'`), in the HTML and in any checks that match text | B20 polish pass | S | 1 | done 2026-11-25. Fourteen straight apostrophes and `&#39;` entities in visible text and alt text (12 in `index.html`, 2 in `missing.html`) are now `’` (U+2019); the copy has no quotation marks, so none needed curling. Attribute delimiters, CSS, JS, URLs, meta tags and comments untouched; no check matched this text, so `docs/measure-contrast.js` is unchanged. UTF-8 without BOM, no `?v=` bump (no CSS or JS change). Checked at 1280 and 390 on both pages: no overflow, no fails or missing rows. Deploy run 45573375399 succeeded; live pages serve `’`. |

## Offerings page

B5 was split on 2026-11-25 into B5a to B5d (rows above). B5a's design note goes here.

### Design note (B5a, 2026-11-25): waiting for Nick's approval

**The page.** `offerings.html`, a second page with the home page's head, fonts, stylesheet (B5b),
sticky menu, footer and back-to-top. Same paper-and-tape look; it reads as a programme insert.

1. **Top.** The logo, smaller, linking home. Heading in Fraunces: "Come make something with us".
   One plain line under it: what is on offer and that it is in Van Nuys (Nick's words).
2. **Drum circles** (`id="drum-circles"`), laid out like an archive scene: a taped snapshot on
   one side, a stage direction as the eyebrow ("[Enter the drums.]"), then plain facts in this
   order: what it is, who it is for, when and where, what to bring, cost or donation. Ends with
   an email link, "Ask about a drum circle", subject filled in.
3. **Acting classes** (`id="acting-classes"`), the same shape, tilted the other way, teal tape
   where the drums have orange. Ends with "Ask about acting classes".
4. **Curtain call.** "Write to us" with the address shown as text (so people without a mail app
   can copy it) and as a `mailto:` link; the Instagram link; nothing else. Donate stays on home.

**Menu.** Home gets a fourth link, "Classes & drums", pointing at `offerings.html`. On the
Offerings page the menu reads: Home, Drum circles, Acting classes, Write to us. At 390px four
links do not fit one line, so B5d lets the menu wrap to two centred rows (or shortens "The year
so far" to "The year").

**Hero link on home.** Turn the words "lead drum circles" and "teach arts workshops" in the
existing hero sentence into links to the two sections, instead of adding another button: Donate
stays the hero's only button and the sentence already says it.

**Where the email link sits.** On the Offerings page only: once under each offering, once in the
curtain call. Not in the home hero and not in the footer, so it stays tied to an offering.

**What Nick decides or sends.**
1. Approve the outline above, or say what to change.
2. The menu label: "Classes & drums" (recommended), "Join in", or "Offerings".
3. "Arts workshops" in the hero vs "acting classes" on the page: recommend one name. Suggest
   changing the hero to "teach acting classes" if acting is the only workshop.
4. Text for each offering (the five facts above), one photo of each, and the contact address.

Then B5c builds the page, with `put offerings.html` and a `put` per photo in the deploy workflow.

## Notes for later sessions

- `core.autocrlf` is on: after a merge or branch switch `index.html` is CRLF in the working copy
  (blobs are LF). A script that matches multi-line text must match `
`, not `
`.
- Since B5b the CSS lives in `site.css`, not in `index.html`. Bump `site.css?v=N` in every page's
  `<link>` whenever `site.css` changes, or returning visitors keep the old copy.
- To prove a refactor changed nothing visible, run `docs/style-fingerprint.js` before and after at
  both widths (how to run it is in its header).
- Before running `docs/measure-contrast.js`, finish the fade-ins
  (`document.getAnimations().forEach(a => a.finish())`) or the hero and intro rows read ratio 1.
- `site.css` is at `?v=7` after B20 (both `index.html` and `missing.html` link it; bump both). `site.js` is at `?v=2` (B18, B20; `index.html` only); bump it when it changes. `.archive` must stay `overflow: clip`, not `hidden`, or the sticky act marks stop sticking. A new large view needs no JS change if it uses the `.lightbox` markup and its opener has class `shot` or `poster-open`. Large views (`.lightbox`) take an optional `--cap` (max height, default 640px) for images smaller than the gallery's.
- `gallery/gallery (4).jpg` and `(5).jpg` are no longer on the page (B8). Nick may delete them from
  the repo and the server; a session should not.
- Since B22 the copy uses curly apostrophes (`’`, U+2019); new text should too, not `'` or `&#39;`.
- Since B16, `docs/measure-contrast.js` measures a short row list on `missing.html` (it detects `.lost`) and the full list on the home page.

## Decided with Nick, 2026-11-25

- Order stands as listed; nothing struck.
- Batch sessions push to `master`.
- Not answered, so the recommended default applies: B5 is split into four rows; B5c, B5d and B19
  are blocked until Nick supplies the Offerings text, the contact address and larger photos.
- B17 (hero discs) and B18 (JavaScript so Escape closes a photo) each need Nick's choice: a
  session marks them needs-decision with a recommendation rather than guess.
- Later the same day: B17, remove the hero discs (on `missing.html` too); B18, add the small
  deferred `site.js` as recommended. Both rows are todo again. B5a is still waiting for Nick.
- Later still: B20 runs now on the pages as they stand; B21 is the Offerings page's own pass.
