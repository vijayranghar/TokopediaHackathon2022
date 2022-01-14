const score = document.querySelector(".score");
const speed = document.querySelector(".speed");
const startScreen = document.querySelector(".startScreen");
const gameArea = document.querySelector(".gameArea");
const gameHeight = gameArea.offsetHeight;
const gameWidth = gameArea.offsetWidth;
const speedIncreasePoint = 1000;
const startScore = 0;
const startSpeed = 5;
let player = { speed: startSpeed, score: startScore };
let keys = {
  ArrowLeft: false,
  ArrowRight: false,
};

// addEventListener added
startScreen.addEventListener("click", start);
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

// Left key
document.getElementById("leftBtn").addEventListener("touchstart", (e) => {
  e.preventDefault();
  keys["ArrowLeft"] = true;
});
document.getElementById("leftBtn").addEventListener("touchend", (e) => {
  e.preventDefault();
  keys["ArrowLeft"] = false;
});

// Right Key
document.getElementById("rightBtn").addEventListener("touchstart", (e) => {
  e.preventDefault();
  keys["ArrowRight"] = true;
});
document.getElementById("rightBtn").addEventListener("touchend", (e) => {
  e.preventDefault();
  keys["ArrowRight"] = false;
});

// End addEventListener

// Game function start
function keyDown(e) {
  e.preventDefault();
  keys[e.key] = true;
}
function keyUp(e) {
  e.preventDefault();
  keys[e.key] = false;
}

function isCollide(a, b) {
  aRect = a.getBoundingClientRect();
  bRect = b.getBoundingClientRect();
  return !(
    aRect.bottom < bRect.top ||
    aRect.top > bRect.bottom ||
    aRect.right < bRect.left ||
    aRect.left > bRect.right
  );
}

function moveLines() {
  let lines = document.querySelectorAll(".lines");
  lines.forEach(function (item) {
    if (item.y >= gameHeight) {
      item.y -= gameHeight + 100;
    }
    item.y += player.speed;
    item.style.top = item.y + "px";
  });
}

function endGame() {
  player.start = false;
  startScreen.classList.remove("hide");
  startScreen.innerHTML =
    "Game Over <br> Final score: " +
    player.score +
    " " +
    "<br>Press again to restar";
}

function moveEnemy(car) {
  let enemy = document.querySelectorAll(".enemy");
  enemy.forEach(function (item) {
    if (isCollide(car, item)) {
      endGame();
    }
    if (item.y >= gameHeight) {
      item.y = -300;
      item.style.left = Math.floor(Math.random() * (gameWidth - 50)) + "px";
    }
    item.y += player.speed;
    item.style.top = item.y + "px";
  });
}

// On Game Play
function gamePlay() {
  let car = document.querySelector(".car");
  let road = gameArea.getBoundingClientRect();
  if (player.start) {
    moveLines();
    moveEnemy(car);

    if (keys.ArrowLeft && player.x > 0) {
      player.x -= player.speed;
    }
    if (keys.ArrowRight && player.x < road.width - 50) {
      player.x += player.speed;
    }
    car.style.top = player.y + "px";
    car.style.left = player.x + "px";
    window.requestAnimationFrame(gamePlay);

    // Score Update
    player.score++;

    // speed Update
    if (player.score % speedIncreasePoint === 0) {
      player.speed += 1;
    }

    // Dashboard Update
    const showScore = player.score - 1;
    const showSpeed = player.speed - 4;
    score.innerText = "Score: " + showScore;
    speed.innerText = "Speed: " + showSpeed;
  }
}

// On Start Game
function start() {
  startScreen.classList.add("hide");
  gameArea.innerHTML = "";
  player.start = true;
  player.score = startScore;
  player.speed = startSpeed;
  window.requestAnimationFrame(gamePlay);

  for (x = 0; x < 3; x++) {
    let roadLine = document.createElement("div");
    roadLine.setAttribute("class", "lines");
    roadLine.y = x * 350;
    roadLine.style.top = roadLine.y + "px";
    gameArea.appendChild(roadLine);
  }

  /*Add My Car;*/
  let car = document.createElement("div");
  car.setAttribute("class", "car");
  gameArea.appendChild(car);

  player.x = car.offsetLeft;
  player.y = car.offsetTop;

  /* Add new Enemy Car */
  for (x = 0; x < 3; x++) {
    let enemyCar = document.createElement("div");
    enemyCar.setAttribute("class", "enemy");
    enemyCar.y = (x + 1) * 350 * -1;
    enemyCar.style.top = enemyCar.y + "px";
    enemyCar.style.backgroundColor = randomColor();
    enemyCar.style.left = Math.floor(Math.random() * (gameWidth - 50)) + "px";
    gameArea.appendChild(enemyCar);
  }
}
function randomColor() {
  function c() {
    let hex = Math.floor(Math.random() * 256).toString(16);
    return ("0" + String(hex)).substr(-2);
  }
  return "#" + c() + c() + c();
}
