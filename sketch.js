var tower,towerImage;
var climber,climberImage,climberGroup;
var ghost,ghostImage;
var invisibleBlock,invisibleBlockGroup;
var door,doorImage,doorGroup;
var gameState="play";

var sound;
function preload(){
  towerImage=loadImage("tower.png");
  doorImage=loadImage("door.png");
  climberImage=loadImage("climber.png");
  ghostImage=loadImage("ghost-standing.png");
  sound=loadSound("spooky.wav");
  
}
function setup() {
  createCanvas(600, 600);
  sound.loop();
  
  tower=createSprite(300,300,100,100);
  tower.addImage("tower",towerImage);
  tower.velocityY=1;
  
  doorGroup=new Group();
  climberGroup=new Group();
  invisibleBlockGroup=new Group();
  
  ghost=createSprite(200,200,50,50);
  ghost.addImage("ghost",ghostImage);
  ghost.scale=0.4;

  
}

function draw() {
  background(0);
  
  if(gameState==="play"){
    
    if(keyDown("left")){
    ghost.x=ghost.x-3;
  }
  
   if(keyDown("right")){
    ghost.x=ghost.x+3;
  }
    
  if(keyDown("space")){
    ghost.velocityY=-5;
  }
    if(tower.y>400){
    tower.y=300;
  }
    
  ghost.velocityY=ghost.velocityY+0.8;
  
  
  
  
  if(climberGroup.isTouching(ghost)){
    ghost.velocityY=0;
  }
  
  if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
    ghost.destroy;
  }
 
  spawnDoor();
  
  
  drawSprites();
}
  
  if(gameState==="end"){
    
    textSize(50);
    fill("red");
    text("GAME OVER",230,250);
  }
}

function spawnDoor(){
  
 if(frameCount%240===0){
   door=createSprite(200,-50);
   door.addImage("door",doorImage);
   
   door.x=Math.round(random(120,400));
   door.velocityY=1;
   door.lifetime=700;
   doorGroup.add(door);
   
   climber=createSprite(200,10);
   climber.addImage("climber",climberImage);
   
   climber.x=door.x;
   climber.velocityY=1;
   climber.lifetime=700;
   climberGroup.add(climber);
   
   ghost.depth=door.depth;
   ghost.depth=ghost.depth+1;
   
   invisibleBlock=createSprite(200,15)
   invisibleBlock.width=climber.width;
  invisibleBlock.height=2;
   
   invisibleBlock.x=door.x;
   invisibleBlock.velocityY=1;
   invisibleBlockGroup.add(invisibleBlock);
   invisibleBlock.debug=true;
 }
  
}

