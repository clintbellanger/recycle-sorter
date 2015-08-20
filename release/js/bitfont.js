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
  bitfont.img_id = imageset.load("images/interface/good_neighbors.png");

  bitfont.kerning = -1;
  bitfont.height = 16;
  bitfont.space = 4;
  bitfont.has_lowercase = true;

  // glyph definitions
  bitfont.glyph_x["!"] = 1; bitfont.glyph_w["!"] = 6;
  bitfont.glyph_x["\""] = 8; bitfont.glyph_w["\""] = 7;
  bitfont.glyph_x["#"] = 16; bitfont.glyph_w["#"] = 10;
  bitfont.glyph_x["$"] = 27; bitfont.glyph_w["$"] = 10;
  bitfont.glyph_x["%"] = 38; bitfont.glyph_w["%"] = 11;
  bitfont.glyph_x["&"] = 50; bitfont.glyph_w["&"] = 11;
  bitfont.glyph_x["'"] = 62; bitfont.glyph_w["'"] = 4;
  bitfont.glyph_x["("] = 67; bitfont.glyph_w["("] = 6;
  bitfont.glyph_x[")"] = 74; bitfont.glyph_w[")"] = 6;
  bitfont.glyph_x["*"] = 81; bitfont.glyph_w["*"] = 10;
  bitfont.glyph_x["+"] = 92; bitfont.glyph_w["+"] = 8;
  bitfont.glyph_x[","] = 101; bitfont.glyph_w[","] = 4;
  bitfont.glyph_x["-"] = 106; bitfont.glyph_w["-"] = 9;
  bitfont.glyph_x["."] = 116; bitfont.glyph_w["."] = 4;
  bitfont.glyph_x["/"] = 121; bitfont.glyph_w["/"] = 8;
  
  bitfont.glyph_x["0"] = 130; bitfont.glyph_w["0"] = 8;
  bitfont.glyph_x["1"] = 139; bitfont.glyph_w["1"] = 6;
  bitfont.glyph_x["2"] = 146; bitfont.glyph_w["2"] = 8;
  bitfont.glyph_x["3"] = 155; bitfont.glyph_w["3"] = 8;
  bitfont.glyph_x["4"] = 164; bitfont.glyph_w["4"] = 9;
  bitfont.glyph_x["5"] = 174; bitfont.glyph_w["5"] = 8;
  bitfont.glyph_x["6"] = 183; bitfont.glyph_w["6"] = 8;
  bitfont.glyph_x["7"] = 192; bitfont.glyph_w["7"] = 8;
  bitfont.glyph_x["8"] = 201; bitfont.glyph_w["8"] = 8;
  bitfont.glyph_x["9"] = 210; bitfont.glyph_w["9"] = 8;
  
  bitfont.glyph_x[":"] = 219; bitfont.glyph_w[":"] = 4;
  bitfont.glyph_x[";"] = 224; bitfont.glyph_w[";"] = 4;
  bitfont.glyph_x["<"] = 229; bitfont.glyph_w["<"] = 9;
  bitfont.glyph_x["="] = 239; bitfont.glyph_w["="] = 7;
  bitfont.glyph_x[">"] = 247; bitfont.glyph_w[">"] = 9;
  bitfont.glyph_x["?"] = 257; bitfont.glyph_w["?"] = 8;
  bitfont.glyph_x["@"] = 266; bitfont.glyph_w["@"] = 10;
  
  bitfont.glyph_x["A"] = 277; bitfont.glyph_w["A"] = 8;
  bitfont.glyph_x["B"] = 286; bitfont.glyph_w["B"] = 8;
  bitfont.glyph_x["C"] = 295; bitfont.glyph_w["C"] = 8;
  bitfont.glyph_x["D"] = 304; bitfont.glyph_w["D"] = 9;
  bitfont.glyph_x["E"] = 314; bitfont.glyph_w["E"] = 8;
  bitfont.glyph_x["F"] = 323; bitfont.glyph_w["F"] = 8;
  bitfont.glyph_x["G"] = 332; bitfont.glyph_w["G"] = 8;
  bitfont.glyph_x["H"] = 341; bitfont.glyph_w["H"] = 8;
  bitfont.glyph_x["I"] = 350; bitfont.glyph_w["I"] = 6;
  bitfont.glyph_x["J"] = 357; bitfont.glyph_w["J"] = 9;
  bitfont.glyph_x["K"] = 367; bitfont.glyph_w["K"] = 8;
  bitfont.glyph_x["L"] = 376; bitfont.glyph_w["L"] = 8;
  bitfont.glyph_x["M"] = 385; bitfont.glyph_w["M"] = 10;
  bitfont.glyph_x["N"] = 396; bitfont.glyph_w["N"] = 9;
  bitfont.glyph_x["O"] = 406; bitfont.glyph_w["O"] = 8;
  bitfont.glyph_x["P"] = 415; bitfont.glyph_w["P"] = 8;
  bitfont.glyph_x["Q"] = 424; bitfont.glyph_w["Q"] = 9;
  bitfont.glyph_x["R"] = 434; bitfont.glyph_w["R"] = 9;
  bitfont.glyph_x["S"] = 444; bitfont.glyph_w["S"] = 8;
  bitfont.glyph_x["T"] = 453; bitfont.glyph_w["T"] = 8;
  bitfont.glyph_x["U"] = 462; bitfont.glyph_w["U"] = 8;
  bitfont.glyph_x["V"] = 471; bitfont.glyph_w["V"] = 8;
  bitfont.glyph_x["W"] = 480; bitfont.glyph_w["W"] = 10;
  bitfont.glyph_x["X"] = 491; bitfont.glyph_w["X"] = 9;
  bitfont.glyph_x["Y"] = 501; bitfont.glyph_w["Y"] = 8;
  bitfont.glyph_x["Z"] = 510; bitfont.glyph_w["Z"] = 8;

  bitfont.glyph_x["["] = 519; bitfont.glyph_w["["] = 6;
  bitfont.glyph_x["\\"] = 526; bitfont.glyph_w["\\"] = 8;
  bitfont.glyph_x["]"] = 535; bitfont.glyph_w["]"] = 6;
  bitfont.glyph_x["^"] = 542; bitfont.glyph_w["^"] = 11;
  bitfont.glyph_x["_"] = 554; bitfont.glyph_w["_"] = 8;
  bitfont.glyph_x["`"] = 563; bitfont.glyph_w["`"] = 6;

  bitfont.glyph_x["a"] = 570; bitfont.glyph_w["a"] = 8;
  bitfont.glyph_x["b"] = 579; bitfont.glyph_w["b"] = 8;
  bitfont.glyph_x["c"] = 588; bitfont.glyph_w["c"] = 8;
  bitfont.glyph_x["d"] = 597; bitfont.glyph_w["d"] = 8;
  bitfont.glyph_x["e"] = 606; bitfont.glyph_w["e"] = 8;
  bitfont.glyph_x["f"] = 615; bitfont.glyph_w["f"] = 7;
  bitfont.glyph_x["g"] = 623; bitfont.glyph_w["g"] = 8;
  bitfont.glyph_x["h"] = 632; bitfont.glyph_w["h"] = 8;
  bitfont.glyph_x["i"] = 641; bitfont.glyph_w["i"] = 6;
  bitfont.glyph_x["j"] = 648; bitfont.glyph_w["j"] = 6;
  bitfont.glyph_x["k"] = 655; bitfont.glyph_w["k"] = 8;
  bitfont.glyph_x["l"] = 664; bitfont.glyph_w["l"] = 5;
  bitfont.glyph_x["m"] = 670; bitfont.glyph_w["m"] = 10;
  bitfont.glyph_x["n"] = 681; bitfont.glyph_w["n"] = 8;
  bitfont.glyph_x["o"] = 690; bitfont.glyph_w["o"] = 8;
  bitfont.glyph_x["p"] = 699; bitfont.glyph_w["p"] = 8;
  bitfont.glyph_x["q"] = 708; bitfont.glyph_w["q"] = 9;
  bitfont.glyph_x["r"] = 718; bitfont.glyph_w["r"] = 8;
  bitfont.glyph_x["s"] = 727; bitfont.glyph_w["s"] = 8;
  bitfont.glyph_x["t"] = 736; bitfont.glyph_w["t"] = 8;
  bitfont.glyph_x["u"] = 745; bitfont.glyph_w["u"] = 8;
  bitfont.glyph_x["v"] = 754; bitfont.glyph_w["v"] = 9;
  bitfont.glyph_x["w"] = 763; bitfont.glyph_w["w"] = 10;
  bitfont.glyph_x["x"] = 774; bitfont.glyph_w["x"] = 8;
  bitfont.glyph_x["y"] = 783; bitfont.glyph_w["y"] = 8;
  bitfont.glyph_x["z"] = 792; bitfont.glyph_w["z"] = 8;
  
  bitfont.glyph_x["{"] = 801; bitfont.glyph_w["{"] = 7;
  bitfont.glyph_x["|"] = 809; bitfont.glyph_w["|"] = 4;
  bitfont.glyph_x["}"] = 814; bitfont.glyph_w["}"] = 7;
  bitfont.glyph_x["~"] = 822; bitfont.glyph_w["~"] = 9;
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

