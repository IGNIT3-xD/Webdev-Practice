let name = "Imran"
let ign = "Ignit3"
const age = 24

console.log(`My name is ${name}, my in game name is ${ign} and my age is ${age}`)

// String as an Object
let x = new String("Negggggaaaaa")
console.log(`${x} and the type is ${typeof x}`)

// Methods
const alphabets = 'ABCDEFGHIJKLMNOPqrstuvwzyz'
console.log(`Lenght is ${alphabets.length}`)
console.log(alphabets[0])
console.log(alphabets.at(25))
console.log(alphabets.charAt(2))
console.log(alphabets.indexOf('I'))
console.log(alphabets.toUpperCase())

let newAlpha = alphabets.slice(0, 9)    // Slice = Use index position
console.log(newAlpha)

let newAlpha_2 = alphabets.slice(9)
console.log(newAlpha_2)

let newAlpha_3 = alphabets.substring(0, 5)  // Substring = Use exect position
console.log(newAlpha_3)

let url = 'https://abcd%20ef.com'
console.log(url.replace('%20', '_'))
