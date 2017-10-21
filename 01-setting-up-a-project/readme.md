# Setting up a project
We will look at setting up a project. We need `npm`, the [node package manager](https://en.wikipedia.org/wiki/Npm_(software)), and can be installed with `brew install npm`. After we have installed npm, create a directory and then:

- `npm init -y`: Initializes npm, it creates the `package.json` file,
- `npm install -g typescript`: Installs Typescript globally so its accessible from anywhere,
- `npm install typescript --save-dev`: Installs the Typescript types to the development dependencies,
- `npm install @types/node --save-dev`: Installs the Node.js types to the development dependencies,
- `npm install space-lift --save`: Installs the [space-lift](https://www.npmjs.com/package/space-lift) library to the `production` dependencies,
- `tsc --init`: Initializes typescript, it creates the `tsconfig.json` file,

## Edit tsconfig.json
Edit the `tsconfig.json` file:

```
{
  "target": "es2015",
  "compilerOptions": {
    "experimentalDecorators": true,
    "moduleResolution": "node",
    "sourceMap": false,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "allowJs": true,
    "target": "es5",
    "module": "commonjs",
    "lib": [
      "es5",
      "es2015.promise"
    ]
  },
  "exclude": [
    ".vscode",
    ".git"
  ],
  "rootDir": "./src"
}
```

## Source location
Make a directory `src` and put typescript files there.

## Adding node-ts and nodemon
The package [node-ts](https://www.npmjs.com/package/ts-node) is a TypeScript execution environment and REPL for node and [nodemon](https://www.npmjs.com/package/nodemon) , which is used during development of a node.js based application like the one we are creating here, will watch the files in the directory in which nodemon was started, and if any files change, nodemon will automatically restart your node application.

Lets install them:

- `npm install ts-node --save-dev`: 
- `npm install nodemon --save-dev`: 

## Adding a scripts configuration
We must now replace the `scripts` property in `package.json` like this one:

```
{
  "name": "01-setting-up-a-project",
  "version": "1.0.0",
  "description": "We will look at setting up a project. We need `npm`, the [node package manager](https://en.wikipedia.org/wiki/Npm_(software)), and can be installed with `brew install npm`. After we have installed npm, create a directory and then:",
  "main": "index.js",
  "scripts": {
    "start": "npm run build:live",
    "build:live": "nodemon --exec ./node_modules/.bin/ts-node -- ./src/main.ts"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@types/node": "^8.0.46",
    "nodemon": "^1.12.1",
    "ts-node": "^3.3.0",
    "typescript": "^2.5.3"
  },
  "dependencies": {
    "space-lift": "^0.6.0"
  }
}
```

## Creating the main.ts

## Launch the application
You can launch the project with the command `npm start` that will monitor changes to the directory and recompile/restart the application.