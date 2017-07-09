"use strict";
const chapped = require("./index");
const tap = require("tap");

tap.test("full parse basic expression", {skip: false}, test => {
  tap.same(chapped("(one 11 12)"), ["one", "11", "12"]);
  test.end();
});

tap.test("full parse medium complex nesting", {skip: false}, test => {
  tap.same(chapped("(one 11 12 (two 22 (three 33 34 35) 23) 13)"), [
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
    chapped("(add 1 2");
    tap.fail("Expected syntax error");
  } catch (error) {
    test.end();
  }
});
