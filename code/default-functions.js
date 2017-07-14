"use strict";

function add(...numbers) {
  return numbers.reduce((subTotal, value) => subTotal + value, 0);
}

exports.add = add;
exports["+"] = add;
