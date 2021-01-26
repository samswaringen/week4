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

// This function is called on mouse click. Every time it is called, it updates the PacMan image, position and direction on the screen.
function RunRight() {
  let img = document.getElementById('PacMan');
  let imgWidth = img.width;
  focus = (focus + 1) % 2;
  direction = checkPageBounds(direction, imgWidth, pos, pageWidth);
  img.src = pacArray[0][focus];
  if (direction) {
    pos += 0;
    img.style.left = pos + 'px';
  } else {
    pos += 20;
    img.style.left = pos + 'px';
  }
}
function RunLeft() {
  let img = document.getElementById('PacMan');
  let imgWidth = img.width;
  focus = (focus + 1) % 2;
  direction = checkPageBoundsL(direction, imgWidth, pos, pageWidth);
  img.src = pacArray[1][focus];
  if (direction) {
    pos += 0;
    img.style.left = pos + 'px';
  } else {
    pos -= 20;
    img.style.left = pos + 'px';
  }
}

function JumpUp() {
  let img = document.getElementById('PacMan');
  let imgWidth = img.width;
  focus = (focus + 1) % 2;
  directionY = checkPageBoundsY(directionY, imgWidth, posY, pageHeight);
  img.src = pacArray[2][focus];
  if (directionY) {
    posY += 0;
    img.style.top = posY + 'px';
  } else {
    posY -= 20;
    img.style.top = posY + 'px';
  }
}
function JumpDown() {
  let img = document.getElementById('PacMan');
  let imgWidth = img.width;
  focus = (focus + 1) % 2;
  directionY = checkPageBoundsYD(directionY, imgWidth, posY, pageHeight);
  img.src = pacArray[3][focus];
  if (directionY) {
    posY += 0;
    img.style.top = posY + 'px';
  } else {
    posY += 20;
    img.style.top = posY + 'px';
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
    case 37:
      allClear();
      intervalLeft = setInterval(RunLeft, 200)
      break;
    case 39:
      allClear();
      intervalRight = setInterval(RunRight, 200);
      break;
    case 38:
      allClear();
      intervalUp = setInterval(JumpUp, 200);
      break;
    case 40:
      allClear();
      intervalDown = setInterval(JumpDown, 200);
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
function getRandom(scale) {
  return Math.floor(Math.random() * scale + 1);
}
function factory(total) {
  // check how make balls exist already and add to the array
  //make random color and push to array colors[]
  for(let i =0; i<total; i++){
  color = `rgb(${getRandom(256)},${getRandom(256)},${getRandom(256)})`;
  colors.push(color);
  }
   // Everything below was provided to me
  for (let i = 0; i < total; i++) {
    size = 10;
    makeBall(getRandom(pageWidth-100) + 25, getRandom(pageHeight-100) + 25, colors[i]);
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
 document.body.innerHTML = `<div id = 'scoreBoard'>
    <ul>
      <li><div>Points Left: ${upBalls.length}</div></li>
      <li><div>Score: </div></li>
      <li><div>Time until Refresh: </div></li>
    </ul>
  </div>
  <img id="PacMan" src="images/PacMan1.png" width='50' style="position:absolute; left:${pos}; top:${posY}"> </img>`;
  factory(getRandom(100));
}
factory(getRandom(100));
setInterval(setPoints, 30000);

//Please do not change
module.exports = checkPageBounds;
