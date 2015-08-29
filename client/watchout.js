// start slingin' some d3 here.
// set initial values
var highScore = 0;
var currScore = 0;
var numCollisions = 0;
var lastCollision = Date.now();
var width = window.innerWidth * 0.8;
var height = window.innerHeight * 0.8;
const numEnemies = 80;

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
d3.select('svg').selectAll('image').data(enemies)
  .enter()
  .append('image')
  .classed('enemy', true);

// display enemies on canvas in appropriate positions
d3.select('svg').selectAll('image')
  .attr('x', function(d){ return d.x })
  .attr('y', function(d){ return d.y })
  .attr('width', function(d) { return d.size; })
  .attr('height', function(d) { return d.size; })
  .attr('xlink:href', '../images/Shuriken.png');

// find all our images
function move(element) {
  element.transition()
    // over duration
    .duration(3000)
    // to new location
    .attr('x', function(d,i) {
      d.x = Math.random() * (width - 10) + 10;
      return d.x;
    })
    .attr('y',function(d,i) {
      d.y = Math.random() * (height - 10) + 10;
      return d.y;
    })
    .each("end", function(){
      move( d3.select(this) );
    });
}
move(d3.select('svg').selectAll('image'));

d3.timer(checkCollision);

function rotateEnemies() {
  // select new angle for all the shurikens
  for (var i = 0; i < enemies.length; i++) {
    enemies[i].angle += 45;
  }

  d3.selectAll('image')
    .attr("transform", function(d, i) {
      console.log(d.attrx);
      console.log(d.x);
      debugger;
      var retStr = "rotate("+d.angle+" "+(Number(d.attrx)+.5*d.size)+" "+(Number(d.attry)+.5*d.size)+")";
      return retStr;
    })
    ;
}

function checkCollision() {
  currScore++;

  d3.selectAll('image').each(function(d, i){
    var midx = myPlayer.x + .5 * myPlayer.size;
    var midy = myPlayer.y + .5 * myPlayer.size;
    
    var cirx = d3.select(this).attr('x');
    var ciry = d3.select(this).attr('y');
    if (Math.sqrt(Math.pow(midx-cirx,2)+Math.pow(midy-ciry,2)) <= 25) {
      if (Date.now() - lastCollision > 500) {
        numCollisions++;
        lastCollision = Date.now();
        d3.select('svg')
          .transition()
          .duration(250)
          .style('background-color','red')
          .each("end", function(d) {
            d3.select(this)
            .transition()
            .duration(250)
            .style('background-color', 'black');
          }); 
      }
      if (currScore > highScore) {
        highScore = currScore;
        d3.select('div.high').select('span').data([highScore])
          .text(highScore);
      }
      currScore = 0;
    }    
  });

  d3.select('div.current').select('span').data([currScore])
      .text(currScore);
  d3.select('div.collisions').select('span').data([numCollisions])
      .text(numCollisions);
}


