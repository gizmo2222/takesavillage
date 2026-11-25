// Style fingerprint for the Takes a Village page: a hash of every element's box and key computed
// styles (and its ::before/::after), after images load and animations finish. Run it before and after
// a refactor that should not change the look; equal hashes at a width mean nothing moved there.
// In the preview: await (0,eval)(await (await fetch('/docs/style-fingerprint.js?'+Date.now())).text())
// Added 2026-11-25 (backlog B5b): 1280x900 gave -2029960734, 390x844 gave -142721446 (any later change alters them).
(async () => {
  document.querySelectorAll('img').forEach(i => i.loading = 'eager');
  await new Promise(r => setTimeout(r, 1000));
  document.getAnimations().forEach(a => { try { a.finish(); } catch (e) {} });
  window.scrollTo({ top: 0, behavior: 'instant' });
  const props = ['color','background-color','background-image','font-family','font-size','font-weight','font-style','line-height','letter-spacing','transform','box-shadow','text-shadow','display','position','margin-top','padding-top','border-top','opacity','mask-image','animation-name'];
  const parts = [];
  for (const el of document.querySelectorAll('body *')) {
    const r = el.getBoundingClientRect();
    const line = [el.tagName, Math.round(r.left), Math.round(r.top + scrollY), Math.round(r.width), Math.round(r.height)];
    for (const ps of [null, '::before', '::after']) {
      const cs = getComputedStyle(el, ps);
      if (ps && cs.content === 'none') continue;
      line.push(ps || '', ...props.map(p => cs.getPropertyValue(p)));
    }
    parts.push(line.join('|'));
  }
  const s = parts.join('\n');
  let h = 0; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return JSON.stringify({ w: innerWidth, n: parts.length, len: s.length, hash: h, height: document.documentElement.scrollHeight });
})()
