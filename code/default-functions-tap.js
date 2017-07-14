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

tap.test("add is alias as +", { skip: false }, test => {
  test.same(defaultFunctions["+"](7, 21), 28);
  test.end();
});

tap.test("subtract base cases", { skip: false }, test => {
  test.same(defaultFunctions.subtract(42), -42);
  test.same(defaultFunctions.subtract(-19), 19);
  test.same(defaultFunctions.subtract(7, 5), 2);
  test.end();
});
