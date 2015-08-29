function Enemy(x, y, size, speed, angle){
  this.x = x;
  this.y = y;
  this.size = size;
  this.speed = speed;
  this.angle = angle || 0;
  this.attrx = x;
  this.attry = y;
}

function genRandomEnemy() {
  var x = Math.random() * (width - 50) + 10; // subtract radius
  var y = Math.random() * (height - 50) + 10;
  var size = Math.random()*10+5;
  var speed = 0;
  return new Enemy(x, y, size, speed);
}
