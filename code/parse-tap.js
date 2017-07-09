"use strict";
const parse = require("./parse");
const tap = require("tap");

tap.test("parseTokens basic flat cases", test => {
  tap.strictSame(parse(["(", "+", "0", "1", ")"]), ["+", 0, 1]);
  tap.strictSame(parse(["(", "*", "42", "42", "666", ")"]), ["*", 42, 42, 666]);
  tap.strictSame(parse(["(", "max", "42", "42", "666", ")"]), [
    "max",
    42,
    42,
    666
  ]);
  test.end();
});

tap.test("parseTokens nested cases", test => {
  tap.strictSame(parse(["(", "+", "0", "(", "-", "17", "18", ")", ")"]), [
    "+",
    0,
    ["-", 17, 18]
  ]);
  tap.strictSame(parse(["(", "*", "42", "42", "666", ")"]), ["*", 42, 42, 666]);
  tap.strictSame(parse(["(", "max", "42", "42", "666", ")"]), [
    "max",
    42,
    42,
    666
  ]);
  test.end();
});

tap.test("parseTokens mixed values and sub-expressions", test => {
  tap.strictSame(
    parse(["(", "+", "11", "(", "-", "21", "22", ")", "12", ")"]),
    ["+", 11, ["-", 21, 22], 12]
  );
  test.end();
});

tap.test("parseTokens a deeper tree", test => {
  tap.strictSame(
    parse(["(", "+", "11", "(", "-", "21", "22", ")", "12", ")"]),
    ["+", 11, ["-", 21, 22], 12]
  );
  test.end();
});
