
//Import the entire module into a single variable, 
// and use it to access the module exports
import * as allExportsFromMyFirstModuleInThisVariable from "./MyFirstModule"

// or 

import { x } from "./MyFirstModule"

// we can use the imports like this

console.log('main.ts: ', x)
console.log('main.ts: ', allExportsFromMyFirstModuleInThisVariable.x)
