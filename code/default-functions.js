"use strict";

function add(...numbers) {
  return numbers.reduce((subTotal, value) => subTotal + value, 0);
}

exports.add = add;
exports["+"] = add;

function subtract(...numbers) {
  if (numbers.length < 2) {
    // edge case, just do a sign swap
    return -numbers[0];
  }
  // base case: start with the first value and reduce the rest
  return numbers.slice(1).reduce((sub, value) => sub - value, numbers[0]);
}
exports.subtract = subtract;
exports["-"] = subtract;
