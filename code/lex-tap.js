"use strict";
const lex = require("./lex");
const tap = require("tap");

tap.test("lex basic cases", test => {
  tap.strictSame(lex("(+ 0 1)"), ["(", "+", "0", "1", ")"]);
  tap.strictSame(lex("(frog 9 8 7)"), ["(", "frog", "9", "8", "7", ")"]);
  test.end();
});

tap.test("lex basic cases whitespace loose", test => {
  tap.strictSame(lex("   (+\t0\n1 )  \n"), ["(", "+", "0", "1", ")"]);
  tap.strictSame(lex("\n\r\n( frog  9  8  7  ) "), [
    "(",
    "frog",
    "9",
    "8",
    "7",
    ")"
  ]);
  test.end();
});

tap.test("lex nested case", test => {
  tap.strictSame(lex("(one 11 (two 21 22 23 )12 13)"), [
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
