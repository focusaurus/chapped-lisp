"use strict";
const tap = require("tap");
const library = require("./library");

tap.test("add base cases", test => {
  test.same(library.add(1, 2), 3);
  test.same(library.add(0, 0), 0);
  test.same(library.add(), 0);
  test.same(library.add(0), 0);
  test.same(library.add(3, 3, 4), 10);
  test.same(library.add(-1), -1);
  test.same(library.add(-1, 1), 0);
  test.same(library.add(-1.5, 7.7), 6.2);
  test.end();
});

tap.test("add is aliased as +", { skip: false }, test => {
  test.same(library["+"](7, 21), 28);
  test.end();
});

tap.test("subtract base cases", { skip: false }, test => {
  test.same(library.subtract(42), -42);
  test.same(library.subtract(-19), 19);
  test.same(library.subtract(7, 5), 2);
  test.same(library.subtract(10, 5, 1), 4);
  test.same(library.subtract(10, -5, -1), 16);
  test.end();
});

tap.test("subtract is aliased as -", { skip: false }, test => {
  test.same(library["-"](20, 13), 7);
  test.end();
});

tap.test("max base cases", { skip: false }, test => {
  test.same(library.max(31, 42, 7, -0), 42);
  test.same(library.max(0), 0);
  test.same(library.max(Infinity), Infinity);
  test.same(library.max(7, 7), 7);
  test.same(library.max(7, -7), 7);
  test.end();
});

tap.test("min base cases", { skip: false }, test => {
  test.same(library.min(31, 42, 7, -0), -0);
  test.same(library.min(0), 0);
  test.same(library.min(Infinity), Infinity);
  test.same(library.min(7, 7), 7);
  test.same(library.min(7, -7), -7);
  test.end();
});
