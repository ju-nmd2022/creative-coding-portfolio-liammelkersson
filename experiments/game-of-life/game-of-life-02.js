function setup() {
  createCanvas(800, 800);
  frameRate(60);
}

class Cell {
  constructor(x, y, state) {
    this.x = x;
    this.y = y;
    this.state = state;
    this.newState = -1;
  }

  draw(size) {
    if (this.state === 0) {
      fill(0);
    } else {
      fill(255);
    }
    rect(this.x * size, this.y * size, size, size);
  }

  toggleState() {
    this.state = 1 - this.state;
  }
}

let board = [];
let size = 8;
let lifecycle = 2;
let count = 0;
let boardsize = 100;
let radius = 5;

for (let i = 0; i < boardsize; i++) {
  board.push([]);
  for (let j = 0; j < boardsize; j++) {
    let state = Math.round(Math.random()); // maybe try perlin noise here
    let cell = new Cell(i, j, state);
    board[i].push(cell);
  }
}

function calculateNewState(x, y) {
  let startX = Math.max(0, x - 1);
  let startY = Math.max(0, y - 1);
  let endX = Math.min(board.length - 1, x + 1);
  let endY = Math.min(board[x].length - 1, y + 1);

  let liveCells = 0;
  for (let i = startX; i <= endX; i++) {
    for (let j = startY; j <= endY; j++) {
      if (i === x && j === y) continue;
      if (board[i][j].state === 1) {
        liveCells++;
      }
    }
  }

  let currentState = board[x][y].state;

  // game of life rules
  if (currentState === 1 && (liveCells < 2 || liveCells > 3)) {
    board[x][y].newState = 0;
  } else if (currentState === 0 && liveCells === 3) {
    board[x][y].newState = 1;
  } else {
    board[x][y].newState = currentState;
  }
}

function draw() {
  if (count == 0) {
    noStroke();
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        board[i][j].draw(size);
        calculateNewState(i, j);
      }
    }

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        board[i][j].state = board[i][j].newState;
      }
    }
  }
  count++;
  if (count == lifecycle) {
    count = 0;
  }
}

function toggleCircleArea(x, y, radius) {
  let radiusSquared = radius * radius;

  for (let i = x - radius; i <= x + radius; i++) {
    for (let j = y - radius; j <= y + radius; j++) {
      if (i >= 0 && i < boardsize && j >= 0 && j < boardsize) {
        let distanceSquared = (i - x) * (i - x) + (j - y) * (j - y);
        if (distanceSquared <= radiusSquared) {
          board[i][j].toggleState();
        }
      }
    }
  }
}

function mouseDragged() {
  let gridX = floor(mouseX / size);
  let gridY = floor(mouseY / size);

  toggleCircleArea(gridX, gridY, radius);
}
