var PLAY = 1;
var END = 0;
var gameState = PLAY;
var track, trackImage;
var player, playerImage;
var coin, coinImage;
var obstacle, obstacleImage;
var score;
var bgImage;


function preload(){
  
  trackImage = loadImage("raceTrack.png");
  playerImage = loadImage("player.png");
  coinImage = loadImage("coin.png");
  obstacleImage = loadImage("stone.png");
  bgImage = loadImage("bgImage.PNG");
} 
  

  


function setup(){
  
  
  createCanvas(displayWidth,displayHeight);
  track = createSprite(displayWidth/2,displayHeight);
  track.addImage(trackImage);
  track.velocityY = -10;
  track.scale = 3;
  player = createSprite(displayWidth/2,100,250,250);
  player.addImage(playerImage);
  player.scale = 0.3;
  coinGroup = new Group();
  obstacleGroup = new Group();
  player.setCollider("rectangle",0,0,250,450);
  player.debug = false;
  score = 0;
}

function draw(){
  
  background(bgImage)
  
  if(gameState === PLAY){ 
  if(track.y < 0){
      track.y = track.width/2;
  }
  
  //Move Player with Right Arrow Key
  if(keyDown("right_arrow")){
    player.x = player.x + 7;  
  }  
  
  //Move Player with Left Arrow Key
  if(keyDown("left_arrow")){
    player.x = player.x + -7;  
  }
  
  if(player.isTouching(coinGroup)){
    coinGroup.destroyEach();
    
    score = score + 10;

  }  
   
  spawnCoins();
  spawnObstacles();
    
  }
  
    if(player.isTouching(obstacleGroup)){
    coinGroup.destroyEach();
    obstacleGroup.destroyEach();
    track.velocityX = 0;
    gameState = END 
  }    
  else if(gameState === END){
    
    score = 0;

    stroke("black");
    fill("red");
    textSize(50);
    text("GAME OVER",displayWidth/2,345);
    
    
  } 
  drawSprites();
  
  stroke("black");
  fill("white");
  textSize(30);
  text("Score: "+ score, 100,50);
} 

function spawnCoins(){
  
  if (frameCount % 150 === 0){
      var coin = createSprite(displayWidth/2,displayHeight,10,10);

      coin.x = Math.round(random(600,800));
      coin.y = Math.round(random(250,500));  
      coin.addImage(coinImage);
      coin.scale = 0.15;
      coin.velocityY = -5;

      coin.lifetime = 250;

      coinGroup.add(coin);
  }
}

function spawnObstacles() {
  if(frameCount % 200 === 0) {
    var obstacle = createSprite(displayWidth/2,displayHeight,10,40);
    
    obstacle.x = Math.round(random(600,800));
    obstacle.y = Math.round(random(300,500));  
    obstacle.velocityY = -4;
    obstacle.addImage(obstacleImage);
            
    obstacle.scale = 0.2;
    obstacle.lifetime = 250;
    
    obstacleGroup.add(obstacle);
  }
}