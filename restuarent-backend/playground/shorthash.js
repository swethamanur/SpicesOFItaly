//note: shorthash generates the same token value for the same value given any number of times; use another package like brcryptjs for unique tokens despite having repeated userids.

const sh = require('shorthash');

console.log(sh.unique('swetha'));
console.log(sh.unique('swetha'));