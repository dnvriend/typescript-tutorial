// for a quick overview, if you come from eg. Scala 
// then the following will be obvious

// the 'var' of Typescript is 'let'
let x = 1
x = 2

// the 'val' of Typescript is 'const'
const y = 1
//y = 2 // doesn't compile

const xs = Array(1, 2, 3, 4, 5)
// folding structure
const z = xs.reduce((c, e) => c + e)
console.log("z: ", z)
// iterating the structure
//xs.forEach(e => console.log(e))
const ys = xs.map(e => e.toString(2)) // create base-2 string
console.log("ys: ", ys)

// declare a type
interface Person { 
    name: string;
    age: number;
} 
// and a function
const printPerson = (p: Person) => {
    console.log("Person", p)
}
// this just doesn't get old
printPerson({name: "dennis", age: 42})

// union types
interface Cat { 
    name: string
}
interface Dog {
    name: string
    age: number;
}

const printPet = (pet: Cat | Dog) => {
    console.log("Pet: ", pet.name)
}

printPet({name: "the-cat"})

import {Option, Some, None} from "space-lift"

const maybePet: Option<Dog> = Option({name: "woof", age: 6})
maybePet.forEach(pet => console.log("Pet: ", pet))

// explore the nodejs library
let helloBytes = Buffer.from('Hello World', 'UTF-8')
let helloAsHex: string = helloBytes.toString('hex')
let helloBytesFromHex = Buffer.from(helloAsHex, 'hex')
let helloAsBase64: string = helloBytes.toString('base64')
let helloBytesFromBase64 = Buffer.from(helloAsBase64, 'base64')
console.log("Hello as hex: ", helloAsHex)
console.log("Hello from hex: ", helloBytesFromHex.toString('utf-8'))
console.log("Hello as base64: ", helloAsBase64)
console.log("Hello from base64: ", helloBytesFromBase64.toString('utf-8'))

// compress and decompress
import zlib = require('zlib');
        
const compressed = zlib.gzipSync(helloBytes)
const decompressed = zlib.unzipSync(compressed)
console.log("decompressed: ", decompressed.toString('utf-8'))

// digests md5, sha-256 and sha-512
import crypto = require('crypto');

const calcDigest = (algorithm: string, bytes: Buffer) => {
    const hash = crypto.createHash(algorithm)
    hash.update(bytes)
    return hash.digest('hex')
}
Array('md5', 'sha256', 'sha512')
    .map(algo => [algo, calcDigest(algo, helloBytes)])
    .forEach(pair => console.log(`algo: ${pair[0]}, digest: ${pair[1]}`))

// utils
import util = require("util")

// see: https://nodejs.org/dist/latest-v8.x/docs/api/util.html#util_util_format_format_args
// printf-like format string
console.log("printf formatted: ", util.format('%s:%s', 'foo', 'bar'))

// Files
import {Result, Ok, Err} from "space-lift"
import fs = require('fs');

const writeFile = (file: string) => {
    try {
        fs.writeFileSync(file, "Hello World")
        return Ok(file)
    } catch(err) {
        return Err(err)
    }    
}

const readFile = (file: string) => {
    try {
        return Ok(fs.readFileSync(file).toString('utf-8'))
    } catch(err) {
        return Err(err)
    }
}

const file = '/tmp/test.txt'
const result = writeFile(file)
console.log("result: ", readFile(file))

// snappy codec
import snappy = require("snappy")
const compressedSnappy = snappy.compressSync(helloBytes)
const decompressedSnappy = snappy.uncompressSync(compressedSnappy)
console.log("snappy decompressed: ", decompressedSnappy.toString('utf-8'))

// avro codec
import avro = require("avro-js")
const v1Schema = avro.parse({
    "type" : "record",
    "name" : "Person",
    "namespace" : "com.github.dnvriend",
    "fields" : [ {
      "name" : "name",
      "type" : "string",
      "default" : ""
    } ]
  });

const v1Hex: string = "0C44656E6E6973"
const v1Bytes: Buffer = Buffer.from(v1Hex, 'hex')
const obj = v1Schema.fromBuffer(v1Bytes);
console.log("fingerprint: ", v1Schema.getFingerprint('sha256').toString('hex'))
console.log(obj)

// conclusion: Typescript and node seems quite capable :)


