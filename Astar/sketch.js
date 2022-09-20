var data;
var graph;


var openSet = [];
var closedSet = [];


var path = [];

var start;
var end;

var refresh;

var search = false;

var costText;

function setup() {

  graph = new Graph([
    new Edge("A", "B"),
    new Edge("B", "A"),
    new Edge("A", "C"),
    new Edge("C", "A"),
    new Edge("B", "D"),
    new Edge("D", "B"),
    new Edge("D", "C"),
    new Edge("C", "D"),
    new Edge("D", "E"),
    new Edge("E", "D"),
    new Edge("E", "G"),
    new Edge("G", "E"),
    new Edge("G", "H"),
    new Edge("H", "G"),
    new Edge("H", "I"),
    new Edge("I", "H"),
    new Edge("I", "J"),
    new Edge("J", "I"),
    new Edge("C", "F"),
    new Edge("F", "C"),
    new Edge("F", "J"),
    new Edge("J", "F"),
    new Edge("J", "K"),
    new Edge("K", "J"),
    new Edge("F", "K"),
    new Edge("K", "F"),
    new Edge("C", "L"),
    new Edge("L", "C"),
    new Edge("K", "M"),
    new Edge("M", "K"),
    new Edge("L", "M"),
    new Edge("M", "L")
  ],
    [
      new Vertex("A", 200, 100),
      new Vertex("B", 140, 150),
      new Vertex("C", 280, 240),
      new Vertex("D", 150, 220),
      new Vertex("E", 120, 280),
      new Vertex("F", 280, 300),
      new Vertex("G", 190, 350),
      new Vertex("H", 210, 400),
      new Vertex("I", 230, 460),
      new Vertex("J", 310, 490),
      new Vertex("K", 430, 400),
      new Vertex("L", 450, 220),
      new Vertex("M", 580, 420)
    ]);
  graph.calcCost();

  frameRate(0.5);

  refresh = createButton('Refresh');
  refresh.hide();


  let resultado = createSpan('<p id="resultado"></p>');
  resultado.position(10, 600);
  document.getElementById("resultado").style.visibility = "hidden";
  let spanStart = createSpan('Inicio');
  spanStart.position(10, 600);


  costText = createSpan('<p id="cost">Custo: </p>');
  costText.position(10, 630);



  let selIn = createSelect();
  selIn.position(80, 600);
  graph.vertices.forEach(element => {
    selIn.option(element.name);
  });

  let spanEnd = createSpan('Fim');
  spanEnd.position(140, 600);
  let selEnd = createSelect();
  selEnd.position(200, 600);

  graph.vertices.forEach(element => {
    selEnd.option(element.name);
  });

  button = createButton('Search');
  button.position(270, 600);

  refresh.mousePressed(
    function () {
      document.location.reload(true)
    });

  button.mousePressed(() => {
    openSet = [];
    closedSet = [];

    start = graph.getVertex(selIn.value());
    end = graph.getVertex(selEnd.value());

    openSet.push(start);
    search = true;

    selIn.hide();
    selEnd.hide();
    button.hide();
    spanEnd.hide();
    spanStart.hide();
    refresh.show();
  });

  refresh.position(10, 700);

  createCanvas(1900, 1000);
}

function heuristic(a, b) {
  return dist(a.x, a.y, b.x, b.y);
}

function removeElement(array, element) {
  for (var i = array.length - 1; i >= 0; i--) {
    if (array[i] == element) {
      array.splice(i, 1);
    }
  }
}

function A_star() {

  if (openSet.length > 0) {

    var lowestCost = 0;

    for (var i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[lowestCost].f) {
        lowestCost = i;
      }
    }

    var current = openSet[lowestCost];



    

    if (openSet[lowestCost] === end) {
      //console.log("Done",closedSet);
      var resultado = "Resultado: ";
      document.getElementById("cost").innerHTML = "Custo: " + Math.floor(openSet[lowestCost].g);
      for (var i = path.length - 1; i >= 0; i--) {
        if (path[i].name != undefined) {
          if (i != 0)
            resultado += path[i].name + " --> ";
          else
            resultado += path[i].name;
        }
      }

      document.getElementById("resultado").innerHTML = resultado + "-->" + end.name;

      document.getElementById("resultado").style.visibility = "visible";

      search = false;
    }


    removeElement(openSet, current);
    closedSet.push(current);

    var edges = graph.getEdges(current.name);

    for (var i = 0; i < edges.length; i++) {

      
      var neighbor = graph.getVertex(edges[i].posFinal);

      if (!closedSet.includes(neighbor)) {
        //console.log(neighbor.name);

        var tempG = current.g + edges[i].cost;


        if (openSet.includes(neighbor)) {
          if (tempG > neighbor.g) {
            neighbor.g = tempG;
          }
        } else {
          neighbor.g = tempG;
          openSet.push(neighbor);
        }

        neighbor.f = neighbor.g + heuristic(neighbor, end);

        //console.log(graph.getVertex("F"))
        //console.log(current.name)


        if(neighbor.previous != undefined)
        {
          console.log(neighbor.previous.name);
          //nodes.push(new Vertex(neighbor.name,neighbor.x,neighbor.y,neighbor.previous.name));   
        }

        neighbor.previous = current;

      }

      path = [];

      var temp = current;
      path.push(temp);

      while (temp.previous) {
        path.push(temp.previous);
        temp = temp.previous;
      }


    }

  } else {
    console.log("No solution");
  }
}


function draw() {
  if (search) {
    A_star();
  }

  background(255);

  graph.show();

  for (var i = 0; i < openSet.length; i++) {
    openSet[i].show(color(0, 100, 200, 150), color(255, 255, 255));
  }

  for (var i = 0; i < closedSet.length; i++) {
    closedSet[i].show(color(255, 0, 0, 100), color(255, 255, 255));
  }

  for (var i = 0; i <= path.length; i++) {
    let p1 = path[i];
    let p2 = path[i + 1];

    if (p2 != undefined) {
      stroke(0, 255, 0);
      strokeWeight(2);
      line(p1.x, p1.y, p2.x, p2.y);
      strokeWeight(1);
      stroke(0, 0, 0, 50);
    } 

  }

  if (start)
    start.show(color(255, 0, 0), color(255, 255, 255));
  if (end)
    end.show(color(0, 140, 0), color(255, 255, 255));


}
