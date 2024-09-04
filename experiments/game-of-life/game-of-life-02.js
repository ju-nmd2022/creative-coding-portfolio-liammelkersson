function setup() {
  createCanvas(windowWidth, windowHeight);
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
let size = 10;
let lifecycle = 2;
let count = 0;
let boardsize = 150;
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
//   //chatgpt helped here with mathing
//   let radiusSquared = radius * radius;

//   //making a grid for the circle
//   for (let circleX = x - radius; circleX <= x + radius; circleX++) {
//     for (let circleY = y - radius; circleY <= y + radius; circleY++) {
//       //circle bounding box
//       if (
//         circleX >= 0 &&
//         circleX < boardsize &&
//         circleY >= 0 &&
//         circleY < boardsize
//       ) {
//         let distanceSquared =
//           (circleX - x) * (circleX - x) + (circleX - y) * (circleY - y);
//         if (distanceSquared <= radiusSquared) {
//           board[circleX][circleY].toggleState();
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
