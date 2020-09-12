var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":[],"propsByKey":{}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

var outer1 = createSprite(50, 200, 5, 390);
outer1.shapeColor="#000000";

var outer2 = createSprite(200, 395, 300, 5);
outer2.shapeColor = "#000000";

var outer3 = createSprite(350, 200, 5, 390);
outer3.shapeColor="#000000";

var outer4 = createSprite(200, 5, 300, 5);
outer4.shapeColor = "#000000";

var goal1 = createSprite(200, 20, 150, 20);
goal1.shapeColor = "#FFFF00";

var goal2 = createSprite(200, 380, 150, 20);
goal2.shapeColor = "#FFFF00";

var striker = createSprite(200, 200, 20, 20);
striker.shapeColor = "#696969";

var playermallet = createSprite(200, 350, 75, 15);
playermallet.shapeColor = "#000000";

var computermallet = createSprite(200, 50, 75, 15);
computermallet.shapeColor = "#000000";

var gameState = "serve";
var compScore = 0;
var playerScore = 0;

function draw() {
background("white");
drawnet();
computermallet.x = striker.x;

if (gameState === "serve") {
  text("Press Space to Serve",150,180);
}
textSize(16);
text(compScore, 15, 190);
text(playerScore, 15, 220);

playermallet.bounceOff(outer1);
playermallet.bounceOff(outer2);
playermallet.bounceOff(outer3);
computermallet.bounceOff(outer1);
computermallet.bounceOff(outer3);
computermallet.bounceOff(outer4);
if (striker.isTouching(outer4) || (striker.isTouching(outer3) || (striker.isTouching(outer2) || striker.isTouching(outer1)))) {
  playSound("assets/wall_hit.mp3");
  striker.bounceOff(outer1);
  striker.bounceOff(outer2);
  striker.bounceOff(outer3);
  striker.bounceOff(outer4);
}

if (keyDown("space") && gameState === "serve") {
  serve();
  gameState = "play";
}
if(striker.isTouching(goal1) || striker.isTouching(goal2)) {
  playSound("assets/score.mp3");
  if (striker.isTouching(goal2)) {
    compScore = compScore + 1;
  }
  if (striker.isTouching(goal1)) {
    playerScore = playerScore + 1;
  }
  reset();
  gameState = "serve";
}
if (keyDown("up")) {
  if (playermallet.y > 210) {
    up();
  }
}
if (keyDown("down")) {
  if (playermallet.y < 360) {
    down();
  }
}
if (keyDown("left")) {
  left();
}
if (keyDown("right")) {
  right();
}
if (playerScore === 5 || compScore === 5) {
  gameState = "end";
  text("game over", 170, 175);
  text("press 'r' to restart", 150, 190);
}
if (keyDown("r")) {
  restart();
}
if (keyDown("r") && gameState === "end") {
  restart();
}
if (striker.bounceOff(playermallet) || striker.bounceOff(computermallet)) {
  playSound("assets/hit.mp3");
}

drawSprites();
}
function drawnet() {
  for (var num = 0; num < 400; num=num+20) {
    line(num,200,num+10,200);
  }
}
function up() {
  playermallet.y = playermallet.y - 10;
}
function down() {
  playermallet.y = playermallet.y + 10;
}
function left() {
  playermallet.x = playermallet.x - 10;
}
function right() {
  playermallet.x = playermallet.x + 10;
}
function serve() {
  striker.velocityX = 4;
  striker.velocityY = 3;
}
function reset() {
  striker.x = 200;
  striker.y = 200;
  striker.velocityX = 0;
  striker.velocityY = 0;
}
function restart() {
  gameState = "serve";
  compScore = 0;
  playerScore = 0;
}

// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
