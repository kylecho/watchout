function Player(x, y, size) {
  Enemy.apply(this, arguments);
}
Player.prototype = Object.create(Enemy.prototype);
Player.prototype.constructor = Player;

var drag = d3.behavior.drag()
  .on('drag', function(d) {
    // d is our player object
    // This is our RECTANGLE
    d.x+=d3.event.dx; // changes x value
    d.y+=d3.event.dy; // changes y value
    d3.select(this)
      .attr("x",d.x) // changes svg value
      .attr("y",d.y);// changes svg value
  });

var myPlayer = new Player(width/2, height/2, 30);

var rect = d3.select('svg').selectAll('rect')
  .data([myPlayer])
  .enter()
  .append('rect') // end of creating rect element.
  .style('fill', 'red')
  .style('stroke', 'pink')
  .style('stroke-width', '2')
  .call(drag); // this does weird thing.
updateAttributes(rect);

function updateAttributes(element) {
  element
    .transition()
    .duration(100)
    .attr('x', function(d) { return d.x ; })
    .attr('y', function(d) { return d.y ; })
    .attr('width', function(d) { return d.size; })
    .attr('height', function(d) { return d.size; })
    .ease('linear');
}

// optional keyboard control
d3.select('body')
  .on("keydown", function(){
    if (d3.event.keyCode >= 37 && d3.event.keyCode <= 40) {
      var keys = {
        37: function() {
          myPlayer.x -= 40;
        },
        38: function() {
          myPlayer.y -= 40;
        },
        39: function() {
          myPlayer.x += 40;
        },
        40: function() {
          myPlayer.y += 40;
        }
      };
      // if myPlayer.x > window.innerWidth;
      keys[d3.event.keyCode]();
      myPlayer.x = Math.min(myPlayer.x, width-myPlayer.size);
      myPlayer.x = Math.max(myPlayer.x, 0);
      myPlayer.y = Math.min(myPlayer.y, height-myPlayer.size);
      myPlayer.y = Math.max(myPlayer.y, 0);
    }
    updateAttributes(rect);
  });


// 37 Left
// 38 Up
// 39 Right
// 40 Down