// Enhances the large photo views (.lightbox), which work without this file through CSS :target.
// With it: opening, stepping through or closing a view replaces the history entry instead of
// adding a Back step, Escape closes the open view, and keyboard focus follows: into the view on
// its Close link (or the same Previous/Next link when stepping), and back to the photo on close.
(function () {
  var view = '.shot, .poster-open, .lightbox a';
  function show(hash, from) {
    var was = document.querySelector('.lightbox:target');
    location.replace(hash);
    var now = document.querySelector('.lightbox:target');
    var label = from && from.getAttribute('aria-label');
    var next = now
      ? (label && now.querySelector('.lightbox-bar a[aria-label="' + label + '"]')) ||
        now.querySelector('.lightbox-bar a:last-child')
      : was && document.querySelector('.shot[href="#' + was.id + '"], .poster-open[href="#' + was.id + '"]');
    if (next) next.focus({ preventScroll: true });
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest(view);
    if (!a || !a.hash || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    show(a.hash, a);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var open = document.querySelector('.lightbox:target');
    var close = open && open.querySelector('.lightbox-backdrop');
    if (close) show(close.hash);
  });
})();
