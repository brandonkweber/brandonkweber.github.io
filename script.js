document.addEventListener("DOMContentLoaded", () => {
    const saucer = document.querySelector('.saucer');

    function moveSaucer() {
      // Get viewport dimensions
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Get saucer dimensions
      const saucerWidth = saucer.offsetWidth;
      const saucerHeight = saucer.offsetHeight;

      // Generate random positions within the screen bounds
      const randomX = Math.random() * (viewportWidth - saucerWidth);
      const randomY = Math.random() * (viewportHeight - saucerHeight);

      // Move the saucer
      saucer.style.transform = `translate(${randomX}px, ${randomY}px)`;
    }

    // Move the saucer every 3 seconds
    setInterval(moveSaucer, 10000);

    // Initial position
    moveSaucer();
});

document.addEventListener("DOMContentLoaded", () => {
  const chatHeader = document.querySelector(".chat-header");
  const chatBody = document.querySelector(".chat-body");
  const messages = document.getElementById("messages");
  const chatInput = document.getElementById("chatInput");
  const sendBtn = document.getElementById("sendBtn");

  // Toggle chat box visibility
  chatHeader.addEventListener("click", () => {
    chatBody.style.display = chatBody.style.display === "flex" ? "none" : "flex";
  });

  // Function to append a message
  function appendMessage(content, sender = "user") {
    const message = document.createElement("div");
    message.className = `message ${sender}`;
    message.textContent = content;
    messages.appendChild(message);
    messages.scrollTop = messages.scrollHeight; // Auto-scroll to the bottom
  }

  // Handle send button click
  sendBtn.addEventListener("click", () => {
    const messageText = chatInput.value.trim();
    if (messageText) {
      appendMessage(messageText, "user");
      chatInput.value = ""; // Clear input field

      // Simulate a bot response
      setTimeout(() => {
        appendMessage("Thanks for chatting! I still need to build this out with a backend so users can see each other's messages!", "bot");
      }, 1000);
    }
  });

  // Handle Enter key press
  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sendBtn.click();
    }
  });
});