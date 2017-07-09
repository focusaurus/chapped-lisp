# Chapped Lisp

## Overview

This is a basic lisp interpreter project done as part of an application to The Recurse Center.

## CLI Usage

- `node ./code/cli.js '(+ 1 2)'`

## Usage from node.js code

```js
const chapped = require("chapped-lisp");
console.log(chapped("(+ 42 43)"));
```

## Developer How To...

- Setup after clone
  - Install node.js
    - Use the version specified by the `.nvmrc` file
    - nvm recommended
  - `npm install`
- Run all tests: `npm test`
- Run some tests: `tap code/cli-tap.js code/lex-tap.js`
- Run lint: `npm run lint`
- Run the main CLI: `node ./code/cli.js '(+ 1 2)'`
