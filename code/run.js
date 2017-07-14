"use strict";
const defaultFunctions = require("./default-functions");

function run(lispAst) {
  const name = lispAst[0];
  const toCall = defaultFunctions[name];
  if (!toCall) {
    throw new Error(`name error: no function named '${name}'`);
  }

  const deNested = lispAst.slice(1).map(node => {
    if (Array.isArray(node)) {
      // Anything in the arg list that's an array is another lisp expression
      // Run that first to convert it to a value before using as an argument
      return run(node);
      //     ^^^ recursion, y'all
    }
    // If it's a value, we're ready to pass it to the function
    return node;
  });
  return toCall(...deNested);
}

module.exports = run;
