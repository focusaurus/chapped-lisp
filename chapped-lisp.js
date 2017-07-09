#!/usr/bin/env node
"use strict";
const debug = require("debug")("chapped-lisp");

// Helper function to lex a start function call
function startFunction(token) {
  if (token.startsWith("(")) {
    return ["(", token.slice(1)];
  }
  return [token];
}

// Helper function to lex a series of end function calls
function endFunction(tokens) {
  let nodes = [];
  tokens.forEach(token => {
    nodes = nodes.concat(token.split(")").map(x => x || ")"));
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
    .split(/\s/g) // split on whitespace
    .map(startFunction) // break "(name" tokens into ["(", "name"]
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

exports.lex = lex;

function syntaxError(message) {
  return new Error(`Invalid syntax: ${message}`);
}

// Parse is a recursive function to take a flat list of tokens and turn it
// into a nested syntax tree. The recursion is how the flat becomes nested.
function parseTokens(tokens, depth = 0) {
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
          nodes.push(parseTokens(tokens, depth + 1));
        }
        break;
      case ")":
        tokens.shift(); // consume the close paren, we're done
        return nodes;
      default:
        nodes.push(tokens.shift()); // consume the close paren, we're done
    }
  }
  throw syntaxError("missing closing paren");
}
exports.parseTokens = parseTokens;

function parse(chappedLispSource) {
  return parseTokens(lex(chappedLispSource));
}

// main exported API
exports.parse = parse;

/* istanbul ignore if */
if (require.main === module) {
  const tree = parse(process.argv[2]);
  console.log(JSON.stringify(tree, null, 2));
}
