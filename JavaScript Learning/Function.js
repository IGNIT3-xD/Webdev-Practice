function addNum(num1, num2) {
    console.log(num1 + num2)
}

let result = addNum(10 + '10')
console.log("Result : ", result)

// ****** //
function addNum2(n1, n2) {
    return n1 + n2;
}

let r = addNum2(5, '9')
console.log("Result: ", r)

// ******* // 
function myFunction(n) {
    console.log(n)
}

let n = 10
myFunction(n)

// ******* //
function addition(x, y) {
    return x + y
}

console.log("The result is: " + addition(99, 1))

// ******* //
function toCelsius(fahrenheit) {
    return (5 / 9) * (fahrenheit - 32)
}

let x = toCelsius(77)
console.log('The Celsius is: ', x)

//Nan
x = toCelsius()
console.log('The Celsius is: ', x);

// Rest
function calculatePrice(...calNum) {
    return calNum
}

console.log(calculatePrice(10, 20, 40, 100,))

// ****** //
const myArray = [10, 20, 30, 40, 50]

function returnArray(getArray){
    return getArray[0]
}

console.log(returnArray(myArray))