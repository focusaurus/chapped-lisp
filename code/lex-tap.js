"use strict";
const tap = require("tap");
const lex = require("./lex");

tap.test("lex basic cases", test => {
  tap.same(lex("(+ 0 1)"), ["(", "+", "0", "1", ")"]);
  tap.same(lex("(frog 9 8 7)"), ["(", "frog", "9", "8", "7", ")"]);
  test.end();
});

tap.test("lex basic cases whitespace loose", test => {
  tap.same(lex("   (+\t0\n1 )  \n"), ["(", "+", "0", "1", ")"]);
  tap.same(lex("\n\r\n( frog  9  8  7  ) "), ["(", "frog", "9", "8", "7", ")"]);
  test.end();
});

tap.test("lex nested case", test => {
  tap.same(lex("(one 11 (two 21 22 23 )12 13)"), [
    "(",
    "one",
    "11",
    "(",
    "two",
    "21",
    "22",
    "23",
    ")",
    "12",
    "13",
    ")"
  ]);
  test.end();
});
