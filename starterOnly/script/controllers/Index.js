class Index {
  constructor() {
    this.hamburger = document.querySelector('.icon');
  }

  async initApp() {
    // toggle responsive navigation
    const toggleResponsiveNav = () => {
      const x = document.getElementById('myTopnav');
      if (x.className === 'topnav' && window.innerWidth < 768) {
        x.className += ' responsive';
      } else {
        x.className = 'topnav';
      }
    };
    this.hamburger.addEventListener('click', toggleResponsiveNav);
  }
}

const index = new Index();
index.initApp();
