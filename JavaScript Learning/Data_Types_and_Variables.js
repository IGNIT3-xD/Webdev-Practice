let x = 10;
let y = 7.77;
let z = 'Ignit3'
let n = null
let u;

console.log(x, y, z);
console.log(typeof x, typeof y, typeof z)
console.log(typeof n)
console.log(typeof u)

// Type Conversion
let num = 10
let stringNum = String(num)
console.log(typeof stringNum)

let bool = false
let newBool = Number(bool)
console.log(newBool, typeof newBool)

let num2 = 99.99
console.log(parseInt(num2))

// Concatenation Operator
let text1 = 'Johan'
let text2 = 'Kardshop'
// console.log(text1,text2);
console.log(text1 + " " + text2)

// == and === // != and !==
console.log(10 == 10)
console.log(10 == '10')      // It's only check the value
console.log(10 === '10')    // It's not only check the value but also data type of the variable

console.log(7 != '7')
console.log(7 !== '7')