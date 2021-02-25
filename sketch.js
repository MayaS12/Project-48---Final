var backgroundImg;
var bunnyAni;
var bunny1, bunny2, bunny3, bunny4
var carrot, carrotImg;
var database;
var allPlayers, playerCount;
var bunnies = [];
var finishedPlayers = 0;
var player,form,game;
var passed = false;
var fruitGroup;

var gameState = 0;
var score = 0;

function preload()
{
	backgroundImg = loadImage("Background.jpg");
	carrotImg = loadImage("Carrot.png");
	bunnyAni = loadAnimation("Bunny 1.png", "Bunny 2.png", "Bunny 3.png");
	startBunnyImg = loadAnimation("Bunny 1.png");
}

function setup() {
	createCanvas(displayWidth-30, displayHeight-30);

	database = firebase.database();
	game = new Game();
	game.getState();
	game.start();

	fruitGroup = new Group();
  
}


function draw() {
	if(playerCount === 4){
		game.update(1);
	  }
	  if(gameState === 1){
		clear();
		game.play();
	  }
	  if(finishedPlayers===4){
		game.update(2);
	  }
	  if(gameState === 2){
		game.end();                 
	  }
}



