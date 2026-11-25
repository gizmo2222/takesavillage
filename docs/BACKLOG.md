# Backlog

Built 2026-11-24 from `docs/CRITIQUE.md` ("Critique 2" issues and next steps, "Follow-ups, not
done", "Planned additions", "Left as it was"). This repo has had no overhaul, so there are no
`docs/overhaul-*.md` or `docs/research.md` files to draw from. `docs/CRITIQUE.md` stays the record
of why each item exists; this file is the order of work and its status.

Every session reads this file first and writes to it last.

## Rules for this repo (they replace the general ones where they differ)

- **A push to `master` deploys the live site** (`.github/workflows/deploy.yml`, SFTP to DreamHost).
  Whether batch sessions push is Nick's call: see "Open with Nick" below. Until that line is
  answered, merge into `master` locally and do not push.
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
| B1 | Save the design context to `.impeccable.md` so later sessions do not stop to ask for it | Critique 2, open point | S | 3 | todo |
| B2 | Section headings in Fraunces (Baloo 2 only where it echoes the logo); hero tagline larger | Critique 2, decided; step 3 | S | 3 | todo |
| B3 | Phone layout of archive scenes: ticket stub above the photo, text at full width | Critique 2, P2; step 4 | S | 3 | todo |
| B4 | Show section off navy onto paper, taped flier the only dark object, title glow removed; waves and contrast rows redone | Critique 2, decided; step 2 | M | 3 | todo |
| B5 | Offerings page: drum circles and acting classes, inquiry by email link, linked from the menu and the hero | Planned additions; Critique 2, P1; step 5 | L | 3 | todo |
| B6 | Tell Constellations once: keep the show section as the telling, cut archive Act I Scene 2 to its bill and a pointer | Critique 2, P2 | S | 2 | todo |
| B7 | One name for the archive section across the menu link, eyebrow and heading | Critique 2, P2 | S | 2 | todo |
| B8 | Gallery picks: drop the near-duplicate audience shots (3, 4, 5 down to one), crop the app buttons out of photo 2; renumber the large views and the deploy list | Critique 2, P2 | S | 2 | todo |
| B9 | Rename `flier.jpg` so returning visitors cannot be served the old copy with the street address; update `index.html`, social meta and the deploy list | Critique 2, P3 | S | 2 | todo |
| B10 | Flier alt text (thin, has an em dash); em dashes in `<title>` and the meta descriptions | Follow-ups | S | 2 | todo |
| B11 | Docs catch-up: `README.md` Past Production row and a row for the archive; stale status lines in `docs/CRITIQUE.md` | Critique 2, P3 | S | 2 | todo |
| B12 | Remove the hover effect on ticket stubs (`.scene:hover .stub`), since a scene is not a link | Critique 2, P3 | S | 1 | todo |
| B13 | Footer copyright leaves "Organization" alone on a line at 390px | Critique 2, P3 | S | 1 | todo |
| B14 | Unmasked poster is unreadable at thumbnail size: give it a large view like the gallery photos | Critique 2, P3 | S | 1 | todo |
| B15 | `Cache-Control: no-store` in the `.claude/launch.json` preview one-liner, to end stale reloads | Follow-ups | S | 1 | todo |
| B16 | A not-found page in the site's look (`404.html` plus whatever DreamHost needs to serve it) | Critique 2, heuristic 9 | S | 1 | todo |
| B17 | The hero's two soft discs: keep, restyle or remove | Left as it was | S | 1 | todo |
| B18 | Escape closes a large photo, and photos stop adding Back steps. Needs a few lines of JavaScript on a site that has none | Limits of the large photo view | S | 1 | todo |
| B19 | Larger gallery originals (the current ones are 512px tall, so the large view is soft) | Follow-ups | S | 1 | todo |
| B20 | Final `/polish` pass over the whole page. Run last, after every other row is done or struck | Critique 2, step 6 | M | 1 | todo |

## How the L item would split

**B5, Offerings page.** (a) A short design note under this heading for Nick to approve: page
outline, what the menu and hero links say, where the email link sits. (b) Move the shared CSS out
of `index.html` into one stylesheet both pages load, with its `put` line, and prove the home page
is unchanged. (c) Build `offerings.html` with Nick's text for drum circles and acting classes.
(d) Add the email link and the menu and hero links on both pages, and make room for a fourth
menu link at 390px. Steps (c) and (d) cannot start without Nick's content and the contact address.

## Open with Nick (asked 2026-11-24)

- Anything to strike or move up.
- Whether B5 is split into its four steps now.
- Whether batch sessions push to `master` (each row goes live as it lands) or only merge locally.
- B5 needs the Offerings text and the contact address; B19 needs larger original photos. Without
  them those rows will be marked blocked when a session reaches them.
- B17 and B18 each need a choice from Nick; a session will mark them needs-decision with a
  recommendation rather than guess.
