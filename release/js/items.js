/**
  Rubbish item management
  Also implements some main game board logic (where items can move).
  
  TODO: clean up the logic by moving parts to other modules
  
*/

var items = new Object();

items.init = function() {

  items.recycle_types = {
    PLASTIC: 0,
    PAPER: 1,
    GLASS: 2,
    METAL: 3,
    LANDFILL: 4
  };
  
  items.atlas = imageset.load("images/items.png");
  
  items.defs = new Array();
  items.defs[0]  = {name:"Water Bottle",  x:2,   y:17, w:15, h:45, rtype:items.recycle_types.PLASTIC};
  items.defs[1]  = {name:"Milk Jug",      x:19,  y:7,  w:39, h:55, rtype:items.recycle_types.PLASTIC};
  items.defs[2]  = {name:"Laundry Soap",  x:60,  y:18, w:36, h:44, rtype:items.recycle_types.PLASTIC};  
  items.defs[3]  = {name:"Cardboard Box", x:98,  y:14, w:51, h:48, rtype:items.recycle_types.PAPER};
  items.defs[4]  = {name:"News Print",    x:151, y:34, w:53, h:28, rtype:items.recycle_types.PAPER};
  items.defs[5]  = {name:"Brown Bag",     x:206, y:16, w:35, h:46, rtype:items.recycle_types.PAPER}; 
  items.defs[6]  = {name:"Green Bottle",  x:243, y:12, w:17, h:50, rtype:items.recycle_types.GLASS};
  items.defs[7]  = {name:"Mason Jar",     x:262, y:27, w:23, h:35, rtype:items.recycle_types.GLASS};
  items.defs[8]  = {name:"Root Beer",     x:287, y:13, w:16, h:49, rtype:items.recycle_types.GLASS};  
  items.defs[9]  = {name:"Small Can",     x:305, y:32, w:23, h:30, rtype:items.recycle_types.METAL};
  items.defs[10] = {name:"Large Can",     x:329, y:22, w:22, h:40, rtype:items.recycle_types.METAL};
  items.defs[11] = {name:"Soda Can",      x:353, y:28, w:18, h:34, rtype:items.recycle_types.METAL};  
  items.defs[12] = {name:"Foam Cup",      x:373, y:17, w:28, h:45, rtype:items.recycle_types.LANDFILL};
  items.defs[13] = {name:"Greasy Box",    x:403, y:32, w:60, h:30, rtype:items.recycle_types.LANDFILL};
  items.defs[14] = {name:"Coffee Mug",    x:465, y:36, w:29, h:26, rtype:items.recycle_types.LANDFILL};
  items.defs[15] = {name:"Spray Can",     x:496, y:22, w:17, h:40, rtype:items.recycle_types.LANDFILL};

  // TODO: move bins properties to a bins class
  items.bins = new Array();
  items.bins[items.recycle_types.PLASTIC]  = {name:"Plastic",  hotspot: {x: -32, y: -32, w: 136, h: 112}, center_x: 56,  left_x:  16};
  items.bins[items.recycle_types.PAPER]    = {name:"Paper",    hotspot: {x: 104, y: -32, w: 96,  h: 112}, center_x: 152, left_x: 112};
  items.bins[items.recycle_types.GLASS]    = {name:"Glass",    hotspot: {x: 200, y: -32, w: 96,  h: 112}, center_x: 248, left_x: 208};
  items.bins[items.recycle_types.METAL]    = {name:"Metal",    hotspot: {x: 296, y: -32, w: 136, h: 112}, center_x: 344, left_x: 304};
  items.bins[items.recycle_types.LANDFILL] = {name:"Landfill", hotspot: {x: -32, y: 0,   w: 136, h: 112}, center_x: 40,  left_x:   0};
  items.bin_width = 80;
  items.bins_top = 16;
      
  items.reset();
}

