"use strict";
const tap = require("tap");
const defaultFunctions = require("./default-functions");

tap.test("add base case", test => {
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
