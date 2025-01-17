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
