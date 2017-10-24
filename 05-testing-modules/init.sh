#!/bin/bash
npm init -y
npm install @types/node space-lift http chai mocha ts-node nodemon @types/chai @types/mocha uuid --save-dev
tsc --init --target es2015 --module commonjs --lib es5 es5.promise --rootDir './src' --moduleResolution node --noImplicitAny --strictNullChecks --allowJs --experimentalDecorators 
mkdir -p src/main
mkdir -p src/test