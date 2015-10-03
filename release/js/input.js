/**
Basic input handling.
Use these lines in the init() function to enable:
  window.addEventListener('keydown', inputs.handleKeyDown, true);
  window.addEventListener('keyup', inputs.handleKeyUp, true);

2013 Clint Bellanger
*/

//---- Key States ---------------------------------------------------

var inputs = new Object();

inputs.init = function() {

  inputs.pressing = new Object();
  inputs.pressing.up = false;
  inputs.pressing.down = false;
  inputs.pressing.left = false;
  inputs.pressing.right = false;
  inputs.pressing.action = false;
  inputs.pressing.mouse = false;

  inputs.locked = new Object();
  inputs.locked.up = false;
  inputs.locked.down = false;  
  inputs.locked.left = false;
  inputs.locked.right = false;
  inputs.locked.action = false;
  inputs.locked.mouse = false;

  inputs.mouse_pos = {x:0, y:0};
  inputs.mouse_throttle = false;
  
  inputs.fullscreen_area = {x: 352, y: 0, w: 48, h: 48};

  //---- Key Bindings -------------------------------------------------
  inputs.KEYCODE_UP     = 38; // arrow up
  inputs.KEYCODE_DOWN   = 40; // arrow down
  inputs.KEYCODE_LEFT   = 37; // arrow left
  inputs.KEYCODE_RIGHT  = 39; // arrow right
  inputs.KEYCODE_ACTION = 32; // space

  // secondary
  inputs.ALTCODE_UP     = 87; // w
  inputs.ALTCODE_DOWN   = 83; // s
  inputs.ALTCODE_LEFT   = 65; // a
  inputs.ALTCODE_RIGHT  = 68; // d
  inputs.ALTCODE_ACTION = 13; // enter
    
}


//---- Input Functions ----------------------------------------------

inputs.handleKeyDown = function(evt) {

  evt.preventDefault();

  if (evt.keyCode == inputs.KEYCODE_UP || evt.keyCode == inputs.ALTCODE_UP) {
    inputs.pressing.up = true;
  }
  else if (evt.keyCode == inputs.KEYCODE_DOWN || evt.keyCode == inputs.ALTCODE_DOWN) {
    inputs.pressing.down = true;
  }
  else if (evt.keyCode == inputs.KEYCODE_LEFT || evt.keyCode == inputs.ALTCODE_LEFT) {
    inputs.pressing.left = true;
  }
  else if (evt.keyCode == inputs.KEYCODE_RIGHT || evt.keyCode == inputs.ALTCODE_RIGHT) {
    inputs.pressing.right = true;
  }
  else if (evt.keyCode == inputs.KEYCODE_ACTION || evt.keyCode == inputs.ALTCODE_ACTION) {
    inputs.pressing.action = true;
  }
  
}

inputs.handleKeyUp = function(evt) {

  if (evt.keyCode == inputs.KEYCODE_UP || evt.keyCode == inputs.ALTCODE_UP) {
    inputs.pressing.up = false;
    inputs.locked.up = false;
  }
  else if (evt.keyCode == inputs.KEYCODE_DOWN || evt.keyCode == inputs.ALTCODE_DOWN) {
    inputs.pressing.down = false;
    inputs.locked.down = false;
  }
  else if (evt.keyCode == inputs.KEYCODE_LEFT || evt.keyCode == inputs.ALTCODE_LEFT) {
    inputs.pressing.left = false;
    inputs.locked.left = false;
  }
  else if (evt.keyCode == inputs.KEYCODE_RIGHT || evt.keyCode == inputs.ALTCODE_RIGHT) {
    inputs.pressing.right = false;
    inputs.locked.right = false;
  }
  else if (evt.keyCode == inputs.KEYCODE_ACTION || evt.keyCode == inputs.ALTCODE_ACTION) {
    inputs.pressing.action = false;
    inputs.locked.action = false;  
  }

}

inputs.handleMouseDown = function(evt) {
  evt.preventDefault();
  inputs.pressing.mouse = true;
  inputs.mouse_pos = inputs.clickCoord(evt);
  
  // fullscreen?
  // must be done in input event handler due to permissions(?)
  // if (utils.is_within(inputs.mouse_pos, inputs.fullscreen_area)) {
  //   utils.set_fullscreen("gamecanvas");
  // }
}

inputs.handleMouseMove = function(evt) {
  if (inputs.mouse_throttle) return;
  inputs.mouse_pos = inputs.clickCoord(evt);
}

inputs.handleMouseUp = function(evt) {
  evt.preventDefault();
  inputs.pressing.mouse = false;
  inputs.locked.mouse = false;  
}

inputs.clickCoord = function(evt) {

  var canx;
  var cany;
  
  if (evt.pageX || evt.pageY) { 
    canx = evt.pageX;
    cany = evt.pageY;
  }
  else { 
    canx = evt.clientX + document.body.scrollLeft + document.documentElement.scrollLeft; 
    cany = evt.clientY + document.body.scrollTop + document.documentElement.scrollTop; 
  } 
  canx -= game_main.canv.offsetLeft;
  cany -= game_main.canv.offsetTop;
  
  canx /= game_main.SCALE;
  cany /= game_main.SCALE;
  
  // only capture first mousemove each frame
  // cleared by gamestate
  inputs.mouse_throttle = true;
  
  return {x:canx, y:cany}  
}

/** Touch Handler **/

inputs.handleTouchStart = function(evt) {
  evt.preventDefault();
  inputs.pressing.mouse = true;
  inputs.mouse_pos = inputs.touchCoord(evt);
}

inputs.handleTouchMove = function(evt) {
  if (inputs.mouse_throttle) return;
  inputs.mouse_pos = inputs.touchCoord(evt);
}

inputs.handleTouchEnd = function(evt) {
  evt.preventDefault();
  inputs.pressing.mouse = false;
  inputs.locked.mouse = false;
}

inputs.touchCoord = function(evt) {
  var canx = evt.touches[0].pageX;
  var cany = evt.touches[0].pageY;
  
  canx -= game_main.canv.offsetLeft;
  cany -= game_main.canv.offsetTop;
  
  canx /= game_main.SCALE;
  cany /= game_main.SCALE;
  
  // only capture first mousemove each frame
  // cleared by gamestate  
  inputs.mouse_throttle = true;
  
  return {x:canx, y:cany}  
}
