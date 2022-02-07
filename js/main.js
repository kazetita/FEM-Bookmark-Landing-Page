const btnToggleNav = document.querySelector('.nav-primary__toggle');
const menuWrapper = document.querySelector('.nav-primary__menu-wrapper');
const logoNav = document.querySelector('.nav-primary .logo');

const toggleMenu = function(e) {
  this.classList.toggle('nav-primary__toggle--open');
  menuWrapper.classList.toggle('nav-primary__menu-wrapper--visible');
  logoNav.classList.toggle('logo--light-on-sm');
};

btnToggleNav.addEventListener('click', toggleMenu);

