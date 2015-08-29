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

d3.select('svg').selectAll('rect')
  .data([myPlayer])
  .enter()
  .append('rect') // end of creating rect element.
  .attr('x', function(d) { return d.x ; })
  .attr('y', function(d) { return d.y ; })
  .attr('width', function(d) { return d.size; })
  .attr('height', function(d) { return d.size; })
  .style('fill', 'red')
  .style('stroke', 'pink')
  .style('stroke-width', '2')
  .call(drag); // this does weird thing.
