/** 
 In-game tutorial
 Uses an event queue timing system
 */
 
var tutorial = new Object();

tutorial.init = function() {

  tutorial.event_types = {
    SHOW_MESSAGE: 0,
    ADD_ITEM: 1,
    FINISHED: 2,
    CONVEYOR_STATE: 3,
    NEXT_BUTTON: 4
  };
  
  tutorial.next_button = imageset.load("images/interface/arrow_button.png");
  tutorial.button_area = {x: 328, y: 88, w: 64, h: 42};
  
  tutorial.reset();
  tutorial.load_tutorial();
}

tutorial.reset = function() {

  tutorial.frame_timer = 0;
  tutorial.seconds_elapsed = 0;
  tutorial.finished = false;
  tutorial.current_message_id = 0;
  tutorial.event_cursor = 0;
  tutorial.waiting_for_button = false;
  
  tutorial.load_tutorial();
}

tutorial.load_tutorial = function() {

  tutorial.messages = [
    ["Welcome to Recycle Sorter!", "Your goal is to put recyclable items in the", "correct bin before they reach the landfill."],
    ["Metals such as steel and aluminum", "are found in food and drink cans.", "These are easily recycled."],
    ["Spray cans are made of metal,", "but must go to the landfill", "because they are pressurized."],
    ["Glass items that are green,", "clear, or brown can be", "recycled here."],
    ["Ceramics can handle a lot of heat.", "But that makes them hard to recycle.", "Broken ceramics must go to the landfill."],
    ["Papers such as cardboard boxes,", "newspapers, and brown bags can", "all go into this paper recycling bin."],
    ["Boxes that are too greasy, such as", "pizza boxes, cannot be recycled.", "Send them to the landfill."],
    ["Plastics #1 and #2 are recycled here.", "Many plastic drink and household", "containers can be recycled."],
    ["Foam (polystyrene) is sometimes marked", "as plastic #6 but it cannot be", "recycled here. It goes in the landfill."],
    ["You are now ready", "to be a Recycle Sorter!", ""]
  ];

  // queue up the schedule of events
  tutorial.elist = [
    {trigger_time:  0, event_type: tutorial.event_types.SHOW_MESSAGE,   option_id:  0},
    {trigger_time:  2, event_type: tutorial.event_types.NEXT_BUTTON,    option_id:  0},
    
    {trigger_time:  0, event_type: tutorial.event_types.CONVEYOR_STATE, option_id: true},    
    {trigger_time:  0, event_type: tutorial.event_types.SHOW_MESSAGE,   option_id:  1},
    {trigger_time:  2, event_type: tutorial.event_types.ADD_ITEM,       option_id: 10},
    {trigger_time:  3, event_type: tutorial.event_types.ADD_ITEM,       option_id: 11},
    {trigger_time:  4, event_type: tutorial.event_types.ADD_ITEM,       option_id:  9},
    {trigger_time:  6, event_type: tutorial.event_types.CONVEYOR_STATE, option_id: false},
    {trigger_time:  6, event_type: tutorial.event_types.NEXT_BUTTON,    option_id:  0},
    
    {trigger_time:  0, event_type: tutorial.event_types.CONVEYOR_STATE, option_id: true},    
    {trigger_time:  0, event_type: tutorial.event_types.SHOW_MESSAGE,   option_id:  2},
    {trigger_time:  2, event_type: tutorial.event_types.ADD_ITEM,       option_id: 15},
    {trigger_time:  5, event_type: tutorial.event_types.CONVEYOR_STATE, option_id: false},
    {trigger_time:  5, event_type: tutorial.event_types.NEXT_BUTTON,    option_id:  0},
    
    {trigger_time:  0, event_type: tutorial.event_types.CONVEYOR_STATE, option_id: true},    
    {trigger_time:  0, event_type: tutorial.event_types.SHOW_MESSAGE,   option_id:  3},
    {trigger_time:  2, event_type: tutorial.event_types.ADD_ITEM,       option_id:  6},
    {trigger_time:  3, event_type: tutorial.event_types.ADD_ITEM,       option_id:  7},
    {trigger_time:  4, event_type: tutorial.event_types.ADD_ITEM,       option_id:  8},  
    {trigger_time:  6, event_type: tutorial.event_types.CONVEYOR_STATE, option_id: false},
    {trigger_time:  6, event_type: tutorial.event_types.NEXT_BUTTON,    option_id:  0},
    
    {trigger_time:  0, event_type: tutorial.event_types.CONVEYOR_STATE, option_id: true},    
    {trigger_time:  0, event_type: tutorial.event_types.SHOW_MESSAGE,   option_id:  4},
    {trigger_time:  2, event_type: tutorial.event_types.ADD_ITEM,       option_id: 14},
    {trigger_time:  5, event_type: tutorial.event_types.CONVEYOR_STATE, option_id: false},
    {trigger_time:  5, event_type: tutorial.event_types.NEXT_BUTTON,    option_id:  0},
    
    {trigger_time:  0, event_type: tutorial.event_types.CONVEYOR_STATE, option_id: true},    
    {trigger_time:  0, event_type: tutorial.event_types.SHOW_MESSAGE,   option_id:  5},
    {trigger_time:  2, event_type: tutorial.event_types.ADD_ITEM,       option_id:  3},
    {trigger_time:  3, event_type: tutorial.event_types.ADD_ITEM,       option_id:  4},
    {trigger_time:  4, event_type: tutorial.event_types.ADD_ITEM,       option_id:  5},  
    {trigger_time:  6, event_type: tutorial.event_types.CONVEYOR_STATE, option_id: false},
    {trigger_time:  6, event_type: tutorial.event_types.NEXT_BUTTON,    option_id:  0},
    
    {trigger_time:  0, event_type: tutorial.event_types.CONVEYOR_STATE, option_id: true},    
    {trigger_time:  0, event_type: tutorial.event_types.SHOW_MESSAGE,   option_id:  6},
    {trigger_time:  2, event_type: tutorial.event_types.ADD_ITEM,       option_id: 13},
    {trigger_time:  5, event_type: tutorial.event_types.CONVEYOR_STATE, option_id: false},
    {trigger_time:  5, event_type: tutorial.event_types.NEXT_BUTTON,    option_id:  0},

    {trigger_time:  0, event_type: tutorial.event_types.CONVEYOR_STATE, option_id: true},        
    {trigger_time:  0, event_type: tutorial.event_types.SHOW_MESSAGE,   option_id:  7},
    {trigger_time:  2, event_type: tutorial.event_types.ADD_ITEM,       option_id:  0},
    {trigger_time:  3, event_type: tutorial.event_types.ADD_ITEM,       option_id:  1},
    {trigger_time:  4, event_type: tutorial.event_types.ADD_ITEM,       option_id:  2},  
    {trigger_time:  6, event_type: tutorial.event_types.CONVEYOR_STATE, option_id: false},
    {trigger_time:  6, event_type: tutorial.event_types.NEXT_BUTTON,    option_id:  0},
    
    {trigger_time:  0, event_type: tutorial.event_types.CONVEYOR_STATE, option_id: true},    
    {trigger_time:  0, event_type: tutorial.event_types.SHOW_MESSAGE,   option_id:  8},
    {trigger_time:  2, event_type: tutorial.event_types.ADD_ITEM,       option_id: 12},
    {trigger_time:  5, event_type: tutorial.event_types.CONVEYOR_STATE, option_id: false},
    {trigger_time:  5, event_type: tutorial.event_types.NEXT_BUTTON,    option_id:  0},
    
    {trigger_time:  0, event_type: tutorial.event_types.SHOW_MESSAGE,   option_id:  9},
    {trigger_time:  2, event_type: tutorial.event_types.NEXT_BUTTON,    option_id:  0},
    {trigger_time:  0, event_type: tutorial.event_types.FINISHED,       option_id:  0}
  ];
    
}

