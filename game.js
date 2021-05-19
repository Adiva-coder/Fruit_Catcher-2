class Game{
    constructor(){

    }
    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        })

    }

    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }
    async start() {
            if (gameState === 0) {
                player = new Player();
                var playerCountRef = await database.ref('playerCount').once("value");
                if (playerCountRef.exists()) {
                    playerCount = playerCountRef.val();
                    player.getCount();
                }
                form = new Form()
                form.display();
            }
            player1 = createSprite(200,500);
            player1.addImage("player1",player_img);
            //player1.debug = true;
            player1.setCollider("rectangle", 0, 15, player1.width - 20, 60);
            
            player2 = createSprite(800,500);
            player2.addImage("player2", player_img);
            //player2.debug = true;
            player2.setCollider("rectangle", 0, 15, player1.width - 20, 60);

            players = [player1,player2];

        }
    
    play(){
        
                form.hide();

                Player.getPlayerInfo();
                 image(back_img, 0, 0, 1000, 800);

                 var x =100;
                 var y=200;
                 var index =0;

                 drawSprites();

                 for(var plr in allPlayers){
                    
                    
                     index = index+1;
                     x = 500 - allPlayers[plr].distance;
                     y = 500;
                     
                     players[index -1].x = x;
                     players[index - 1].y = y;
                       
                     if(index === player.index){
                         
                       //add code to display the player's name on the respective basket.
                       textSize(30);
                       fill("black");
                       stroke("black");
                       strokeWeight(2);
                       text(allPlayers[plr].name, x - 50, y + 25);

                      
                     }



                     fill("lightBlue");
                     textSize(30);
                     stroke("lightBlue");
                     strokeWeight(1);
                     text("SCORE", 100, 80);
                     noFill();
                     strokeWeight(3);
                     rect(90, 50, 250, 150);

                     fill("white");
                     textSize(30);
                     stroke("black");
                     strokeWeight(2);
                     text(allPlayers.player1.name + " : " + allPlayers.player1.score, 100, 140);
                     text(allPlayers.player2.name + " : " + allPlayers.player2.score, 100, 180);
                 
                 }
                
                   
                 

                if (keyIsDown(RIGHT_ARROW) && player.index !== null) {
                    player.distance -= 10
                    player.update();
                }
                if (keyIsDown(LEFT_ARROW) && player.index !== null) {
                    player.distance += 10
                    player.update();
                }
            
                 if (frameCount % 20 === 0) {
                     fruits = createSprite(random(100, 1000), 0, 100, 100);
                     fruits.velocityY = 6;
                     var rand = Math.round(random(1,5));
                     switch(rand){
                         case 1: fruits.addImage("fruit1",fruit1_img);
                         break;
                         case 2: fruits.addImage("fruit2", fruit2_img);
                         break;
                         case 3: fruits.addImage("fruit3", fruit3_img);
                         break;
                         case 4: fruits.addImage("fruit4", fruit4_img);
                         break;
                         case 5: fruits.addImage("fruit5", fruit5_img);
                         break;
                     }
                     fruitGroup.add(fruits);
                     
                 }
                 
                  if (player.index !== null) {
                    for (var i = 0; i < fruitGroup.length; i++) {
                        if (fruitGroup.get(i).isTouching(players)) {
                            fruitGroup.get(i).destroy();
                            player.score += 1;                        
                            
                        }
                        
                    }
                  }
                

         
         
        
         

    }

    end(){
       console.log("Game Ended");
    }
}
