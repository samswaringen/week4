// pos is the PacMan image position variable- it is set to 0 initially

let pos = 0;
let posY = 0;
//pageWidth is the width of the webpage. This is later used to calculate when Pac-Man needs to turn around. 
let pageWidth = window.innerWidth;
let pageHeight = window.innerHeight;
const upBalls = [];
const downBalls = [];
const colors = [];
let size = 0;
var ballPositions = [];
let ghostX = pageWidth - 50;
let ghostY = pageHeight - 50;
var ghostVelX = getRandom(10);
var ghostVelY = getRandom(10);
var cirPosX = [];
var cirPosY = [];

//This array contains all the PacMan movement images
const pacArray = [
  ['./images/PacMan1.png', './images/PacMan2.png'],
  ['./images/PacMan3.png', './images/PacMan4.png'],
  ['./images/PacMan5.png', './images/PacMan6.png'],
  ['./images/PacMan7.png', './images/PacMan8.png']
];

// this variable defines what direction should PacMan go into:
// 0 = left to right
// 1 = right to left (reverse)
var direction = 0;
var directionY = 0;

var intervalRight;
var intervalUp;
var intervalLeft;
var intervalDown;

// This variable helps determine which PacMan image should be displayed. It flips between values 0 and 1
var focus = 0;

function checkWalls() {
  if (ghostX < 0) {
    ghostVelX = -ghostVelX;
    ghostX = 0;
  };
  if (ghostX > pageWidth - 60) {
    ghostVelX = -ghostVelX;
    ghostX = pageWidth-60;
  }
  if (ghostY > pageHeight -60) {
    ghostVelY = -ghostVelY;
    ghostY = pageHeight -60;
  } else if (ghostY < 0) {
    ghostVelY = -ghostVelY;
    ghostY = 0;
  }
}

function ghostMove(){{
  let ghost = document.getElementById('Ghost');
  checkWalls();
  ghostX += ghostVelX;
  ghostY += ghostVelY;
  ghost.style.left = ghostX + 'px';
  ghost.style.top = ghostY + 'px';
}
  setTimeout(ghostMove, 100);
}
function makeGhost(ghostX, ghostY , ghostVelX, ghostVelY){
  ghost = document.createElement('img');
  ghost.className = 'Ghost';
  ghost.src = `./images/Ghost.png`;
  ghost.style.height = ghost.style.width = 50;

  ghost.style.top = ghostX + ghostVelX;
  ghost.style.left = ghostY + ghostVelY;
  document.body.appendChild(ghost);
}

function getPoints(){
  for(let i = 0; i < 100; i++){
    let pointX = (((pageWidth-100)/100) * i) + 50;
    let pointY = (((pageHeight-150)/100) * i) + 150;
    cirPosX.push(pointX);
    cirPosY.push(pointY);
  }
}
// This function is called on mouse click. Every time it is called, it updates the PacMan image, position and direction on the screen.
function RunRight() {
  let img = document.getElementById('PacMan');
  let imgWidth = img.width;
  focus = (focus + 1) % 2;
  direction = checkPageBounds(direction, imgWidth, pos, pageWidth);
  img.src = pacArray[0][focus];
  imgSrc = img.src;
  if (direction) {
    pos += 0;
    img.style.left = pos + 'px';
  } else {
    pos += 20;
    img.style.left = pos + 'px';
    makeBox(pos - (imgWidth/2) , posY + 3, imgWidth);
  }
}
function RunLeft() {
  let img = document.getElementById('PacMan');
  let imgWidth = img.width;
  focus = (focus + 1) % 2;
  direction = checkPageBoundsL(direction, imgWidth, pos, pageWidth);
  img.src = pacArray[1][focus];
  imgSrc = img.src;
  if (direction) {
    pos += 0;
    img.style.left = pos + 'px';
  } else {
    pos -= 20;
    img.style.left = pos + 'px';
    makeBox(pos + (imgWidth/2), posY + 3, imgWidth);
  }
}

function JumpUp() {
  let img = document.getElementById('PacMan');
  let imgWidth = img.width;
  focus = (focus + 1) % 2;
  directionY = checkPageBoundsY(directionY, imgWidth, posY, pageHeight);
  img.src = pacArray[2][focus];
  imgSrc = img.src;
  if (directionY) {
    posY += 0;
    img.style.top = posY + 'px';
  } else {
    posY -= 20;
    img.style.top = posY + 'px';
    makeBox(pos + 3, posY + (imgWidth/2), imgWidth);
  }
}
function JumpDown() {
  let img = document.getElementById('PacMan');
  let imgWidth = img.width;
  focus = (focus + 1) % 2;
  directionY = checkPageBoundsYD(directionY, imgWidth, posY, pageHeight);
  img.src = pacArray[3][focus];
  imgSrc = img.src;
  if (directionY) {
    posY += 0;
    img.style.top = posY + 'px';
  } else {
    posY += 20;
    img.style.top = posY + 'px';
    makeBox(pos + 3, posY - (imgWidth/2) , imgWidth);
  }
}
function allClear(){
  clearInterval(intervalDown);
  clearInterval(intervalLeft);
  clearInterval(intervalRight);
  clearInterval(intervalUp);
}
function moveDirection(evnt){
  switch (evnt.keyCode) {
    case 32:
      allClear();
      break;
    case 37:
      allClear();
      intervalLeft = setInterval(RunLeft, 100)
      break;
    case 39:
      allClear();
      intervalRight = setInterval(RunRight, 100);
      break;
    case 38:
      allClear();
      intervalUp = setInterval(JumpUp, 100);
      break;
    case 40:
      allClear();
      intervalDown = setInterval(JumpDown, 100);
      break;
    }
}

  document.addEventListener('keydown', moveDirection);

