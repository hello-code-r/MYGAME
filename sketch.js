var alex, alexAni;
var platform, platformImage, platG;
var monster, monsterAni;
var BackG;

function preload(){
platformImage = loadImage("platform.jpg");
alexAni = loadAnimation("p1.png","2.png","p3.png");
monsterAni = loadAnimation("M1.png","M2.png","M3.png","M4.png","M5.png","M6.png");
BackG = loadImage("Back.png");
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  alex = createSprite(windowWidth/2,windowHeight/2,10,10);
  alex.addAnimation("moving",alexAni);
  alex.scale = 2;  
}

function draw() {
  background(BackG); 
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

  if(frameCount%120===0){
   platform = createSprite(windowWidth+200,windowHeight/4);
   platform.y = random(windowHeight/4,windowHeight);
   platform.addImage(platformImage)
   platform.scale = 0.3;  
   platform.velocityX=-8;  
   platform.depth = alex.depth;
   alex.depth = alex.depth + 1; 
  }
  if(frameCount%150===0){
    monster = createSprite(windowWidth+200,windowHeight/4);
    monster.x = random(windowWidth/4,windowWidth);
    monster.addAnimation("monster",monsterAni);
    monster.scale = 3;
    monster.setVelocity(-3,3);
    monster.depth = alex.depth;
    alex.depth = alex.depth + 1; 
   }
  drawSprites();
}