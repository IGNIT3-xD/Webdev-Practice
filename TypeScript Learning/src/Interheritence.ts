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

    info(id: number) {
        console.log(`Name: ${this.name}, Age: ${this.age}, Address: ${this.address.house}, ${this.address.zip}. And my Id: ${id}`);
    }
}

const user1 = new User("Ali", 25, { zip: 1234, house: "12/34 South City" })

user1.info(2046)