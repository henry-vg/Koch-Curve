const points = [],
  margin = 30;

function setup() {
  createCanvas(windowWidth, windowHeight);

  noFill();

  updateKoch();
  showKoch();
}

function updateKoch() {
  if (points.length == 0) {
    points.push(createVector(margin, 2 * height / 3), createVector(width - margin, 2 * height / 3));
  }
  else {
    const pointsLength = points.length;
    for (let i = 0; i < pointsLength - 1; i++) {
      const newPoints = getPoints(points[4 * i], points[4 * i + 1]);

      points.splice(4 * i + 1, 0, newPoints[0], newPoints[1], newPoints[2]);
    }
  }
}

function getPoints(p0, p1) {
  const d = dist(p0.x, p0.y, p1.x, p1.y),
    a = atan2(p1.x - p0.x, p1.y - p0.y) - PI / 2,
    p0new = createVector((2 * p0.x + p1.x) / 3, (2 * p0.y + p1.y) / 3),
    p1new = createVector(p0new.x + (d / 3) * cos(a + (PI / 3)), p0new.y - (d / 3) * sin(a + (PI / 3))),
    p2new = createVector((p0.x + 2 * p1.x) / 3, (p0.y + 2 * p1.y) / 3);

  return [p0new, p1new, p2new];
}

function showKoch() {
  background(0);

  beginShape();
  for (let i = 0; i < points.length; i++) {
    vertex(points[i].x, points[i].y);
  }
  stroke(255);
  strokeWeight(2);
  endShape();
}

function mouseClicked() {
  updateKoch();
  showKoch();
}