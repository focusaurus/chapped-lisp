"use strict";
const lex = require("./lex");
const parse = require("./parse");
const tap = require("tap");
const run = require("./run");

tap.test("run very simple add", test => {
  const lispAst = parse(lex("(+ 2 4)"));
  test.same(run(lispAst), 6);
  test.end();
});

tap.test("run nested and variadic adds", test => {
  const lispAst = parse(lex("(+ 2 4 6 (+ 20 1))"));
  test.same(run(lispAst), 33);
  test.end();
});

tap.test("run missing function", test => {
  const lispAst = parse(lex("(nope 2 4 6 (dope 20 1))"));
  try {
    run(lispAst);
    test.fail("should have thrown a name error");
  } catch (e) {
    test.end();
  }
});
