function Graph(edges, vertices) {
  this.edges = edges;
  this.vertices = vertices;

  this.show = function(col = color(255), textCol = color(0)) {

    for (var i = 0; i < this.edges.length; i++) {
      let p1 = this.vertices.find(x => x.name == this.edges[i].posInicial);
      let p2 = this.vertices.find(x => x.name == this.edges[i].posFinal);

      stroke(0,0,0,50);
      strokeWeight(2);
      line(p1.x, p1.y, p2.x, p2.y);
      strokeWeight(1);

      let x = (p1.x + p2.x) / 2;
      let y = (p1.y + p2.y) / 2;

      fill(0);
      textAlign(CENTER);
      text(Math.floor(this.edges[i].cost), x , y);

      
    }

    for (var i = 0; i < this.vertices.length; i++) {
      this.vertices[i].show(col, textCol);
    }
  }

  this.getVertex = function(name) {
    return this.vertices.find(x => x.name == name);
  }


  this.calcCost= function()
  {
    edges.forEach(element => {
      x1 = this.getVertex(element.posInicial).x;
      y1 = this.getVertex(element.posInicial).y;

      x2 = this.getVertex(element.posFinal).x;
      y2 = this.getVertex(element.posFinal).y;

      let cost = dist(x1,y1,x2,y2);
      

      element.setEdgeCost(cost);
    });
  }

  this.getEdges = function(name)
  {
    return this.edges.filter(x => x.posInicial == name);
  }
}