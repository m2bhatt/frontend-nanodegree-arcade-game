var xTileSize = 101;
var yTileSize = 83;

// Enemies our player must avoid
var Enemy = function() {
  this.sprite = 'images/enemy-bug.png';
  this.x = 0;
  this.y = (Math.floor(Math.random() * 3) + 1) * yTileSize - (yTileSize / 2)
  this.speed = this.getspeed();
  return this;
    // Variables applied to each of our instances go here,
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
  var obj = Object.create(Enemy.prototype);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
   this.x += this.speed * dt;
    if (this.x > 500){
      this.x = 0;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Enemy.prototype.getspeed = function(){
  var speed = Math.random();
  var numone = speed + 300;
  var numtwo = speed + 100;
  return Math.floor(Math.random() * (numone - numtwo + 1)) + numtwo;
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x, y) {
  this.sprite = 'images/char-pink-girl.png';
  this.x = xTileSize * 2;
  this.y = yTileSize * 4.5;
  var obj = Object.create(Player.prototype);
};

Player.prototype.update = function() {
  // 2D Collision Detection - https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
  for (i = 0; i < allEnemies.length; i++) {
    if (player.x < allEnemies[i].x + xTileSize &&
      player.x + xTileSize > allEnemies[i].x &&
      player.y < allEnemies[i].y + yTileSize &&
      yTileSize + player.y > allEnemies[i].y) {
       player.reset();
    }
  }

  // Determine win condition
  // If player reaches water, reset it.
  if (player.y <= yTileSize/3) {
      window.alert ('You win!');
      player.reset();
    };

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(e){
  switch (e) {
    case 'up':
      if (this.y > 0) {
        this.y -= yTileSize;
        }
        break;
    case 'down': if (this.y < 4.5 * yTileSize){
        this.y += yTileSize;
        }
        break;
    case 'left':
      if (this.x > 0) {
        this.x -= xTileSize;
        }
      break;
    case 'right':
      if (this.x < 3.5 * xTileSize){
        this.x += xTileSize;
      }
      break;
  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemyone = new Enemy();
var enemytwo = new Enemy();
var enemythree = new Enemy();
var allEnemies = [enemyone, enemytwo, enemythree];
allEnemies.push;

var player = new Player();

Player.prototype.reset = function() {
  this.x = xTileSize * 2;
  this.y = yTileSize * 4.5;
};
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
