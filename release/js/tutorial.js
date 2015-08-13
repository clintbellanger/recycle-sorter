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
    CONVEYOR_STATE: 3
  };

  tutorial.reset();
  tutorial.load_tutorial();
}

tutorial.reset = function() {

  tutorial.frame_timer = 0;
  tutorial.seconds_elapsed = 0;
  tutorial.finished = false;
  tutorial.current_message_id = 0;
  tutorial.event_cursor = 0;
  
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
    ["Plastics numbers 1 and 2 are recycled here.", "Many plastic drink and household", "containers can be recycled."],
    ["Foam (polystyrene) is sometimes marked", "as plastic #6 but it cannot be", "recycled here. It goes in the landfill."],
    ["You are now ready", "to be a Recycle Sorter!", ""]
  ];

  // queue up the schedule of events
  tutorial.elist = [
    {trigger_time:  0, event_type: tutorial.event_types.SHOW_MESSAGE,   option_id:  0},
    {trigger_time:  6, event_type: tutorial.event_types.CONVEYOR_STATE, option_id: true},
    
    {trigger_time: 10, event_type: tutorial.event_types.SHOW_MESSAGE,   option_id:  1},
    {trigger_time: 12, event_type: tutorial.event_types.ADD_ITEM,       option_id: 10},
    {trigger_time: 13, event_type: tutorial.event_types.ADD_ITEM,       option_id: 11},
    {trigger_time: 14, event_type: tutorial.event_types.ADD_ITEM,       option_id:  9},
    
    {trigger_time: 20, event_type: tutorial.event_types.SHOW_MESSAGE,   option_id:  2},
    {trigger_time: 22, event_type: tutorial.event_types.ADD_ITEM,       option_id: 15},
    
    {trigger_time: 28, event_type: tutorial.event_types.SHOW_MESSAGE,   option_id:  3},
    {trigger_time: 30, event_type: tutorial.event_types.ADD_ITEM,       option_id:  6},
    {trigger_time: 31, event_type: tutorial.event_types.ADD_ITEM,       option_id:  7},
    {trigger_time: 32, event_type: tutorial.event_types.ADD_ITEM,       option_id:  8},  
    
    {trigger_time: 38, event_type: tutorial.event_types.SHOW_MESSAGE,   option_id:  4},
    {trigger_time: 40, event_type: tutorial.event_types.ADD_ITEM,       option_id: 14},
    
    {trigger_time: 46, event_type: tutorial.event_types.SHOW_MESSAGE,   option_id:  5},
    {trigger_time: 48, event_type: tutorial.event_types.ADD_ITEM,       option_id:  3},
    {trigger_time: 49, event_type: tutorial.event_types.ADD_ITEM,       option_id:  4},
    {trigger_time: 50, event_type: tutorial.event_types.ADD_ITEM,       option_id:  5},  
    
    {trigger_time: 56, event_type: tutorial.event_types.SHOW_MESSAGE,   option_id:  6},
    {trigger_time: 58, event_type: tutorial.event_types.ADD_ITEM,       option_id: 13},
    
    {trigger_time: 64, event_type: tutorial.event_types.SHOW_MESSAGE,   option_id:  7},
    {trigger_time: 66, event_type: tutorial.event_types.ADD_ITEM,       option_id:  0},
    {trigger_time: 67, event_type: tutorial.event_types.ADD_ITEM,       option_id:  1},
    {trigger_time: 68, event_type: tutorial.event_types.ADD_ITEM,       option_id:  2},  
    
    {trigger_time: 74, event_type: tutorial.event_types.SHOW_MESSAGE,   option_id:  8},
    {trigger_time: 76, event_type: tutorial.event_types.ADD_ITEM,       option_id: 12},
    
    {trigger_time: 82, event_type: tutorial.event_types.SHOW_MESSAGE,   option_id:  9},
    {trigger_time: 87, event_type: tutorial.event_types.CONVEYOR_STATE, option_id: false},
    {trigger_time: 88, event_type: tutorial.event_types.FINISHED,       option_id:  0}
  ];
    
}

tutorial.logic = function() {

  tutorial.frame_timer++;
  tutorial.seconds_elapsed = Math.floor(tutorial.frame_timer / 60);
  
  var next_trigger = 0;
  
  if (tutorial.event_cursor < tutorial.elist.length) {
    next_trigger = tutorial.elist[tutorial.event_cursor].trigger_time;
  }
  
  while (tutorial.seconds_elapsed >= next_trigger) {
    tutorial.play_event(tutorial.elist[tutorial.event_cursor]);    
    tutorial.event_cursor++;
    
    if (tutorial.event_cursor < tutorial.elist.length) {      
      next_trigger = tutorial.elist[tutorial.event_cursor].trigger_time;
    }
    else break;
  }
  
}

tutorial.render = function() {
  // show message
  bitfont.render(tutorial.messages[tutorial.current_message_id][0], 200, 112, bitfont.JUSTIFY_CENTER);
  bitfont.render(tutorial.messages[tutorial.current_message_id][1], 200, 128, bitfont.JUSTIFY_CENTER);
  bitfont.render(tutorial.messages[tutorial.current_message_id][2], 200, 144, bitfont.JUSTIFY_CENTER);
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
      break;
  }
}

