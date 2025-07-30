let myArray = ['Pele', 'Maradona', 'Messi', 'Ronaldo', 'R9']

for (let i = 0; i < myArray.length; i++) {
    console.log(`Our no.${i} GOAT is : ${myArray[i]}`)
}

// Sum
let sum = 0

for (let i = 0; i <= 10; i++) {
    console.log(i)
    sum += i
}

console.log(`The Sum of  0 to 10 us = ${sum}`)

// Even and sum
let sum2 = 0
for (let i = 0; i <= 10; i++) {
    if (i % 2 != 0) {
        console.log(i)
        sum2 += i
    }
}
console.log(`Sum of odd no. is = ${sum2}`)

// For Of Loop //
for (const element of myArray) {
    console.log(element)
}

const name = 'Al Bukark Ibn Mussallam'
for (const letter of name) {
    console.log(`Letter : ${letter}`)
}

// Count A
let count = 0
for (let ltr of name) {
    if (ltr === 'a' || ltr === 'A')
        count++
}
console.log(`A or a has : ${count} times`)

// For In Loop //
for (const key in myArray) {
    console.log(key)    // It will print the indexes, if it's an array object
    console.log(myArray[key])
}

// For in loop In Object
const myObj = {
    name: 'Imran',
    age: '23',
    email: 'imran@gmail.com',
    address: 'Dhaka, Bangladesh'
}

for (const key in myObj) {
    console.log(`Key is - ${key} || value is - ${myObj[key]}`)
}