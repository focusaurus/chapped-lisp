"use strict";
const defaultFunctions = require("./default-functions");

function run(lispAst) {
  const functionName = lispAst[0];
  const fn = defaultFunctions[functionName];
  // error handling if name not found

  const deNested = lispAst.slice(1).map(node => {
    if (Array.isArray(node)) {
      return run(node);
    }
    return node;
  });
  return fn(...deNested);
}

module.exports = run;
