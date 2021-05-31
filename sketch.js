var PLAY=1;
var END=0;
var gameState=1;
var monkey , monkey_running
var banana ,bananaImage;
var obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score=0;
var score1=3;
var backs,back;
var InvisibleGround;
var lost;
var v3;
var v5;
var treea,t1;
var co,c1;
var ra1 ,restart;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  backs = loadImage("d2a.jpg");
  lost = loadImage("you just lost the game.jpg");
  v3 = loadSound("zapsplat_multimedia_game_tone_countdown_release_ascend_60075.mp3");
  v5 = loadSound("zapsplat_multimedia_game_sound_futuristic_award_unlock_bonus_003_59267.mp3");
 t1 = loadImage("tree1-removebg-preview.png");
 restart = loadImage("restart.JPG")
 
 // c1 = loadImage("co.PNG");
  
}



function setup() {
    createCanvas(displayWidth ,displayHeight);
  
 
  
  
    ra1 = createSprite(displayWidth-500 ,displayHeight-500,80,25);
    ra1.addImage(restart);
    ra1.visible = false;




  
  
  monkey = createSprite(200,700,10,50);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.2;
     
 
  
  InvisibleGround = createSprite(400,800,900,10);
  InvisibleGround.visible=false;
  
   
  
  FoodGroup=createGroup();
  obstacleGroup=createGroup();

  
  
}


function draw() {
    background(backs);
  

    camera.position.x = obstacleGroup.x;
  monkey.collide(InvisibleGround);

  InvisibleGround.velocityX=-(6+1*score/5);
  
  if(gameState===PLAY){
      if (InvisibleGround.x < 0){
      InvisibleGround.x = InvisibleGround.width/2;
    }
    
    
  
  if(keyDown("space")&&monkey.y>=250){
    monkey.velocityY=-16;
    v3.play();
  }
  
  monkey.velocityY=monkey.velocityY + 0.8;
  
  fruit();
  danger();
  
    
  
  if(FoodGroup.isTouching(monkey)){
   //monkey.scale=(0.15+0.01*score/5)
    FoodGroup.destroyEach();
    score = score+2;
  monkey.scale=monkey.scale+0.01;
     }
    
    // switch(score){
      //  case 10: monkey.scale=0.16;
        //        break;
        //case 20: monkey.scale=0.17;
         //       break;
        //case 30: monkey.scale=0.18;
         //       break;
       // case 40: monkey.scale=0.19;
         //       break;
        //case 50: monkey.scale=0.20;
          //      break;
        //default: break;
   // }
    
     if(obstacleGroup.isTouching(monkey)){
    //v5.play();
    monkey.scale=monkey.scale-0.02;
       score1=score1-1;
     //score=score-5;
     //FoodGroup.destroyEach();
    obstacleGroup.destroyEach();
   // monkey.scale=monkey.scale-0.01;

 //gameState=END;
   }
    
    if(score1<1){
      gameState=END;
    }
    
    //if(monkey.isTouching(treea)){
      //gameState=END;
      
    //}
    
    
    
 
     
    
   
    
 
  }else if(gameState===END){
    
    FoodGroup.destroyEach();
    obstacleGroup.destroyEach();
   monkey.destroy();
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    ra1.visible = true;
   background(lost);
  
   if(keyDown("r")){
     reset();
   }
   
  }
    
  
  
console.log(monkey.y);
  
  drawSprites();
  fill("black");
   textSize(30);
  text("SCORE= "+score,400,50);
 text("life= "+score1,50,50);
}

 function reset(){
gameState = PLAY;
score = 0;
score1 = 3;
monkey = createSprite(200,700,10,50);
monkey.addAnimation("running",monkey_running);
monkey.scale=0.2;
ra1.visible = false;
   
}

function fruit(){
  
  if(frameCount % 80===0){
   banana = createSprite(800,Math.round(random(500,650)),25,25);
    banana.velocityX=-(6+1*score/5);
  banana.addImage(bananaImage);
  banana.scale=0.2;
    FoodGroup.add(banana);
  }
  
}

function danger(){
  if(frameCount % 110===0){
    obstacle = createSprite(600,750,25,25);
    obstacle.velocityX=-(6+1*score/5);
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.18;
    obstacleGroup.add(obstacle);
  }
}
