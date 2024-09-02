function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(60);
  noFill();
}

function draw() {
  background(20, 25);
  angleMode(DEGREES);

  let cols = 12;
  let rows = 20;
  let size = 25;

  push();
  // translate(125, 60);
  translate(
    windowWidth / 2 + cols / 2 - cols * 2 - 100,
    windowHeight / 2 + rows / 2 - rows * 2 - 200
  );

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      let squareX = col * size;
      let squareY = row * size;

      //https://p5js.org/reference/p5/frameCount/
      let rotation = sin(frameCount * 2 + row * 10 + col * 10) * 45;
      let offsetY = sin(frameCount * 3 + col * 10) * 10;
      let offsetX = cos(frameCount * 3 + row * 10) * 10;

      // let r = random(0, 255);
      // let g = random(0, 255);
      // let b = 255;

      let r = random(0, 255);
      let g = 255;
      let b = random(0, 255);

      stroke(r, g, b, 200);
      strokeWeight(random(0.5, 3));

      push();
      translate(squareX + offsetX, squareY + offsetY);
      rotate(rotation);

      let newSize = size * random(0.5, 1.5);
      rect(0, 0, newSize, newSize);

      pop();
    }
  }
  pop();
}
