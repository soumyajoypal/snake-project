// Global variables
let foodX;
let foodY;
let snakeX = 5;
let snakeY = 10;
let velX = 0;
let velY = 0;
let intervalID;
let score = 0;
let highscore = 0;
const playArea = document.querySelector(".play-area");
const scoreText = document.querySelector(".score");
const highscoreText = document.querySelector(".high-score");
const resetIcon = document.querySelector(".reset-button");
const playButton = document.querySelector(".play-button");
let snakeBody = [];

const arrowUp = document.getElementById("arrow-up");
const arrowDown = document.getElementById("arrow-down");
const arrowLeft = document.getElementById("arrow-left");
const arrowRight = document.getElementById("arrow-right");

function genRandFood() {
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;
  for (let i = 0; i < snakeBody.length; i++) {
    if (
      (snakeBody[i][0] === foodX && snakeBody[i][1] === foodY) ||
      foodX <= 1 ||
      foodY <= 1 ||
      foodX >= 29 ||
      foodY >= 29
    ) {
      genRandFood();
    }
  }
}

arrowUp.addEventListener("click", () => {
  if (velY !== 1) {
    velX = 0;
    velY = -1;
  }
});
arrowDown.addEventListener("click", () => {
  if (velY !== -1) {
    velX = 0;
    velY = 1;
  }
});
arrowLeft.addEventListener("click", () => {
  if (velX !== 1) {
    velX = -1;
    velY = 0;
  }
});
arrowRight.addEventListener("click", () => {
  if (velX !== -1) {
    velX = 1;
    velY = 0;
  }
});

function arrowKeys(e) {
  let key = e.key;
  if ((key === "ArrowUp" || key === "w") && velY != 1) {
    velX = 0;
    velY = -1;
  } else if ((key === "ArrowDown" || key === "s") && velY != -1) {
    velX = 0;
    velY = 1;
  } else if ((key === "ArrowRight" || key === "d") && velX != -1) {
    velX = 1;
    velY = 0;
  } else if ((key === "ArrowLeft" || key === "a") && velX != 1) {
    velX = -1;
    velY = 0;
  }
}

function hScore() {
  highscore = JSON.parse(localStorage.getItem("hs")) || 0;
  highscoreText.innerHTML = `HighScore: ${highscore}`;
}
resetIcon.addEventListener("click", () => {
  localStorage.removeItem("hs");
  hScore();
});
hScore();

function scoreUpdate() {
  scoreText.innerHTML = `Score: ${score}`;
  if (highscore <= score) {
    highscore = score;
    highscoreText.innerHTML = `HighScore:${highscore}`;
    localStorage.setItem("hs", JSON.stringify(highscore));
  }
}

function showPopup() {
  clearInterval(intervalID);
  document.getElementById("overlay").style.display = "block";
  document.getElementById("popup").style.display = "block";
}

function hidePopup() {
  document.getElementById("overlay").style.display = "none";
  document.getElementById("popup").style.display = "none";
}

document
  .getElementById("playAgainButton")
  .addEventListener("click", function () {
    location.reload();
  });

function main() {
  let HTML = `<div class="food" style="grid-column:${foodX}; grid-row:${foodY}"></div>`;

  snakeX += velX;
  snakeY += velY;

  if (snakeX && snakeY)
    if (snakeX <= 0 || snakeY <= 0 || snakeY > 30 || snakeX > 30) {
      showPopup();
    }

  if (snakeX === foodX && snakeY === foodY) {
    genRandFood();
    snakeBody.push([snakeX, snakeY]);
    score++;
    scoreUpdate();
  }

  for (let i = snakeBody.length - 1; i >= 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }

  snakeBody[0] = [snakeX, snakeY];

  for (let i = 0; i < snakeBody.length; i++) {
    HTML += `<div class="snake" style="grid-column:${snakeBody[i][0]}; grid-row:${snakeBody[i][1]}"></div>`;
    if (
      i !== 0 &&
      snakeBody[0][0] == snakeBody[i][0] &&
      snakeBody[i][1] == snakeBody[0][1]
    ) {
      showPopup();
    }
  }
  playArea.innerHTML = HTML;
}

genRandFood();
playButton.addEventListener("click", () => {
  velX = 1;
});
intervalID = setInterval(() => {
  main();
}, 100);
document.addEventListener("keydown", (e) => {
  arrowKeys(e);
});
