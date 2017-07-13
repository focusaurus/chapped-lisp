"use strict";

function add(...numbers) {
  return numbers.reduce((numberA, numberB) => numberA + numberB, 0);
}

exports.add = add;
exports["+"] = add;
