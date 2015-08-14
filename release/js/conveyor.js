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
  conveyor.tile_count = 2;
  conveyor.atlas = imageset.load("images/conveyor.png");
  conveyor.tile_size = 16;
  
  conveyor.anim_data = [
    {animation_frames: 4, frame_duration: 2, current_frame: 0},
    {animation_frames: 4, frame_duration: 1, current_frame: 0}
  ];
  
  conveyor.top = 192;
  conveyor.left = 80;  
  conveyor.belts_per_gear = 4;
  
  conveyor.active = false;

}

conveyor.logic = function() {

  if (conveyor.active) {
  
    // animate and loop
    for (var i=0; i<conveyor.tile_count; i++) {
    
      conveyor.anim_data[i].current_frame++;
      if (conveyor.anim_data[i].current_frame == conveyor.anim_data[i].animation_frames * conveyor.anim_data[i].frame_duration) {
        conveyor.anim_data[i].current_frame = 0;
      }
      
    }
  }
  
}

conveyor.render = function() {

  var frame_id;
  
  // draw the belt to the screen size
  // starts at the left edge of the conveyor,
  // offset one tile to the right.
  // fill to the end of the screen.
  frame_id = Math.floor(conveyor.anim_data[conveyor.tile_types.BELT].current_frame / conveyor.anim_data[conveyor.tile_types.BELT].frame_duration);
  for (var screen_x = conveyor.left + conveyor.tile_size/2;
       screen_x < game_main.VIEW_WIDTH; 
       screen_x += conveyor.tile_size) {
    
    conveyor.render_tile(conveyor.tile_types.BELT, frame_id, screen_x, conveyor.top);    
  }
  
  // draw individual gears every 4 tiles
  frame_id = Math.floor(conveyor.anim_data[conveyor.tile_types.GEAR].current_frame / conveyor.anim_data[conveyor.tile_types.GEAR].frame_duration);
  for (var screen_x = conveyor.left;
       screen_x < game_main.VIEW_WIDTH;
       screen_x += conveyor.tile_size * conveyor.belts_per_gear) {
    
    conveyor.render_tile(conveyor.tile_types.GEAR, frame_id, screen_x, conveyor.top);
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

