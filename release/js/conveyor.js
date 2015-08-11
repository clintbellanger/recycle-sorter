/**
 Conveyor belt
 Animation and other properties
 
 Building the conveyor out of tiles for easy resizing

 */
 
var conveyor = new Object();

conveyor.init = function() {
  conveyor.tile_types = {
    GEAR: 0,
    BELT: 1
  };
  conveyor.atlas = imageset.load("images/conveyor.png");
  conveyor.tile_size = 16;
  conveyor.animation_frames = 4;
  conveyor.current_frame = 0;
  conveyor.top = 192;
  conveyor.left = 80;  
  conveyor.belts_per_gear = 4;
  
  conveyor.active = false;

}

conveyor.logic = function() {


  if (conveyor.active) {
  
    // animate and loop
    conveyor.current_frame++;
    if (conveyor.current_frame == conveyor.animation_frames) {
      conveyor.current_frame = 0;
    }
  }
  
}

conveyor.render = function() {

  // draw the belt to the screen size
  // starts at the left edge of the conveyor,
  // offset one tile to the right.
  // fill to the end of the screen.
  for (var screen_x = conveyor.left + conveyor.tile_size/2;
       screen_x < game_main.VIEW_WIDTH; 
       screen_x += conveyor.tile_size) {
    
    conveyor.render_tile(conveyor.tile_types.BELT, conveyor.current_frame, screen_x, conveyor.top);    
  }
  
  // draw individual gears every 4 tiles
  for (var screen_x = conveyor.left;
       screen_x < game_main.VIEW_WIDTH;
       screen_x += conveyor.tile_size * conveyor.belts_per_gear) {
    
    conveyor.render_tile(conveyor.tile_types.GEAR, conveyor.current_frame, screen_x, conveyor.top);
  }
}

conveyor.render_tile = function(tile_type, frame_id, screen_x, screen_y) {
  imageset.render(
    conveyor.atlas,
    tile_type * conveyor.tile_size,
    frame_id * conveyor.tile_size,
    conveyor.tile_size,
    conveyor.tile_size,
    screen_x,
    screen_y
  );
}

