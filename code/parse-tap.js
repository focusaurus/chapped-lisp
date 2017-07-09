"use strict";
const tap = require("tap");
const parse = require("./parse");

tap.test("parseTokens basic flat cases", test => {
  tap.same(parse(["(", "+", "0", "1", ")"]), ["+", "0", "1"]);
  tap.same(parse(["(", "*", "42", "42", "666", ")"]), ["*", 42, 42, 666]);
  tap.same(parse(["(", "max", "42", "42", "666", ")"]), ["max", 42, 42, 666]);
  test.end();
});

tap.test("parseTokens nested cases", test => {
  tap.same(parse(["(", "+", "0", "(", "-", "17", "18", ")", ")"]), [
    "+",
    "0",
    ["-", "17", "18"]
  ]);
  tap.same(parse(["(", "*", "42", "42", "666", ")"]), ["*", 42, 42, 666]);
  tap.same(parse(["(", "max", "42", "42", "666", ")"]), ["max", 42, 42, 666]);
  test.end();
});

tap.test("parseTokens mixed values and sub-expressions", test => {
  tap.same(parse(["(", "+", "11", "(", "-", "21", "22", ")", "12", ")"]), [
    "+",
    "11",
    ["-", "21", "22"],
    "12"
  ]);
  test.end();
});

tap.test("parseTokens a deeper tree", test => {
  tap.same(parse(["(", "+", "11", "(", "-", "21", "22", ")", "12", ")"]), [
    "+",
    11,
    ["-", 21, 22],
    12
  ]);
  test.end();
});
