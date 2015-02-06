var clamp, distance, distanceToRightEdge, isNegativeSide, rating;

// v1: Price Vertex, v2: Defensibility Vertex, v3: Delivery Vertex
function Triangle(v1_x, v1_y, v2_x, v2_y, v3_x, v3_y){
  
  this.v1 = { x: v1_x, y: v1_y };
  this.v2 = { x: v2_x, y: v2_y };
  this.v3 = { x: v3_x, y: v3_y };

  this.setVertexPrice = function(x, y){
    this.v1 = { x: x, y: y };
  }
  this.setVertexDefensibility = function(x, y){
    this.v2 = { x: x, y: y };
  }
  this.setVertexDelivery = function(x, y){
    this.v3 = { x: x, y: y };
  }
  this.setVertex = function(v1_x, v1_y, v2_x, v2_y, v3_x, v3_y){
    this.v1 = { x: v1_x, y: v1_y };
    this.v2 = { x: v2_x, y: v2_y };
    this.v3 = { x: v3_x, y: v3_y };
  }
  this.isInTriangle = function(x, y){
    var b1, b2, b3;
    p = { x: x, y: y };
    b1 = isNegativeSide(p, this.v1, this.v2);
    b2 = isNegativeSide(p, this.v2, this.v3);
    b3 = isNegativeSide(p, this.v3, this.v1);
    return (b1 === b2) && (b2 === b3);
  };

  this.getRatings = function(x, y){

    var defensibility, delivery, p, price, sinDefensibility, sinDelivery, sinPrice;

    p = {
      x: x,
      y: y
    };
    if (this.isInTriangle(p)) {
      sinPrice = distanceToRightEdge(p) / distance(p, this.v1);
      sinDefensibility = (this.v2.y - p.y) / distance(p, this.v2);
      sinDelivery = (this.v3.y - p.y) / distance(p, this.v3);

      price = rating(p, this.v1, sinPrice);
      defensibility = rating(p, this.v2, sinDefensibility);
      delivery = rating(p, this.v3, sinDelivery);
      
      return {
        v1: price,
        v2: defensibility,
        v3: delivery
      }      
    } else {
      return { v1: 0, v2: 0, v3: 0 };
    }
  };
}

distance = function(p1, p2) {
  return Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
};

isNegativeSide = function(p1, p2, p3) {
  return (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y) < 0;
};

distanceToRightEdge = function(p) {
  var a, b, c;
  a = 1.72093;
  b = -1;
  c = -296.116279;
  return Math.abs(a * p.x + b * p.y + c) / Math.sqrt(a * a + b * b);
};

clamp = function(x, minX, maxX) {
  if (x > maxX) {
    return maxX;
  } else if (x < minX) {
    return minX;
  } else {
    return x;
  }
};

rating = function(p, v, sinA) {
  var centerCalculation, d, edgeCalculation, final, k, sinCenter, sinMax;
  sinMax = 0.8660254; // sin 60 degrees, assuming we have a right triangle
  sinCenter = 0.5;    // sin 30 degrees
  k = 0;
  if (sinA > sinCenter) {
    k = (sinA - sinCenter) / (sinMax - sinCenter);
  } else {
    k = (sinCenter - sinA) / sinCenter;
  }
  d = distance(p, v);
  edgeCalculation = d / 255.0;
  centerCalculation = Math.pow(d / 222.0, 1.72);
  final = edgeCalculation * k + centerCalculation * (1.0 - k);
  return Math.round(10 - 10 * clamp(final, 0, 1));
};

// tri = new Triangle(185, 22, 314, 244, 55, 244);
// console.log('Ratings:', tri.getRatings(194, 160));
