document.addEventListener("DOMContentLoaded", () => {
    const saucer = document.getElementById("saucer");
    const container = document.querySelector(".container");

    if (!saucer || !container) {
        console.error("Saucer or container element not found!");
        return;
    }

    // Function to show/hide the saucer based on screen width
    function toggleSaucerVisibility() {
        const screenWidth = window.innerWidth;
        if (screenWidth <= 1000) {
            saucer.style.display = 'none'; // Hide the saucer
        } else {
            saucer.style.display = 'block'; // Show the saucer
        }
    }

    // Ensure the saucer stays within the container's dimensions
    function getRandomPosition() {
        const containerWidth = container.offsetWidth;
        const containerHeight = container.offsetHeight;
        const screenWidth = window.innerWidth;

        if (screenWidth <= 1000) {
            saucer.style.display = 'none'; // Hide the saucer
        } else {
            saucer.style.display = 'block'; // Show the saucer
        }

        // If the screen width is greater than 1000px, generate a random position
        const maxX = containerWidth - saucer.offsetWidth;
        const maxY = containerHeight - saucer.offsetHeight;

        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;

        return { x: randomX, y: randomY };
    }

    function moveSaucer() {
        const { x, y } = getRandomPosition();
        saucer.style.transform = `translate(${x}px, ${y}px)`;
        setTimeout(moveSaucer, 10000); // Move every 3 seconds
    }

    // Initial check for saucer visibility
    toggleSaucerVisibility();

    // Start moving the saucer if it's visible
    if (saucer.style.display !== 'none') {
        moveSaucer();
    }

    // Add an event listener to handle window resizing
    window.addEventListener('resize', () => {
        // Recalculate the saucer's visibility and position when resizing
        toggleSaucerVisibility();
        if (saucer.style.display !== 'none') {
            const { x, y } = getRandomPosition();
            saucer.style.transform = `translate(${x}px, ${y}px)`;
        }
    });
});
