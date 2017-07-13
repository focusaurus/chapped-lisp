"use strict";
const lex = require("./lex");
const parse = require("./parse");
const tap = require("tap");
const run = require("./run");

tap.test("run very simple add", test => {
  const lisp = "(+ 2 4)";
  const lispAst = parse(lex(lisp));
  test.same(run(lispAst), 6);
  test.end();
});

tap.test("run nested and variadic adds", test => {
  const lisp = "(+ 2 4 6 (+ 20 1))";
  const lispAst = parse(lex(lisp));
  test.same(run(lispAst), 33);
  test.end();
});
