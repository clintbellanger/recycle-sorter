/**
 Bitamp Font renderer
 Clint Bellanger

Note this class is simplified in several ways:
- Each glyph is the same height (don't need an h var for each glyph)
- The font image has glyphs all in one row (don't need to store the y coord)
- Optionally convert all text to uppercase
- No word wrap

 */


var bitfont = new Object();

bitfont.init = function() {

  bitfont.JUSTIFY_LEFT = 0;
  bitfont.JUSTIFY_RIGHT = 1;
  bitfont.JUSTIFY_CENTER = 2;

  bitfont.glyph_x = new Array();
  bitfont.glyph_w = new Array();
  bitfont.cursor_x = 0;

  // configuration for this font
  bitfont.img_id = imageset.load("images/interface/pixel_sans.png");

  bitfont.kerning = -1;
  bitfont.height = 12;
  bitfont.space = 3;
  bitfont.has_lowercase = true;

  // glyph definitions
  bitfont.glyph_x["!"] = 0; bitfont.glyph_w["!"] = 3;
  bitfont.glyph_x["\""] = 4; bitfont.glyph_w["\""] = 5;
  bitfont.glyph_x["#"] = 10; bitfont.glyph_w["#"] = 7;
  bitfont.glyph_x["$"] = 18; bitfont.glyph_w["$"] = 7;
  bitfont.glyph_x["%"] = 26; bitfont.glyph_w["%"] = 8;
  bitfont.glyph_x["&"] = 35; bitfont.glyph_w["&"] = 8;
  bitfont.glyph_x["'"] = 44; bitfont.glyph_w["'"] = 3;
  bitfont.glyph_x["("] = 48; bitfont.glyph_w["("] = 5;
  bitfont.glyph_x[")"] = 54; bitfont.glyph_w[")"] = 5;
  bitfont.glyph_x["*"] = 60; bitfont.glyph_w["*"] = 7;
  bitfont.glyph_x["+"] = 68; bitfont.glyph_w["+"] = 7;
  bitfont.glyph_x[","] = 76; bitfont.glyph_w[","] = 4;
  bitfont.glyph_x["-"] = 81; bitfont.glyph_w["-"] = 7;
  bitfont.glyph_x["."] = 89; bitfont.glyph_w["."] = 3;
  bitfont.glyph_x["/"] = 93; bitfont.glyph_w["/"] = 6;
  
  bitfont.glyph_x["0"] = 100; bitfont.glyph_w["0"] = 6;
  bitfont.glyph_x["1"] = 107; bitfont.glyph_w["1"] = 5;
  bitfont.glyph_x["2"] = 113; bitfont.glyph_w["2"] = 6;
  bitfont.glyph_x["3"] = 120; bitfont.glyph_w["3"] = 6;
  bitfont.glyph_x["4"] = 127; bitfont.glyph_w["4"] = 6;
  bitfont.glyph_x["5"] = 134; bitfont.glyph_w["5"] = 6;
  bitfont.glyph_x["6"] = 141; bitfont.glyph_w["6"] = 6;
  bitfont.glyph_x["7"] = 148; bitfont.glyph_w["7"] = 6;
  bitfont.glyph_x["8"] = 155; bitfont.glyph_w["8"] = 6;
  bitfont.glyph_x["9"] = 162; bitfont.glyph_w["9"] = 6;
  
  bitfont.glyph_x[":"] = 169; bitfont.glyph_w[":"] = 3;
  bitfont.glyph_x[";"] = 173; bitfont.glyph_w[";"] = 4;
  bitfont.glyph_x["<"] = 178; bitfont.glyph_w["<"] = 6;
  bitfont.glyph_x["="] = 185; bitfont.glyph_w["="] = 6;
  bitfont.glyph_x[">"] = 192; bitfont.glyph_w[">"] = 6;
  bitfont.glyph_x["?"] = 199; bitfont.glyph_w["?"] = 8;
  bitfont.glyph_x["@"] = 207; bitfont.glyph_w["@"] = 7;
  
  bitfont.glyph_x["A"] = 215; bitfont.glyph_w["A"] = 7;
  bitfont.glyph_x["B"] = 223; bitfont.glyph_w["B"] = 6;
  bitfont.glyph_x["C"] = 230; bitfont.glyph_w["C"] = 6;
  bitfont.glyph_x["D"] = 237; bitfont.glyph_w["D"] = 6;
  bitfont.glyph_x["E"] = 244; bitfont.glyph_w["E"] = 6;
  bitfont.glyph_x["F"] = 251; bitfont.glyph_w["F"] = 6;
  bitfont.glyph_x["G"] = 258; bitfont.glyph_w["G"] = 6;
  bitfont.glyph_x["H"] = 265; bitfont.glyph_w["H"] = 6;
  bitfont.glyph_x["I"] = 272; bitfont.glyph_w["I"] = 5;
  bitfont.glyph_x["J"] = 278; bitfont.glyph_w["J"] = 6;
  bitfont.glyph_x["K"] = 285; bitfont.glyph_w["K"] = 6;
  bitfont.glyph_x["L"] = 292; bitfont.glyph_w["L"] = 6;
  bitfont.glyph_x["M"] = 299; bitfont.glyph_w["M"] = 7;
  bitfont.glyph_x["N"] = 307; bitfont.glyph_w["N"] = 7;
  bitfont.glyph_x["O"] = 315; bitfont.glyph_w["O"] = 6;
  bitfont.glyph_x["P"] = 322; bitfont.glyph_w["P"] = 6;
  bitfont.glyph_x["Q"] = 329; bitfont.glyph_w["Q"] = 7;
  bitfont.glyph_x["R"] = 337; bitfont.glyph_w["R"] = 6;
  bitfont.glyph_x["S"] = 344; bitfont.glyph_w["S"] = 6;
  bitfont.glyph_x["T"] = 351; bitfont.glyph_w["T"] = 6;
  bitfont.glyph_x["U"] = 359; bitfont.glyph_w["U"] = 6;
  bitfont.glyph_x["V"] = 366; bitfont.glyph_w["V"] = 7;
  bitfont.glyph_x["W"] = 374; bitfont.glyph_w["W"] = 7;
  bitfont.glyph_x["X"] = 382; bitfont.glyph_w["X"] = 7;
  bitfont.glyph_x["Y"] = 390; bitfont.glyph_w["Y"] = 7;
  bitfont.glyph_x["Z"] = 398; bitfont.glyph_w["Z"] = 6;

  bitfont.glyph_x["["] = 405; bitfont.glyph_w["["] = 5;
  bitfont.glyph_x["\\"] = 411; bitfont.glyph_w["\\"] = 6;
  bitfont.glyph_x["]"] = 418; bitfont.glyph_w["]"] = 5;
  bitfont.glyph_x["^"] = 424; bitfont.glyph_w["^"] = 7;
  bitfont.glyph_x["_"] = 432; bitfont.glyph_w["_"] = 6;
  bitfont.glyph_x["`"] = 438; bitfont.glyph_w["`"] = 5;

  bitfont.glyph_x["a"] = 444; bitfont.glyph_w["a"] = 6;
  bitfont.glyph_x["b"] = 451; bitfont.glyph_w["b"] = 6;
  bitfont.glyph_x["c"] = 458; bitfont.glyph_w["c"] = 6;
  bitfont.glyph_x["d"] = 465; bitfont.glyph_w["d"] = 6;
  bitfont.glyph_x["e"] = 472; bitfont.glyph_w["e"] = 6;
  bitfont.glyph_x["f"] = 479; bitfont.glyph_w["f"] = 5;
  bitfont.glyph_x["g"] = 485; bitfont.glyph_w["g"] = 6;
  bitfont.glyph_x["h"] = 492; bitfont.glyph_w["h"] = 6;
  bitfont.glyph_x["i"] = 499; bitfont.glyph_w["i"] = 3;
  bitfont.glyph_x["j"] = 503; bitfont.glyph_w["j"] = 4;
  bitfont.glyph_x["k"] = 508; bitfont.glyph_w["k"] = 6;
  bitfont.glyph_x["l"] = 515; bitfont.glyph_w["l"] = 3;
  bitfont.glyph_x["m"] = 519; bitfont.glyph_w["m"] = 7;
  bitfont.glyph_x["n"] = 527; bitfont.glyph_w["n"] = 6;
  bitfont.glyph_x["o"] = 534; bitfont.glyph_w["o"] = 6;
  bitfont.glyph_x["p"] = 541; bitfont.glyph_w["p"] = 6;
  bitfont.glyph_x["q"] = 548; bitfont.glyph_w["q"] = 7;
  bitfont.glyph_x["r"] = 556; bitfont.glyph_w["r"] = 6;
  bitfont.glyph_x["s"] = 563; bitfont.glyph_w["s"] = 6;
  bitfont.glyph_x["t"] = 570; bitfont.glyph_w["t"] = 6;
  bitfont.glyph_x["u"] = 577; bitfont.glyph_w["u"] = 6;
  bitfont.glyph_x["v"] = 584; bitfont.glyph_w["v"] = 7;
  bitfont.glyph_x["w"] = 592; bitfont.glyph_w["w"] = 7;
  bitfont.glyph_x["x"] = 600; bitfont.glyph_w["x"] = 7;
  bitfont.glyph_x["y"] = 608; bitfont.glyph_w["y"] = 7;
  bitfont.glyph_x["z"] = 616; bitfont.glyph_w["z"] = 6;
  
  bitfont.glyph_x["{"] = 623; bitfont.glyph_w["{"] = 5;
  bitfont.glyph_x["|"] = 629; bitfont.glyph_w["|"] = 3;
  bitfont.glyph_x["}"] = 633; bitfont.glyph_w["}"] = 5;
  bitfont.glyph_x["~"] = 639; bitfont.glyph_w["~"] = 7;
}

