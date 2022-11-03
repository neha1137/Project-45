var play=1 ;
var end=0;
var gameState=play;
var ground,sground;

var dora,dora1,dora_collided,sadImg;
var bg,bg1;
var virus,virusGroup;
var virus1,virus2,virus3,sun,score;
function preload(){
    bg = loadImage('bggg.webp');

    virus1 = loadImage("virus0.png");
    virus2 = loadImage("virus2.png");
    virus3 = loadImage("virus3.png")
    sun = loadImage("sun0.png");
    dora1 = loadAnimation("walk.png","wave.png");

    restartImg = loadImage("restart.png")
   gameOverImg = loadImage("gameOver.png")
  
    sadImg = loadImage('sad0.png');
}
function setup(){

    canvas = createCanvas(1000,700);

    bg1 = createSprite(700,250,1000,700);
    bg1.addImage("bggg",bg);

    ground = createSprite(100,600,1000,20);
    ground.visible=false;

    //sground = createSprite(100,600,1000,40);
    //sground.visible=true;

    dora = createSprite(200,550,50,50);
    
    dora.addAnimation("doraanime",dora1);
    dora.addAnimation("collided",sadImg)
    dora.scale=0.5;
    
    

    gameOver = createSprite(500,350,100,50);
   gameOver.addImage(gameOverImg);
  
  restart = createSprite(500,300,300,100);
  restart.addImage(restartImg);

  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

 virusGroup = createGroup();
 //virusGroup.setCollider("circle",0,0,10);
 //virusGroup.debug=true;
 //sunGroup = createGroup();

  dora.setCollider("circle",0,0,120);
  dora.debug = true

 score =0;


}
function draw(){
    
  background(0000);

    //displaying score
  text("Score: "+ score, 400,100);

  

 // console.log("this is ",gameState);

  bg1.velocityX=-4;

if (gameState === play){

    gameOver.visible = false;
    restart.visible = false;

    

    if(bg1.x<0){
        bg1.x = ground.width/2;
    }
    
    
    ground.velocityX = -4;
    if (ground.x < 0){
        ground.x = ground.width/2;
      }

      score = score + Math.round(frameCount/60);

   if(keyDown("space")&& dora.y >= 100) {
        dora.velocityY = -12;
    }
    
    //add gravity
    dora.velocityY = dora.velocityY + 0.8;
  
    
    spawnVirus();
    spawnSun(); 

    if(virusGroup.isTouching(dora)){
         gameState = end;
    
      }
    }
    else if( gameState === end){
        //console.log("hey");
        gameOver.visible= true;
        restart.visible= true;
        
        
        dora.velocityX=0;
        //dora.velocityY=0;
        ground.velocityX=0;
        bg1.velocityX=0;
        

        dora.changeAnimation("collided",sadImg);
        

        //set lifetime of the game objects so that they are never destroyed
    virusGroup.setLifetimeEach(-1);
    
     virusGroup.setVelocityXEach(0);
     //sun.setVelocityXEach(0);

   }
   //if(mousePressed(restart)){
    //gameState=play;
   //}
        
   dora.collide(ground);
    drawSprites();
}
function spawnVirus(){
    if (frameCount % 100 === 0){
      virus = createSprite(900,100,10,40);
      virus.y=Math.round(random(500,550));
      virus.velocityX = -6;
      
      
       //generate random viruses
       var rand = Math.round(random(1,3));
       switch(rand) {
         case 1: virus.addImage(virus1);
                 break;
         case 2: virus.addImage(virus2);
                 break;
         case 3: virus.addImage(virus3);
                 break;
         
         default: break;
       }
      
       //assign scale and lifetime to the virus         
       virus.scale = 0.5;
       virus.lifetime = 300;
      
      //add each virus to the group
        virusGroup.add(virus);
    }
   }
   function spawnSun(){
    if (frameCount % 180 === 0){
      var sunball = createSprite(300,100,10,40);
      sunball.addImage(sun);
      sunball.velocityX = -6;
      
       
      
       //assign scale to the sun          
       sunball.scale = 0.5;
       
      
      
    }
   }