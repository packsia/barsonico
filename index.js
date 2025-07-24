const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gravity = 0.5;
let gameSpeed = 6;
let gameOver = false;
let gameStarted = false;

let sonicomanIdle = new Image();
sonicomanIdle.src = "assets/sonicoman.png";
let sonicomanRun = new Image();
sonicomanRun.src = "assets/sonicoman.gif";
let sonicomanImage = sonicomanIdle;

let runner = {
  x: 50,
  y: 220,
  width: 80,
  height: 80,
  velocityY: 0,
  jumping: false
};

function startGame() {
  if (!gameStarted) {
    gameStarted = true;
    sonicomanImage = sonicomanRun;
    document.getElementById('startButton').style.display = 'none';
    document.getElementById('jumpButton').style.display = 'block';
    requestAnimationFrame(gameLoop);
  }
}

function jump() {
  if (!runner.jumping && gameStarted) {
    runner.velocityY = -10;
    runner.jumping = true;
  }
}

document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    if (!gameStarted) startGame();
    else jump();
  }
});

function drawRunner() {
  ctx.drawImage(sonicomanImage, runner.x, runner.y, runner.width, runner.height);
}

function update() {
  if (!gameStarted || gameOver) return;
  runner.velocityY += gravity;
  runner.y += runner.velocityY;
  if (runner.y >= 220) {
    runner.y = 220;
    runner.jumping = false;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawRunner();
  if (gameOver) {
    ctx.fillStyle = "#800";
    ctx.font = "32px sans-serif";
    ctx.fillText("GAME OVER", canvas.width / 2 - 80, canvas.height / 2);
  }
}

function gameLoop() {
  update();
  draw();
  if (!gameOver) requestAnimationFrame(gameLoop);
}
