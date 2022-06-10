/*--------------------------------------------------------*/
var PLAY = 1;
var END = 0;
var WIN = 2;
var gameState = PLAY;

var rabbit, rabbit_running, rabbit_collided;
var jungle, invisiblejungle;

var obstaclesGroup, obstacle1;

var score=0;

var gameOver, restart;

function preload(){
  rabbit_running =   loadImage("rabbit.gif")
 // kangaroo_collided = loadAnimation()
  jungleImage = loadImage("assets/bg.png");
  shrub1 = loadImage("assets/shrub1.png");
  shrub2 = loadImage("assets/shrub2.png");
  shrub3 = loadImage("assets/shrub3.png");
  obstacle1 = loadImage("assets/stone.png");
  gameOverImg = loadImage("assets/gameOver.png");
  restartImg = loadImage("assets/restart.png");
  jumpSound = loadSound("assets/jump.wav");
  collidedSound = loadSound("assets/collided.wav");
}

function setup() {
  createCanvas(800, 400);

  jungle = createSprite(400,100,400,20);
  jungle.addImage("jungle",jungleImage);
  jungle.scale=0.3
  jungle.x = width /2;

  rabbit = createSprite(50,200,20,50);
  rabbit.addImage("running", rabbit_running);
  //rabbit.addAnimation("collided", rabbit_collided);
  rabbit.scale = 0.15;
  rabbit.setCollider("circle",0,0,300)

  invisibleGround = createSprite(400,350,1600,10);
  invisibleGround.visible = false;
  
  shrubsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;

}

function draw() {
  background(255);

  // rabbit.x=camera.positionX-270;
  // rabbit.x=Camera.position.x-270;
   rabbit.x=camera.position.x-270;
  // rabbit.x=Camera.Position.X-270;
   
  if (gameState===PLAY){

    jungle.velocityX=-3

    if(jungle.x<100)
    {
       jungle.x=400
    }
   console.log(rabbit.y)
    if(keyDown("space")&& rabbit.y>270) {
      jumpSound.play();
      rabbit.velocityY = -16;
    }
  
    rabbit.velocityY = rabbit.velocityY + 0.8
    spawnShrubs();
    spawnObstacles();

    rabbit.collide(invisibleGround);
    
    if(obstaclesGroup.isTouching(rabbit)){
      collidedSound.play();
      gameState = END;
    }
    if(shrubsGroup.isTouching(rabbit)){

      shrubsGroup.destroyEach();
    }
  }
  else if (gameState === END) {
    
    rabbit.velocityY = 0;
    jungle.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
    shrubsGroup.setVelocityXEach(0);

    rabbit.changeAnimation("collided",rabbit_collided);
    
    obstaclesGroup.setLifetimeEach(-1);
    shrubsGroup.setLifetimeEach(-1);
    
  }

  
  drawSprites();


}

function spawnShrubs() {

  if (frameCount % 150 === 0) {

    // var shrub = createSprite(camera.position+500,330,40,10);
     var shrub = createSprite(camera.position.x+500,330,40,10);
    // var shrub = createSprite(camera.positionX+500,330,40,10);
    // var shrub = createSprite(Camera.position.x+500,330,40,10);

    shrub.velocityX = -(6 + 3*score/100)
    shrub.scale = 0.6;

    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: shrub.addImage(shrub1);
              break;
      case 2: shrub.addImage(shrub2);
              break;
      case 3: shrub.addImage(shrub3);
              break;
      default: break;
    }
         
    shrub.scale = 0.05;
    shrub.lifetime = 400;
    
    shrub.setCollider("rectangle",0,0,shrub.width/2,shrub.height/2)
    shrubsGroup.add(shrub);
    
  }
  
}

function spawnObstacles() {
  if(frameCount % 120 === 0) {

    // var obstacle = createSprite(camera.Position.X+400,330,40,40);
    // var obstacle = createSprite(Camera.Position.x+400,330,40,40);
     var obstacle = createSprite(camera.position.x+400,330,40,40);
    // var obstacle = createSprite(camera.position.x.400,330,40,40);

    obstacle.setCollider("rectangle",0,0,200,200)
    obstacle.addImage(obstacle1);
    obstacle.velocityX = -(6 + 3*score/100)
    obstacle.scale = 0.15;   
 
    obstacle.lifetime = 400;
    obstaclesGroup.add(obstacle);
    
  }
}