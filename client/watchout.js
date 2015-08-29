// start slingin' some d3 here.
// set initial values
var highScore = 0;
var currScore = 0;
var numCollisions = 0;
var lastCollision = Date.now();
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

// run a function every, say, hundredth of a second or whatever
// check if anything is touching the player
// if so, do things
// otherwise, dont do those things
setInterval(checkCollision, 10);

// we want to change value inside span inside div with class 'high'

function checkCollision() {
  // compare the player's position with any enemy's position.
  // instead of using player.x and enemies[i].x
  // we'll use d3 and use d.cx and whatever else
  currScore++;

  d3.selectAll('circle').each(function(d, i){
    // if we're within a small distance, update highscore, curr score, nC
    var midx = myPlayer.x + .5 * myPlayer.size;
    var midy = myPlayer.y + .5 * myPlayer.size;
    
    var circx = d3.select(this).attr('cx');
    var circy = d3.select(this).attr('cy');
    if (Math.sqrt(Math.pow(midx-circx,2)+Math.pow(midy-circy,2)) <= 25) {
      if (Date.now() - lastCollision > 1000) {
        numCollisions++;
        lastCollision = Date.now();
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


