function Edge(posInicial, posFinal) {
    this.posInicial = posInicial;
    this.posFinal = posFinal;
    this.cost;

    this.setEdgeCost = function(cost) {
        this.cost = cost;
    };
}

