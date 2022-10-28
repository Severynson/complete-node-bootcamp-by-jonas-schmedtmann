// console.log(arguments);

// moule.exports
const C = require("./test-modules-1");
const calc1 = new C();
console.log(calc1.add(2, 5));

// exports
const calc2 = require("./test-modules-2");
console.log(calc2.add(2, 5));

// or new one sintaxis

const { add } = require("./test-modules-2");
console.log(add(2, 5));

// caching
require("./test-modules-3")();
require("./test-modules-3")();
require("./test-modules-3")();
