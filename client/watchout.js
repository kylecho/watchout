// start slingin' some d3 here.
// set initial values
var width = 960;
var height = 500;
const numEnemies = 50;

// make a canvas
var canvas = d3.select('body').append('svg')
  .attr('width', width)
  .attr('height', height)
  .attr('class', 'canvas')
  .append('g')
  .attr("transform","translate(32,"+height / 2+")");

// generate enemies
var enemies = [];
for (var i = 0; i < numEnemies; i++) {
  // create and assign random values to enemy.
  enemies.push(genRandomEnemy());
}

// put all enemies on the canvas
d3.select('svg').selectAll('circle').data(enemies)
  .enter()
  .append('circle');

// display enemies on canvas in appropriate positions
d3.select('svg').selectAll('circle')
  .attr('cx', function(d){ return d.x })
  .attr('cy', function(d){ return d.y })
  .attr('r', function(d){ return d.size });

// find all our circles
function moveEnemies() {
d3.select('svg').selectAll('circle')
  // call transition
  .transition()
  // over one second
  .duration(3000)
  // to new location
  .attr('cx',function(d) { 
    d.x = Math.random() * (width - 50) + 10;;
    return d.x;
  })
    // the attr command is ALREADY making a loop
    // it's basically saying, 
    // for each circle, set the cs attribute to [value]
  .attr('cy',function(d) {
    d.y = Math.random() * (height - 50) + 10;
    return d.y;
  });
}

// when they first move the thingy, AAAAAH THEY'RE COMING
setInterval(moveEnemies, 3000);


