// Enhances the large photo views (.lightbox), which work without this file through CSS :target.
// With it: opening, stepping through or closing a view replaces the history entry instead of
// adding a Back step, and Escape closes the open view.
(function () {
  var view = '.shot, .poster-open, .lightbox a';
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest(view);
    if (!a || !a.hash || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    location.replace(a.hash);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var open = document.querySelector('.lightbox:target');
    var close = open && open.querySelector('.lightbox-backdrop');
    if (close) location.replace(close.hash);
  });
})();
