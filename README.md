# Takes a Village LA

Website for **Takes a Village**, a Los Angeles nonprofit theater company staging intimate backyard performances at The Village in Van Nuys.

Live at **[takesavillage.la](https://takesavillage.la/)**.

One static page (`index.html`), a not-found page (`missing.html`) and one stylesheet (`site.css`, shared by every page). No build step and no server code. One small deferred script (`site.js`, home page only) enhances the large photo views: Escape closes one, and opening, stepping or closing one no longer adds a Back step; with it off they work as before, through CSS `:target`. When `site.css` or `site.js` changes, bump the `?v=` number where each page links it so returning visitors get the new copy.

`missing.html` is what DreamHost shows for any address that has no page (its Apache looks for that name in the site folder, so no `.htaccess` is needed). It is served at the missing address, so its links and asset paths start with `/`. Keep its menu links (`/#upcoming` and so on) in step with the home page's.

## Page sections

| Section | What's there |
|---|---|
| **Menu** | Sticky bar: What's next, Constellations, The Archive; a round back-to-top button follows the page |
| **Hero** | Logo, tagline, one sentence saying what the company does (`p.hero-line`), Instagram link, **Donate via Venmo** button (`@Takes-a-village1`) |
| **Intro** ("Hello, Friends!") | Who the company is, then the one-line "What's next" note (`p.next-note`, `id="upcoming"`, where the menu's "What's next" lands) |
| **Past Production** (`#constellations`) | *Constellations* (May 2026) on paper: taped flier (`constellations-flier.jpg`), description, run line ("May 8–23, 2026", seven performances), venue, credits |
| **Opening Night** | Six photos from `gallery/` in a strip that scrolls sideways; each opens a large view (`#photo-1` to `#photo-6`, CSS `:target`, enhanced by `site.js`) |
| **The Archive** (`#archive`) | "A Year in Three Acts": Season One as a playbill. Prologue and Acts One to Three, each scene with a ticket stub, most with a taped photo from `archive/`, a stage direction and a bill; the Unmasked poster opens a large view (`#poster-unmasked`, like the gallery's, at its own 360px); an intermission between Acts One and Two; a curtain call with the Instagram link and "Back to the top" |
| **Footer** | Instagram link, copyright |

The sections are joined by curved SVG "waves". In each wave, the path ending `L1440,60 Z` fills **below** the curve and must use the **next** section's colour; the path ending `L1440,0 Z` fills **above** the curve and must use the **previous** section's colour.

Colours: teal `#2EADA3`, cream `#FFF6E8`, warm `#FDE8C0`, brown `#5C3317` (see `:root` in `site.css`). The hero gradient ends in warm.

## Common updates

- **Announce a new production:** edit the "What's next" line at the end of the Intro (`p.next-note`). To feature it fully, add a section after the Intro that copies the Past Production section's layout (flier, dates, venue, credits), move `id="upcoming"` onto it, and recolour the waves either side by the rule above.
- **After a production closes:** move it into Past Production with a run line (`p.show-run`) in place of its dates, swap in its flier and gallery, and add it to the archive as a scene. Give a replaced image a new file name or a `?v=` query so returning visitors get the new copy.
- **Add gallery photos:** put them in `gallery/`, add an `<img>` with real `width`/`height` to the strip and a matching large view (`div.lightbox`; renumber the ids, the Previous/Next links and the "N of 6" counts), **and** add a matching `put` line to the deploy workflow — it uploads each file by name.
- **New files of any kind** need a `put` line in `.github/workflows/deploy.yml`, or they won't reach the server.

## Deploy

Every push to `master` runs `.github/workflows/deploy.yml`, which uploads the files over SFTP to `takesavillage.la` (DreamHost). It can also be run from **Run workflow** on the Actions tab.

- Repo secrets: `SFTP_USER`, `SFTP_PASSWORD`
- The server's SSH host keys are pinned in `.github/known_hosts`. If the host ever changes them, refresh with `ssh-keyscan takesavillage.la > .github/known_hosts` (after confirming the change with the host).
