var items = new Object();

items.init = function() {

  items.recycle_types = {
    OTHER: 0,
    PLASTIC: 1,
    PAPER: 2,
    GLASS: 3,
    METAL: 4,
    LANDFILL: 5
  };

  items.atlas = imageset.load("images/items.png");
  
  items.defs = new Array();
  items.defs[0]  = {name:"Water Bottle",  x:2,   y:17, w:15, h:45, rtype:items.recycle_types.PLASTIC};
  items.defs[1]  = {name:"Milk Jug",      x:19,  y:7,  w:39, h:55, rtype:items.recycle_types.PLASTIC};
  items.defs[2]  = {name:"Laundry Soap",  x:60,  y:18, w:36, h:44, rtype:items.recycle_types.PLASTIC};  
  items.defs[3]  = {name:"Cardboard Box", x:98,  y:14, w:51, h:48, rtype:items.recycle_types.PAPER};
  items.defs[4]  = {name:"News Print",    x:151, y:34, w:53, h:28, rtype:items.recycle_types.PAPER};
  items.defs[5]  = {name:"Brown Bag",     x:206, y:16, w:35, h:46, rtype:items.recycle_types.PAPER}; 
  items.defs[6]  = {name:"Soda Bottle",   x:243, y:12, w:17, h:50, rtype:items.recycle_types.GLASS};
  items.defs[7]  = {name:"Mason Jar",     x:262, y:27, w:23, h:35, rtype:items.recycle_types.GLASS};
  items.defs[8]  = {name:"Root Beer",     x:287, y:13, w:16, h:49, rtype:items.recycle_types.GLASS};  
  items.defs[9]  = {name:"Small Can",     x:305, y:32, w:23, h:30, rtype:items.recycle_types.METAL};
  items.defs[10] = {name:"Large Can",     x:329, y:22, w:22, h:40, rtype:items.recycle_types.METAL};
  items.defs[11] = {name:"Soda Can",      x:353, y:28, w:18, h:34, rtype:items.recycle_types.METAL};  
  items.defs[12] = {name:"Foam Cup",      x:373, y:17, w:28, h:45, rtype:items.recycle_types.LANDFILL};
  items.defs[13] = {name:"Pizza Box",     x:403, y:32, w:60, h:30, rtype:items.recycle_types.LANDFILL};
  items.defs[14] = {name:"Coffee Mug",    x:465, y:36, w:29, h:26, rtype:items.recycle_types.LANDFILL};
  items.defs[15] = {name:"Spray Can",     x:496, y:22, w:17, h:40, rtype:items.recycle_types.LANDFILL};

  // current items on screen  
  items.ilist = new Array();  
  
  
  items.new_countdown = 0;
}

items.add_random = function() {

  new_item = new Object();
  var treadmill_top = 192;
  
  new_item.itype = Math.floor(Math.random() * items.defs.length);
  new_item.x = game_main.VIEW_WIDTH -1;  
  new_item.y = treadmill_top - items.defs[new_item.itype].h;
  new_item.dx = -1;
  new_item.dy = 0;
  
  items.ilist.push(new_item);
}

items.remove = function(item_id) {
  items.ilist.splice(item_id,1);
  
  // TODO: update which one is being held
}

items.logic = function() {

  // check for adding new items
  items.new_countdown--;
  if (items.new_countdown <= 0) {
    items.add_random();
    items.new_countdown = 100;
  }
     
  items.move();
  items.bounds_check();
}

items.move = function() {
  var treadmill_left = 84;
    
  // movement for all items
  for (var i=0; i < items.ilist.length; i++) {
 
    // check falling off end of treadmill
    if (items.ilist[i].x + items.defs[items.ilist[i].itype].w < treadmill_left) {
      items.ilist[i].dy++;
    }
  
    // move at current speed
    items.ilist[i].x += items.ilist[i].dx;
    items.ilist[i].y += items.ilist[i].dy;

  }
}

items.bounds_check = function() {

  for (var i = items.ilist.length-1; i >= 0; i--) {

     // falling off bottom
     if (items.ilist[i].y >= game_main.VIEW_HEIGHT) {     
       items.remove(i);
     }
  
  }  
}




items.render = function() {
  for (var i=0; i < items.ilist.length; i++) {
    items.render_single(i);
  }
}

items.render_single = function(item_id) {
  var itype = items.ilist[item_id].itype;

  // default draw the full item, except when going into a bin
  visible_height = items.defs[itype].h;

  // check going into the landfill bin  
  var treadmill_left = 84;
  if (items.ilist[item_id].x + items.defs[items.ilist[item_id].itype].w < treadmill_left) {
      
    var landfill_top = 200;
    if (items.ilist[item_id].y + items.defs[items.ilist[item_id].itype].h > landfill_top) {
      visible_height = landfill_top - items.ilist[item_id].y;
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
