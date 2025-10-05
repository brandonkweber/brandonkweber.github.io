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

  // Handle mobile side menu
  const tvContainer = document.querySelector('.tv-container');
  const isMobile = window.innerWidth <= 768;

  if (isMobile) {
    if (pageId === 'page-landing') {
      // Show full landing page
      tvContainer.classList.remove('has-active-page');
    } else {
      // Show side menu with active page
      tvContainer.classList.add('has-active-page');
      // Also show landing page as side menu
      document.getElementById('page-landing').classList.add('active');
    }
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
const homeSound = document.getElementById('home-sound');
const hoverSound = document.getElementById('hover-sound');
const channelEnterSound = document.getElementById('channel-enter-sound');
document.querySelectorAll('.clickable').forEach(el => {
  el.addEventListener('click', () => {
    clickSound.currentTime = 0;
    clickSound.volume = 0.5;
    clickSound.play();
  });
});

document.querySelectorAll('.homeable').forEach(el => {
  el.addEventListener('click', () => {
    setTimeout(() => {
      homeSound.currentTime = 0;
      homeSound.volume = 1;
      homeSound.play();
    }, 400);
  });
});

document.querySelectorAll('.channelenterable').forEach(el => {
  el.addEventListener('click', () => {
    setTimeout(() => {
      channelEnterSound.currentTime = 0;
      channelEnterSound.volume = 1;
      channelEnterSound.play();
    }, 100);
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
aboutMenuBtn.addEventListener("click", () => {
  showPage("page-info");
  setTimeout(() => {
    animateSkillsList();
  }, 300);
});
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
setInterval(showNextSlide, 7500); // change every 7.5s

// Add click listener to advance slideshow manually
const slideshowContainer = document.querySelector('.about-profile-circle-slideshow');
if (slideshowContainer) {
  slideshowContainer.addEventListener('click', () => {
    showNextSlide();
    // Add a subtle click feedback
    slideshowContainer.style.transform = 'scale(0.95)';
    setTimeout(() => {
      slideshowContainer.style.transform = 'scale(1)';
    }, 150);
  });

  // Add cursor pointer to indicate it's clickable
  slideshowContainer.style.cursor = 'pointer';
}

/* Skills List Animation */
function animateSkillsList() {
  const skills = document.querySelectorAll('.skill-item');
  skills.forEach((skill, index) => {
    setTimeout(() => {
      skill.style.opacity = '1';
      skill.style.transform = 'translateX(0)';
    }, index * 100);
  });
}

/* Skill Experience Data */
const skillExperience = {
  java: {
    name: "Java Spring Boot",
    level: "Advanced",
    experience: "4+ years of professional experience building enterprise-grade applications. Led development of Spring Boot microservices."
  },
  python: {
    name: "Python",
    level: "Intermediate",
    experience: "2+ years using Python automation scripts. Proficient with Django, Flask, pandas, and various data science libraries."
  },
  gcp: {
    name: "Google Cloud Platform",
    level: "Intermediate",
    experience: "2+ years architecting cloud solutions using GCP services including Compute Engine, Cloud SQL. Experience with Kubernetes and containerized deployments."
  },
  elastic: {
    name: "Elastic Stack",
    level: "Intermediate",
    experience: "2+ year implementing search and analytics solutions using Elasticsearch, Logstash, and Kibana. Built real-time monitoring dashboards and log aggregation systems."
  },
  looker: {
    name: "Looker",
    level: "Intermediate",
    experience: "1+ year creating business intelligence dashboards and data models. Experience with LookML and building self-service analytics for stakeholders."
  },
  react: {
    name: "React",
    level: "Novice",
    experience: "Familiar with hooks, context API, and state management. Experience with Next.js and component libraries."
  }
};

/* Skill Click Handler */
function handleSkillClick(skillItem) {
  const skillKey = skillItem.getAttribute('data-skill');
  const skillData = skillExperience[skillKey];

  if (!skillData) return;

  // Remove any existing tooltips
  const existingTooltips = document.querySelectorAll('.skill-tooltip');
  existingTooltips.forEach(tooltip => tooltip.remove());

  // Create tooltip
  const tooltip = document.createElement('div');
  tooltip.className = 'skill-tooltip';
  tooltip.innerHTML = `
    <div class="tooltip-content">
      <h4>${skillData.name}</h4>
      <div class="skill-level-badge">${skillData.level}</div>
      <p>${skillData.experience}</p>
      <div class="tooltip-close">Click anywhere to close</div>
    </div>
  `;

  document.body.appendChild(tooltip);

  // Position tooltip near the skill item
  const rect = skillItem.getBoundingClientRect();
  tooltip.style.position = 'fixed';
  tooltip.style.top = (rect.top - 20) + 'px';
  tooltip.style.left = (rect.right + 20) + 'px';
  tooltip.style.zIndex = '10000';

  // Adjust position if tooltip goes off screen
  const tooltipRect = tooltip.getBoundingClientRect();
  if (tooltipRect.right > window.innerWidth) {
    tooltip.style.left = (rect.left - tooltipRect.width - 20) + 'px';
  }
  if (tooltipRect.bottom > window.innerHeight) {
    tooltip.style.top = (rect.bottom - tooltipRect.height) + 'px';
  }

  // Remove tooltip when clicking anywhere
  const removeTooltip = () => {
    if (tooltip.parentNode) {
      document.body.removeChild(tooltip);
      document.removeEventListener('click', removeTooltip);
    }
  };

  setTimeout(() => {
    document.addEventListener('click', removeTooltip);
  }, 100);
}

/* Quest Tab Functionality */
const questData = {
  active: [
    {
      icon: "🚀",
      title: "Portfolio Enhancement Saga",
      difficulty: "epic",
      date: "Dec 2024",
      progress: 85,
      description: "Transform the portfolio with Wii-style interface, interactive elements, and modern animations. Added FAQ system, contact forms, and skill showcases.",
      rewards: ["+500 XP", "🎨 UI Master Badge"]
    },
    {
      icon: "🔍",
      title: "Search & Analytics Integration",
      difficulty: "rare",
      date: "Jan 2025",
      progress: 40,
      description: "Implement advanced search functionality and analytics dashboard using Elastic Stack and Looker integration.",
      rewards: ["+300 XP", "📊 Data Wizard Badge"]
    },
    {
      icon: "📱",
      title: "Mobile Optimization Quest",
      difficulty: "common",
      date: "Ongoing",
      progress: 70,
      description: "Optimize all components for mobile devices and improve touch interactions across the portfolio.",
      rewards: ["+150 XP", "📱 Mobile Master Badge"]
    }
  ],
  completed: [
    {
      icon: "🎮",
      title: "Wii Interface Design",
      difficulty: "epic",
      date: "Nov 2024",
      progress: 100,
      description: "Successfully implemented retro Nintendo Wii-style interface with authentic animations and sound effects.",
      rewards: ["+750 XP", "🎮 Retro Master Badge"]
    },
    {
      icon: "🎨",
      title: "Interactive Animations",
      difficulty: "rare",
      date: "Nov 2024",
      progress: 100,
      description: "Added smooth CSS animations, hover effects, and interactive elements throughout the portfolio.",
      rewards: ["+400 XP", "✨ Animation Wizard Badge"]
    }
  ],
  upcoming: [
    {
      icon: "🤖",
      title: "AI Integration Quest",
      difficulty: "legendary",
      date: "Q2 2025",
      progress: 0,
      description: "Integrate AI-powered features like smart recommendations and automated content generation.",
      rewards: ["+1000 XP", "🤖 AI Pioneer Badge"]
    },
    {
      icon: "🌐",
      title: "Multi-language Support",
      difficulty: "rare",
      date: "Q1 2025",
      progress: 0,
      description: "Add internationalization support with multiple language options for global accessibility.",
      rewards: ["+350 XP", "🌍 Global Citizen Badge"]
    }
  ]
};

function switchQuestTab(tabName) {
  // Update active tab
  document.querySelectorAll('.quest-tab').forEach(tab => {
    tab.classList.remove('active');
  });
  document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

  // Update quest list
  const questList = document.getElementById('quest-list');
  const quests = questData[tabName] || [];

  questList.innerHTML = '';

  quests.forEach((quest, index) => {
    const questItem = document.createElement('div');
    questItem.className = 'quest-item';
    questItem.setAttribute('data-difficulty', quest.difficulty);

    questItem.innerHTML = `
      <div class="quest-header">
        <span class="quest-icon">${quest.icon}</span>
        <div class="quest-info">
          <h4 class="quest-title">${quest.title}</h4>
          <div class="quest-meta">
            <span class="difficulty ${quest.difficulty}">${quest.difficulty.charAt(0).toUpperCase() + quest.difficulty.slice(1)} Quest</span>
            <span class="quest-date">${quest.date}</span>
          </div>
        </div>
        <div class="quest-progress">
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${quest.progress}%"></div>
          </div>
          <span class="progress-text">${quest.progress}%</span>
        </div>
      </div>
      <div class="quest-description">
        <p>${quest.description}</p>
        <div class="quest-rewards">
          ${quest.rewards.map(reward => `<span class="reward">${reward}</span>`).join('')}
        </div>
      </div>
    `;

    // Add staggered animation
    questItem.style.animationDelay = `${(index + 1) * 0.1}s`;
    questList.appendChild(questItem);
  });
}

// Add click listeners to skill items and quest tabs
document.addEventListener('DOMContentLoaded', function() {
  const skillItems = document.querySelectorAll('.skill-item');
  skillItems.forEach(skill => {
    skill.addEventListener('click', () => handleSkillClick(skill));
  });

  // Add quest tab listeners
  const questTabs = document.querySelectorAll('.quest-tab');
  questTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const tabName = tab.getAttribute('data-tab');
      switchQuestTab(tabName);
    });
  });
});

/* Contact Form Functionality */
function clearForm() {
  document.getElementById('subject').value = '';
  document.getElementById('body').value = '';
}

function handleContactForm(event) {
  event.preventDefault();

  const subject = document.getElementById('subject').value.trim();
  const body = document.getElementById('body').value.trim();

  if (!subject || !body) {
    alert('Please fill in both subject and message fields.');
    return;
  }

  // Create mailto URL with encoded subject and body
  const email = 'brandon@bkweber.com';
  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(body);
  const mailtoUrl = `mailto:${email}?subject=${encodedSubject}&body=${encodedBody}`;

  // Open mail app
  window.location.href = mailtoUrl;
}

/* FAQ Toggle Functionality */
function toggleFAQ(questionElement) {
  const faqItem = questionElement.parentElement;
  const isActive = faqItem.classList.contains('active');

  // Close all other FAQ items
  document.querySelectorAll('.faq-item.active').forEach(item => {
    if (item !== faqItem) {
      item.classList.remove('active');
    }
  });

  // Toggle current item
  if (isActive) {
    faqItem.classList.remove('active');
  } else {
    faqItem.classList.add('active');
  }

  // Play click sound
  const clickSound = document.getElementById('click-sound');
  if (clickSound) {
    clickSound.currentTime = 0;
    clickSound.volume = 0.5;
    clickSound.play();
  }
}

// Add event listener when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', handleContactForm);
  }
});

/* Keyboard Navigation for Photo Slideshow */
document.addEventListener('DOMContentLoaded', function() {
  const indicators = document.querySelectorAll('.indicator');
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        currentPhotoSlide(index + 1);
      }
    });
  });
});

showPage('page-landing');

// Handle window resize for mobile/desktop switching
window.addEventListener('resize', () => {
  const tvContainer = document.querySelector('.tv-container');
  const isMobile = window.innerWidth <= 768;
  const activePage = document.querySelector('.tv-screen.active:not(#page-landing)');

  if (!isMobile) {
    // Desktop mode - remove mobile side menu
    tvContainer.classList.remove('has-active-page');
  } else if (activePage) {
    // Mobile mode with active page - ensure side menu is shown
    tvContainer.classList.add('has-active-page');
    document.getElementById('page-landing').classList.add('active');
  }
});

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
