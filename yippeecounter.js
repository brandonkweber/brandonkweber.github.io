// Fetch the current counter value when the page loads
async function fetchCounter() {
    try {
        const response = await fetch("https://dry-hamlet-73350-c27e85a556ce.herokuapp.com/counter");
        const data = await response.json();
        document.getElementById("counter").innerText = data.count;
    } catch (error) {
        console.error("Error fetching counter:", error);
    }
}

// Fetch the current counter when the page loads
fetchCounter();

document.getElementById("clickableImage").addEventListener("click", async () => {
    try {
        const response = await fetch("https://dry-hamlet-73350-c27e85a556ce.herokuapp.com/clickAlien", { method: "POST" });
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