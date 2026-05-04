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

// } = {
//     id: 261228,
//     name: {
//         firstName: 'Moh',
//         lastName: 'Ali'
//     },
//     gender: 'Male',
//     ContactNo: "01911111111",
//     address: {
//         division: "Narayanganj",
//         zip: 1242,
//         city: "Dhaka",
//     }
// }

// const user2: {
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

// } = {
//     id: 261329,
//     name: {
//         firstName: 'Mr.',
//         lastName: 'X'
//     },
//     gender: 'Male',
//     ContactNo: "019112221356",
//     address: {
//         division: "Unknown",
//         zip: 1313,
//         city: "Dhaka",
//     }
// }

// console.log(user1);
// console.log(user2);

// Both obj type are same so we should not repeat instead use Type Alias
type User = {
    id: number,
    name: {
        firstName: string,
        lastName: string,
    };
    gender: 'Male' | 'Female',
    ContactNo: string,
    address: {
        division: string,
        zip: number,
        city: string,
    }
}

const user1: User = {
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
}

const user2: User = {
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
}

console.log(user1);
console.log(user2);

type addNum = (num1: number, num2: number) => number;
const add: addNum = (num1, num2) => num1 + num2;

console.log(add(10, 20));