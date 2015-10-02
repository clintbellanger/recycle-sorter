var game_main = new Object();

//---- Init Function -----------------------------------------------

game_main.init = function() {

  game_main.init_complete = false;
  game_main.FPS = 60;

  // Configure the display  
  game_main.SCALE = 1;
  game_main.VIEW_WIDTH = 400;
  game_main.VIEW_HEIGHT = 240;
  game_main.UI_MARGIN = 8;  

  game_main.canv = document.getElementById("gamecanvas");
  if (game_main.canv.getContext) {
    game_main.ctx = game_main.canv.getContext("2d");
  }
  
  utils.resize_canvas();
    
  // Configure listening for player input
  if (window.addEventListener) {
    //window.addEventListener('keydown', inputs.handleKeyDown, true);
    //window.addEventListener('keyup', inputs.handleKeyUp, true);
    window.addEventListener('mousedown', inputs.handleMouseDown, true);
    window.addEventListener('mousemove', inputs.handleMouseMove, true);
    window.addEventListener('mouseup', inputs.handleMouseUp, true);
    window.addEventListener('touchstart', inputs.handleTouchStart, true);
    window.addEventListener('touchmove', inputs.handleTouchMove, true);
    window.addEventListener('touchend', inputs.handleTouchEnd, true);
    window.addEventListener('resize', utils.resize_canvas, false);
    window.addEventListener('orientationchange', utils.resize_canvas, false);
  }

  // Initialize all game units
  inputs.init();
  imageset.init();
  bitfont.init();
  particles.init();
  conveyor.init();
  items.init();
  scorekeeper.init();
  tutorial.init();
  title.init();
  gamestate.init();
  
  game_main.init_complete = true;

  // Establish the main game loop
  setInterval(function() {
    gamestate.logic();
    gamestate.render();
  }, 1000/game_main.FPS);  
  
}

game_main.clear_canvas = function() {
  game_main.ctx.fillStyle = "#888888";
  game_main.ctx.fillRect(0, 0, game_main.VIEW_WIDTH * game_main.SCALE, game_main.VIEW_HEIGHT * game_main.SCALE);  
}