items.reset = function() {

  items.ilist = [];

  // info about the item being held  
  items.grabbing = false;
  items.grabbed_item = 0;
  
  items.new_countdown = 0;
  items.delay_between_items = 96;
  
}

items.add_random = function() {

  var random_item = Math.floor(Math.random() * items.defs.length);
  items.add_item(random_item);  
  
}

items.add_item = function(item_id) {

  new_item = new Object();
  
  new_item.itype = item_id;
  
  new_item.x = game_main.VIEW_WIDTH -1;    
  new_item.y = conveyor.top - items.defs[new_item.itype].h;

  new_item.dx = conveyor.get_speed();  
  new_item.dy = 0;
  
  items.ilist.push(new_item);
  
}


items.remove = function(item_id) {
  items.ilist.splice(item_id,1);
  
  // update the pointer to which one is being held
  if (items.grabbing && items.grabbed_item > item_id) {
    items.grabbed_item--;
  }
}

items.logic = function() {

  items.grab_check();
  items.release_check();
  items.move();
  items.bounds_check();
  items.collect();
  
}

items.item_flow = function() {

  if (conveyor.active) {
  
    // check for adding new items
    items.new_countdown--;
    if (items.new_countdown <= 0) {
      items.add_random();
      items.new_countdown = items.delay_between_items;
    }
  }

}

items.halt_conveyor = function() {

  var left_of_treadmill;
  var on_treadmill;
  
  // movement for all items
  for (var i=0; i < items.ilist.length; i++) {

    // calculate game board positions
    left_of_treadmill = false;
    if (items.ilist[i].x + items.defs[items.ilist[i].itype].w < conveyor.left) {
      left_of_treadmill = true;
    }

    on_treadmill = false;      
    if (items.ilist[i].y + items.defs[items.ilist[i].itype].h == conveyor.top) {
      if (!left_of_treadmill) {
        on_treadmill = true;
      }
    }
    
    if (on_treadmill) {
      items.ilist[i].dx = 0;
    }
  }
}

items.logic_game_over = function() {

  items.grabbing = false;
    
  for (var i=0; i < items.ilist.length; i++) {
  
    // continue gravity on all remaining items
    items.ilist[i].dy++;
    
    // move all items
    items.ilist[i].x += items.ilist[i].dx;
    items.ilist[i].y += items.ilist[i].dy;
  }
  
  items.bounds_check();
}

items.move = function() {
  
  // positional calculations
  var falling;
  var on_treadmill;
  var left_of_treadmill;
  var above_treadmill;
  var landing;
  
  // movement for all items
  for (var i=0; i < items.ilist.length; i++) {

    // the grabbed item moves with the cursor  
    if (items.grabbing && i == items.grabbed_item) {
    
      // center item on cursor
      items.ilist[i].x = inputs.mouse_pos.x - items.defs[items.ilist[i].itype].w/2;
      items.ilist[i].y = inputs.mouse_pos.y - items.defs[items.ilist[i].itype].h/2;
 
    }
    else {
      
      // calculate game board positions
      left_of_treadmill = false;
      if (items.ilist[i].x + items.defs[items.ilist[i].itype].w < conveyor.left) {
        left_of_treadmill = true;
      }

      on_treadmill = false;      
      if (items.ilist[i].y + items.defs[items.ilist[i].itype].h == conveyor.top) {
        if (!left_of_treadmill) {
          on_treadmill = true;
        }
      }
      
      above_treadmill = false;
      if (items.ilist[i].y + items.defs[items.ilist[i].itype].h < conveyor.top) {
        if (!left_of_treadmill) {
          above_treadmill = true;
        }
      }
            
      falling = !on_treadmill;
      
      // apply gravity
      if (falling) {
        items.ilist[i].dy++;
      }
      
      landing = false;
      if (falling && above_treadmill) {
      
        // will this item fall past the treadmill top this frame?
        if (items.ilist[i].y + items.defs[items.ilist[i].itype].h + items.ilist[i].dy >= conveyor.top) {
        
           landing = true;
           items.ilist[i].dy = conveyor.top - items.ilist[i].y - items.defs[items.ilist[i].itype].h;
                   
        }
      }
      
      // random bounce
      if (on_treadmill) {
        if (Math.random() < 0.01) {
          items.ilist[i].dy = -1 * Math.floor(Math.random() * 3);
        }
      }
      
      // move at current speed
      items.ilist[i].x += items.ilist[i].dx;
      items.ilist[i].y += items.ilist[i].dy;

      if (landing) {

        // reset landed items to treadmill speed
        items.ilist[i].dx = conveyor.get_speed();
        items.ilist[i].dy = 0;
        
      }
      
    }
  }
}

