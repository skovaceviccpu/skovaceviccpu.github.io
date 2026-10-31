// Which nav headers appear on the live site: true = shown, false = hidden.
// A hidden page disappears from the navigation and redirects visitors to the homepage.
// (About is the homepage and is always shown.)
var SITE_PAGES = {
  writing: true,
  code: true
};

(function () {
  var hidden = Object.keys(SITE_PAGES).filter(function (p) { return !SITE_PAGES[p]; });
  if (!hidden.length) return;

  var style = document.createElement('style');
  style.textContent = hidden.map(function (p) { return 'a[data-page="' + p + '"]'; }).join(',') +
    '{display:none !important}';
  document.head.appendChild(style);

  var current = document.documentElement.getAttribute('data-page');
  if (hidden.indexOf(current) !== -1) {
    var robots = document.createElement('meta');
    robots.name = 'robots';
    robots.content = 'noindex';
    document.head.appendChild(robots);
    location.replace(document.currentScript.src.replace(/site-config\.js.*$/, 'index.html'));
  }
})();
