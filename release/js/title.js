var title = new Object();

title.init = function() {
  title.img_id = imageset.load("images/title.png");
  title.area = {x: 105, y: 94, w: 196, h: 34};
  
  title.button_id = imageset.load("images/interface/button.png");
  title.button_area = {x: 152, y: 146, w: 96, h: 28};
  
  title.reset();
}

title.reset = function() {
  title.start_game = false;
}

title.check_buttons = function() {
  if (inputs.pressing.mouse) {
    if (utils.is_within(inputs.mouse_pos, title.button_area)) {
      title.start_game = true;
    }
  }
}

title.render = function() {
  imageset.render(
    title.img_id,
    0,0,
    title.area.w,
    title.area.h,
    title.area.x,
    title.area.y  
  );
  
  title.render_button("Play");
  
  bitfont.render("by Clint Bellanger", 392, 220, bitfont.JUSTIFY_RIGHT);
}

title.render_button = function(caption) {
  imageset.render(
    title.button_id,
    0,0,
    title.button_area.w,
    title.button_area.h,
    title.button_area.x,
    title.button_area.y
  );
  
  bitfont.render(caption, 200, title.button_area.y + 7, bitfont.JUSTIFY_CENTER);
  
}