// TODO: Add a setInterval call to run every 200 milliseconds. Note: in the video, Dr. Williams uses setTimeout, but here we are going to use a slightly different
//function call of setInterval, so that you can have practice using this function call. This will also have us add a couple of extra arguments, pos (position), which was declared 
//on line 2, and pageWidth, which is declared on line 4. 
 // This function determines the direction of PacMan based on screen edge detection. 
function checkPageBounds(direction, imgWidth, pos, pageWidth) {
  // TODO: Complete this to reverse direction upon hitting screen edge
  if (pos + imgWidth >= pageWidth){
   direction = 1;

  }else if(pos <= 0) {
    direction = 0;
  }
  return direction;
}
function checkPageBoundsL(direction, imgWidth, pos, pageWidth) {
  // TODO: Complete this to reverse direction upon hitting screen edge
  if (pos + imgWidth >= pageWidth){
   direction = 0;

  }else if(pos <= 0) {
    direction = 1;
  }
  return direction;
}
function checkPageBoundsY(directionY, imgWidth, posY, pageHeight) {
  // TODO: Complete this to reverse direction upon hitting screen edge
  if (posY + imgWidth >= pageHeight){
   directionY = 0;

  }else if(posY <= 0) {
    directionY = 1;
  }
  return directionY;
}
function checkPageBoundsYD(directionY, imgWidth, posY, pageHeight) {
  // TODO: Complete this to reverse direction upon hitting screen edge
  if (posY + imgWidth >= pageHeight){
   directionY = 1;

  }else if(posY <= 0) {
    directionY = 0;
  }
  return directionY;
} 
function makeBall(xcoord, ycoord, color) {
  ball = document.createElement("div");
  ball.style.backgroundColor = color;
  ball.className = `ball ${upBalls.length}`;
  ball.style.height = ball.style.width = size;
  ball.style.top = ycoord; 
  ball.style.left = xcoord;
  document.body.appendChild(ball);
}
function makeBox(xcoord, ycoord, size){
  box = document.createElement('div')
  box.style.backgroundColor = 'white';
  box.className = `box`;
  box.style.height = box.style.width = (size - 3);
  box.style.top = ycoord;
  box.style.left = xcoord;
  document.body.appendChild(box);
}
function getRandom(scale) {
  return Math.floor(Math.random() * scale + 1);
}
function factory(total) {
  // check how make balls exist already and add to the array
  //make random color and push to array colors[]
  getPoints();
  for(let i =0; i<total; i++){
  color = `rgb(${getRandom(256)},${getRandom(256)},${getRandom(256)})`;
  colors.push(color);
  }
   // Everything below was provided to me
  for (let i = 0; i < total; i++) {
    size = 10;
    makeBall(cirPosX[getRandom(100)], cirPosY[getRandom(100)], colors[i]);
    let newBall = []; 
    newBall.push(parseInt(ball.style.left));
    newBall.push(parseInt(ball.style.top));
    upBalls.push(newBall);
  }
  for (let i = 0; i < total / 10; i++){
    size = 20;
    downBall =makeBall(getRandom(pageWidth -100) + 25, getRandom(pageHeight -100) + 25, 'black');
    let newBall = []; 
    newBall.push(parseInt(ball.style.left));
    newBall.push(parseInt(ball.style.top));
    downBalls.push(newBall);
  }
}

function setPoints(){
  for (let i = 0; i < upBalls.length; i++){
    upBalls.pop();
  } 
  for (let i = 0; i<downBalls.length; i++){
    downBalls.pop();
  }
  ghostVelX += getRandom(10);
  ghostVelY += getRandom(10);
 document.body.innerHTML = `<div id = 'scoreBoard'>
    <ul>
      <li><div>Points Left: ${upBalls.length}</div></li>
      <li><div>Score: </div></li>
      <li><div>Time until Refresh: </div></li>
    </ul>
  </div>
  <img id="PacMan" src= "images/PacMan1.png" width='50' style="position:absolute; left:${pos}; top:${posY}"> </img>
  <img id="Ghost" src="images/Ghost.png" width='50' style="position:absolute; left:${ghostX}; top:${ghostY}"> </img>`;
  ghostMove();
  factory(getRandom(100));
}
factory(getRandom(100));
ghostMove();
setInterval(setPoints, 30000);