/**
 * Render text at x,y with the given text justify
 */
bitfont.render = function(text, x, y, justify) {

  var drawtext = text;
  if (!bitfont.has_lowercase) drawtext = text.toUpperCase();
  bitfont.set_position(drawtext, x, justify);

  for (var i=0; i < drawtext.length; i++) {
    bitfont.render_glyph(drawtext.charAt(i), y);
  }

}

/**
 * Sets the starting position for rendering text
 * based on the justify option
 */
bitfont.set_position = function(text, x, justify) {
  if (justify == bitfont.JUSTIFY_LEFT) {
    bitfont.cursor_x = x;
  }
  else if (justify == bitfont.JUSTIFY_RIGHT) {
    bitfont.cursor_x = x - bitfont.calcwidth(text);
  }
  else if (justify == bitfont.JUSTIFY_CENTER) {
    bitfont.cursor_x = x - (bitfont.calcwidth(text)/2);
  }
}

/**
 * Calculate the total width of a string
 * Useful for center or right justify
 */
bitfont.calcwidth = function(text) {
  var total_width = 0;
  var character;

  for (var i=0; i < text.length; i++) {
    character = text.charAt(i);
    if (character == " ") {
      total_width += bitfont.space;
    }
    else {
      total_width += bitfont.glyph_w[character] + bitfont.kerning;
    }
  }
  return total_width - bitfont.kerning;
}

/**
 * Internal function
 * Render glyph at cursor_x, y
 */
bitfont.render_glyph = function(character, y) {

  if (character == " ") {
    bitfont.cursor_x += bitfont.space;
  }
  else {

    imageset.render (
	  bitfont.img_id,
      bitfont.glyph_x[character],
      0,
      bitfont.glyph_w[character],
      bitfont.height,	  
      bitfont.cursor_x,
      y
    );

    bitfont.cursor_x += bitfont.glyph_w[character] + bitfont.kerning;
  }

}

