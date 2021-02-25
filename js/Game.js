class Game {
    constructor(){
  
    }
  
    getState(){
      var gameStateRef  = database.ref('gameState');
      gameStateRef.on("value",function(data){
         gameState = data.val();
      })
  
    }
  
    update(state){
      database.ref('/').update({
        gameState: state
      });
    }
  
    async start(){
      if(gameState === 0){
        player = new Player();
        var playerCountRef = await database.ref('playerCount').once("value");
        if(playerCountRef.exists()){
          playerCount = playerCountRef.val();
          player.getCount();
        }
        form = new Form()
        form.display();
      }
  
      bunny1 = createSprite(100,400);
    //  bunny1.addAnimation("start",startBunnyImg);
      bunny1.addAnimation("runnning",bunnyAni);
      bunny1.scale = 0.1;
      bunny1.frameDelay = 13;

      bunny2 = createSprite(300,400);
   //   bunny2.addAnimation("start",startBunnyImg);
      bunny2.addAnimation("runnning",bunnyAni);
      bunny2.scale = 0.1;
      bunny2.frameDelay = 13;

      bunny3 = createSprite(500,400);
    //  bunny3.addAnimation("start",startBunnyImg);
      bunny3.addAnimation("runnning",bunnyAni);
      bunny3.scale = 0.1;
      bunny3.frameDelay = 13;

      bunny4 = createSprite(700,400);
    //  bunny4.addAnimation("start",startBunnyImg);
      bunny4.addAnimation("runnning",bunnyAni);
      bunny4.scale = 0.1;
      bunny4.frameDelay = 13;
  
      bunnies = [bunny1,bunny2,bunny3,bunny4];
    }
  
    play(){
      background(rgb(144, 176, 22))

      form.hide();
  
      Player.getPlayerInfo();

      player.getFinishedPlayers();
      
      if(allPlayers !== undefined){
        //var display_position = 100;
        image(backgroundImg,0,-displayHeight,displayWidth,displayHeight*4);
        //index of the array
        var index = 0;
  
        //x and y position of the cars
        var x = 0;
        var y;
  
        for(var plr in allPlayers){
          //add 1 to the index for every loop
          index = index + 1 ;
  
          //position the cars a little away from each other in x direction
          x = x + 270;
          //use data form the database to display the cars in y direction
          y = displayHeight - allPlayers[plr].distance;
          bunnies[index-1].x = x;
          bunnies[index-1].y = y;
  
          if (index === player.index){
            bunnies[index - 1].shapeColor = "red";
            camera.position.x = displayWidth/2;
            camera.position.y = bunnies[index-1].y
          }
        
        }
  
      }

      if(allPlayers !== undefined){
        var index = 0;

        var x = 270;
      for(var plr in allPlayers){
        index = index +1;

        if (index === player.index){
      if (frameCount % 5 === 0 && allPlayers[plr].distance < 4200) {
        var carrots = createSprite(random(x,x+100),random(displayHeight/6 - allPlayers[plr].distance,800), 100, 100);
        carrots.addImage(carrotImg);
        carrots.scale = 0.1;
         fruitGroup.add(carrots);       
     }
      }

      x = x + 270
    }
    }

     if(player.index != null){
       for(var i = 0; i<fruitGroup.length;i++){
           if(fruitGroup.get(i).isTouching(bunnies)){
               fruitGroup.get(i).destroy();
               player.score = player.score+1;
               player.update();
           }
       }
   }  
  
  
      if(keyIsDown(UP_ARROW) && player.index !== null && passed===false){
          player.distance +=50
        player.update();
      }


      if(player.distance>4200 && passed===false){
        passed = true;
        Player.updateFinishedPlayers();
        player.rank = finishedPlayers
        player.update();
      }
  
      drawSprites();
    }
  
    end(){
      camera.position.x = 0;
      camera.position.y = 0;
      imageMode(CENTER);
      console.log("end!")
        Player.getPlayerInfo();
        for(var plr in allPlayers){
          textSize(35)
          if(allPlayers[plr].rank===1){
            fill("blue");
            text("First place goes to: "+allPlayers[plr].name,displayWidth/10000,-200);
          }
          if(allPlayers[plr].rank===2){
            fill("white");
            text("Second place goes to: "+allPlayers[plr].name,displayWidth/10000,-130);
          }
          if(allPlayers[plr].rank===3){
            fill("yellow")
            text("Third place goes to: "+allPlayers[plr].name,displayWidth/10000,-60);
          }
          if(allPlayers[plr].rank===4){
            fill("red")
            text("The loser is: "+allPlayers[plr].name,displayWidth/10000,10);
          }
        }
      }
  }
  