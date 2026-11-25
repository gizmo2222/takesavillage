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
| B4 | Show section off navy onto paper, taped flier the only dark object, title glow removed; waves and contrast rows redone | Critique 2, decided; step 2 | M | 3 | todo |
| B5a | Offerings page, design note for Nick to approve: page outline, what the menu and hero links say, where the email link sits. Write it under "Offerings page" below and mark this row needs-decision | Planned additions; Critique 2, P1; step 5 | S | 3 | todo |
| B5b | Move the shared CSS out of `index.html` into one stylesheet with its `put` line; prove the home page is unchanged at both widths | Split of B5 | M | 3 | todo |
| B5c | Build `offerings.html` for drum circles and acting classes | Split of B5 | M | 3 | blocked: needs B5a approved and Nick's text |
| B5d | Email inquiry link, menu and hero links on both pages, room for a fourth menu link at 390px | Split of B5 | S | 3 | blocked: needs B5c and the contact address |
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
| B19 | Larger gallery originals (the current ones are 512px tall, so the large view is soft) | Follow-ups | S | 1 | blocked: needs larger original photos from Nick |
| B20 | Final `/polish` pass over the whole page. Run last, after every other row is done or struck | Critique 2, step 6 | M | 1 | todo |

## Offerings page

B5 was split on 2026-11-25 into B5a to B5d (rows above). B5a's design note goes here.

## Notes for later sessions

- `core.autocrlf` is on: after a merge or branch switch `index.html` is CRLF in the working copy
  (blobs are LF). A script that matches multi-line text must match `
`, not `
`.
- `docs/CRITIQUE.md`, "Left as it was", still lists Baloo 2 headings; B11 can mark that closed by B2.

## Decided with Nick, 2026-11-25

- Order stands as listed; nothing struck.
- Batch sessions push to `master`.
- Not answered, so the recommended default applies: B5 is split into four rows; B5c, B5d and B19
  are blocked until Nick supplies the Offerings text, the contact address and larger photos.
- B17 (hero discs) and B18 (JavaScript so Escape closes a photo) each need Nick's choice: a
  session marks them needs-decision with a recommendation rather than guess.
