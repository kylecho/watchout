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
  .attr('xlink:href', '../images/Shuriken.png')
  // .attr('r', function(d){ return d.size })
  ;

// find all our images
function moveEnemies() {
  d3.select('svg').selectAll('image')
    // call transition
    .transition()
    // over one second
    .duration(3000)
    // to new location
    .attrTween('x', function(d,i,a) { 
      //var endResult = Math.random() * (width - 10) + 10;
      d.x = Math.random() * (width - 10) + 10;
      
      // We are now returning a FUNCTION
      // which will be executed over and over and over
      // return d3.interpolate(a, d.x);

      // Now we can EDIT that function to have the side effect of updating our position

      // somewhere, somehow, attrTween is executing our function
      // We want to execute it in the same manner
      // It was called with a context
      // It was called with parameters
      // We want to execute it with the same context, and same parameters, and then return its result

      // ALL WE WANT TO DO is return that interpolate function
      // But also save the value for x that it generates

      // somewhere, something in attrtween/transition is going 
      // return d3.interpolate(a, d.x);

      return function() {
        // call this function, save it in a result, and then update
        var fn = d3.interpolate(a, d.x);
        var result = fn.apply(this, arguments);
        d.attrx = result;
        // d.x = result;
        // debugger;
        return result;
      }

      // The attrTween is going to run the function over and over
      // attrTween takes care of executing interpolation function and resetting x over and over
      // 
    })
      // the attr command is ALREADY making a loop
      // it's basically saying, 
      // for each image, set the cs attribute to [value]
    .attrTween('y',function(d,i,a) {
      d.y = Math.random() * (height - 10) + 10;
      /*return d.y;*/
      return function() {
        // call this function, save it in a result, and then update
        var fn = d3.interpolate(a, d.y);
        var result = fn.apply(this, arguments);
        d.attry = result;
        // d.x = result;
        // debugger;
        return result;
      }      
    })
    // .attrTween("transform", function(d, i, a) {
    //   d.angle = d.angle + 720;
    //   a = null;
    //   return function() {
    //     debugger;
    //     // a the second time through is the WHOLE ROTATE STRING, not the angle
    //     var temp_result = d3.interpolate(a, d.angle).apply(this, arguments);
    //     return "rotate("+temp_result+" "+(Number(d.attrx)+.5*d.size)+" "+(Number(d.attry)+.5*d.size)+")";
    //   }
    // })
}
// transform:rotate(50deg);

// when they first move the thingy, AAAAAH THEY'RE COMING
setInterval(moveEnemies, 3000);

// run a function every, say, hundredth of a second or whatever
// check if anything is touching the player
// if so, do things
// otherwise, dont do those things
setInterval(checkCollision, 10);
//setInterval(rotateEnemies,  10);

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
  
  // d3.selectAll('image').each(function(d, i) {
  //     d.angle = d.angle+45;
  //   });

  // 
}

// we want to change value inside span inside div with class 'high'

function checkCollision() {
  // compare the player's position with any enemy's position.
  // instead of using player.x and enemies[i].x
  // we'll use d3 and use d.x and whatever else
  currScore++;

  d3.selectAll('image').each(function(d, i){
    // if we're within a small distance, update highscore, curr score, nC
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
          }); // good d3 practice: it changes the bg color and changes back to its original color!
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


