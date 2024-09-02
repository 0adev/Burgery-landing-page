import Swiper from "swiper/bundle";
import "swiper/css/bundle";
// css files
import "./css/style.css";

const swiper = new Swiper(".swiper", {
  enabled: true,
  slidesPerView: 1,
  spaceBetween: 20,
  freeMode: true,
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".button-next",
    prevEl: ".button-prev",
  },
  breakpoints: {
    550: {
      slidesPerView: 2,
    },
    1440: {
      slidesPerView: 3,
    },
  },
});
