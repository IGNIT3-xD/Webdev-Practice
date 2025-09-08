const person = {
    name: "Al Bukark",
    age: "23",
    address: "Dhaka,Bangladesh",
    device: ["Laptop", "Mobile", "Tv"]
}
console.log(person, typeof person)

const convert = JSON.stringify(person)
console.log(convert, typeof convert)

const convert_2 = JSON.parse(convert)
console.log(convert_2, typeof convert_2)