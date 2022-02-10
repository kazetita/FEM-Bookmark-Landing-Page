// NAV
const btnToggleNav = document.querySelector('.nav-primary__toggle');
const menuWrapper = document.querySelector('.nav-primary__menu-wrapper');
const logoNav = document.querySelector('.nav-primary .logo');

const toggleMenu = function(e) {
  this.classList.toggle('nav-primary__toggle--open');
  menuWrapper.classList.toggle('nav-primary__menu-wrapper--visible');
  logoNav.classList.toggle('logo--light-on-sm');
};

btnToggleNav.addEventListener('click', toggleMenu);

// TAB LIST
const tabList = document.querySelector('.tab-list');
const tabListNavItems = tabList.querySelectorAll('.tab-list__nav-item');
let currentActiveNavItem= tabList.querySelector('.tab-list__nav-item--active');

const isTabActive = tab => tab.classList.contains('tab-list__nav-item--active');
const getTabItem = tab => tabList.querySelector(tab.children[0].getAttribute('href'));

const desactiveTab = function(tab) {
  if(!isTabActive(tab)) return;

  const tabItem = getTabItem(tab);
  tab.classList.remove('tab-list__nav-item--active');
  tabItem.classList.remove('tab-list__item--active');
};

const activeTab = function(tab) {
  if(isTabActive(tab)) return;

  const tabItem = getTabItem(tab);
  tab.classList.add('tab-list__nav-item--active');
  tabItem.classList.add('tab-list__item--active');
}

const handlerNavItemOnClick = function(e) {
  e.preventDefault();
  if(isTabActive(this)) return;

  desactiveTab(currentActiveNavItem);
  activeTab(this);
  currentActiveNavItem = this;
};

tabListNavItems.forEach(tab => tab.addEventListener('click', handlerNavItemOnClick));


