#!/usr/bin/env node
"use strict";

const chapped = require("./index");

const tree = chapped(process.argv[2]);
console.log(JSON.stringify(tree, null, 2));
