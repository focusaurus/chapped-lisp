"use strict";

function syntaxError(message) {
  return new Error(`Invalid syntax: ${message}`);
}

function parseScalar(scalarString) {
  // Only supports numbers currently, but in future could add booleans, strings
  const value = parseFloat(scalarString);
  return isNaN(value) ? scalarString : value;
}

// Parse is a recursive function to take a flat list of tokens and turn it
// into a nested syntax tree. The recursion is how the flat becomes nested.
function parse(tokens, depth = 0) {
  // input: ["(", "+", "0", "1", ")"]
  // output: ["+", "0", "1"]
  // input: ["(", "+", "0", "(", "-", "4", "3")")"]
  // output: ["+", "0", ["-", "4", "3"]]
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
