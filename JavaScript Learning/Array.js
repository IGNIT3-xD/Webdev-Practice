const myArray = [1, 2, 3, 4, 5]
console.log(myArray)
console.log(myArray[0])

const fruits = ['Apple', 'Watermalon', 'Mango', 'Guava', 'Orange']
console.log(fruits[3])

fruits[3] = 'Jambura'
console.log(fruits[3])

console.log(fruits[fruits.length - 1])

// Methods
myArray.push(6)            // Add element in the last
console.log(myArray)

myArray.pop()
console.log(myArray)       // Remove the last element

myArray.unshift(99)        // Add element in the first
console.log(myArray)

myArray.shift()            // Remove the first element
console.log(myArray)

console.log(myArray.includes(9))
console.log(myArray.indexOf(5))

const newArray = myArray.join() //Convert an array to string
console.log(`${newArray} and the type of this array is: ${typeof newArray}`)

// Slice and Splice
const myArray2 = [0, 1, 2, 3, 4, 5, 6]
console.log("Original: ", myArray2)


console.log("Slice : ", myArray2.slice(2, 4))
console.log("Now Original : ", myArray2)

console.log("Splice : ", myArray2.splice(2, 4))
console.log("Now Original : ", myArray2)    // It manipulates the original array

// Spread
const rival = ['Barcelona', 'Atletico', 'Man City', 'Inter Miami']
const allay = ['Real Madrid', 'Liverpool', 'Man Utd', 'Santos']

console.log(rival)
console.log(allay)

const notEnemies = [...rival, ...allay]
console.log(notEnemies)

// Make an element to an array
const name = "IGNIT3"
console.log(Array.isArray(name))
console.log(Array.from(name))

console.log(name.length)

// Sum of an array
const myArray3 = [1, 2, 3, 4, 5]
let sum = 0

for(let i = 0; i < myArray3.length; i++){
    console.log(myArray3[i])
    sum += myArray3[i]
}
console.log(`Sum of the array is = ${sum}`)