const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Paddle settings
const paddleWidth = 10, paddleHeight = 80;
let paddle1Y = canvas.height / 2 - paddleHeight / 2;
let paddle2Y = canvas.height / 2 - paddleHeight / 2;
const paddleSpeed = 6;

// Ball settings
let ballX = canvas.width / 2, ballY = canvas.height / 2;
let ballSpeedX = 5, ballSpeedY = 3;
const ballSize = 10;

// Player movement
let upPressed = false, downPressed = false;

// AI movement
function moveAI() {
    let paddleCenter = paddle2Y + paddleHeight / 2;
    if (paddleCenter < ballY - 35) paddle2Y += paddleSpeed;
    else if (paddleCenter > ballY + 35) paddle2Y -= paddleSpeed;
}

// Ball movement
function moveBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Bounce off top and bottom
    if (ballY <= 0 || ballY >= canvas.height) {
        ballSpeedY = -ballSpeedY;
    }

    // Left paddle collision
    if (ballX <= paddleWidth && ballY > paddle1Y && ballY < paddle1Y + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }

    // Right paddle collision
    if (ballX >= canvas.width - paddleWidth - ballSize && ballY > paddle2Y && ballY < paddle2Y + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }

    // Reset ball if out of bounds
    if (ballX < 0 || ballX > canvas.width) {
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
        ballSpeedX = -ballSpeedX;
    }
}

// Player movement logic
function movePlayer() {
    if (upPressed && paddle1Y > 0) {
        paddle1Y -= paddleSpeed;
    }
    if (downPressed && paddle1Y < canvas.height - paddleHeight) {
        paddle1Y += paddleSpeed;
    }
}

// Key event listeners
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") upPressed = true;
    if (e.key === "ArrowDown") downPressed = true;
});
document.addEventListener("keyup", (e) => {
    if (e.key === "ArrowUp") upPressed = false;
    if (e.key === "ArrowDown") downPressed = false;
});

// Draw everything
function draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw paddles
    ctx.fillStyle = "white";
    ctx.fillRect(0, paddle1Y, paddleWidth, paddleHeight);
    ctx.fillRect(canvas.width - paddleWidth, paddle2Y, paddleWidth, paddleHeight);

    // Draw ball
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballSize, 0, Math.PI * 2);
    ctx.fill();
}

// Game loop
function gameLoop() {
    movePlayer();
    moveAI();
    moveBall();
    draw();
    requestAnimationFrame(gameLoop);
}

// Start game
gameLoop();
