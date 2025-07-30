const user01 = {
    name: "Ignite",
    age: 23,
    address: "North Dakota, Usa",
    isLoggedIn: true,
    weekEnds: ['Saturday', 'Sunday']
}

console.log(user01.name)    // 2 ways to print an object
console.log(user01["age"])
console.log(user01['weekEnds'])

// Add properties in object
user01.email = 'abcd@mail.com'
console.log(user01.email)

// Change properties in object
user01.isLoggedIn = false
console.log(user01.isLoggedIn)

// Freeze the object (Can't able to change the properties)
Object.freeze(user01)
user01.age = 99
console.log(user01.age)

// Function in objects
const user02 = {
    name: 'ABCD',
    age: 26
}

user02.greeting = function () {
    console.log('Hello.......')
}

console.log(user02.greeting)
console.log(user02.greeting())

// This
user02.greeting2 = function () {
    console.log(`Hello Mr. ${this.name}`)
}
console.log(user02.greeting2())

// Function in object v2
const user03 = {
    firstName: 'Imran',
    lastName: 'Ali',
    fullName: function () {
        return this.firstName + " " + this.lastName
    }
}
console.log(user03.fullName())

// Assign
const obj1 = { 1: 'A', 2: 'B', 3: 'C' }
const obj2 = { 4: 'D', 5: 'E' }
// const obj3 = Object.assign({}, obj1, obj2)
// console.log(obj3)

// Another methods
const obj4 = {...obj1, ...obj2}
console.log(obj4)

// Values and Keys
const vlu = Object.values(user01)
console.log(vlu)

console.log(Object.keys(user02))

// Has property
const x = user01.hasOwnProperty('age')
console.log(x)
console.log(user02.hasOwnProperty('address'))