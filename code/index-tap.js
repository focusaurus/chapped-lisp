"use strict";
const chapped = require("./index");
const tap = require("tap");

function define(description, lisp, value) {
  return {description, lisp, value};
}

const testConfigs = [
  define("basic add", "(+ 11 12)", 23),
  define("basic add whitespace", " ( +   11  12\t)", 23),
  define("medium complex nesting", "(+ 1 1 (+ 2 (+ 5 5 5) 2) 3)", 24)
];

testConfigs.forEach(config => {
  tap.test(config.description, {skip: false}, test => {
    tap.same(chapped(config.lisp), config.value);
    test.end();
  });
});

function fail(description, lisp, message) {
  return {description, lisp, message};
}

const errorConfigs = [
  fail("syntax error: missing closing paren", "(+ 1 2", "syntax error"),
  fail("name error: unknown function", "(nosuchfn 1 2)", "name error")
];

errorConfigs.forEach(config => {
  tap.test(config.description, {skip: false}, test => {
    try {
      chapped(config.lisp);
      tap.fail("Expected exception");
    } catch (error) {
      tap.match(error.message, config.message);
      test.end();
    }
  });
});
