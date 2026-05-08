type Address = {
    zip: number,
    house: string
}

class User {
    name: string;
    age: number;
    address: Address;

    constructor(name: string, age: number, address: Address) {
        this.name = name
        this.age = age
        this.address = address
    }

    info() {
        console.log(`Name: ${this.name}, Age: ${this.age}, Address: ${this.address.house}, ${this.address.zip}`);
    }
}

const user1 = new User("Ali", 25, { zip: 1234, house: "12/34 South City" })
// console.log(user1);
// console.log(user1.address.house);

const user2 = new User("Hasan", 30, { zip: 1400, house: "North City" })
// console.log(user2);

user1.info()
user2.info()