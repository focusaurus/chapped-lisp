"use strict";
const debug = require("debug")("chapped-lisp:lex");

// Helper function to lex a start function call
function startFunction(token) {
  if (token.startsWith("(") && token.length > 1) {
    return ["(", token.slice(1)];
  }
  return [token];
}

// Helper function to lex a series of end function calls
function endFunction(tokens) {
  let nodes = [];
  tokens.forEach(token => {
    let splits = token.split(")").map(x => x || ")");

    if (!token.match(/[^)]/)) {
      // Special case. Token is entirely close parens with no other tokens.
      // The split will have an extra close paren item we need to omit.
      // ")" -> [")", ")"]
      // ")))" -> [")", ")", ")", ")"]
      splits = splits.slice(1);
    }
    // (Implied else)
    // Token has at least 1 non-close-paren char.
    // The split works correctly as is.
    // "42)" -> ["42", ")"]
    // "43)))" -> ["43", ")", ")" ,")"]
    // ")17" -> [")", "17"]

    nodes = nodes.concat(splits);
  });
  return nodes;
}

// Use this to debug the lex chain of map/filter calls as needed
// It has no effect on the code, only the side effect of printing
// intermediate values as they are processed by the chain
/*
function debugTap(value) {
  process.stdout.write(`before endFunction <${value}>\n`);
  return value;
}
*/

/**
 * Convert a string of chapped lisp source code to an array of tokens.
 *
 * It mostly deals with whitespace and parens vs other values
 *
 * ## Examples
 * - input: "(+ 3 4)"
 * - output: ["(", "+", "3", "4", ")"]
 * ----
 * - input:  (tag 11 (bag 21 22) 12)
 * - output: [ "(", "tag", "11", "(", "bag", "21", "22", ")", "12", ")" ]
 * @param {String} lisp The chapped lisp source code string
 * @return {String[]} Flat array of lexical tokens
 */
function lex(lisp) {
  const tokens = [];
  lisp
    .replace(/\s+/g, " ") // combine multiple consecutive white space chars
    .split(/\s/g) // split on whitespace
    .filter(x => x) // remove empty strings (were spaces before split)
    .map(startFunction) // break "(name" tokens into ["(", "name"]
    // .map(debugTap) // Use this for debugging intermediate values
    .map(endFunction) // break "4)))" into ["4", ")", ")", ")"]
    .forEach(subArray => {
      subArray.forEach(value => {
        // flatten into a single file array
        tokens.push(value);
      });
    });
  debug(`lisp:\n${lisp}\n----\ntokens:\n${tokens}`);
  return tokens;
}

module.exports = lex;
