"use strict";
const tap = require("tap");
const defaultFunctions = require("./default-functions");

tap.test("add base cases", test => {
  test.same(defaultFunctions.add(1, 2), 3);
  test.same(defaultFunctions.add(0, 0), 0);
  test.same(defaultFunctions.add(), 0);
  test.same(defaultFunctions.add(0), 0);
  test.same(defaultFunctions.add(3, 3, 4), 10);
  test.same(defaultFunctions.add(-1), -1);
  test.same(defaultFunctions.add(-1, 1), 0);
  test.same(defaultFunctions.add(-1.5, 7.7), 6.2);
  test.end();
});

tap.test("add is aliased as +", { skip: false }, test => {
  test.same(defaultFunctions["+"](7, 21), 28);
  test.end();
});

tap.test("subtract base cases", { skip: false }, test => {
  test.same(defaultFunctions.subtract(42), -42);
  test.same(defaultFunctions.subtract(-19), 19);
  test.same(defaultFunctions.subtract(7, 5), 2);
  test.same(defaultFunctions.subtract(10, 5, 1), 4);
  test.same(defaultFunctions.subtract(10, -5, -1), 16);
  test.end();
});

tap.test("subtract is aliased as -", { skip: false }, test => {
  test.same(defaultFunctions["-"](20, 13), 7);
  test.end();
});

tap.test("max base cases", { skip: false }, test => {
  test.same(defaultFunctions.max(31, 42, 7, -0), 42);
  test.same(defaultFunctions.max(0), 0);
  test.same(defaultFunctions.max(Infinity), Infinity);
  test.same(defaultFunctions.max(7, 7), 7);
  test.same(defaultFunctions.max(7, -7), 7);
  test.end();
});

tap.test("min base cases", { skip: false }, test => {
  test.same(defaultFunctions.min(31, 42, 7, -0), -0);
  test.same(defaultFunctions.min(0), 0);
  test.same(defaultFunctions.min(Infinity), Infinity);
  test.same(defaultFunctions.min(7, 7), 7);
  test.same(defaultFunctions.min(7, -7), -7);
  test.end();
});
