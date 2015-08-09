/**
 Primary game state switcher
 
 */
 
var gamestate = new Object();

gamestate.init = function() {

  gamestate.state_types = {
    TITLE: 0,
    PLAY: 1,
    GAME_OVER: 2
  };
    
  gamestate.current_state = gamestate.state_types.PLAY;
  
  gamestate.background = imageset.load("images/background.png");
}
 
gamestate.logic = function() {


  switch(gamestate.current_state) {
  
    case gamestate.state_types.PLAY:
      imageset.logic();
      items.logic();
      scorekeeper.logic();
      
      // if this round has ended, move to the game over screen
      if (scorekeeper.end_game) {
        gamestate.current_state = gamestate.state_types.GAME_OVER;
      }

      break;
  
    case gamestate.state_types.GAME_OVER:
      imageset.logic();
      items.logic_game_over();
      scorekeeper.logic();
      break;
  }
  
}

gamestate.render = function() {

  //game_main.clear_canvas();
  imageset.render(gamestate.background,0,0,400,240,0,0);

  switch(gamestate.current_state) {
  
    case gamestate.state_types.PLAY:    
    
      //bitfont.render("THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG", 8, 8, bitfont.JUSTIFY_LEFT);
      //bitfont.render("the quick brown fox jumps over the lazy dog", 8, 20, bitfont.JUSTIFY_LEFT);
      //bitfont.render("SPHINX OF BLACK QUARTZ, JUDGE MY VOW!", 8, 32, bitfont.JUSTIFY_LEFT);
      //bitfont.render("sphinx of black quartz, judge my vow!", 8, 44, bitfont.JUSTIFY_LEFT);
      items.render();
      scorekeeper.render();
      break;
        
    case gamestate.state_types.GAME_OVER:

      items.render();
      scorekeeper.render();
      
      bitfont.render("Recycled " + scorekeeper.total_recycles + " items!", 200, 96, bitfont.JUSTIFY_CENTER);
      
      if (scorekeeper.new_high_score) {
        bitfont.render("NEW HIGH SCORE!", 200, 112, bitfont.JUSTIFY_CENTER);        
      }
      else {
        bitfont.render("High Score: " + scorekeeper.current_high_score, 200, 112, bitfont.JUSTIFY_CENTER);
      }
      bitfont.render("Refresh to try again.", 200, 128, bitfont.JUSTIFY_CENTER);
      break;
      
   }
}


