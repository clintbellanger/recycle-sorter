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
      items.logic();
      break;
      
  }
  
}

gamestate.render = function() {

  game_main.clear_canvas();

  switch(gamestate.current_state) {
    case gamestate.STATE_PLAY:
      bitfont.render("THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG", 8, 8, bitfont.JUSTIFY_LEFT);
      bitfont.render("the quick brown fox jumps over the lazy dog", 8, 20, bitfont.JUSTIFY_LEFT);
      bitfont.render("SPHINX OF BLACK QUARTZ, JUDGE MY VOW!", 8, 32, bitfont.JUSTIFY_LEFT);
      bitfont.render("sphinx of black quartz, judge my vow!", 8, 44, bitfont.JUSTIFY_LEFT);
      items.render();
      break;      
  }
  
}

