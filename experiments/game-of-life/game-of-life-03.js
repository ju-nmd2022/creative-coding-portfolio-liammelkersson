//based on game of life example from garrits lecture on complexity
//color + drawing inspiration from https://rafaelcosman.github.io/JSGameOfLife/

function setup() {
  createCanvas(2000, 1080);
  frameRate(60);
  colorMode(HSB);
}

class Cell {
  constructor(x, y, state) {
    this.x = x;
    this.y = y;
    this.state = state;
    this.newState = -1;
  }

  draw(size) {
    let hue = (frameCount + this.x * 10 + this.y * 10) % 360;
    //the modulo operator (%) is used to keep the hue value within the range of 0 to 359.
    if (this.state === 0) {
      let liveNeighbors = this.countLiveNeighbors();
      if (liveNeighbors > 0) {
        fill(hue, 100, 50);
      } else {
        fill(0);
      }
    } else {
      fill(hue, 100, 100);
    }
    rect(this.x * size, this.y * size, size, size);
  }

  toggleState() {
    this.state = 1 - this.state;
  }

  countLiveNeighbors() {
    let liveCells = 0;
    let startX = Math.max(0, this.x - 1);
    let startY = Math.max(0, this.y - 1);
    let endX = Math.min(board.length - 1, this.x + 1);
    let endY = Math.min(board[this.x].length - 1, this.y + 1);

    for (let i = startX; i <= endX; i++) {
      for (let j = startY; j <= endY; j++) {
        if (i === this.x && j === this.y) continue;
        if (board[i][j].state === 1) {
          liveCells++;
        }
      }
    }
    return liveCells;
  }
}

let board = [];
let size = 7;
let lifecycle = 2;
let count = 0;
let boardsize = 150;
let radius = 5;

for (let i = 0; i < boardsize; i++) {
  board.push([]);
  for (let j = 0; j < boardsize; j++) {
    let state = Math.round(Math.random());
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

  // push();
  // fill(255);
  // textSize(32);
  // textAlign(CENTER, TOP);

  // text("try drawing on the canvas :)", width / 2, 10);
  // pop();
}

function toggleSquareArea(x, y, radius) {
  // making a grid for the square
  for (let squareX = x - radius; squareX <= x + radius; squareX++) {
    for (let squareY = y - radius; squareY <= y + radius; squareY++) {
      // square bounding box check
      if (
        squareX >= 0 &&
        squareX < boardsize &&
        squareY >= 0 &&
        squareY < boardsize
      ) {
        //toggling the state of each cell within the square
        board[squareX][squareY].toggleState();
      }
    }
  }
}

// function toggleCircleArea(x, y, radius) {
//   let radiusSquared = radius * radius;

//   for (let i = x - radius; i <= x + radius; i++) {
//     for (let j = y - radius; j <= y + radius; j++) {
//       if (i >= 0 && i < boardsize && j >= 0 && j < boardsize) {
//         let distanceSquared = (i - x) * (i - x) + (j - y) * (j - y);
//         if (distanceSquared <= radiusSquared) {
//           board[i][j].toggleState();
//         }
//       }
//     }
//   }
// }

function mouseDragged() {
  let gridX = floor(mouseX / size);
  let gridY = floor(mouseY / size);

  // toggleCircleArea(gridX, gridY, radius);
  toggleSquareArea(gridX, gridY, radius);
}
