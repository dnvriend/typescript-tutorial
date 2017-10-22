## Typescript and Modules
Typescript shares the concept of ['Modules'](https://www.typescriptlang.org/docs/handbook/modules.html) from [ECMAScript 2015](https://www.ecma-international.org/ecma-262/6.0/). 

Modules are executed within their own scope, not in the global scope; this means that variables, functions, classes, etc. declared in a module are not visible outside the module unless they are explicitly exported using one of the [export forms](https://www.typescriptlang.org/docs/handbook/modules.html#export). Conversely, to consume a variable, function, class, interface, etc. exported from a different module, it has to be imported using one of the [import forms](https://www.typescriptlang.org/docs/handbook/modules.html#import).

Modules are declarative; the relationships between modules are specified in terms of imports and exports at the file level.

Modules import one another using a module loader. At runtime the module loader is responsible for locating and executing all dependencies of a module before executing it. Well-known modules loaders used in JavaScript are the [CommonJS](https://en.wikipedia.org/wiki/CommonJS) module loader for node and [require.js](http://requirejs.org/) for Web applications. CommonJS is a project with the goal of specifying an ecosystem for JavaScript outside the browser. Require.js is a project for asynchronous loading of modules for browsers.

TL;DR: In TypeScript, just as in ECMAScript 2015, any file containing a top-level import or export is considered a module.

## Modules
A file is considered a module, if it exports and/or imports other modules. The following code does neither and thus is no module. The file `ThisIsNotAModule.ts` is a unit of code as far as Typescript is concerned. The code can be compiled and run  but the variables `x` cannot be imported by another module to be used.

```
let x = 42
console.log(x)
``` 

Lets create a module:

The file `MyFirstModule.ts` is a module because it exports the variable x, and it can be imported in main.ts:

```
// MyFirstModule.ts
export let x = 42
console.log('MyFirstModule: ', x)

// main.ts
import * as allExportsFromMyFirstModuleInThisVariable from "./MyFirstModule"
import { x } from "./MyFirstModule"

console.log('main.ts: ', x)
console.log('main.ts: ', allExportsFromMyFirstModuleInThisVariable.x)

// console output
MyFirstModule:  42
main.ts:  42
main.ts:  42
```

When we look at the console output, something interesting is happening. `MyFirstModule` is loaded and therefor the code is being executed and that writes a line to the console. This is called a 'side-effect' and something that must be avoided when creating modules. The main code imports all exports in a variable `allExportsFromMyFirstModuleInThisVariable`, and we can access the value 'x' from there, or import 'x' specifically.

We can export any declaration so a variable, function, class, type alias, or interface and import it in another module. For more information, read the excellent explanation from the [Typescript Website about Typescript Modules](https://www.typescriptlang.org/docs/handbook/modules.html).

## Import forms
Typescript has the following import forms:

```
// a single import
import { ZipCodeValidator } from "./ZipCodeValidator";

// rename an import
import { ZipCodeValidator as ZCV } from "./ZipCodeValidator";

// import an entire module into a single variable
import * as validator from "./ZipCodeValidator";

// execute a module only for its side-effect
import "./my-module.js";

// a module with a default export; which is loaded in the variable
import validate from "./StaticZipCodeValidator";
```

## Default Exports
Each module can optionally export a `default` export. Default exports are marked with the keyword `default`; and there can only be one `default` export per module. `default` exports are imported using a different import form.

```
// example; StaticZipCodeValidator.ts with default export
export default function (s: string) {
    return s.length === 5 && /^[0-9]+$/.test(s);
}
// when a module declares a default export 
// then you can use the following form:
import validate from "./StaticZipCodeValidator";
// the function from 'StaticZipCodeValidator' is loaded into 'validate'
validate("hello")
```

## Export Objects
Both CommonJS and AMD generally have the concept of an exports object which contains all exports from a module.

They also support replacing the exports object with a custom single object. Default exports are meant to act as a replacement for this behavior; however, the two are incompatible. TypeScript supports `export =` to model the traditional CommonJS and AMD workflow.

The `export =` syntax specifies a single object that is exported from the module. This can be a class, interface, namespace, function, or enum.

When importing a module using `export =`, TypeScript-specific `import module = require("module")` must be used to import the module.

```
// example; StaticZipCodeValidator.ts with default export
export = function (s: string) {
    return s.length === 5 && /^[0-9]+$/.test(s);
}
// when a module declares a default export 
// then you can use the following form:
import validate = require("./ZipCodeValidator");
// the function from 'StaticZipCodeValidator' is loaded into 'validate'
validate("hello")
```

## Working with Other JavaScript Libraries
To describe the shape of libraries not written in TypeScript, we need to declare the API that the library exposes. These declarations are defined in `.d.ts` files. In these so called 'ambient modules' we declare the API that the modules we refer to expose. These modules will be available to a later import:

Contents of: `node.d.ts`
```
declare module "url" {
    export interface Url {
        protocol?: string;
        hostname?: string;
        pathname?: string;
    }

    export function parse(urlStr: string, parseQueryString?, slashesDenoteHost?): Url;
}
```

In our 'main.ts' we can write the following:

```
/// <reference path="node.d.ts"/>
import * as URL from "url";
let myUrl = URL.parse("http://www.typescriptlang.org");
```

