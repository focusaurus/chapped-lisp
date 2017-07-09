// (+ 3 4)
// (xxx start function
//  3 4 args
// ) end function call

function startFunction(token) {
  if (token.startsWith("(")) {
    return ["(", token.slice(1)];
  }
  return [token];
}

function endFunction(tokens) {
  let nodes = [];
  tokens.forEach(token => {
    nodes = nodes.concat(token.split(")").map(x => (x ? x : ")")));
  });

  return nodes;
}

function lex(lisp) {
  const tree = [];
  lisp.split(/\s/g).map(startFunction).map(endFunction).forEach(subArray => {
    subArray.forEach(value => {
      tree.push(value);
    });
  });
  return tree;
}

exports.lex = lex;

function syntaxError(message) {
  return new Error(`Invalid syntax: ${message}`);
}

function parse(tokens) {
  // input: ["(", "+", "0", "1", ")"]
  // output: ["+", "0", "1"]
  let nodes = [];
  for (var i = 1; i < tokens.length; i++) {
    const token = tokens[i];
    switch (token) {
      case "(":
        nodes.push(parse(tokens.slice(i)));
      case ")":
        return nodes;
      default:
        nodes.push(token);
    }
  }
  return nodes;
}
exports.parse = parse;

if (require.main === module) {
  const tokens = lex(process.argv[2]);
  console.log(JSON.stringify(tokens, null, 2));
  const tree = parse(tokens);
  console.log("----\n", JSON.stringify(tree, null, 2));
}
