"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    name;
    age;
    address;
    constructor(name, age, address) {
        this.name = name;
        this.age = age;
        this.address = address;
    }
    info(id) {
        console.log(`Name: ${this.name}, Age: ${this.age}, Address: ${this.address.house}, ${this.address.zip}. And my Id: ${id}`);
    }
}
const user1 = new User("Ali", 25, { zip: 1234, house: "12/34 South City" });
user1.info(2046);
//# sourceMappingURL=Interheritence.js.map