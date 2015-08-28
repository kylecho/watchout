// start slingin' some d3 here.
var width = 960;
var height = 500;
var canvas = d3.select('body').append('svg')
  .attr('width', width)
  .attr('height', height)
  .attr('class', 'canvas')
  .append('g')
  .attr("transform","translate(32,"+height / 2+")");

var testEnemy = new Enemy(10, 20, 30, 40);

// d3.select('svg').append("image")
//   .attr("x",40)
//   .attr("y",40)
//   .attr("width",40)
//   .attr("height",40)
//   .attr("xlink:href","asteroid.png")
//   .style('border', "10px solid red");

d3.select('body').selectAll('svg').append('circle')
  .attr('cx',200)
  .attr('cy',200)
  .attr('r',40);

var enemies = [];
for (var i = 0; i < 3; i++) {
  enemies.push(genRandomEnemy());
}

d3.select('svg').selectAll('circle').data(enemies)
  .enter()
  .append('circle');
  
d3.select('svg').selectAll('circle')
  .attr('cx', function(d){ return d.x })
  .attr('cy', function(d){ return d.y })
  .attr('r', function(d){ return d.size });


function genRandomEnemy() {
  var x = Math.random() * width - 50; // subtract radius
  var y = Math.random() * height - 50;
  var size = Math.random() * 50;
  var speed = 0;
  return new Enemy(x, y, size, speed);
}

function Enemy(x, y, size, speed){
  this.x = x;
  this.y = y;
  this.size = size;
  this.speed = speed;
}
