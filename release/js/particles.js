/**
 Simple particle system
 */
 
var particles = new Object();

particles.init = function() {

  particles.atlas = imageset.load("images/particles.png");  
  particles.size = 8;
  particles.max_frames = 8;
  particles.variations = 8;
  
  particles.gravity = [0.5, 0.5, 0.5, 0.5, 0.3, 0.3, 0.3, 0.3];
  
  particles.plist = [];  
  
}

particles.add = function(x, y) {
  var new_particle = new Object();
  
  new_particle.ptype = Math.floor(Math.random() * particles.variations);
  new_particle.current_frame = Math.floor(Math.random() * particles.max_frames);
  new_particle.x = x - particles.size/2;
  new_particle.y = y - particles.size/2;
  
  new_particle.dx = (Math.random() * 4) - 2;
  new_particle.dy = -1 * (Math.random() * 4 + 4);
  particles.plist.push(new_particle);
}

particles.logic = function() {
  for (var i=0; i<particles.plist.length; i++) {
  
    // animate particle
    particles.plist[i].current_frame++;
    if (particles.plist[i].current_frame == particles.max_frames) {
      particles.plist[i].current_frame = 0;
    }
    
    // move particle horizontall
    particles.plist[i].x += particles.plist[i].dx;
    
    // apply gravity
    particles.plist[i].dy += particles.gravity[particles.plist[i].ptype];
    particles.plist[i].y += particles.plist[i].dy;
  }
  
  particles.bounds_check();
}

particles.bounds_check = function() {
  for (var i=particles.plist.length-1; i>=0; i--) {
  
    // particle has left the bottom of the screen
    if (particles.plist[i].y > game_main.VIEW_HEIGHT) {
      
      // remove it
      particles.plist.splice(i,1);
    }
  }
}

particles.render = function() {
  for (var i=0; i<particles.plist.length; i++) {
    particles.render_single(i);
  }
}

particles.render_single = function(particle_id) {
  imageset.render(
    particles.atlas,
    particles.plist[particle_id].ptype * particles.size,
    particles.plist[particle_id].current_frame * particles.size,
    particles.size,
    particles.size,
    particles.plist[particle_id].x,
    particles.plist[particle_id].y
  );
}
