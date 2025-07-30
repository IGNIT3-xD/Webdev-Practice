// Break //
for (let i = 1; i <= 10; i++) {
    if (i > 7) {
        console.log("Thala for a reason")
        break
    }
    console.log(i)
}

// Sum untill it will be 100 or exceeds
let i = 1
let sum = 0
while (i <= 100) {
    sum = sum + i

    if (sum >= 100) {
        break
    }

    console.log(`Itertion ${i}, Sum is = ${sum}`)
    i++
}

// Continue //

for(let k = 1; k <= 50; k++){
    if(k %2 != 0)
    {
        continue
    }
    console.log(k)
}