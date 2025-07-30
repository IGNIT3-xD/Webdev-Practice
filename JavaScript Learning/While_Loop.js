// Odd
let i = 61

while (i <= 100) {
    if (i % 2 != 0) {
        console.log(i)
    }
    i++
}

// Sum of even
let sum = 0

let j = 1
while (j <= 10) {
    if (j % 2 == 0) {
        console.log(j)
        sum += j
        // console.log(`Sum of even no. is = ${sum}`)
    }
    j++
}
console.log(`Sum of even no. is = ${sum}`)

// Multiplication table
let x = 5

let k = 1
while (k <= 10) {
    console.log(`${x} x ${k} = ${x * k}`)
    k++
}

// Countdown
let l = 10
while (l >= 0) {
    console.log(l)
    l--
}