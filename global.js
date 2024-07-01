const { info, log } = require("./commonjs_module");
// import { info, log } from './es_module.mjs';

global.foo = 15;
// console.log(global.foo);

console.log(`Argumentele linie de comanda: ${process.argv}`);
// process.argv.forEach(arg => console.log(arg.toUpperCase()));
console.log(process.argv[2] + process.argv[3]);
console.log(`Directorul curent: ${process.cwd()}`);
console.log(`Calea scriptului: ${__filename}`);
console.log(`Directorul scriptului: ${__dirname}`);

process.nextTick(() => {
  console.log("NextTick callback");
});

process.chdir("..");
console.log(`Directorul curent: ${process.cwd()}`);
console.log(`Directorul scriptului: ${__dirname}`);

info("Information");
log("Log message");

// process.exit(0);