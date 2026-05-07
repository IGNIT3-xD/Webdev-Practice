/*Imagine you have a magic toy box.
But this toy box has a rule:
“Only cars can go inside.”
That rule is called a constraint.*/

function echo<T>(item: T): T {
    return item;
}

// Error: beacuse T is a number and number doesn't have length properties
const exmaple = echo(6)
console.log(exmaple.length);

// So, we need to set the rules, that only properies with length can go !!!
function getName<T extends { length: number }>(value: T) {
    return value;
}

const name = getName("Imran")
console.log(name.length);

// Another one - Only objects with a name can enter:
function sayHello<T extends { name: string }>(person: T) {
    console.log("Hello", person.name);
}

sayHello({ name: "Imran" })

// W Interface
interface IBounderies {
    name: string
    age: number
}

function info<T extends IBounderies>(info: T) {
    console.log(`Hi ${info.name}.\nSo, you're ${info.age}`)
}

info({name: "Mr. Ignite", age: 24})