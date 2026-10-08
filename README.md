# Takes a Village LA

Website for **Takes a Village**, a Los Angeles nonprofit theater company staging intimate backyard performances at The Village in Van Nuys.

Live at **[takesavillage.la](https://takesavillage.la/)**.

One static page (`index.html`) with inline CSS. No build step, no JavaScript, no server code.

## Page sections

| Section | What's there |
|---|---|
| **Hero** | Logo, tagline, Instagram link, **Donate via Venmo** button (`@Takes-a-village1`) |
| **Intro** ("Hello, Friends!") | Who the company is |
| **Upcoming Events** | Placeholder until the next production is announced |
| **Past Production** | *Constellations* (May 2026): flier, description, performance dates (struck through), venue, credits |
| **Opening Night** | Scrolling photo strip from `gallery/` |
| **Footer** | Instagram link, copyright |

The sections are joined by curved SVG "waves". In each wave, the path ending `L1440,60 Z` fills **below** the curve and must use the **next** section's colour; the path ending `L1440,0 Z` fills **above** the curve and must use the **previous** section's colour.

Colours: teal `#2EADA3`, cream `#FFF6E8`, warm `#FDE8C0`, dark `#0d0d1a`, brown `#5C3317` (see `:root` in `index.html`). The hero gradient ends in warm.

## Common updates

- **Announce a new production:** replace the placeholder text in the Upcoming Events section. To feature it fully, copy the Past Production section's layout (flier, dates, venue, credits) into Upcoming Events.
- **After a production closes:** move it into Past Production, add the `past` class to each date (strikes it through), and swap in its flier and gallery.
- **Add gallery photos:** put them in `gallery/`, add an `<img>` with real `width`/`height` to the strip, **and** add a matching `put` line to the deploy workflow — it uploads each file by name.
- **New files of any kind** need a `put` line in `.github/workflows/deploy.yml`, or they won't reach the server.

## Deploy

Every push to `master` runs `.github/workflows/deploy.yml`, which uploads the files over SFTP to `takesavillage.la` (DreamHost). It can also be run from **Run workflow** on the Actions tab.

- Repo secrets: `SFTP_USER`, `SFTP_PASSWORD`
- The server's SSH host keys are pinned in `.github/known_hosts`. If the host ever changes them, refresh with `ssh-keyscan takesavillage.la > .github/known_hosts` (after confirming the change with the host).
