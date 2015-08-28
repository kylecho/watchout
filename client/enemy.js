function Enemy(x, y, size, speed){
  this.x = x;
  this.y = y;
  this.size = size;
  this.speed = speed;
}

function genRandomEnemy() {
  var x = Math.random() * (width - 50) + 10; // subtract radius
  var y = Math.random() * (height - 50) + 10;
  var size = Math.random()*10+5;
  var speed = 0;
  return new Enemy(x, y, size, speed);
}
