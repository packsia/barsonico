```javascript
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let sonicomanIdle = new Image();
sonicomanIdle.src = "assets/sonicoman.png";

let sonicomanRun = new Image();
sonicomanRun.src = "assets/sonicoman.gif";

let floor = new Image();
floor.src = "assets/floor.png";

let cloud = new Image();
cloud.src = "assets/cloud.png";

let birdFrames = ["assets/bird1.png", "assets/bird2.png"];
let birds = birdFrames.map(src => { let img = new Image(); img.src = src; return img; });

let obstacles = [
  "assets/martini1.png", "assets/martini2.png", "assets/martini3.png", "assets/martini4.png",
  "assets/palm1.png", "assets/palm2.png", "assets/palm3.png", "assets/palm4.png"
].map(src => { let img = new Image(); img.src = src; return img; });

let gameover = new Image();
gameover.src = "assets/gameover.png";

let restart = new Image();
restart.src = "assets/restart.png";

// TO DO: Implement game loop
// - Draw runner
// - Move ground
// - Animate clouds, birds
// - Randomize obstacles
// - Handle collision detection
// - Draw Game Over and Restart logic
```
