"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Spread
const friends = ['Rahim', 'Karim', 'Jose'];
const bestFriends = ['Saleh', 'Ali'];
// friends.push(bestFriends) // Throw an error [ 'Rahim', 'Karim', 'Jose', [ 'Saleh', 'Ali' ] ]
// console.log(friends);
friends.push(...bestFriends); // Didn't throw error
console.log(friends);
// Object
const user = {
    name: 'Imran Ali',
    mobileNo: "01961698247"
};
const moreInfo = {
    age: 24,
    hobby: 'Gaming'
};
const userInfo = { ...user, ...moreInfo };
console.log(userInfo);
// Rest
// Not good
const welcome = (user1, user2, user3) => {
    console.log(`Welcome ${user1}`);
    console.log(`Welcome ${user2}`);
    console.log(`Welcome ${user3}`);
};
welcome("Ali", "Jose", "Moh.");
// Instead use this
const welcome2 = (...users) => {
    users.forEach((user) => console.log(`Welcome To ${user}`));
};
welcome2("Pinku", "Jhinku", "Rinku", "Tinku");
//# sourceMappingURL=RestSpread.js.map