"use strict";

const btnMenu = document.querySelector(".navbar__btns-bars");
const closeMenuBtn = document.querySelector(".main-nav__close");
const closeSearchBoxBtn = document.querySelector(".search-box__close");
const searchBtn = document.querySelector(".navbar__btns-search");
const navMenu = document.querySelector(".main-nav");
const allNavLink = document.querySelectorAll(".main-nav__link");
const searchBox = document.querySelector(".search-box");
const navbar = document.querySelector(".navbar");

// Navbar Menu & Search-box Action
const openMenu = function () {
  navMenu.classList.add("open");
};

const closeMenu = function () {
  navMenu.classList.remove("open");
};

const openSearchBox = function () {
  searchBox.classList.add("open");
};

const closeSearchBox = function () {
  searchBox.classList.remove("open");
};

btnMenu.addEventListener("click", function () {
  openMenu();
});

closeMenuBtn.addEventListener("click", function (e) {
  e.preventDefault();
  closeMenu();
});

document.addEventListener("keydown", function (e) {
  e.preventDefault();
  if (e.key === "Escape" && navMenu.classList.contains("open")) {
    closeMenu();
  }

  if (e.key === "Escape" && searchBox.classList.contains("open")) {
    closeSearchBox();
  }
});

searchBtn.addEventListener("click", function () {
  openSearchBox();
});

closeSearchBoxBtn.addEventListener("click", function () {
  closeSearchBox();
});

/////////////////////////////////////////////////////////////////

//Scrolling

allNavLink.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    navMenu.classList.remove("open");

    const href = link.getAttribute("href");

    if (href === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

////////////////////////////////////////////////////////////////

// Slider

const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".arrow--left");
  const btnRight = document.querySelector(".arrow--right");
  const dotContainer = document.querySelector(".dots");

  let curSlide = 0;
  const maxSlide = slides.length;

  // Function
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<div class="dots__dot" data-slide=${i}></div>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next Slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const preSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // Event Handlers
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", preSlide);

  document.addEventListener("keydown", function (e) {
    e.preventDefault();
    if (e.key === "ArrowLeft") preSlide();
    if (e.key === "ArrowRight") nextSlide();
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();

///////////////////////////////////////////////////////////////////

// Sticky Nav

const header = document.querySelector(".header");
const navHeight = navbar.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    navbar.classList.add("sticky");
    navMenu.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
    navMenu.classList.remove("sticky");
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

/////////////////////////////////////////////////////

// Reveal Sections
const allSections = document.querySelectorAll(".section");

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

/////////////////////////////////////////////////////////////

//Lazy Images
const imgTargets = document.querySelectorAll("img[data-src]");

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "200px",
});

imgTargets.forEach((img) => imgObserver.observe(img));

///////////////////////////////////////////////////////////
