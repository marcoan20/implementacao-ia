function Vertex(name, x, y, previous = undefined) {
  this.id = 0;
  this.name = name;
  this.x = x;
  this.y = y;
  this.g = 0;
  this.f = 0;

  this.previous = previous;

  this.show = function(col = color(255), textCol = color(0)) {
    fill(col);
    ellipse(this.x, this.y, 20, 20);
    fill(textCol);  
    textAlign(CENTER);
    text(this.name, this.x, this.y+5);
  }
}