items.bounds_check = function() {

  var remove_item;
  
  for (var i = items.ilist.length-1; i >= 0; i--) {

    remove_item = false;
    
    // falling off bottom
    if (items.ilist[i].y >= game_main.VIEW_HEIGHT) { 
      remove_item = true;          
    }

    if (remove_item) {
    
      // items that fall out of bounds are landfill
      if (gamestate.current_state == gamestate.state_types.PLAY) {
        scorekeeper.verify(items.ilist[i].itype, items.recycle_types.LANDFILL);
      }
        
      items.remove(i);
    }
  
  }  
}

items.grab_check = function() {

  // can't grab an item if already holding one
  if (items.grabbing) return;
  
  // can't grab a new item if not touching
  if (!inputs.pressing.mouse) return;
    
  var item_hotspot = new Object();
  var item_type;
  
  var grab_padding = 8; // extra border pixels to grab an item
  
  // back to front so that we're grabbing the foremost item
  for (var i=0; i < items.ilist.length; i++) {
       
    item_hotspot.x = items.ilist[i].x - grab_padding;
    item_hotspot.y = items.ilist[i].y - grab_padding;
    item_hotspot.w = items.defs[items.ilist[i].itype].w + grab_padding + grab_padding;
    item_hotspot.h = items.defs[items.ilist[i].itype].h + grab_padding + grab_padding;
    
    if (utils.is_within(inputs.mouse_pos, item_hotspot)) {
    
       // newly grabbed item
       items.grabbing = true;
       items.grabbed_item = i;
       
       // no longer self-speed
       items.ilist[i].dx = 0;
       items.ilist[i].dy = 0;
       return;    
    }    
  }

}

items.release_check = function() {
  
  // can't drop an item if not holding one
  if (!items.grabbing) return;

  // can't release an item if still holding
  if (inputs.pressing.mouse) return;

  items.grabbing = false;
  
  // check tossing item upwards into bin
  items.toss();  
  
}

items.toss = function() {

  var id = items.grabbed_item;
  
  // throw item that was just released?
  // TODO: move bins properties to a bins class
  var bins_bottom = 80;
  if (items.ilist[id].y > bins_bottom) {
    return; // not high enough to toss
  }  

  // find the closest target bin
  var target_x = -1;
  var target_bin = -1;
  var item_x;
  
  for (var i=0; i<4; i++) {
    item_x = items.ilist[id].x + (items.defs[items.ilist[id].itype].w / 2);
        
    if (utils.is_within({x:item_x, y:items.ilist[id].y}, items.bins[i].hotspot)) {
      // console.log("closest bin is " + items.bins[i].name);
      target_bin = i;
      target_x = items.bins[i].center_x;
    }    
  }

  if (target_bin == -1) return; // no nearby bin
  
  // find the initial y speed needed to reach this distance after gravity
  var target_y = 8 - items.defs[items.ilist[id].itype].h;
  var distance_y = items.ilist[id].y - target_y;          
  
  var initial_dy = 0;
  var calc_distance = 0;
     
  while (calc_distance < distance_y) {
    initial_dy++;
    calc_distance += initial_dy;     
  }     

  items.ilist[id].dy = -1 * initial_dy;

  // find the initial x speed needed to center the item above the bin
  // note: because gravity is 1 px per frame,
  // initial_dy is also the frame count for reaching the arc apex
  var rising_frames = initial_dy;
  
  // how many extra frames for the item to fall into the bin?
  // based on item height
  calc_distance = 0;
  var falling_frames = 0;  
  
  while (calc_distance < items.defs[items.ilist[id].itype].h + 8) {
    falling_frames++;
    calc_distance += falling_frames;
  }
  
  // we know how many frames this item will take to rise and fall into the bin
  // calculate the x speed per frame to land right in the middle of the bin
  items.ilist[id].dx = (target_x - item_x) / (rising_frames + falling_frames);
  

}


