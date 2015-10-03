/**
 Primary game state switcher
 
 */
 
var gamestate = new Object();

gamestate.init = function() {

  gamestate.state_types = {
    TITLE: 0,
    TUTORIAL: 1,
    PLAY: 2,
    GAME_OVER: 3
  };
    
  gamestate.current_state = gamestate.state_types.TITLE;  
  gamestate.background = imageset.load("images/background.png");  
  gamestate.impact_pause = 0;
  
}
 
gamestate.logic = function() {

  // allow new mousemove calculations this frame
  inputs.mouse_throttle = false;

  // no movement for a few frames to add weight to actions
  if (gamestate.impact_pause > 0) {
    gamestate.impact_pause--;
    return;
  }

  switch(gamestate.current_state) {
  
    case gamestate.state_types.TITLE:
      imageset.logic();
      title.check_buttons();
      
      if (title.start_tutorial) {
        tutorial.reset();
        gamestate.current_state = gamestate.state_types.TUTORIAL;
      }
      else if (title.start_play) {
        conveyor.active = true;
        gamestate.current_state = gamestate.state_types.PLAY;
      }
      break;
  
    case gamestate.state_types.TUTORIAL:
      imageset.logic();
      conveyor.logic();
      items.logic();      
      scorekeeper.logic();
      tutorial.logic();
      particles.logic();
      
      if (tutorial.finished) {
         gamestate.current_state = gamestate.state_types.TITLE;
         title.reset();
         items.reset();
         scorekeeper.reset();
      }
      break;
  
    case gamestate.state_types.PLAY:
      imageset.logic();
      conveyor.logic();
      items.logic();
      items.item_flow();
      scorekeeper.logic();
      particles.logic();
      
      // if this round has ended, move to the game over screen
      if (scorekeeper.end_game) {
        gamestate.current_state = gamestate.state_types.GAME_OVER;
        conveyor.active = false;
        title.reset();
      }

      break;
  
    case gamestate.state_types.GAME_OVER:
      imageset.logic();
      items.logic_game_over();
      scorekeeper.logic();
      title.check_buttons();
      particles.logic();
      
      // Try Again
      if (title.start_play) {        
        gamestate.current_state = gamestate.state_types.PLAY;
        title.reset();
        items.reset();
        scorekeeper.reset();
        conveyor.active = true;
      }
      
      break;
  }
  
}

gamestate.render = function() {

  //game_main.clear_canvas();
  imageset.render(gamestate.background,0,0,400,240,0,0);

  switch(gamestate.current_state) {
  
    case gamestate.state_types.TITLE:
      title.render();
      conveyor.render();      
    
      break;
      
    case gamestate.state_types.TUTORIAL:
      conveyor.render();
      tutorial.render();
      items.render();
      scorekeeper.render();
      particles.render();
      
      break;
      
    case gamestate.state_types.PLAY:    
    
      //bitfont.render("THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG", 8, 80, bitfont.JUSTIFY_LEFT);
      //bitfont.render("the quick brown fox jumps over the lazy dog", 8, 96, bitfont.JUSTIFY_LEFT);
      //bitfont.render("SPHINX OF BLACK QUARTZ, JUDGE MY VOW!", 8, 112, bitfont.JUSTIFY_LEFT);
      //bitfont.render("sphinx of black quartz, judge my vow!", 8, 128, bitfont.JUSTIFY_LEFT);
      
      conveyor.render();
      items.render();
      scorekeeper.render();
      scorekeeper.render_current_score();
      particles.render();
      break;
        
    case gamestate.state_types.GAME_OVER:

      conveyor.render();
      items.render();      
      scorekeeper.render();
      particles.render();
      
      bitfont.render("Recycled " + scorekeeper.total_recycles + " items!", 200, 96, bitfont.JUSTIFY_CENTER);
      
      if (scorekeeper.new_high_score) {
        bitfont.render("NEW HIGH SCORE!", 200, 112, bitfont.JUSTIFY_CENTER);        
      }
      else {
        bitfont.render("High Score: " + scorekeeper.current_high_score, 200, 112, bitfont.JUSTIFY_CENTER);
      }
      
      if (items.ilist.length == 0) {
        title.render_button("Try Again", title.play_button_area);
      }
      
      break;
      
   }
}


