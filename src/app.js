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
  freeMode: true,
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
    },
    1440: {
      slidesPerView: 3,
    },
  },
});
