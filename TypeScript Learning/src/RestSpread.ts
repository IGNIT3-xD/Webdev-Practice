// Spread
const friends: string[] = ['Rahim', 'Karim', 'Jose']
const bestFriends: string[] = ['Saleh', 'Ali']

// friends.push(bestFriends) // Throw an error [ 'Rahim', 'Karim', 'Jose', [ 'Saleh', 'Ali' ] ]
// console.log(friends);

friends.push(...bestFriends) // Didn't throw error
console.log(friends);

// Object
const user: {
    name: string,
    mobileNo: string
} = {
    name: 'Imran Ali',
    mobileNo: "01961698247"
}

const moreInfo: {
    age: number,
    hobby: string
} = {
    age: 24,
    hobby: 'Gaming'
}

const userInfo = { ...user, ...moreInfo }
console.log(userInfo);

// Rest
// Not good
const welcome = (user1: string, user2: string, user3: string) => {
    console.log(`Welcome ${user1}`);
    console.log(`Welcome ${user2}`);
    console.log(`Welcome ${user3}`);
}

welcome("Ali", "Jose", "Moh.")

// Instead use this
const welcome2 = (...users: string[]) => {
    users.forEach((user: string) => console.log(`Welcome To ${user}`))
}

welcome2("Pinku", "Jhinku", "Rinku", "Tinku")