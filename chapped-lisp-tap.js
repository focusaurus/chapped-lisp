"use strict";
const tap = require("tap");
const lisp = require("./chapped-lisp");

tap.test("lex basic cases", test => {
  tap.same(lisp.lex("(+ 0 1)"), ["(", "+", "0", "1", ")"]);
  tap.same(lisp.lex("(frog 9 8 7)"), ["(", "frog", "9", "8", "7", ")"]);
  test.end();
});

tap.test("lex basic cases whitespace loose", test => {
  tap.same(lisp.lex("   (+\t0\n1 )  \n"), ["(", "+", "0", "1", ")"]);
  tap.same(lisp.lex("\n\r\n( frog  9  8  7  ) "), [
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
  tap.same(lisp.lex("(one 11 (two 21 22 23 )12 13)"), [
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

tap.test("parseTokens basic flat cases", test => {
  tap.same(lisp.parseTokens(["(", "+", "0", "1", ")"]), ["+", "0", "1"]);
  tap.same(lisp.parseTokens(["(", "*", "42", "42", "666", ")"]), [
    "*",
    42,
    42,
    666
  ]);
  tap.same(lisp.parseTokens(["(", "max", "42", "42", "666", ")"]), [
    "max",
    42,
    42,
    666
  ]);
  test.end();
});

tap.test("parseTokens nested cases", test => {
  tap.same(lisp.parseTokens(["(", "+", "0", "(", "-", "17", "18", ")", ")"]), [
    "+",
    "0",
    ["-", "17", "18"]
  ]);
  tap.same(lisp.parseTokens(["(", "*", "42", "42", "666", ")"]), [
    "*",
    42,
    42,
    666
  ]);
  tap.same(lisp.parseTokens(["(", "max", "42", "42", "666", ")"]), [
    "max",
    42,
    42,
    666
  ]);
  test.end();
});

tap.test("parseTokens mixed values and sub-expressions", test => {
  tap.same(
    lisp.parseTokens(["(", "+", "11", "(", "-", "21", "22", ")", "12", ")"]),
    ["+", "11", ["-", "21", "22"], "12"]
  );
  test.end();
});

tap.test("parseTokens a deeper tree", test => {
  tap.same(
    lisp.parseTokens(["(", "+", "11", "(", "-", "21", "22", ")", "12", ")"]),
    ["+", 11, ["-", 21, 22], 12]
  );
  test.end();
});

tap.test("full parse basic expression", {skip: false}, test => {
  tap.same(lisp.parse("(one 11 12)"), ["one", "11", "12"]);
  test.end();
});

tap.test("full parse medium complex nesting", {skip: false}, test => {
  tap.same(lisp.parse("(one 11 12 (two 22 (three 33 34 35) 23) 13)"), [
    "one",
    "11",
    "12",
    ["two", "22", ["three", "33", "34", "35"], "23"],
    "13"
  ]);
  test.end();
});

tap.test("syntax error: missing closing paren", {skip: false}, test => {
  try {
    lisp.parse("(add 1 2");
    tap.fail("Expected syntax error");
  } catch (error) {
    test.end();
  }
});
