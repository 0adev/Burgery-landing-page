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
  once: true,
  mirror: false,
});

const swiper = new Swiper(".swiper", {
  slidesPerView: 1,
  spaceBetween: 20,
  freeMode: false,
  loop: true,
  autoplay: {
    delay: 3500,
    disableOnInteraction: false,
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

// == DOM Init ==
const hamburgerMenu = document.querySelector(".hamburger-menu");
const menuList = document.querySelector(".nav-menu");
const backToTopButton = document.querySelector(".back-to-top-btn");
// menu page
const categoryItems = document.querySelectorAll(".category .item");
const menuCards = document.querySelectorAll(".menu-cards .card");
// contact page > faqs
const questions = document.querySelectorAll(".question");

const currentPage = window.location.pathname;

// Highlight active link
function highlightActiveLink() {
  const links = document.querySelectorAll(".nav-menu li a");

  links.forEach((link) => {
    const linkPath = new URL(link.href).pathname;

    if (linkPath === currentPage) {
      link.classList.add("active");
    }
  });
}

highlightActiveLink();

// == Toggle menu ==
// Debounce to avoid rapid clicks
let isThrottled = false;

function toggleMenu() {
  console.log(hamburgerMenu);
  console.log(menuList);
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

// == Back to top ==
function showBackToTopButton() {
  if (
    document.body.scrollTop > 300 ||
    document.documentElement.scrollTop > 300
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

// == MENU PAGE > filter burgers by category ==
const message = document.createElement("p");
message.classList.add("ff-primary", "fs-xl", "fw-semibold", "text-primary");
message.innerHTML = `
 <i class="fa-solid fa-circle-info"></i> Item Not Found!
`;
message.style.display = "none";

function filterCards(category) {
  let visibleCardCount = 0;

  // Show/Hide cards based on category
  menuCards.forEach((card) => {
    const cardCategory = card.getAttribute("data-category");

    if (category === "all") {
      card.style.display = "block";
      visibleCardCount++;
    } else {
      // Show only matching category cards
      if (cardCategory === category) {
        card.style.display = "block";
        visibleCardCount++;
      } else {
        card.style.display = "none";
      }
    }
  });

  if (visibleCardCount === 0) {
    document.querySelector(".menu-cards").appendChild(message);
    message.style.display = "block";
  } else {
    message.style.display = "none";
  }
}

categoryItems.forEach((item) => {
  item.addEventListener("click", function () {
    const selectedCategory = this.getAttribute("data-category");

    categoryItems.forEach((categoryItem) =>
      categoryItem.classList.remove("active")
    );

    this.classList.add("active");

    filterCards(selectedCategory);
    console.log(item);
  });
});

// == CONTACT PAGE > FAQS Toggle the questions ==

questions.forEach((question) => {
  function showTheAnswer() {
    const plusIcon = question.querySelector("i");
    const answer = question.querySelector(".answer");

    // Toggle the visibility of the answer
    if (answer.classList.contains("d-block")) {
      answer.classList.remove("d-block");
      answer.classList.add("d-none");
      plusIcon.classList.remove("rotate-135deg");
    } else {
      // Close all other answers before opening the current one
      questions.forEach((q) => {
        const ans = q.querySelector(".answer");
        const icon = q.querySelector("i");
        ans.classList.remove("d-block");
        ans.classList.add("d-none");
        icon.classList.remove("rotate-135deg");
      });

      // Show the clicked answer
      answer.classList.add("d-block");
      answer.classList.remove("d-none");
      plusIcon.classList.add("rotate-135deg");
    }
  }

  question.addEventListener("click", showTheAnswer);
});

// == Event listener ==
hamburgerMenu.addEventListener("click", toggleMenu);
// window.addEventListener("scroll", showBackToTopButton);
// backToTopButton.addEventListener("click", backToTop);
