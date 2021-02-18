var alex, alexAni;
var platform, platformImage, platG;
var monster, monsterAni;
var BackG, jump, jumpAni, jumpG;
var platformG, monsterG;
var PLAY = 1, SETUP = 0, END = 2; 
var gamestate = SETUP;
var coin, coinAni, coinG;
var score;

function preload(){
platformImage = loadImage("platform.jpg");
alexAni = loadAnimation("p1.png","2.png","p3.png");
monsterAni = loadAnimation("M1.png","M2.png","M3.png","M4.png","M5.png","M6.png");
BackG = loadImage("Back.png");
coinAni = loadAnimation("C1.png","C2.png","C3.png","C4.png","C5.png","C6.png","C7.png","C8.png","C9.png");
jumpAni = loadAnimation("J1.png","J2.png","J3.png","J4.png","J5.png","J6.png");
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  alex = createSprite(windowWidth/2,windowHeight/2,10,10);
  alex.addAnimation("moving",alexAni);
  alex.scale = 2; 
  platformG = new Group();
  monsterG = new  Group();
  jumpG = new Group();
  coinG = new Group();
  score = 0;
}

function draw() {
  background(BackG);
  textSize(25); 
  fill("red");
  if(gamestate === SETUP){
    text("Use the arrow keys to move, try to survive as long a possible!", windowWidth/2-300, windowHeight/2);  
    text("Press Space To Start!!!", windowWidth/2-175, windowHeight/2-50);  
    alex.visible = false;
     if(keyDown("space")){
        gamestate = PLAY;
     }
    }
  if(gamestate === PLAY){
    if(alex.isTouching(coinG)){
      score = score+100;
    }
  alexCreate();
  alex.visible = true;
  createPlatform();
  spawnMonster();
  spawnJM();
    if(alex.isTouching(monsterG) || alex.isTouching(jumpG) || alex.y>windowHeight){
      gamestate = END;
   }
  }
 if(gamestate === END){
 alex.destroy();
 text("Game Over!!", windowWidth/2-125, windowHeight/2-50);  
 coinG.velocityY = 0;
 platformG.velocityY = 0;
 monsterG.velocityY = 0
 monsterG.velocityX = 0;
 jumpG.velocityY = 0;
 jumpG.velocityX = 0;
 }
  text("score:"+ score, windowWidth/2-25, windowHeight/8-20);
  alex.collide(platformG);
  drawSprites();
}

function createPlatform(){
  if(frameCount%80===0){
    var r;
    platform = createSprite(windowWidth+200,windowHeight/4);
    coin = createSprite(windowWidth+200,windowHeight/4);
    r = random(windowHeight/4,windowHeight);
    platform.y = r;
    coin.y=r-70
    platform.addImage(platformImage)
    coin.addAnimation("ani", coinAni)
    platform.scale = 0.3;  
    platform.velocityX=-8;  
    coin.velocityX=-8;  
    platform.depth = alex.depth;
    alex.depth = alex.depth + 1;
    coin.depth = alex.depth;
    alex.depth = alex.depth + 1;
    platform.lifetime = 500;
    coin.lifetime = 500;
    platformG.add(platform);
    coinG.add(coin);
   }
}

function spawnMonster(){
  if(frameCount%150===0){
    monster = createSprite(windowWidth+200,windowHeight/4);
    monster.x = random(windowWidth/4,windowWidth);
    monster.addAnimation("monster",monsterAni);
    monster.scale = 2;
    monster.setVelocity(-3,3);
    monster.depth = alex.depth;
    alex.depth = alex.depth + 1; 
    monster.lifetime = 500;
    monsterG.add(monster);
   }
}

function spawnJM(){
  if(frameCount%170===0){
    jump = createSprite(windowWidth+200,windowHeight/4);
    jump.x = random(windowWidth/4,windowWidth);
    jump.addAnimation("jump",jumpAni);
    jump.scale = 2;
    jump.setVelocity(-3,3);
    jump.depth = alex.depth;
    alex.depth = alex.depth + 1; 
    jump.lifetime = 500;
    jumpG.add(jump);
   }
}

function alexCreate(){
  if(keyDown("left")){
    alex.x=alex.x-10
    }
    if(keyDown("right")){
    alex.x=alex.x+10
    }
    if(keyDown("up")){
    alex.velocityY=-6;
    }
    alex.velocityY+=0.21;
}