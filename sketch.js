var bgImg , bird,birdImg , bg;
var topLong, bottomLong,topMedium, bottomMedium,topSmall, bottomSmall;
var bottomLongImg ,topLongImg, bottomMediumImg ,topMediumImg,
 bottomSmallImg ,topSmallImg;
var coin , coinImg;
var gameoverImg, gameover ,reset,resetImg;
var ground;
var obstacleGroup;
var gameState = "play";
var cloudImage,cloud2Img;
var cloudsGroup, coinGroup;
 var coin1,coin2,coin3;
var score = 0;

function preload() {
  birdImg = loadImage("bird.png");
  bgImg = loadImage("background.png");
  coinImg = loadImage("coin.png");
  gameoverImg = loadImage("gameover.png");
  resetImg = loadImage("reset.png");
  cloudImage = loadImage("cloud.png");
  cloud2Img = loadImage("cloud2.png");
  
   bottomSmallImg = loadImage("bottomsmall.png");
  topSmallImg = loadImage("topsmall.png");
   bottomMediumImg = loadImage("bottomMedium.png");
  topMediumImg = loadImage("topMedium.png");
  topLongImg = loadImage("topObstacle.png");
 bottomLongImg = loadImage("bottomObstacle.png");
}

function setup() {
createCanvas(580, 250);
  bg = createSprite(50,50,200,10);
  bg.addImage("bg",bgImg);
  bg.x = bg.width/4;
  bg.scale = 0.5;
  bg.velocityX = -3;
  
  
  bird = createSprite(100,125,10,10);
  bird.addImage(birdImg);
  bird.scale = 0.15;
  bird.setCollider("circle",0,0,70);
 
  ground = createSprite(250,240,700,10);
  ground.visible = false;
  
  gameover = createSprite(275,100,10,10);
  gameover.addImage(gameoverImg);
  gameover.scale=0.4;
  gameover.visible = false;
  
  reset = createSprite(290,150,10,10);
  reset.addImage(resetImg);
  reset.scale = 0.1
  reset.visible = false;
  obstacleGroup = new Group();
   cloudsGroup = new Group();
  coinGroup = new Group();
}

function draw() {
background(0);
   
  if(gameState === "play"){
      if(keyDown("space")){
  bird.velocityY=-4;
  }
  
    bg.velocityX = -3;
  bird.velocityY = bird.velocityY+0.8;
   
    
 if(bg.x<0){
   bg.x = bg.width/4; 
 }
    
 
   bird.collide(ground);
  spawnObstacles();
  spawnClouds();
    
    
  if(bird.isTouching(obstacleGroup)){
    gameState = "end";
  }
  }
  
  if(gameState === "end"){
    gameover.visible = true;
    reset.visible = true;
    bg.velocityX = 0;
   bird.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
 obstacleGroup.setLifetimeEach(-1);
    cloudsGroup.setVelocityXEach(0);
    cloudsGroup.setLifetimeEach(-1);
     coinGroup.setVelocityXEach(0);
    coinGroup.setLifetimeEach(-1);
 
  }
  if(mousePressedOver(reset)){
    restart();
  }
  
  drawSprites();
  if(bird.isTouching(coinGroup)){
    score++
  }
  textSize(25);
  fill("blue");
  text("Score: "+score,200,50);

}



function spawnObstacles() {
  if(frameCount % 70 === 0) {
    var topObstacle = createSprite(600,20,10,40);
    var bottomObstacle = createSprite(600,230,10,40);
   
    //obstacle.debug = true;
    topObstacle.velocityX = -5;
    bottomObstacle.velocityX = -5;
    
    //generate random obstacles
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: topObstacle.addImage(topLongImg);
              topObstacle.scale = 0.5
              bottomObstacle.scale = 0.5
              bottomObstacle.addImage(bottomSmallImg);
              coin1 = createSprite(600,190,20,20);
              coinGroup.add(coin1);
              coin1.velocityX = -5;
              coin1.addImage(coinImg);
              coin1.scale = 0.03;
              coin1.lifetime = 100;

             // score = score+1;
              break;
              
      case 2: topObstacle.addImage(topSmallImg);
              bottomObstacle.addImage(bottomLongImg);
              topObstacle.scale = 0.5
              bottomObstacle.scale = 0.5
              coin2 = createSprite(600,100,20,20);
              coinGroup.add(coin2);
              coin2.velocityX = -5;
              coin2.addImage(coinImg);
              coin2.scale = 0.03;
              coin2.lifetime = 100;
           //   score = score+200;
              break;
              
      case 3: topObstacle.addImage(topMediumImg);
              bottomObstacle.addImage(bottomMediumImg);
              topObstacle.scale = 0.5
              bottomObstacle.scale = 0.5
              coin3 = createSprite(600,130,20,20);
              coinGroup.add(coin3);
              coin3.velocityX = -5;
              coin3.addImage(coinImg);
              coin3.scale = 0.03;
              coin3.lifetime = 100;
            //  score = score+300;
              break;
     
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
  
    topObstacle.lifetime = 200;
     bottomObstacle.lifetime = 200;
    //add each obstacle to the group
    obstacleGroup.add(topObstacle);
     obstacleGroup.add(bottomObstacle);

  }
}
function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(50,100));
    //cloud.addImage(cloudImage);
    
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    var rand = Math.round(random(1,2));
    switch(rand){
        case 1 : cloud.addImage(cloudImage);
                 cloud.scale = 0.1;
        break;
        case 2 : cloud.addImage(cloud2Img);
                cloud.scale = 0.2;
        break;
        default: break;
    }

     bird.depth = cloud.depth;
    bird.depth+=1;
    
    gameover.depth = cloud.depth;
    gameover.depth+=1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function restart(){
    gameState = "play";
  gameover.visible = false;
  reset.visible = false;
  
  obstacleGroup.destroyEach();
  cloudsGroup.destroyEach();
  coinGroup.destroyEach();
  score = 0;

}


