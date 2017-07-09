// (+ 3 4)
// (xxx start function
//  3 4 args
// ) end function call

const tree = {nodes: []};

function syntaxError(message) {
  return new Error(`Invalid syntax: ${message}`);
}

function currentNode(tree) {
  return tree.nodes[tree.nodes.length - 1];
}

function argument(tree, char) {
  const node = currentNode(tree);
  let arg = node.args[node.args.length - 1];
  if (!arg) {
    arg = {value: "", type: "number"};
    node.args.push(arg);
  }
  switch (char) {
    case " ":
      if (!arg.value) {
        throw syntaxError("expecting argument value");
      }
      return argument
    case ")":
      if (!arg.value) {
        throw syntaxError("expecting argument");
      }
      if (!node.args.length) {
        throw syntaxError("expecting argument, found close function");
      }
    case "(":
      return openFunction(tree, char);
    case " ":
      break;
    default:
  }
  // arg.value += char;
  // return argument;
}

function functionName(tree, char) {
  const node = currentNode(tree);
  if ([" ", ")"].includes(char)) {
    if (!node.name.length) {
      throw syntaxError("expecting function name");
    }
    return argument;
  }
  tree.nodes[tree.nodes.length - 1].name += char;
  return functionName;
}

function openFunction(tree, char) {
  if (char !== "(") {
    throw new Error("Invalid syntax: expecting open function '('");
  }
  tree.nodes.push({type: "function", name: "", args: []});
  return functionName;
}

if (require.main === module) {
  let next = openFunction;
  for (let char of process.argv[2]) {
    console.log("char: ", char); // fixme
    try {
      next = next(tree, char);
    } catch (error) {
      console.error(error);
    }
  }
  console.log(JSON.stringify(tree, null, 2));
}
