document.addEventListener("DOMContentLoaded", () => {
    const saucer = document.querySelector('.saucer');
    const chatHeader = document.querySelector(".chat-header");
    const chatBody = document.querySelector(".chat-body");
    const messages = document.getElementById("messages");
    const chatInput = document.getElementById("chatInput");
    const sendBtn = document.getElementById("sendBtn");
  
    // Toggle chat box visibility
    chatHeader.addEventListener("click", () => {
      chatBody.style.display = chatBody.style.display === "flex" ? "none" : "flex";
    });
  
    const socket = io('https://fast-atoll-81814-a5723ac349f5.herokuapp.com/'); // Connect to the server
    socket.on('connect', () => {
      console.log('Connected to the server');
    });
  
    
    // Function to append a message
    function appendMessage(content, sender = "user") {
      const message = document.createElement("div");
      message.className = `message ${sender}`;
      message.textContent = content;
      messages.appendChild(message);
      messages.scrollTop = messages.scrollHeight; // Auto-scroll to the bottom
    }
    
    // Send message to the server
    sendBtn.addEventListener("click", () => {
      const messageText = chatInput.value.trim();
      if (messageText) {
        appendMessage(`You: ${messageText}`, "user");
        socket.emit("chat message", messageText); // Send message to the server
        chatInput.value = ""; // Clear input field
      }
    });
    
    // Receive messages from the server
    socket.on("chat message", (msg) => {
      appendMessage(`Guest: ${msg}`, "bot");
    });
    
    // Handle Enter key press
    chatInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        sendBtn.click();
      }
    });
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