# Chapped Lisp

## Overview

This is a basic lisp interpreter project done as part of an application to The Recurse Center.

## Gaping Holes

There is near-zero error handling of invalid syntax and zero code to generate helpful error messages so far. If you provide invalid lisp syntax, at the moment, **You're Gonna Have a Bad Time™**.

## CLI Usage

- `node ./code/cli.js '(+ 1 2)'`

## Usage from node.js code

```js
const chapped = require("chapped-lisp");
console.log(chapped("(+ 42 43)"));
```

## Command Line Usage

```
npm install chapped-lisp
npx chapped-lisp '(max 43 42)'
# prints 43
```

----
For npm prior to v5.2:

```
npm install chapped-lisp
$(npm bin)/chapped-lisp '(max 43 42)'
```

## Developer How To...

- Setup after clone
  - Install node.js
    - Use the version specified by the `.nvmrc` file
    - nvm recommended
  - `npm install`
- Run all tests: `npm test`
- Analyze code coverage: `npm run coverage`
- Run some tests: `tap code/cli-tap.js code/lex-tap.js`
- Run lint: `npm run lint`
- Run the main CLI: `node ./code/cli.js '(+ 1 2)'`
