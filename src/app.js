// swiper
import Swiper from "swiper/bundle";
import "swiper/css/bundle";
// css files
import "./css/style.css";
// AOS
import AOS from "aos";
import "aos/dist/aos.css";

// init AOS animation
AOS.init({
  duration: 1000,
  offset: 100,
});

const swiper = new Swiper(".swiper", {
  slidesPerView: 1,
  spaceBetween: 20,
  freeMode: false,
  loop: true,
  autoplay: {
    delay: 3500,
    disableOnInteraction: true,
  },
  navigation: {
    nextEl: ".button-next",
    prevEl: ".button-prev",
  },
  breakpoints: {
    700: {
      slidesPerView: 2,
    },
    990: {
      slidesPerView: "auto",
      spaceBetween: 10,
    },
    1024: {
      slidesPerView: 3,
    },
    1440: {
      slidesPerView: 3,
    },
  },
});

// DOM Init
const hamburgerMenu = document.querySelector(".hamburger-menu");
const menuList = document.querySelector(".nav-menu");
const backToTopButton = document.querySelector(".back-to-top-btn");

// Debounce to avoid rapid clicks
let isThrottled = false;

function toggleMenu() {
  if (isThrottled) return; // Prevent rapid clicks
  isThrottled = true;

  if (menuList.classList.contains("show")) {
    closeMenu();
  } else {
    openMenu();
  }

  setTimeout(() => (isThrottled = false), 300);
}

function openMenu() {
  menuList.classList.add("show");
  hamburgerMenu.innerHTML = `<i class="fa-solid fa-x"></i>`;
  hamburgerMenu.setAttribute("aria-expanded", "true");
  hamburgerMenu.setAttribute("aria-label", "Close Menu");
}

function closeMenu() {
  menuList.classList.remove("show");
  hamburgerMenu.innerHTML = `<i class="fa-solid fa-bars"></i>`;
  hamburgerMenu.setAttribute("aria-expanded", "false");
  hamburgerMenu.setAttribute("aria-label", "Open Menu");
}

function showBackToTopButton() {
  if (
    document.body.scrollTop > 600 ||
    document.documentElement.scrollTop > 600
  ) {
    backToTopButton.classList.add("show");
  } else {
    backToTopButton.classList.remove("show");
  }
}

function backToTop(e) {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Event listener
hamburgerMenu.addEventListener("click", toggleMenu);
window.addEventListener("scroll", showBackToTopButton);
backToTopButton.addEventListener("click", backToTop);
