// const num = [1, 2, 3, 4, 5, 99, 100, 33]

// const squre = num.map((x) => x * 2)
// console.log(squre)

// const isBig = num.map((x) => x > 50)
// console.log(isBig)

const goat = ["Pele", "Maradona", "Messi", "Ronaldo"]

const goats = goat.map((name, index) => {
    console.log(name, name[0], name.length, index);
    return name
})
console.log(goats)