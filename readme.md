# Typescript Tutorial
A small tutorial on Typescript

## Introduction
[Typescript](https://www.typescriptlang.org/) a typed superset of JavaScript, that must be compiled to JavaScript, [Node.js](https://nodejs.org/en/) or shorter node, is a JavaScript runtime and [npm](https://www.npmjs.com/), the package manager for Node.js are a great triad to create great applications for example AWS Lambda applications.

Your to JavaScript compiled Typescript code will most probably be executed by node and probably by version 8.7.0 of node. Node has [very good documentation]( https://nodejs.org/dist/latest-v8.x/docs/api/) that you must take a look at. When you create AWS Lambda code your code will be run by node.

Because your code will be run by node, you have the following [global objects](https://nodejs.org/dist/latest-v8.x/docs/api/globals.html) in scope anywhere in your code:

- [console](https://nodejs.org/dist/latest-v8.x/docs/api/console.html): A global `console` instance configured to write to `process.stdout` and `process.stderr` with methods such as `console.log()`, `console.error()` and `console.warn()`
- [process](https://nodejs.org/dist/latest-v8.x/docs/api/process.html): A global `process` instance that provides information about, and control over, the current node process. You can use `process` for example to get access to the [user environment](https://nodejs.org/dist/latest-v8.x/docs/api/process.html#process_process_env), which is handy when you configure your AWS Lambdas with properties. If you need to set your DynamoDB tableName with the property `tableName=MyTableName` in your Lambda configuration, you can access the value with `process.env.tableName` which is handy!
- [require](https://nodejs.org/dist/latest-v8.x/docs/api/modules.html): Loads a node module. In node, each file is treated as a separate module. So `let http = require('http')` loads a module, which resolves to a file, using a strategy that is described [here](https://nodejs.org/dist/latest-v8.x/docs/api/modules.html#modules_all_together). The TD;DR is that `require(<module_name>)` looks in several places on your system to resolve a file and its dependencies. When successful, you get a reference to the module and can start coding.

## Resources
- Typescript: https://www.typescriptlang.org/
- NodeJs: https://nodejs.org/en/
- Npm: https://www.npmjs.com/
- https://basarat.gitbooks.io/typescript/docs/quick/nodejs.html
- https://www.twilio.com/blog/2017/08/http-requests-in-node-js.html