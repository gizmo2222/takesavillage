// Contrast + overflow measurement for the Takes a Village page. Paste into the page context.
(() => {
  const parse = (s) => {
    const m = s.match(/rgba?\(([^)]+)\)/);
    if (!m) return null;
    const p = m[1].split(/[,\s/]+/).filter(Boolean).map(Number);
    return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 };
  };
  const over = (top, bottom) => ({
    r: top.r * top.a + bottom.r * (1 - top.a),
    g: top.g * top.a + bottom.g * (1 - top.a),
    b: top.b * top.a + bottom.b * (1 - top.a),
    a: 1,
  });
  const lin = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
  const lum = (c) => 0.2126 * lin(c.r) + 0.7152 * lin(c.g) + 0.0722 * lin(c.b);
  const ratio = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
  const hex = (c) => '#' + [c.r, c.g, c.b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('');

  const hero = document.querySelector('.hero');
  const heroTop = { r: 0xff, g: 0xf8, b: 0xee }, heroBot = { r: 0xfd, g: 0xe8, b: 0xc0 };
  const circleHit = (el, pseudo) => {
    // true when any corner of el lies inside the hero's decorative circle
    const cs = getComputedStyle(hero, pseudo), hr = hero.getBoundingClientRect(), r = el.getBoundingClientRect();
    const w = parseFloat(cs.width), h = parseFloat(cs.height);
    const left = cs.left !== 'auto' && pseudo === '::before' ? hr.left + parseFloat(cs.left) : hr.right - parseFloat(cs.right) - w;
    const top = pseudo === '::before' ? hr.top + parseFloat(cs.top) : hr.bottom - parseFloat(cs.bottom) - h;
    const cx = left + w / 2, cy = top + h / 2, rad = w / 2;
    return [[r.left, r.top], [r.right, r.top], [r.left, r.bottom], [r.right, r.bottom]]
      .some(([x, y]) => Math.hypot(x - cx, y - cy) < rad);
  };

  const bgOf = (el) => {
    // nearest ancestor with a solid background-color; the hero gradient is sampled at the element's bottom edge (its darkest point)
    let notes = '';
    for (let n = el; n; n = n.parentElement) {
      if (n === hero) {
        const hr = hero.getBoundingClientRect(), r = el.getBoundingClientRect();
        const t = Math.min(1, Math.max(0, (r.bottom - hr.top) / hr.height));
        let c = { r: heroTop.r + (heroBot.r - heroTop.r) * t, g: heroTop.g + (heroBot.g - heroTop.g) * t, b: heroTop.b + (heroBot.b - heroTop.b) * t, a: 1 };
        notes = 'gradient@' + Math.round(t * 100) + '%';
        if (circleHit(el, '::before')) { c = over({ r: 0x2e, g: 0xad, b: 0xa3, a: 0.08 }, c); notes += '+teal disc'; }
        if (circleHit(el, '::after')) { c = over({ r: 0xe8, g: 0x72, b: 0x1a, a: 0.08 }, c); notes += '+orange disc'; }
        return { c, notes };
      }
      const b = parse(getComputedStyle(n).backgroundColor);
      if (b && b.a > 0) return { c: b.a < 1 ? over(b, { r: 255, g: 255, b: 255, a: 1 }) : b, notes };
    }
    return { c: { r: 255, g: 255, b: 255, a: 1 }, notes: 'page' };
  };
  const opacityOf = (el) => { let o = 1; for (let n = el; n; n = n.parentElement) o *= parseFloat(getComputedStyle(n).opacity); return o; };

  const targets = [
    ['.site-nav a', 'Menu link'],
    ['.to-top', 'Back-to-top button arrow'],
    ['.tagline', 'Hero tagline'],
    ['.hero-line', 'Hero sentence (what the company does)'],
    ['.hero .ig-link', 'Hero Instagram link'],
    ['.donate-btn', 'Donate button text'],
    ['.intro h2', 'Intro heading'],
    ['.intro p', 'Intro paragraph'],
    ['.next-note', '"What\'s next" line under the intro'],
    ['.next-note a', '"What\'s next" Instagram link'],
    ['.show-title', 'Show title (Constellations)'],
    ['.show-presented', '.show-presented'],
    ['.show-run', 'Run line'],
    ['.show-run span', 'Run sub-label'],
    ['.show-desc', 'Show blurb'],
    ['.venue', 'Venue'],
    ['.credits', 'Credits'],
    ['.gallery-heading', '"Opening Night" heading'],
    ['.scene-dir', 'Archive stage direction'],
    ['.curtain-call .ig-link', 'Archive Instagram link'],
    ['.cc-top a', 'Back to the top'],
    // Round 2: labels that were resized or restyled
    ['.show-eyebrow', '"Past Production" eyebrow'],
    ['.gallery-cue', 'Gallery cue line'],
    ['.archive-eyebrow', 'Archive eyebrow'],
    ['.archive-masthead', 'Archive masthead'],
    ['.act-label', 'Act label'],
    ['.stub:not(.teal) .stub-top', 'Stub top (orange stub)'],
    ['.stub.teal .stub-top', 'Stub top (teal stub)'],
    ['.stub:not(.teal) .stub-foot', 'Stub foot (orange stub)'],
    ['.stub.teal .stub-foot', 'Stub foot (teal stub)'],
    ['.scene-kind', 'Scene kind'],
    ['.scene-body .scene-link', '"See the production" link'],
    ['.intermission-note', 'Intermission note'],
    ['.social-link', 'Footer Instagram link'],
    ['.copyright', 'Copyright line'],
    // the large photo view sits on a 94% dark sheet; measured over white, its lightest case
    ['.lightbox-bar a', 'Photo view links'],
    ['.lightbox-count', 'Photo view count'],
  ];
  const rows = targets.map(([sel, label]) => {
    const el = document.querySelector(sel);
    if (!el) return { label, missing: true };
    const cs = getComputedStyle(el);
    const { c: bg, notes } = bgOf(el);
    let fg = parse(cs.color);
    fg = { ...fg, a: fg.a * opacityOf(el) };
    const eff = over(fg, bg);
    const px = parseFloat(cs.fontSize), bold = parseInt(cs.fontWeight, 10) >= 700;
    const large = px >= 24 || (bold && px >= 18.66);
    const r = ratio(eff, bg);
    return { label, px: +px.toFixed(1), fg: hex(eff), bg: hex(bg), ratio: +r.toFixed(2), need: large ? 3 : 4.5, pass: r >= (large ? 3 : 4.5), notes };
  });

  // overflow: page-level, plus any element poking past the viewport outside a scroller or clipped box
  const de = document.documentElement, vw = de.clientWidth;
  const clipped = (el) => { for (let n = el.parentElement; n; n = n.parentElement) { const o = getComputedStyle(n); if (o.overflowX !== 'visible') return true; } return false; };
  const pokers = [...document.querySelectorAll('body *')].filter((el) => {
    const r = el.getBoundingClientRect();
    return r.width > 0 && (r.right > vw + 0.5 || r.left < -0.5) && !clipped(el);
  }).map((el) => el.tagName.toLowerCase() + (el.className && el.className.baseVal === undefined ? '.' + String(el.className).split(' ').join('.') : '')).slice(0, 10);

  const nav = document.querySelector('.site-nav ul');
  const navTops = [...nav.children].map((li) => Math.round(li.getBoundingClientRect().top));
  return JSON.stringify({
    viewport: innerWidth + 'x' + innerHeight,
    scrollWidth: de.scrollWidth, clientWidth: vw, overflow: de.scrollWidth > vw,
    pokers,
    pageHeight: de.scrollHeight,
    navOneLine: new Set(navTops).size === 1,
    navLinkHeight: Math.round(document.querySelector('.site-nav a').getBoundingClientRect().height),
    headings: [...document.querySelectorAll('h1,h2,h3')].map((h) => h.tagName + ':' + (h.textContent.trim() || h.querySelector('img')?.alt)),
    landmarks: ['header', 'nav', 'main', 'footer'].map((t) => t + '=' + document.querySelectorAll(t).length),
    fails: rows.filter((r) => !r.pass),
    rows,
  }, null, 1);
})()
