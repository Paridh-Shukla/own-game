var canvas;
var shooter,shooterImg1,shooterImg2,shooterImg3,bgImg;
var zombiesGroup, zombie1, zombie2, zombie3;
var bulletGroup,bulletImg;
var bg,score;
var reset,resetImg;
var gameState="play";

function preload(){
shooterImg1 = loadImage("Shooter1.png.png");
shooterImg2 = loadImage("Shooter2.png.png");
shooterImg3 = loadImage("shooter3.png");
bgImg = loadImage("background.jpg");
zombie1 = loadImage("zombie1.png");
zombie2 = loadImage("zombie2.png");
zombie3 = loadImage("zombie3.png");
bulletImg = loadImage("bullet.png");
resetImg = loadImage("resetImg.png");
}

function setup(){
    canvas = createCanvas(windowWidth,windowHeight);
    
    shooter = createSprite(100,340,20,20);
    shooter.addImage("standing",shooterImg1);
    shooter.addImage("shooting",shooterImg2);
    shooter.addImage("dead",shooterImg3);
    shooter.debug = true;

    reset = createSprite(700,300,20,20);
    reset.addImage(resetImg);
    reset.scale=0.5;

    zombiesGroup = createGroup();
    bulletGroup = createGroup();

    score = 0;
}

function draw() {

    background(bgImg);

    if(gameState=="play")
    {
      reset.visible = false;
      spawnZombies();
      if(keyWentDown("space")){
        shooter.changeImage("shooting",shooterImg2);
        spawnBullets();
      }
      if(keyWentUp("space")){
        shooter.changeImage("standing",shooterImg1);
      }
      if(zombiesGroup.isTouching(bulletGroup)){
        for(var i=0;i<zombiesGroup.length;i++){     
            
         if(zombiesGroup[i].isTouching(bulletGroup)){
              zombiesGroup[i].destroy()
              bulletGroup.destroyEach()
          
              } 
        score = score+1;
        
        }
      }

      if(zombiesGroup.isTouching(shooter)){
          gameState="end"
         }
  }
    else if(gameState=="end")
    {
      reset.visible = true;
      shooter.changeImage("dead",shooterImg3);
      zombiesGroup.destroyEach();    
      //zombiesGroup.velocityXEach(0); 
      zombiesGroup.setVelocityXEach(0);

      if(mousePressedOver(reset)) {
        restart();
      }
    }
      textSize(30);
      fill("white");
      text("Score:"+ score, 1400,50);

     
  

   
    drawSprites();
}

function spawnZombies(){
    if (frameCount % 100 === 0){
      var zombie = createSprite(1500,340,10,40);
      zombie.velocityX = -3;
      
       var rand = Math.round(random(1,3));
       switch(rand) {
         case 1: zombie.addImage(zombie1);
                 break;
         case 2: zombie.addImage(zombie2);
                 break;
         case 3: zombie.addImage(zombie3);
                 break;
         default: break;
       }
         
       zombie.scale = 0.5;
       zombie.lifetime = 1500;
      
       zombiesGroup.add(zombie);
    }
   }

function spawnBullets(){
    var bullet = createSprite(100,340,20,20);
    bullet.addImage(bulletImg);
    bullet.scale = 0.07;
    bullet.velocityX = 4;
    bulletGroup.add(bullet);
}

function restart(){
  gameState = PLAY;
  reset.visible = false;
  zombiesGroup.destroyEach();
  shooter.changeImage("standing",shooterImg1);
  
  score = 0;
}