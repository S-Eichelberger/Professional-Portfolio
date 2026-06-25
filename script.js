const navToggle = document.getElementById('navToggle');
const siteNav = document.getElementById('siteNav');

navToggle.addEventListener('click', () => {
  siteNav.classList.toggle('show');
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 720) {
    siteNav.classList.remove('show');
  }
});
