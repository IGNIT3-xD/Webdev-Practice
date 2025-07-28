// Number and Object
let score = 100
let score_2 = new Number(200)

console.log(score)
console.log(score_2)

// Conversion
console.log(score_2.toString())

// Methods
let x = 4.8765555
console.log(x.toFixed(2))
console.log(score.toFixed(1))

let tk = 10000000
console.log(tk.toLocaleString())

// Maths
console.log(Math.abs(-5))
console.log(Math.PI.toFixed(4))
console.log(Math.round(499.5))
console.log(Math.ceil(99.2))
console.log(Math.floor(99.2))
console.log(Math.sqrt(25))
console.log(Math.random()) //Return the numbers between 0 to 1

console.log((Math.random() * 10) + 1)

let z = (Math.random() * 10) + 1
console.log(z, Math.round(p))

// Dice
let dice = Math.floor(Math.random() * 6) + 1
console.log(`Dice rolling...: ${dice}`)