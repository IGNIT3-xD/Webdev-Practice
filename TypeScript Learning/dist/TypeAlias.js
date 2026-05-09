"use strict";
// const user1: {
//     id: number,
//     name: {
//         firstName: string,
//         lastName: string,
//     };
//     gender: 'Male' | 'Female',
//     ContactNo: string,
//     address: {
//         division: string,
//         zip: number,
//         city: string,
//     }
Object.defineProperty(exports, "__esModule", { value: true });
const user1 = {
    id: 261329,
    name: {
        firstName: 'Mr.',
        lastName: 'X'
    },
    gender: 'Male',
    ContactNo: "019112221356",
    address: {
        division: "Unknown",
        zip: 1313,
        city: "Dhaka",
    }
};
const user2 = {
    id: 256129,
    name: {
        firstName: 'Mr.',
        lastName: 'Y'
    },
    gender: 'Female',
    ContactNo: "016112221356",
    address: {
        division: "N.Ganj",
        zip: 1421,
        city: "Dhaka",
    }
};
console.log(user1);
console.log(user2);
const add = (num1, num2) => num1 + num2;
console.log(add(10, 20));
//# sourceMappingURL=TypeAlias.js.map