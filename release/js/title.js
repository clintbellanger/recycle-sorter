var title = new Object();

title.init = function() {
  title.img_id = imageset.load("images/title.png");
  title.area = {x: 105, y: 96, w: 196, h: 34};
  
  title.button_id = imageset.load("images/interface/button.png");
  
  title.tutorial_button_area = {x: 152, y: 132, w: 96, h: 28};
  title.play_button_area = {x: 152, y: 160, w: 96, h: 28};
  
  title.reset();
}

title.reset = function() {
  title.start_play = false;
  title.start_tutorial = false;
}

title.check_buttons = function() {
  if (inputs.pressing.mouse) {
    if (utils.is_within(inputs.mouse_pos, title.tutorial_button_area)) {
      title.start_tutorial = true;
    }
    else if (utils.is_within(inputs.mouse_pos, title.play_button_area)) {
      title.start_play = true;
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
  
  title.render_button("Tutorial", title.tutorial_button_area);
  title.render_button("Play", title.play_button_area);
  
  bitfont.render("by Clint Bellanger", 392, 220, bitfont.JUSTIFY_RIGHT);
}

title.render_button = function(caption, button_area) {

  imageset.render(
    title.button_id,
    0,0,
    button_area.w,
    button_area.h,
    button_area.x,
    button_area.y
  );
  
  bitfont.render(caption, 200, button_area.y + 7, bitfont.JUSTIFY_CENTER);
  
}