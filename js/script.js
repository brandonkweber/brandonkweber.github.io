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

showPage('page-landing'); 