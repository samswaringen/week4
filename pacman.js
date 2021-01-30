let pos = 0;
let posY = 0;
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
const cirPosX = [];
const cirPosY = [];
let img = document.getElementById('PacMan');
let imgWidth = img.width;
let gameIsOver = 0;
let pointCounter = 0;

const pacArray = [
  ['./images/PacMan1.png', './images/PacMan2.png'],
  ['./images/PacMan3.png', './images/PacMan4.png'],
  ['./images/PacMan5.png', './images/PacMan6.png'],
  ['./images/PacMan7.png', './images/PacMan8.png']
];
var direction = 0;
var directionY = 0;

var intervalRight;
var intervalUp;
var intervalLeft;
var intervalDown;
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
  setTimeout(function(){
    ghostMove();
    ghostCheck()}, 100);
}
function makeGhost(ghostX, ghostY , ghostVelX, ghostVelY){
  ghost = document.createElement('img');
  ghost.className = 'Ghost';
  ghost.src = `./images/Ghost.png`;
  ghost.style.height = ghost.style.width = 50;

  ghost.style.top = ghostX + ghostVelX;
  ghost.style.left = ghostY + ghostVelY;
  document.getElementById('gameArea').appendChild(ghost);
}
function ghostCheck(){
  let pacPosX = pos + (imgWidth/2);
  let pacPosY = posY + (imgWidth/2);
  let ghostPosX = ghostX + (imgWidth/2);
  let ghostPosY = ghostY + (imgWidth/2);
  let x2 = Math.abs(pacPosX - ghostPosX)**2;
  let y2 = Math.abs(pacPosY - ghostPosY)**2;
  let distanceBtwn = Math.sqrt(x2 + y2);
  if (distanceBtwn < imgWidth){
    alert('Game Over! Start again?');
    gameOver();
  } 
}
function upCircleCheck(){
  let upLength = upBalls.length;
  for(let i = 0; i < upLength; i++){
    let cirX = upBalls[i][0];
    let cirY = upBalls[i][1];
    let pacPosX = pos + (imgWidth/2);
    let pacPosY = posY + (imgWidth/2);
    let x2 = Math.abs(pacPosX - cirX)**2;
    let y2 = Math.abs(pacPosY - cirY)**2;
    let distanceBtwn = Math.sqrt(x2 + y2);
    if (distanceBtwn < (imgWidth/2)){
      pointCounter += 1;
      imgWidth += 1;
      document.getElementById('PacMan').style.width = `${imgWidth}`;
      document.getElementById('score').innerHTML = `Score: ${pointCounter}`;
      upBalls.splice(i,1);
      i -= 1;
      upLength -= 1;
      document.getElementById('pointsLeft').innerHTML = `Points Left: ${upBalls.length + downBalls.length}`; 
    }
  }
}
function downCircleCheck(){
  let downLength = downBalls.length;
  for(let i = 0; i < downLength; i++){
    let cirX = downBalls[i][0];
    let cirY = downBalls[i][1];
    let pacPosX = pos + (imgWidth/2);
    let pacPosY = posY + (imgWidth/2);
    let x2 = Math.abs(pacPosX - cirX)**2;
    let y2 = Math.abs(pacPosY - cirY)**2;
    let distanceBtwn = Math.sqrt(x2 + y2);
    if (distanceBtwn < (imgWidth/2)){
      pointCounter += 1;
      imgWidth -= 5;
      document.getElementById('PacMan').style.width = `${imgWidth}`;
      document.getElementById('score').innerHTML = `Score: ${pointCounter}`;
      downBalls.splice(i,1);
      i -= 1;
      downLength -= 1;
      document.getElementById('pointsLeft').innerHTML = `Points Left: ${downBalls.length + upBalls.length}`; 
    }
  }
}
function displayGO(){
  let displayBox = document.getElementById('gameOver');
  let text = document.createTextNode("Game Over!");
  displayBox.appendChild(text)
 }
