function toggleSidebar() {
  const sideMenu = document.querySelector('.side-menu');
  const chevron = document.querySelector('.side-menu-right-chevron');
  sideMenu.classList.toggle('open');

  if (sideMenu.classList.contains('open')) {
    chevron.style.transform = 'rotate(180deg)';
  } else {
      chevron.style.transform = 'rotate(0deg)';
  }
}