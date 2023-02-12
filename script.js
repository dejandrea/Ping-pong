//declarando as variáveis
var player1,player2
var ball
var edges, topEdge,bottomEdge,rightEdge,leftEdge
var scoreP1 = 0
var scoreP2 = 0
const start = 0
const play = 1
const end = 2
var gameState = start
var sound1
var modoJogo = 0

function preload(){
  //sound1 = loadSound("sound://category_hits/vibrant_game_hit_poof_dissolve_2_up.mp3")
}


//setup faz a configuração
function setup(){
  createCanvas(400,400);

  player1 = createSprite(390,200,10,70)
  player2 = createSprite(10,200,10,70)

  ball = createSprite(200,200,15,15)

  edges = createEdgeSprites()
  rightEdge = edges[0]
  leftEdge = edges[1]
  topEdge = edges[2]
  bottomEdge = edges[3]
  
}

function draw(){
  background("white");

  ball.bounceOff(bottomEdge)
  ball.bounceOff(topEdge)
  ball.bounceOff(player1)
  ball.bounceOff(player2)
  

  if(gameState === start){

    if (modoJogo === 0) {
      textSize(20);
      textAlign(CENTER,CENTER);
      fill("red")
      strokeWeight(1)
      text("Press S to single Player Game ",200,50);
      text("or M to multiplayer Game",200,75);

      if (keyDown("s")) {
        modoJogo = 1
      }
      if (keyDown("m")) {
        modoJogo = 2
      }
    }else{
      textSize(15);
      textAlign(CENTER,CENTER);
      text("Press SPACE to start",200,160);
      
      if (keyDown("space")){
        startGame();
        gameState = play;
      }
    }

    
  }

  if (gameState === play) {

    //controles do jogo
    if (modoJogo === 1) {
      player1.y = mouseY
      player2.y = ball.y
    } else if(modoJogo === 2) {
      if (keyDown("up")) {
        player1.y -= 5
      }
      if (keyDown("down")) {
        player1.y += 5
      }
      if (keyDown("w")) {
        player2.y -= 5
      }
      if (keyDown("s")) {
        player2.y += 5
      }
      
    }
    

    if (ball.isTouching(topEdge) || ball.isTouching(bottomEdge)) {
      //sound1.play()
    }

    if (ball.x > 400) {
      resetGame()
      gameState = start
      scoreP2 ++
    }
    if (ball.x < 0) {
      resetGame()
      gameState = start
      scoreP1 ++
    }

    if (scoreP1 === 5||scoreP2 === 5){
      gameState = end;
    }
  }

  if(gameState === end){
    textSize(15);
    textAlign(CENTER,CENTER);
    text("Game Over",200,160);
    text("Press I to restart the Game",200,175);
     if (keyDown("i")){
       gameState = start;
       resetGame();
       scoreP1 = 0;
       scoreP2 = 0;
     }
  }

  fill("black");
  textSize(20);
  textAlign(CENTER,CENTER);
  text(scoreP2,150,20);
  text(scoreP1,250,20);

  drawLine()

  //coordenadas do mouse na tela
  //text("X: "+mouseX+" / Y: "+mouseY,mouseX,mouseY)
  drawSprites();
}

function drawLine(){
  for (let i = 0; i <400; i+=20) {
    line(200,i,200,i+10)
  }
}

function startGame(){
  ball.setVelocity(4,5);
}

function resetGame(){
  ball.x = 200;
  ball.y = 200
  ball.setVelocity(0,0)
  player1.y = 200
  player2.y = 200
}
