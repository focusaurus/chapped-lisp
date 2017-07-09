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

/**
 * Convert a string of chapped lisp source code to an array of tokens.
 *
 * Lex takes a string of chapped lisp source code
 * and converts it into an array of tokens
 * It mostly deals with whitespace and parens vs other values
 *
 * Given "(+ 3 4)"
 * We get ["(", "+", "3", "4", ")"] as the output token list
 * Given (tag 11 (bag 21 22) 12)
 * we get [ "(", "tag", "11", "(", "bag", "21", "22", ")", "12", ")" ]
*/
function lex(lisp) {
  const tokens = [];
  lisp
    .replace(/\s+/g, " ") // combine multiple consecutive white space chars
    .split(/\s/g) // split on whitespace
    .filter(x => x) // remove empty strings (were spaces before split)
    .map(startFunction) // break "(name" tokens into ["(", "name"]
    // .map(x => {
    //   // process.stdout.write("before endFunction <" + x + ">\n");
    //   return x;
    // })
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
