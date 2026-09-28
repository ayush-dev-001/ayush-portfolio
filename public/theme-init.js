// Set the theme before first paint to avoid a flash.
// Kept as a separate file (not inline) so the site can use a strict Content Security Policy.
;(function () {
  var t = null
  try { t = localStorage.getItem('theme') } catch (e) {}
  if (t !== 'light' && t !== 'dark') t = 'light' // default: light mode, unless the visitor chose dark before
  document.documentElement.dataset.theme = t
})()
