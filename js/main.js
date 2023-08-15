// slider
const slider = document.querySelector('.slider');
let slideIndex = 0;

function showSlide(index) {
  const slideHeight = slider.clientHeight;
  slider.style.transform = `translateY(-${index * slideHeight}px)`;
}

function nextSlide() {
  slideIndex = (slideIndex + 1) % slider.children.length;
  showSlide(slideIndex);
}

function prevSlide() {
  slideIndex = (slideIndex - 1 + slider.children.length) % slider.children.length;
  showSlide(slideIndex);
}

// Optional: Auto-play the slider
let interval;

function startAutoPlay() {
  interval = setInterval(nextSlide, 2000);
}

function stopAutoPlay() {
  clearInterval(interval);
}

slider.addEventListener('mouseenter', stopAutoPlay);
slider.addEventListener('mouseleave', startAutoPlay);

// Start the auto-play on page load
startAutoPlay();

// navbar
const navbar = document.querySelector('nav');
const headerHeight = document.querySelector('header').offsetHeight;

let timeoutId;

function handleScroll() {
  if (window.scrollY > headerHeight) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

function debounce(func, delay) {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(func, delay);
}

window.addEventListener('scroll', () => {
  debounce(handleScroll, 50);
});

let nav = document.querySelector("nav");
let burgerBtn = document.querySelector("#menu-btn");
let closeBtn = document.querySelector(".closeMenu");

burgerBtn.addEventListener("click", () => {
  nav.style.top = "0"; // Show the navigation menu by moving it down from the top
});

closeBtn.addEventListener("click", () => {
  nav.style.top = "-100vh"; // Hide the navigation menu by moving it back up
});