"use strict";
const lex = require("./lex");
const parse = require("./parse");
const runAst = require("./run");

function run(lisp) {
  return runAst(parse(lex(lisp)));
}
module.exports = run; // Main api if you just call chapped(lisp)

// Tack on the more granular functions as well: chapped.lex(lisp)
module.exports.lex = lex;
module.exports.parse = parse;
module.exports.run = runAst;
