// Enemies our player must avoid
let level = 1;
let Enemy = function(x,y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if (this.x >= 500){
        this.x = -100;
        this.y = Math.floor(Math.random() * 250);
        this.speed = level >= 4 ? Math.floor(Math.random() * 4+1) : Math.floor(Math.random() * level+1);
    }     

    if (!(60 < difference(this.x, player.x)) && !(40 < difference(this.y, player.y)) ) {
        lose();
    }

    this.x = this.x + this.speed;
};


const difference = function (a, b) { return Math.abs(a - b); }

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed
    this.sprite = 'images/char-boy.png';
};


Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function() {
    if (this.y === 0 ) {
        console.log("WINNER");
        win();
    }
}

Player.prototype.handleInput = function(direction) {
    const { x, y, speed } = this;

    if (!this.isOutOfBounds(direction)){
        return
    }

    switch (direction) {
        case 'left':
            this.x = x - speed;
            break;
        case 'right':
            this.x = x + speed;
            break;
        case 'up':
            this.y = y - speed;
            break;
        case 'down':
            this.y = y + speed;
            break;
        default:
            break;
    }
}

Player.prototype.isOutOfBounds = function(direction) {
    const { x, y } = this;
    
    if (direction === 'left' && x === 0) {        
        return false;
    }
    if (direction === 'right' && x === 400) {        
        return false;
    }
    if (direction === 'up' && y === 0) {        
        return false;
    }
    if (direction === 'down' && y === 400) {        
        return false;
    }

    return true;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player


const populateEnemies = () => {
    allEnemies = [];
    for (let i = 0; i < level; i++) {
        const randX = Math.floor(Math.random() * 400);
        const randY = Math.floor(Math.random() * 250);
        const speed = level >= 4 ? Math.floor(Math.random() * 4+1) : Math.floor(Math.random() * level+1);

        allEnemies.push(new Enemy(randX, randY, speed));
    }
}

var allEnemies = [];
var player = new Player(200, 400, 50);
populateEnemies();


let win = () => {
    level++;
    resetPlayer();
    populateEnemies();
    incrementLevelHeader();
}

let incrementLevelHeader = () => {
    let levelHeaderReference = document.getElementById("headerThree");
    levelHeaderReference.innerHTML = `level: ${level}`;
}


const lose = () => {
    level = 1;
    resetPlayer();
    populateEnemies();
    incrementLevelHeader();
}

const resetPlayer = () => {
    player = new Player(200, 400, 50);

}



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    
    const direction = allowedKeys[e.keyCode];
    player.handleInput(direction);
});