tutorial.logic = function() {

  // halt other logic if waiting for a new button press
  if (tutorial.waiting_for_button) {
    if (items.ilist.length == 0 && tutorial.pressing_button()) {
      tutorial.waiting_for_button = false;
    }
    else return;
  }

  tutorial.frame_timer++;
  tutorial.seconds_elapsed = Math.floor(tutorial.frame_timer / 60);
  
  var next_trigger = 0;
  
  if (tutorial.event_cursor < tutorial.elist.length) {
    next_trigger = tutorial.elist[tutorial.event_cursor].trigger_time;
  }
  
  while (tutorial.seconds_elapsed >= next_trigger && !tutorial.waiting_for_button) {
    tutorial.play_event(tutorial.elist[tutorial.event_cursor]);    
    tutorial.event_cursor++;
    
    if (tutorial.event_cursor < tutorial.elist.length) {      
      next_trigger = tutorial.elist[tutorial.event_cursor].trigger_time;
    }
    else break;
  }
  
}

tutorial.pressing_button = function() {
  if (!inputs.pressing.mouse) return false;  
  return (utils.is_within(inputs.mouse_pos, tutorial.button_area));
}

tutorial.render = function() {
  // show message
  bitfont.render(tutorial.messages[tutorial.current_message_id][0], 200, 112, bitfont.JUSTIFY_CENTER);
  bitfont.render(tutorial.messages[tutorial.current_message_id][1], 200, 128, bitfont.JUSTIFY_CENTER);
  bitfont.render(tutorial.messages[tutorial.current_message_id][2], 200, 144, bitfont.JUSTIFY_CENTER);
  
  if (tutorial.waiting_for_button) {
    if (items.ilist.length == 0) {
      tutorial.render_button("Next");
    }
  }
}

tutorial.play_event = function(event_data) {
  switch(event_data.event_type) {
    
    case tutorial.event_types.SHOW_MESSAGE:
      tutorial.current_message_id = event_data.option_id;
      break;
      
    case tutorial.event_types.ADD_ITEM:
      items.add_item(event_data.option_id);
      break;
      
    case tutorial.event_types.FINISHED:
      tutorial.finished = true;
      break;
  
    case tutorial.event_types.CONVEYOR_STATE:
      conveyor.active = event_data.option_id;
      if (event_data.option_id == false) {
        // update item speed if conveyor has stopped
        items.halt_conveyor();
      }
      break;
      
    case tutorial.event_types.NEXT_BUTTON:
      tutorial.waiting_for_button = true;
      
      // introduced an indefinite pause, so reset the timer to zero
      tutorial.frame_timer = 0;
      break;
  }
}

tutorial.render_button = function(button_label) {
  imageset.render(
    tutorial.next_button,
    0,
    0,
    tutorial.button_area.w,
    tutorial.button_area.h,
    tutorial.button_area.x,
    tutorial.button_area.y
  );
  
  bitfont.render(
    button_label,
    tutorial.button_area.x + 10,
    tutorial.button_area.y + 14,
    bitfont.JUSTIFY_LEFT
  );
}


