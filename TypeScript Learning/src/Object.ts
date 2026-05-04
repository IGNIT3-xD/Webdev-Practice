const user: {
    firstName: string,
    middleName?: string, // Optional type
    lastName: string
    isMarried: boolean,
    work: string,
    pi: 3.1416, // Value as type / Literal type
    readonly favoriteTeam: 'Brazil'
} = {
    firstName: 'Moh.',
    // middleName: 'Iman',
    lastName: 'Ali',
    isMarried: false,
    work: 'Student',
    pi: 3.1416,
    favoriteTeam: 'Brazil'
}

console.log(user)
user.work = "Web Developer"
console.log(user)