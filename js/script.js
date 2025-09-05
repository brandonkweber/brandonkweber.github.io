function showPage(pageId) {
  // hide all pages
  document.querySelectorAll('.tv-screen').forEach(el => {
    el.classList.remove('active');
  });

  // show the selected page
  const page = document.getElementById(pageId);
  if (page) {
    page.classList.add('active');
  }
}

const backBtnNodes = document.querySelectorAll('.back-button').forEach(el => {
  el.addEventListener("click", () => showPage("page-landing"));
});

document.querySelectorAll('.collapse-box').forEach(box => {
  const title = box.querySelector('.collapse-title-box');
  title.addEventListener('click', () => {
    box.classList.toggle('active');
  });
});

/* Sounds */
const clickSound = document.getElementById('click-sound');
const hoverSound = document.getElementById('hover-sound');
document.querySelectorAll('.clickable').forEach(el => {
  el.addEventListener('click', () => {
    clickSound.currentTime = 0;
    clickSound.volume = 0.5;
    clickSound.play();
  });
});

document.querySelectorAll('.clickable').forEach(el => {
  el.addEventListener('mouseenter', () => {
    const audio = new Audio('./assets/sounds/wii-hover.mp3');
    audio.volume = 0.2;
    audio.play();
  });
});

/* TODO: Clean this up */
const aboutMenuBtn = document.getElementById("option-about");
aboutMenuBtn.addEventListener("click", () => showPage("page-info"));
const workMenuBtn = document.getElementById("option-work");
workMenuBtn.addEventListener("click", () => showPage("page-work"));
const linksMenuBtn = document.getElementById("option-links");
linksMenuBtn.addEventListener("click", () => showPage("page-links"));
const faqMenuBtn = document.getElementById("option-faq");
faqMenuBtn.addEventListener("click", () => showPage("page-faq"));
const contactMenuBtn = document.getElementById("option-contact");
contactMenuBtn.addEventListener("click", () => showPage("page-contact"));
const changelogMenuBtn = document.getElementById("option-changelog");
changelogMenuBtn.addEventListener("click", () => showPage("page-changelog"));

/* About Profile Slideshow */
const slides = document.querySelectorAll('.about-profile-circle-slideshow img');
let index = 0;

function showNextSlide() {
  slides[index].classList.remove('active');
  index = (index + 1) % slides.length;
  slides[index].classList.add('active');
}

// start slideshow
slides[index].classList.add('active');
setInterval(showNextSlide, 7500); // change every 3s

showPage('page-info'); 