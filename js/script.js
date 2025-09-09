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

//Changelog
  let memos = [];
  let currentCategory = "active";

  // Load memos from JSON file
  async function loadMemos() {
    try {
      const response = await fetch("memos/memos.json");
      memos = await response.json();
      displayMemos();
    } catch (error) {
      console.error("Error loading memos:", error);
    }
  }

  // Display memos in the list
  function displayMemos() {
    const memoList = document.getElementById("memo-list");
    memoList.innerHTML = "";

    const filteredMemos = memos.filter(memo => memo.category === currentCategory);

    if (filteredMemos.length === 0) {
      memoList.innerHTML = "<p>No memos found.</p>";
      return;
    }

    filteredMemos.forEach(memo => {
      const div = document.createElement("div");
      div.classList.add("memo-item");
      div.textContent = memo.title;
      div.onclick = () => showMemo(memo);
      memoList.appendChild(div);
    });
  }

  // Show a memo's content
  function showMemo(memo) {
    const memoContent = document.getElementById("memo-content");
    memoContent.innerHTML = `
      <h2>${memo.title}</h2>
      <p>${memo.content}</p>
    `;
  }

  // Button handling
  document.getElementById("btn-active").onclick = () => switchCategory("active", "btn-active");
  document.getElementById("btn-future").onclick = () => switchCategory("future", "btn-future");
  document.getElementById("btn-completed").onclick = () => switchCategory("completed", "btn-completed");

  function switchCategory(category, btnId) {
    currentCategory = category;
    document.querySelectorAll(".changelog-buttons button").forEach(btn => btn.classList.remove("active"));
    document.getElementById(btnId).classList.add("active");
    displayMemos();
  }

  // Initial load
  loadMemos();
