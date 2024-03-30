function checkPassword() {
    var password = document.getElementById("password").value;

    if (password === "test") {
        window.location.href = 'content.html';
    } else {
        alert("Incorrect password. Access denied!");
    }
    
}

        // Simulating a delay for demonstration purposes
        setTimeout(function() {
            // Remove the loading screen once the game is loaded
            document.getElementById('loading-screen').style.display = 'none';
        }, 2000);


        window.addEventListener('DOMContentLoaded', () => {
            const audio = document.getElementById('bg-music');
            const volumeSlider = document.getElementById('volume-slider');
          
            audio.volume = volumeSlider.value; // Set initial volume
          
            volumeSlider.addEventListener('input', () => {
              audio.volume = volumeSlider.value; // Update volume when slider changes
            });
            
              audio.play();
          });

          document.addEventListener('DOMContentLoaded', function() {
          const quotes = [
            "More to come soon...",
            "I feel a song coming on...",
            "Am I forgetting something...",
            "Time to reread One Piece..."
          ];

          const skillsMenuItem = document.querySelector('.menu-item.skills');
          const skillsSubMenu = document.querySelector('.skills .sub-menu');

          skillsMenuItem.addEventListener('click', function() {
            skillsSubMenu.classList.toggle('show');
          });
          
          let currentQuoteIndex = 0;

          function rotateQuotes() {
            const quoteText = document.getElementById("quote-text");
            const speechBubble = document.querySelector(".speech-bubble");
          
            // Set the quote text
            quoteText.textContent = quotes[currentQuoteIndex];
          
            // Show the speech bubble
            speechBubble.style.display = "block";
          
            // Increment the quote index
            currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
          }
          
          // Call rotateQuotes function when the animation iteration starts
          document.querySelector(".speech-bubble").addEventListener("animationiteration", rotateQuotes);
          
          // Initial quote rotation
          rotateQuotes();
        });

        /*Chat Scripts */

        document.addEventListener('DOMContentLoaded', function() {
          const chatLog = document.getElementById('chat-log');
          const messageInput = document.getElementById('message-input');
          const sendButton = document.getElementById('send-button');
          const clearButton = document.getElementById('clear-button');
    
          let username = getRandomAnimeName(); // Initialize username with a random anime name
    
          // Load chat messages and username from local storage on page load
          const savedMessages = localStorage.getItem('chatMessages');
          if (savedMessages) {
            chatLog.innerHTML = savedMessages;
          }
          const savedUsername = localStorage.getItem('chatUsername');
          if (savedUsername) {
            username = savedUsername;
          }
    
          sendButton.addEventListener('click', sendMessage);
          messageInput.addEventListener('keydown', function(event) {
            if (event.keyCode === 13) {
              sendMessage();
            }
          });
    
          clearButton.addEventListener('click', clearMessagesFromLocalStorage);
    
          function sendMessage() {
            const message = messageInput.value;
            if (message.startsWith('/user ')) {
              // If the message starts with '/user ', update the username
              const newUsername = message.substr(6);
              setUsername(newUsername);
            } else {
              displayMessage(username, message);
              saveMessagesToLocalStorage(); // Save chat messages to local storage
            }
            messageInput.value = '';
          }
    
          function displayMessage(username, message) {
            const messageElement = document.createElement('div');
            messageElement.textContent = username + ': ' + message;
            chatLog.appendChild(messageElement);
            chatLog.scrollTop = chatLog.scrollHeight;
          }
    
          function saveMessagesToLocalStorage() {
            localStorage.setItem('chatMessages', chatLog.innerHTML);
            localStorage.setItem('chatUsername', username);
          }
    
          function setUsername(newUsername) {
            username = newUsername;
            displayMessage('System', 'Username changed to: ' + username);
            saveMessagesToLocalStorage(); // Save the updated username to local storage
          }
    
          function getRandomAnimeName() {
            // Array of random anime character names
            const animeNames = [
              'Naruto',
              'Goku',
              'Sailor Moon',
              'Luffy',
              'Ichigo',
              'Light Yagami',
              'Spike Spiegel',
              'Levi Ackerman',
              'Eren Yeager',
              'Mikasa Ackerman'
            ];
    
            // Generate a random index to select a name from the array
            const randomIndex = Math.floor(Math.random() * animeNames.length);
            return animeNames[randomIndex];
          }
        });

        /* Quests */
  document.addEventListener('DOMContentLoaded', function() {
    const loadReadmeLink = document.getElementById('load-readme');
    const readmeContent = document.getElementById('readme-content');
    const markdownParser = new markdownit();
    let isReadmeVisible = false;

    loadReadmeLink.addEventListener('click', function(event) {
      event.preventDefault();
      isReadmeVisible = !isReadmeVisible; // Toggle visibility

      if (isReadmeVisible) {
        fetch('README.md')
          .then(response => response.text())
          .then(data => {
            const html = markdownParser.render(data);
            readmeContent.innerHTML = '<div class="markdown-body">' + html + '</div>';
            readmeContent.style.display = 'block';
          })
          .catch(error => {
            console.log('Error fetching README.md:', error);
          });
      } else {
        readmeContent.style.display = 'none';
      }
    });
  });
        /* Global Functions */
            // Declare clearMessagesFromLocalStorage as a global function
    window.clearMessagesFromLocalStorage = function() {
      const chatLog = document.getElementById('chat-log');
      chatLog.innerHTML = '';
      localStorage.removeItem('chatMessages');
      console.log('Chat messages cleared from the local storage');
    };
        