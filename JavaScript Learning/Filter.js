const myNum = [9, 3, 5, 6, 1, 2]

const newNum = myNum.filter((num) => {
    return num > 2
})

console.log(newNum)

//
const userInfo = [
    { name: 'Imran', age: 23, birth: 2002, continent: 'South Asia' },
    { name: 'Jason', age: 25, birth: 2000, continent: 'Europe' },
    { name: 'Rakesh', age: 28, birth: 1996, continent: 'South Asia' },
    { name: 'Silva', age: 28, birth: 1996, continent: 'South America' },
    { name: 'Ricardo', age: 25, birth: 2000, continent: 'South America' },
    { name: 'Ali', age: 22, birth: 2003, continent: 'South Asia' }
]

let users = userInfo.filter((info) => info.age > 25)
console.log(users)

users = userInfo.filter((info) => { return info.birth < 2000 && info.continent === 'South Asia' })    // Either use {} and return or not
console.log(users)

let users2 = userInfo.filter((info) => info.continent === 'South America')
console.log(users2)