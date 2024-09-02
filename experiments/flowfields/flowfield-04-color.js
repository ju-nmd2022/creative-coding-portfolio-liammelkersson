//array for starting points
let points = [];
let mult = 0.01;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(30);
  angleMode(DEGREES);
  noiseDetail(1);

  let density = 80;
  let space = width / density;

  //loop will create starting points
  for (let x = 0; x < width; x += space) {
    for (let y = 0; y < height; y += space) {
      let p = createVector(x + random(-10, 10), y + random(-10, 10));
      points.push(p);
    }
  }
}

function draw() {
  noStroke();

  for (let i = 0; i < points.length; i++) {
    let r = map(points[i].x, 0, width, 50, 255);
    let g = map(points[i].y, 0, width, 50, 255);
    let b = map(points[i].x, 0, width, 255, 50);

    fill(r, g, b);

    let angle = map(
      noise(points[i].x * mult, points[i].y * mult),
      0,
      1,
      0,
      720
    );

    points[i].add(createVector(cos(angle), sin(angle)));

    ellipse(points[i].x, points[i].y, 1);
  }
}
