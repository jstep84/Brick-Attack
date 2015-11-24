// just in case!
console.log("The script link works!");

// create the game board
var canvas = document.getElementById("arena");
var ctx = canvas.getContext("2d");
var ballRadius = 10;
var x = canvas.width / 2;
var y = canvas.height -30;
var dx = 2;
var dy = -2;

// create the paddle
var paddleHeight = 10;
var paddleWidth = 75;

// starting point on the X axis
var paddleX = (canvas.width-paddleWidth) / 2;

// user-response variables
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;

// make the brick targets
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

// variable for score
var score1 = 0;
var score2 = 0;

// 2D array for our bricks
var bricks = [];
for (i = 0; i < brickColumnCount; i++) {
    bricks[i] = [];
    for (j = 0; j < brickRowCount; j++) {
        bricks[i][j] = { x: 0, y:0, status: 1 };
    }
}

// listen to the keypresses!
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

// assign keypress events to the arrow keys
function keyDownHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = true;
    }
    else if (e.keyCode == 37) {
        leftPressed = true;
    }
    else if (e.keyCode == 38) {
        upPressed = true;
    }
    else if (e.keyCode == 40) {
        downPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = false;
    }
    else if (e.keyCode == 37) {
        leftPressed = false;
    }
    else if (e.keyCode == 38) {
        upPressed = false;
    }
    else if (e.keyCode == 40) {
        downPressed = false;
    } 
}   

// create the ball
function drawBall(clr) {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = clr;
    ctx.fill();
    ctx.closePath();
}

/*function colorChange() {
    var randNum = Math.random();
    console.log(randNum)
    if (randNum >= .66) {
         drawBall("red");
    }
    else if (randNum <= .33) {
        drawBall("green");
    }
    else {
        drawBall("#blue");
    }
} */

// draw paddle on gameboard
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
}

// draw the bricks in the arena
function drawBricks() {
    for (i = 0; i < brickColumnCount; i++) {
        for (j = 0; j < brickRowCount; j++) {
            if (bricks[i][j].status == 1) {
                var brickX = (i * (brickWidth + brickPadding)) + brickOffsetLeft;
                var brickY = (j * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[i][j].x = brickX;
                bricks[i][j].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "blue";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

// frame animation for the game
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawScore();
    drawBricks();
    drawBall();
    drawPaddle();
    collisionDetection();
    x += dx;
    y += dy;

// wall-ball collison detection
    if (x + dx < ballRadius || x + dx > canvas.width-ballRadius) {
        dx = -dx;
        // colorChange();
    }
    if (y + dy < ballRadius) {
        dy = -dy;
        // colorChange();
    }
    else if (y + dy > canvas.height-ballRadius) {
            if (x > paddleX && x < paddleX + paddleWidth) {
                dy = -dy;
            }
            else {
            alert ("You Lose!");
            document.location.reload();
        }
    }

// move the paddle via keypress
    if (rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 7;
    }
    else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }
}

function collisionDetection() {
    for (i = 0; i < brickColumnCount; i++) {
        for (j = 0; j < brickRowCount; j++) {
            var b = bricks[i][j];
            if (b.status == 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    // colorChange();
                    b.status = 0;
                    score1++;
                    if (score1 == brickRowCount * brickColumnCount) {
                        alert("You win the round with " + score1 + " points!")
                    }
                }
            }
        }
    }
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "blue";
    ctx.fillText("Player 1: " + score1, 8, 20);
    ctx.fillText("Player 2: " + score2, 400, 20);
}

var player = 1;
var player1 = 0;
var player2 = 0;

setInterval(draw, 15);


























