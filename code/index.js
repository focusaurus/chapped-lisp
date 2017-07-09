"use strict";
const lex = require("./lex");
const parse = require("./parse");

function fullParse(lisp) {
  return parse(lex(lisp));
}
module.exports = fullParse; // Main api if you just call chapped(lisp)

// Tack on the more granular functions as well: chapped.lex(lisp)
module.exports.lex = lex;
module.exports.parse = parse;
