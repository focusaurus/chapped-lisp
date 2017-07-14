"use strict";
const childProcess = require("child_process");
const getStream = require("get-stream");
const tap = require("tap");

const cliPath = __filename.replace("-tap", "");

tap.test("CLI integration test base case", test => {
  const child = childProcess.spawn("node", [cliPath, "(+ 1 (+ 7 23))"]);
  let exited = false;
  let ended = false;
  function done() {
    if (exited && ended) {
      test.end();
    }
  }
  child.on("exit", code => {
    tap.match(code, 0, "should exit zero success");
    exited = true;
    done();
  });
  getStream(child.stdout)
    .then(out => {
      ended = true;
      tap.match(out, "31");
      done();
    })
    .catch(error => {
      ended = true;
      tap.error(error);
      done();
    });
});
