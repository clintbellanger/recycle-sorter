/**
 * Given a point with x,y and a rect with x,y,w,h
 * Determine if the point is within the rect
 */
 
var utils = new Object();

/**
 * Common collision checker
 */
utils.is_within = function(point, rect) {
  if (point.x < rect.x) return false;
  if (point.y < rect.y) return false;
  if (point.x > rect.x + rect.w) return false;
  if (point.y > rect.y + rect.h) return false;
  return true;
}

/**
 * Resizes browser using "window" object
 * Sets the scaling ratio for images
 */
utils.resize_canvas = function() {
  
  var aspect_ratio = game_main.VIEW_WIDTH / game_main.VIEW_HEIGHT;
   
  // the screen is wider
  if (window.innerWidth * (1/aspect_ratio) > window.innerHeight) {  
    game_main.canv.height = window.innerHeight;
    game_main.canv.width = game_main.canv.height * aspect_ratio;
    game_main.SCALE = game_main.canv.height / game_main.VIEW_HEIGHT;
  }
  // the screen is taller
  else {
    game_main.canv.width = window.innerWidth;
    game_main.canv.height = game_main.canv.width / aspect_ratio;
    game_main.SCALE = game_main.canv.width / game_main.VIEW_WIDTH;
  }
    
  // also reset scaling algorithm
  utils.set_nearest_neighbor(game_main.ctx);
}

/**
 * Browser settings so pixel art is crisp, not blurred
 */
utils.set_nearest_neighbor = function(context_element) {
  
  if (context_element.imageSmoothingEnabled) {
    context_element.imageSmoothingEnabled = false;
  }
  else if (context_element.webkitImageSmoothingEnabled) {
    context_element.webkitImageSmoothingEnabled = false;
  }
  else if (context_element.mozImageSmoothingEnabled) {
    context_element.mozImageSmoothingEnabled = false;
  }
  else if (context_element.oImageSmoothingEnabled) {
    context_element.oImageSmoothingEnabled = false;
  }
}

utils.set_fullscreen = function(element_name) {

  var e = document.getElementById(element_name);
  if (e.requestFullscreen) {
    e.requestFullscreen();
  }
  else if (e.msRequestFullscreen) {
    e.msRequestFullscreen();
  }
  else if (e.mozRequestFullScreen) {
    e.mozRequestFullScreen();
  }
  else if (e.webkitRequestFullscreen) {
    e.webkitRequestFullscreen();
  }  
}