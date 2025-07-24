```javascript
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gravity = 0.5;
let score = 0;
let gameSpeed = 6;
let gameOver = false;
let obstacles = [];
let clouds = [];
let birds = [];
let frame = 0;

const sonicomanIdle = new Image();
sonicomanIdle.src = "assets/sonicoman.png";

const sonicomanRun = new Image();
sonicomanRun.src = "assets/sonicoman.gif";

const floorImg = new Image();
floorImg.src = "assets/floor.png";

const cloudImg = new Image();
cloudImg.src = "assets/cloud.png";

const birdImgs = ["assets/bird1.png", "assets/bird2.png"].map(src => {
  const img = new Image();
  img.src = src;
  return img;
});

const obstacleImgs = [
  "assets/martini1.png", "assets/martini2.png",
  "assets/martini3.png", "assets/martini4.png",
  "assets/palm1.png", "assets/palm2.png",
  "assets/palm3.png", "assets/palm4.png"
].map(src => {
  const img = new Image();
  img.src = src;
  return img;
});

const gameOverImg = new Image();
gameOverImg.src = "assets/gameover.png";

const restartImg = new Image();
restartImg.src = "assets/restart.png";

let runner = {
  x: 50,
  y: 220,
  width: 60,
  height: 60,
  dy: 0,
  jumping: false,
  draw() {
    if (!gameOver) {
      ctx.drawImage(sonicomanRun, this.x, this.y, this.width, this.height);
    } else {
      ctx.drawImage(sonicomanIdle, this.x, this.y, this.width, this.height);
    }
  },
  update() {
    if (this.y < 220) {
      this.dy += gravity;
      this.y += this.dy;
    } else {
      this.y = 220;
      this.dy = 0;
      this.jumping = false;
    }
  },
  jump() {
    if (!this.jumping) {
      this.dy = -10;
      this.jumping = true;
    }
  }
};

function drawFloor() {
  ctx.drawImage(floorImg, -frame % canvas.width, 280, canvas.width, 20);
  ctx.drawImage(floorImg, (-frame % canvas.width) + canvas.width, 280, canvas.width, 20);
}

function spawnObstacle() {
  const img = obstacleImgs[Math.floor(Math.random() * obstacleImgs.length)];
  obstacles.push({ x: canvas.width, y: 240, width: 40, height: 60, img });
}

function spawnCloud() {
  clouds.push({ x: canvas.width, y: Math.random() * 50 + 20 });
}

function spawnBird() {
  birds.push({ x: canvas.width, y: Math.random() * 100 + 80, frame: 0 });
}

function drawObstacles() {
  for (let i = 0; i < obstacles.length; i++) {
    const obs = obstacles[i];
    ctx.drawImage(obs.img, obs.x, obs.y, obs.width, obs.height);
    obs.x -= gameSpeed;

    if (obs.x + obs.width < 0) {
      obstacles.splice(i, 1);
      i--;
      score++;
    }

    // Collision
    if (
      runner.x < obs.x + obs.width &&
      runner.x + runner.width > obs.x &&
      runner.y < obs.y + obs.height &&
      runner.y + runner.height > obs.y
    ) {
      gameOver = true;
    }
  }
}

function drawClouds() {
  for (let cloud of clouds) {
    ctx.drawImage(cloudImg, cloud.x, cloud.y, 60, 30);
    cloud.x -= 2;
  }
}

function drawBirds() {
  for (let bird of birds) {
    const img = birdImgs[Math.floor(frame / 10) % 2];
    ctx.drawImage(img, bird.x, bird.y, 40, 40);
    bird.x -= 4;
  }
}

function drawUI() {
  ctx.fillStyle = "#000";
  ctx.font = "20px sans-serif";
  ctx.fillText("Score: " + score, 700, 30);

  if (gameOver) {
    ctx.drawImage(gameOverImg, 300, 100, 200, 50);
    ctx.drawImage(restartImg, 350, 170, 100, 50);
  }
}

function resetGame() {
  obstacles = [];
  birds = [];
  clouds = [];
  frame = 0;
  score = 0;
  gameOver = false;
}

canvas.addEventListener("click", e => {
  if (gameOver) {
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    if (clickX >= 350 && clickX <= 450 && clickY >= 170 && clickY <= 220) {
      resetGame();
    }
  } else {
    runner.jump();
  }
});

document.addEventListener("keydown", e => {
  if (e.code === "Space") runner.jump();
});

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawFloor();

  if (!gameOver) {
    if (frame % 90 === 0) spawnObstacle();
    if (frame % 300 === 0) spawnCloud();
    if (frame % 240 === 0) spawnBird();
  }

  drawClouds();
  drawBirds();
  drawObstacles();
  runner.update();
  runner.draw();
  drawUI();

  frame++;
  requestAnimationFrame(gameLoop);
}

gameLoop();
```
