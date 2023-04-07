const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const startBtn = document.getElementById("startBtn");
const scoreSpan = document.getElementById("score");

let isGameRunning = false;
let score = 0;

const paddleHeight = 10;
const paddleWidth = 75;
const ballRadius = 8;

let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;
let paddleX = (canvas.width - paddleWidth) / 2;

const drawBall = () => {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.closePath();
};

const drawPaddle = () => {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.closePath();
};

const draw = () => {
    if (!isGameRunning) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if (y + dy < ballRadius) {
        dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
            score++;
            scoreSpan.innerText = score;
        } else {
            isGameRunning
            isGameRunning = false;
            alert("Гру закінчено!");
            score = 0;
            scoreSpan.innerText = score;
            x = canvas.width / 2;
            y = canvas.height - 30;
            dx = 2;
            dy = -2;
            paddleX = (canvas.width - paddleWidth) / 2;
            return;
        }
    }

    x += dx;
    y += dy;

    requestAnimationFrame(draw);
};
canvas.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    const root = document.documentElement;
    const mouseX = e.clientX - rect.left - root.scrollLeft;
    const paddleXNew = mouseX - paddleWidth / 2;
    if (paddleXNew >= 0 && paddleXNew + paddleWidth <= canvas.width) {
        paddleX = paddleXNew;
    }
});

startBtn.addEventListener("click", () => {
    if (!isGameRunning) {
        isGameRunning = true;
        draw();
    }
});