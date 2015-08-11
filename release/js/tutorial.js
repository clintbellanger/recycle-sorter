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
  tutorial.elist = [];
  tutorial.frame_timer = 0;
  tutorial.seconds_elapsed = 0;
  tutorial.finished = false;
  tutorial.current_message_id = 0;
  tutorial.load_tutorial();
}

tutorial.load_tutorial = function() {

  tutorial.messages = [
    ["Welcome to the Recycle Sorter!", "Your goal is to put recyclable items in the", "right bin before they reach the landfill."],
    ["Metals", "", ""],
    ["Spray Cans", "", ""],
    ["Glasses", "", ""],
    ["Ceramics", "", ""],
    ["Papers", "", ""],
    ["Greasy Boxes", "", ""],
    ["Plastics", "", ""],
    ["Polystyrene", "", ""],
    ["Check your local recycling rules!", "", ""]
  ];

  // queue up the schedule of events
  
  tutorial.queue_event(0, tutorial.event_types.SHOW_MESSAGE, 0); // welcome
  
  tutorial.queue_event(8, tutorial.event_types.CONVEYOR_STATE, true); // start conveyor
  
  tutorial.queue_event(10, tutorial.event_types.SHOW_MESSAGE, 1); // metals1
  tutorial.queue_event(12, tutorial.event_types.ADD_ITEM, 9);    
  tutorial.queue_event(13, tutorial.event_types.ADD_ITEM, 10);    
  tutorial.queue_event(14, tutorial.event_types.ADD_ITEM, 11);    
  
  tutorial.queue_event(20, tutorial.event_types.SHOW_MESSAGE, 2); // spray cans
  tutorial.queue_event(22, tutorial.event_types.ADD_ITEM, 15);

  tutorial.queue_event(28, tutorial.event_types.SHOW_MESSAGE, 3); // glass
  tutorial.queue_event(30, tutorial.event_types.ADD_ITEM, 6);
  tutorial.queue_event(31, tutorial.event_types.ADD_ITEM, 7);
  tutorial.queue_event(32, tutorial.event_types.ADD_ITEM, 8);

  tutorial.queue_event(38, tutorial.event_types.SHOW_MESSAGE, 4); // ceramic
  tutorial.queue_event(40, tutorial.event_types.ADD_ITEM, 14);  
  
  tutorial.queue_event(46, tutorial.event_types.SHOW_MESSAGE, 5); // paper
  tutorial.queue_event(48, tutorial.event_types.ADD_ITEM, 3);
  tutorial.queue_event(49, tutorial.event_types.ADD_ITEM, 4);
  tutorial.queue_event(50, tutorial.event_types.ADD_ITEM, 5);
  
  tutorial.queue_event(56, tutorial.event_types.SHOW_MESSAGE, 6); // greasy box
  tutorial.queue_event(58, tutorial.event_types.ADD_ITEM, 13);  

  tutorial.queue_event(64, tutorial.event_types.SHOW_MESSAGE, 7); // plastics
  tutorial.queue_event(66, tutorial.event_types.ADD_ITEM, 0);
  tutorial.queue_event(67, tutorial.event_types.ADD_ITEM, 1);
  tutorial.queue_event(68, tutorial.event_types.ADD_ITEM, 2);

  tutorial.queue_event(74, tutorial.event_types.SHOW_MESSAGE, 8); // foam cup
  tutorial.queue_event(76, tutorial.event_types.ADD_ITEM, 12);  
    
  tutorial.queue_event(82, tutorial.event_types.SHOW_MESSAGE, 9); // outro  
  tutorial.queue_event(84, tutorial.event_types.CONVEYOR_STATE, false); // stop conveying
  tutorial.queue_event(90, tutorial.event_types.FINISHED, 0); // end of tutorial
  
}


tutorial.queue_event = function(trigger_time, event_type, option_id) {
  var new_event = new Object();
  
  new_event.trigger_time = trigger_time;
  new_event.event_type = event_type;
  new_event.option_id = option_id;
  
  tutorial.elist.push(new_event);
}

tutorial.logic = function() {

  tutorial.frame_timer++;
  tutorial.seconds_elapsed = Math.floor(tutorial.frame_timer / 60);
  
  var next_trigger = 0;
  if (tutorial.elist.length > 0) next_trigger = tutorial.elist[0].trigger_time;
  
  while (tutorial.seconds_elapsed >= next_trigger && tutorial.elist.length > 0) {
      tutorial.play_event(tutorial.elist[0]);
      tutorial.elist.shift();
      
      if (tutorial.elist.length > 0) next_trigger = tutorial.elist[0].trigger_time;      
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

