let inputDir = { x: 0, y: 0 };

const foodSound = new Audio("music/food.mp3");
const gameOverSound = new Audio("music/gameover.mp3");
const moveSound = new Audio("music/move.mp3");
const musicSound = new Audio("music/music.mp3");

let speed = 2;
let lastPaintTime = 0;
let score = 0;

const scoreBox = document.getElementById("scoreBox");
const hiScoreBox = document.getElementById("highscoreBox");

let snakeArr = [{ x: 13, y: 15 }];

food = {
  x: 6,
  y: 7,
};
// const board = document.getElementById("#board");

//Game functions
function main(ctime) {
  window.requestAnimationFrame(main);

  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
}

function isColide(snake) {
  // if snake bumps into itself
  for (let index = 1; index < snakeArr.length; index++) {
    if (snake[index].x === snake[0].x && snake[index].y === snake[0].y) {
      return true;
    }
  }

  // if snake colide with the board

  if (
    snake[0].x >= 18 ||
    (snake[0].x <= 0 && snake[0].y >= 18) ||
    snake[0].y <= 0
  ) {
    return true;
  }

  return false;
}

function gameEngine() {
  // Part 1 Updating snake array and food

  if (isColide(snakeArr)) {
    gameOverSound.play();
    inputDir = { x: 0, y: 0 };
    alert("Game Over, press any key to play again");
    snakeArr = [{ x: 13, y: 15 }];
    score = 0;
  }

  // If snake hast eaten the food increment  the score and regenerate the food

  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    foodSound.play();
    score = score + 1;
    scoreBox.innerHTML = "Score :   " + score;

    if (score > hiScore) {
      hiScoreVal = score;
      localStorage.setItem("hiScore", JSON.stringify(hiScoreVal));
      hiScoreBox.innerHTML = "HiScore : " + hiScoreVal;
    }
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    });
    let a = 2;
    let b = 16;

    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
    speed++;
  }

  // Moving the snake

  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }

  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  // Display snake

  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;

    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }

    board.appendChild(snakeElement);
  });
  // Display Food
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

//Main logic starts here

let hiScore = localStorage.getItem("hiScore");
if (hiScore === null) {
  hiScoreVal = 0;
  localStorage.setItem("hiScore", JSON.stringify(hiScoreVal));
} else {
  hiScoreVal = JSON.parse(hiScore);
  hiScoreBox.innerHTML = "HiScore : " + hiScore;
}

window.requestAnimationFrame(main);

window.addEventListener("keydown", (e) => {
  inputDir = {
    x: 0,
    y: 1,
  };
  moveSound.play();

  switch (e.key) {
    case "ArrowUp":
      console.log("ArrowUp");
      inputDir.x = 0;
      inputDir.y = -1;
      break;

    case "ArrowDown":
      console.log("ArrowDown");
      inputDir.x = 0;
      inputDir.y = 1;

      break;

    case "ArrowLeft":
      console.log("ArrowLeft");
      inputDir.x = -1;
      inputDir.y = 0;

      break;

    case "ArrowRight":
      console.log("ArrowRight");
      inputDir.x = 1;
      inputDir.y = 0;

      break;
  }
});
