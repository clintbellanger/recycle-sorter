/**
 Primary game state switcher
 
 */
 
var gamestate = new Object();

gamestate.init = function() {
  gamestate.STATE_PLAY = 0;
  gamestate.current_state = gamestate.STATE_PLAY;
}
 
gamestate.logic = function() {

  switch(gamestate.current_state) {
    case gamestate.STATE_PLAY:
      imageset.logic();
      break;
      
  }
  
}

gamestate.render = function() {

  game_main.clear_canvas();

  switch(gamestate.current_state) {
    case gamestate.STATE_PLAY:
      bitfont.render("Game State Ready", game_main.UI_MARGIN, game_main.UI_MARGIN, bitfont.JUSTIFY_LEFT);
      break;      
  }
  
}

