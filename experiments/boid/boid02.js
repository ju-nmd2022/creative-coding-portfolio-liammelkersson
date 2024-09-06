const flock = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < 100; i++) {
    flock.push(createBoid());
  }
}

// DRAW
function draw() {
  background(20, 20, 50, 50);

  for (let boid of flock) {
    edge(boid);
    flockBoids(boid, flock);
    updateBoid(boid);
    showBoid(boid);
  }
}

// CREATE
function createBoid() {
  return {
    position: createVector(random(width), random(height)),
    velocity: p5.Vector.random2D().setMag(random(2, 4)),
    acceleration: createVector(),
    maxForce: random(0.2, 0.8),
    maxSpeed: random(2, 6),
    color: color(random(10), random(255), random(355), random(2, 150)), // Random colors with transparency
  };
}

// SHOW
function showBoid(b) {
  fill(b.color);
  noStroke();

  let angle = b.velocity.heading() + PI / 2;
  push();
  translate(b.position.x, b.position.y);
  rotate(angle);
  beginShape();
  vertex(0, -10);
  vertex(-5, 10);
  vertex(5, 10);
  endShape(CLOSE);
  pop();
}

// FLOCKING
function flockBoids(b, boids) {
  b.acceleration.set(0, 0);
  let alignment = alignBoid(b, boids);
  let cohesion = cohesionBoids(b, boids);
  let separation = separationBoids(b, boids);
  b.acceleration.add(alignment);
  b.acceleration.add(cohesion);
  b.acceleration.add(separation);
}

// UPDATE
function updateBoid(b) {
  b.position.add(b.velocity);
  b.velocity.add(b.acceleration);
  b.velocity.limit(b.maxSpeed);
}

// EDGES OF THE SCREEN
function edge(b) {
  if (b.position.x > width) {
    b.position.x = 0;
  } else if (b.position.x < 0) {
    b.position.x = width;
  }
  if (b.position.y > height) {
    b.position.y = 0;
  } else if (b.position.y < 0) {
    b.position.y = height;
  }
}

// ALIGNMENT
function alignBoid(b, boids) {
  let perceptionRadius = 100;
  let steering = createVector();
  let total = 0;
  for (let other of boids) {
    let d = dist(
      b.position.x,
      b.position.y,
      other.position.x,
      other.position.y
    );
    if (other != b && d < perceptionRadius) {
      steering.add(other.velocity);
      total++;
    }
  }
  if (total > 0) {
    steering.div(total);
    steering.setMag(b.maxSpeed);
    steering.sub(b.velocity);
    steering.limit(b.maxForce);
  }
  return steering;
}

// COHESION
function cohesionBoids(b, boids) {
  let perceptionRadius = 60;
  let steering = createVector();
  let total = 0;
  for (let other of boids) {
    let d = dist(
      b.position.x,
      b.position.y,
      other.position.x,
      other.position.y
    );
    if (other != b && d < perceptionRadius) {
      steering.add(other.position);
      total++;
    }
  }
  if (total > 0) {
    steering.div(total);
    steering.sub(b.position);
    steering.setMag(b.maxSpeed);
    steering.sub(b.velocity);
    steering.limit(b.maxForce);
  }
  return steering;
}

// SEPARATION
function separationBoids(b, boids) {
  let perceptionRadius = 50;
  let steering = createVector();
  let total = 0;
  for (let other of boids) {
    let d = dist(
      b.position.x,
      b.position.y,
      other.position.x,
      other.position.y
    );
    if (other != b && d < perceptionRadius) {
      let diff = p5.Vector.sub(b.position, other.position);
      diff.div(d);
      steering.add(diff);
      total++;
    }
  }
  if (total > 0) {
    steering.div(total);
    steering.setMag(b.maxSpeed);
    steering.sub(b.velocity);
    steering.limit(b.maxForce);
  }
  return steering;
}