function gameOver(){
  document.location.reload();
  ghostX = 1000;
  ghostY = 700;
  startOver(); 
}
 function startOver(){
   document.getElementById('gameArea').innerHTML = `<div id = 'scoreBoard'>
  <ul>
  <li><div id = 'pointsLeft'>Points Left: ${upBalls.length} </div></li>
  <li><div id = 'score'>Score: ${pointCounter} </div></li>
  <li><div id = 'timeRefresh'>Time until Refresh: </div></li>
  </ul>
</div>
<div id = 'gameOver'></div>
<img id="PacMan" src= "images/PacMan1.png" width='${imgWidth}' style="position:absolute" </img>
<img id="Ghost" src="images/Ghost.png" width='50' style="position:absolute; left:1000px; top:700px"> </img>
<script src="./pacman.js"></script> `;
ghostMove();
factory(getRandom(100));
}
function getPoints(){
  for(let i = 0; i < 100; i++){
    let pointX = (((pageWidth-100)/100) * i) + 50;
    let pointY = (((pageHeight-150)/100) * i) + 150;
    cirPosX.push(pointX);
    cirPosY.push(pointY);
  }
}
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
    upCircleCheck();
    downCircleCheck();
    pos += 20;
    img.style.left = pos + 'px';
    makeBox(pos - (imgWidth/2) , posY, imgWidth);
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
    upCircleCheck()
    downCircleCheck();
    pos -= 20;
    img.style.left = pos + 'px';
    makeBox(pos + (imgWidth/2), posY, imgWidth);
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
    upCircleCheck();
    downCircleCheck();
    posY -= 20;
    img.style.top = posY + 'px';
    makeBox(pos, posY + (imgWidth/2), imgWidth);
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
    upCircleCheck();
    downCircleCheck();
    posY += 20;
    img.style.top = posY + 'px';
    makeBox(pos, posY - (imgWidth/2) , imgWidth);
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
 
function checkPageBounds(direction, imgWidth, pos, pageWidth) {
  if (pos + imgWidth >= pageWidth){
   direction = 1;

  }else if(pos <= 0) {
    direction = 0;
  }
  return direction;
}
function checkPageBoundsL(direction, imgWidth, pos, pageWidth) {
  if (pos + imgWidth >= pageWidth){
   direction = 0;

  }else if(pos <= 0) {
    direction = 1;
  }
  return direction;
}
function checkPageBoundsY(directionY, imgWidth, posY, pageHeight) {
  if (posY + imgWidth >= pageHeight){
   directionY = 0;

  }else if(posY <= 0) {
    directionY = 1;
  }
  return directionY;
}
function checkPageBoundsYD(directionY, imgWidth, posY, pageHeight) {
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
  document.getElementById('gameArea').appendChild(ball);
}
function makeBox(xcoord, ycoord, size){
  box = document.createElement('div')
  box.style.backgroundColor = 'white';
  box.className = `box`;
  box.style.height = box.style.width = size;
  box.style.top = ycoord;
  box.style.left = xcoord;
  document.getElementById('gameArea').appendChild(box);
}
function getRandom(scale) {
  return Math.floor(Math.random() * scale + 1);
}
function factory(total) {
  getPoints();
  for(let i =0; i<total; i++){
  color = `rgb(${getRandom(256)},${getRandom(256)},${getRandom(256)})`;
  colors.push(color);
  }
  for(let i = 0; i < total; i++) {
    size = 10;
    makeBall(cirPosX[getRandom(100)], cirPosY[getRandom(100)], colors[i]);
    let newBall = []; 
    newBall.push(parseInt(ball.style.left));
    newBall.push(parseInt(ball.style.top));
    upBalls.push(newBall);
  }
  for(let i = 0; i < total / 10; i++){
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
  ghostVelX += getRandom(7);
  ghostVelY += getRandom(7);
 document.getElementById('gameArea').innerHTML = `<div id = 'scoreBoard'>
    <ul>
    <li><div id = 'pointsLeft'>Points Left: ${upBalls.length} </div></li>
    <li><div id = 'score'>Score: ${pointCounter} </div></li>
    <li><div id = 'timeRefresh'>Time until Refresh: </div></li>
    </ul>
  </div>
  <div id = 'gameOver'></div>
  <img id="PacMan" src= "images/PacMan1.png" width='${imgWidth}' style="position:absolute; left:${pos}; top:${posY}"> </img>
  <img id="Ghost" src="images/Ghost.png" width='50' style="position:absolute; left:${ghostX}; top:${ghostY}"> </img>
  <script src="./pacman.js"></script> `;
  ghostMove();
  factory(getRandom(100));
}
function game(){
  ghostMove();
  setInterval(setPoints, 30000);
  }
game();
startOver();



