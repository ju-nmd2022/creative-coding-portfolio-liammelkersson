function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(10);
}

function draw() {
  // background(220, 210, 200);
  angleMode(DEGREES);
  strokeWeight(2);

  // grid 17 x 22
  let cols = 12;
  let rows = 20;

  let size = 25;

  push();
  //starting point
  // translate(125, 60);
  translate(
    windowWidth / 2 + cols / 2 - cols * 2 - 100,
    windowHeight / 2 + rows / 2 - rows * 2 - 200
  );

  noFill();
  strokeWeight(1);
  rectMode(CENTER);
  // stroke(0, 70, 255);

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      let squareX = col * size;
      let squareY = row * size;

      let rotation = row * 2;
      let offsetY = (row - squareY) * 0.02 * random(-1, 1);
      let offsetX = (row - squareY) * 0.05 * random(-1, 1);

      let r = map(squareX, 0, width, 50, 255);
      let g = map(squareY, 0, width, 50, 255);
      let b = map(squareX, 0, width, 255, 50);
      let a = col * 25;

      stroke(r, g, b, a);
      // fill(random(0, 100),random(0, 10),random(0, 120), 20);
      // fill(255, 255, 255);

      push();
      translate(squareX + offsetX, squareY + offsetY);
      rotate(rotation * radians(45) * random(-1, 1));
      rect(0, 0, size, size);
      pop();
    }
  }
  pop();
  //   noLoop();
}
