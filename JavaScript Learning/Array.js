const myArray = [1, 2, 3, 4, 5]
console.log(myArray)
console.log(myArray[0])

// Methods
myArray.push(6)
console.log(myArray)

myArray.pop()
console.log(myArray)

myArray.unshift(99)
console.log(myArray)

myArray.shift()
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
console.log("Now Original : ", myArray2)    //It manipulates the original array

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