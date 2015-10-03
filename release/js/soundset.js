/**
 * Handle audio effects
 */
 
var soundset = new Object();

soundset.init = function() {
  soundset.list = new Array();
}

soundset.load = function(filename) {
  var new_sound = new Audio(filename);
  soundset.list.push(new_sound);
  return soundset.list.length-1;
}

soundset.play = function(sound_id) {
  try {
    soundset.list[sound_id].currentTime = 0;
	soundset.list[sound_id].play();
  }
  catch(err) {
    // it's okay if sounds can't play.
    // TODO: more elegant?
  }; 
}
