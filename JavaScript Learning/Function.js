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
function toCelcius(fahrenheit) {
    return (5 / 9) * (fahrenheit - 32)
}

let x = toCelcius(77)
console.log('The Celcius is: ', x)

//Nan
x = toCelcius()
console.log('The Celcius is: ', x);