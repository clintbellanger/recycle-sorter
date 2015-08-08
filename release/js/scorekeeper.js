/**
 Score keeper logic.
 Shows feedback to the player about correct or incorrect play
 */
 
var scorekeeper = new Object();

scorekeeper.init = function() {
  scorekeeper.atlas = imageset.load("images/scorecard.png");

  scorekeeper.symbol_types = {
    NONE: -1,
    RECYCLE: 0,
    INCORRECT: 1
  };
  
  // icon locations on the image atlas
  scorekeeper.symbol_src = new Array();
  scorekeeper.symbol_src[scorekeeper.symbol_types.RECYCLE]   = {x:  2, y: 2, w: 32, h: 33};
  scorekeeper.symbol_src[scorekeeper.symbol_types.INCORRECT] = {x: 36, y: 2, w: 30, h: 31};

  // how long to display a score symbol before it is hidden again
  scorekeeper.symbol_duration = 30;
  
  // where each symbol is displayed on the bins
  scorekeeper.symbol_dest = new Array();
  scorekeeper.symbol_dest[items.recycle_types.PLASTIC]  = {mid_x:  56, mid_y:  56};
  scorekeeper.symbol_dest[items.recycle_types.PAPER]    = {mid_x: 152, mid_y:  56};
  scorekeeper.symbol_dest[items.recycle_types.GLASS]    = {mid_x: 248, mid_y:  56};
  scorekeeper.symbol_dest[items.recycle_types.METAL]    = {mid_x: 344, mid_y:  56};
  scorekeeper.symbol_dest[items.recycle_types.LANDFILL] = {mid_x:  40, mid_y: 224};
  
  // which symbol is currently displayed on each bin, and how many frames it has left to display
  scorekeeper.symbol_active = new Array();
  scorekeeper.symbol_active[items.recycle_types.PLASTIC]  = {stype:scorekeeper.symbol_types.NONE, timer: 0};
  scorekeeper.symbol_active[items.recycle_types.PAPER]    = {stype:scorekeeper.symbol_types.NONE, timer: 0};
  scorekeeper.symbol_active[items.recycle_types.GLASS]    = {stype:scorekeeper.symbol_types.NONE, timer: 0};
  scorekeeper.symbol_active[items.recycle_types.METAL]    = {stype:scorekeeper.symbol_types.NONE, timer: 0};
  scorekeeper.symbol_active[items.recycle_types.LANDFILL] = {stype:scorekeeper.symbol_types.NONE, timer: 0};
  
  scorekeeper.total_mistakes = 0;
  scorekeeper.mistakes_to_game_over = 3;
  
  scorekeeper.total_recycles = 0;
  
  scorekeeper.end_game = false;
}

scorekeeper.logic = function() {
   
  if (scorekeeper.total_mistakes >= scorekeeper.mistakes_to_game_over) {
    
    // instruct game_state to enter GAME_OVER    
    scorekeeper.end_game = true;
  }
   
  // animate bin symbols   
  for (var i=0; i < scorekeeper.symbol_active.length; i++) {

    // countdown the visibility duration
    if (scorekeeper.symbol_active[i].timer > 0) {
      scorekeeper.symbol_active[i].timer--;
    }
  
    // hide symbols that have been visible long enough
    if (scorekeeper.symbol_active[i].timer == 0) {
      scorekeeper.symbol_active[i].stype = scorekeeper.symbol_types.NONE;;
    }    
    
  }
  
}

scorekeeper.verify = function(item_type, bin_type) {

  var correct = items.defs[item_type].rtype == bin_type;
  
  // show correct answer if recycling an item
  if (correct && bin_type != items.recycle_types.LANDFILL) {
    scorekeeper.activate_symbol(scorekeeper.symbol_types.RECYCLE, bin_type);
    
    // points up!
    scorekeeper.total_recycles++;
    
    // speed up the item flow (and difficulty)
    if (items.delay_between_items > 64) {
      items.delay_between_items -= 2;
    }
    else if (items.delay_between_items > 32) {
      items.delay_between_items -= 1;
    }
    
  }
  
  // show incorrect symbol if an item is placed where it does not belong
  if (!correct) {
    scorekeeper.activate_symbol(scorekeeper.symbol_types.INCORRECT, bin_type);
    
    if (scorekeeper.total_mistakes < scorekeeper.mistakes_to_game_over) {
      scorekeeper.total_mistakes++;
    }
  }
  
}

scorekeeper.activate_symbol = function(symbol_type, bin_type) {
  scorekeeper.symbol_active[bin_type].stype = symbol_type;
  
  // set the visibility duration
  scorekeeper.symbol_active[bin_type].timer = scorekeeper.symbol_duration;
}

scorekeeper.render = function() {

  for (var i=0; i < scorekeeper.symbol_active.length; i++) {
    if (scorekeeper.symbol_active[i].stype != scorekeeper.symbol_types.NONE) {
      scorekeeper.render_symbol(scorekeeper.symbol_active[i].stype, i);
    }
  }
  
  scorekeeper.render_mistakes();
}

scorekeeper.render_symbol = function(symbol_type, bin_type) {

  imageset.render(
     scorekeeper.atlas,
     scorekeeper.symbol_src[symbol_type].x,
     scorekeeper.symbol_src[symbol_type].y,
     scorekeeper.symbol_src[symbol_type].w,
     scorekeeper.symbol_src[symbol_type].h,
     scorekeeper.symbol_dest[bin_type].mid_x - scorekeeper.symbol_src[symbol_type].w/2,
     scorekeeper.symbol_dest[bin_type].mid_y - scorekeeper.symbol_src[symbol_type].h/2
  );
}

scorekeeper.render_mistakes = function() {

  for (var i=0; i<scorekeeper.total_mistakes; i++) {
    imageset.render(
      scorekeeper.atlas,
      scorekeeper.symbol_src[scorekeeper.symbol_types.INCORRECT].x,
      scorekeeper.symbol_src[scorekeeper.symbol_types.INCORRECT].y,
      scorekeeper.symbol_src[scorekeeper.symbol_types.INCORRECT].w,
      scorekeeper.symbol_src[scorekeeper.symbol_types.INCORRECT].h,
      360 - i * scorekeeper.symbol_src[scorekeeper.symbol_types.INCORRECT].w,
      208
    );
  }

}
