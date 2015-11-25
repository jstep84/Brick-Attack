// $(document).ready(function(){
// just in case!
console.log("The script link works!");

// thanks to https://developer.mozilla.org/en-US/docs/Games/Workflows/2D_Breakout_game_pure_JavaScript
// for the brilliant tutorial


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
var paddleWidth = 95;

// starting point on the middle of X axis
var paddleX = (canvas.width-paddleWidth) / 2;

// user-response variables
var rightPressed = false;
var leftPressed = false;

// make the brick targets
var brickRowCount = 3;
var brickColumnCount = 7;
var brickWidth = 50;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

// variables for players
var player = 1;
var player1 = 0;
var player2 = 0;

// variables for score
var score = 0;
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
}

function keyUpHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = false;
    }
    else if (e.keyCode == 37) {
        leftPressed = false;
    }
}   

// detect brick collision, reverse trajectory, remove brick status, check for all bricks gone and alert winner
function collisionDetection() {
    for (i = 0; i < brickColumnCount; i++) {
        for (j = 0; j < brickRowCount; j++) {
            var b = bricks[i][j];
            if (b.status === 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                        score++;
                    }
                    if (score == brickRowCount * brickColumnCount) {
                        alert("You win the round with " + score + " points! \n Go again.");
                        document.location.reload();
                    }
                }
            }
        }
    }

// create the ball
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#28546C";
    ctx.fill();
    ctx.closePath();
}

// draw paddle on gameboard
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#AA5239";
    ctx.fill();
    ctx.closePath();
}

// draw the bricks in the arena
function drawBricks(player) {
    for (i = 0; i < brickColumnCount; i++) {
        for (j = 0; j < brickRowCount; j++) {
            if (bricks[i][j].status == 1) {
                var brickX = (i * (brickWidth + brickPadding)) + brickOffsetLeft;
                var brickY = (j * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[i][j].x = brickX;
                bricks[i][j].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#AA5239";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function sBoard() {
    document.getElementById("score").innerHTML = "Bricks smashed " +score;
}

// frame animation for the game
function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBricks();
        drawBall();
        drawPaddle();
        sBoard();
        collisionDetection();
        x += dx;
        y += dy;

// wall-ball collison detection
    if (x + dx < ballRadius || x + dx > canvas.width-ballRadius) {
        dx = -dx;
    }
    if (y + dy < ballRadius) {
        dy = -dy;
    }
    else if (y + dy > canvas.height-ballRadius) {
            if (x > paddleX && x < paddleX + paddleWidth) {
                dy = -dy;
            }
            else {
            document.location.reload();
            alert("Too bad! try again.")
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

// click event easy play
    function ePlay(){
        setInterval(draw, 8);
        menuScreen();
    }
    
// click event medium play 
    function mPlay(){
        setInterval(draw, 6);
    }
    
// click event hard play     
    function hPlay(){
        setInterval(draw, 4);
    }


    

























