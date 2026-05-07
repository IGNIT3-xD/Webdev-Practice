type User = {
    id: number,
    name: string,
    age: number
}

const user: User = {
    id: 2046,
    name: 'Imran',
    age: 24
}

const getUser = <T, K extends keyof T>(info: T, key: K) => {
    return info[key];
}

console.log(getUser(user, "id"));
console.log(getUser(user, "name"));
console.log(getUser(user, "age"));