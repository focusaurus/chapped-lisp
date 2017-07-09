"use strict";
const tap = require("tap");
const lisp = require("./chapped-lisp");

tap.test("lex basic cases", test => {
  tap.same(lisp.lex("(+ 0 1)"), ["(", "+", "0", "1", ")"]);
  tap.same(lisp.lex("(frog 9 8 7)"), ["(", "frog", "9", "8", "7", ")"]);
  test.end();
});

tap.test("parse basic flat cases", test => {
  tap.same(lisp.parse(["(", "+", "0", "1", ")"]), ["+", "0", "1"]);
  tap.same(lisp.parse(["(", "*", "42", "42", "666", ")"]), [
    "*",
    "42",
    "42",
    "666"
  ]);
  tap.same(lisp.parse(["(", "max", "42", "42", "666", ")"]), [
    "max",
    "42",
    "42",
    "666"
  ]);
  test.end();
});