items.collect = function() {
  
  var item_x;
  var target_bin = -1;
  // TODO: move bins properties to a bins class
  var bins_top = 16;
  var bins_bottom = 80;  
  
  // check recycle bins
  for (var i=items.ilist.length-1; i >= 0; i--) {
  
    // some ways we know this is not collectible
    // already below the top bins
    if (items.ilist[i].y > bins_bottom) continue;
    
    // tossed above the top bins
    if (items.ilist[i].y < bins_top) continue;
    
    // if item not falling, not ready to collect
    if (items.ilist[i].dy <= 0) continue;
  
    // center of item's current position
    item_x = items.ilist[i].x + (items.defs[items.ilist[i].itype].w / 2);
    
    for (var j=0; j<4; j++) {
      if (utils.is_within({x:item_x, y:items.ilist[i].y}, items.bins[j].hotspot)) {
        target_bin = j;
      }
    }

    if (target_bin == -1) continue;
    
    // collect this item
    scorekeeper.verify(items.ilist[i].itype, target_bin);    
    items.remove(i);

    //console.log("Put an item in the " + items.bins[target_bin].name + " bin");
    
  }
}

items.render = function() {

  items.render_caption();

  for (var i = items.ilist.length-1; i >= 0; i--) {
    if (!items.grabbing || items.grabbed_item !== i) {
      items.render_single(i);
    }
  }
  
  // show the grabbed item in the foreground (draw last)
  if (items.grabbing) {
    items.render_single(items.grabbed_item);
  }
}

items.render_caption = function() {
  if (items.grabbing) {
    bitfont.render(items.defs[items.ilist[items.grabbed_item].itype].name, 200, 88, bitfont.JUSTIFY_CENTER);
  }
}

items.render_single = function(item_id) {
  var itype = items.ilist[item_id].itype;

  // default draw the full item, except when going into a bin
  visible_height = items.defs[itype].h;

  // check going into the landfill bin  
  if (items.ilist[item_id].x + items.defs[items.ilist[item_id].itype].w < conveyor.left) {
      
    var landfill_top = 200;
    if (items.ilist[item_id].y + items.defs[items.ilist[item_id].itype].h > landfill_top) {
      visible_height = landfill_top - items.ilist[item_id].y;
      if (visible_height < 0) return;
    }
  }
  
  // check going into a recycle bin
  // TODO: move bins properties to a bins class
  var bins_top = 16;
  var bins_bottom = 80;
  
  // if above the bins bottoms and falling,
  if (items.ilist[item_id].y < bins_bottom && items.ilist[item_id].dy > 0) {
  
    // if below the top of the bin   
    if (items.ilist[item_id].y + items.defs[items.ilist[item_id].itype].h > bins_top) {
      visible_height = bins_top - items.ilist[item_id].y;
      if (visible_height < 0) return;    
    }
  }
  
  imageset.render(
     items.atlas,
     items.defs[itype].x,
     items.defs[itype].y,
     items.defs[itype].w,
     visible_height,
     items.ilist[item_id].x,
     items.ilist[item_id].y
  );
}
