"use strict";

function syntaxError(message) {
  return new Error(`Invalid syntax: ${message}`);
}

function parseScalar(scalarString) {
  // Only supports numbers currently,
  // but in future could add booleans and strings
  const value = parseFloat(scalarString);
  return isNaN(value) ? scalarString : value;
}

/**
 * Convert a flast list of syntax tokens to a nested abstract syntax tree (AST).
 *
 * The AST is modeled as nested arrays.
 * This function transforms flat to nested by way of recursion.
 *
 * ## Samples
 * - input: ["(", "+", "0", "1", ")"]
 * - output: ["+", 0, 1]
 * ----
 * - input: ["(", "+", "0", "(", "-", "4", "3")")"]
 * - output: ["+", 0, ["-", 4, 3]]
 *
 * @param {String[]} tokens Chapped Lisp language tokens from the lexer
 *
 * @return {Array[]} AST. Example: ["+", "0", "1"]
 */
function parse(tokens, depth = 0) {

  const nodes = [];
  while (tokens.length) {
    switch (tokens[0]) {
      case "(":
        if (!nodes.length) {
          // first open paren, start an array
          tokens.shift(); // consume the open paren
        } else {
          // nested expression, leave the open paren there and recur
          nodes.push(parse(tokens, depth + 1));
        }
        break;
      case ")":
        tokens.shift(); // consume the close paren, we're done
        return nodes;
      default: {
        const token = tokens.shift();
        nodes.push(parseScalar(token));
      }
    }
  }
  throw syntaxError("missing closing paren");
}

module.exports = parse;
