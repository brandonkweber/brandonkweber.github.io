// Fetch the current counter value when the page loads
async function fetchCounter() {
    try {
        const response = await fetch("/counter");
        const data = await response.json();
        document.getElementById("counter").innerText = data.count;
    } catch (error) {
        console.error("Error fetching counter:", error);
    }
}

// Fetch the current counter when the page loads
fetchCounter();

// Ensure WebSocket URL matches your Heroku deployment
const socket = new WebSocket("wss://dry-hamlet-73350-c27e85a556ce.herokuapp.com"); // Change this to your actual Heroku WebSocket URL

// When the WebSocket connection opens, request the current count
socket.addEventListener("open", () => {
    console.log("Connected to WebSocket server");
});

// Listen for messages from the WebSocket server
socket.addEventListener("message", (event) => {
    const data = JSON.parse(event.data);

    // Update counter on page
    document.getElementById("counter").innerText = data.count;

    // 🔊 Play sound when instructed
    if (data.playSound) {
        const audio = document.getElementById("clickSound");
        if (audio) {
            audio.play().catch(err => console.error("Audio play error:", err));
        }
    }
});

document.getElementById("clickableImage").addEventListener("click", async () => {
    try {
        const response = await fetch("/click", { method: "POST" });
        const data = await response.json();
        document.getElementById("counter").innerText = data.count;

        // Play sound
        const audio = document.getElementById("clickSound");
        audio.currentTime = 0; // Restart sound if clicked multiple times
        audio.play().catch(err => console.error("Audio play error:", err));
    } catch (error) {
        console.error("Error updating counter:", error);
    }
});