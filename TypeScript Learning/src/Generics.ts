// const name: Array<string> = ['Mr X', 'Mr Y', 'Mr Z']

// const id: Array<number> = [12, 13, 34]

// const isEligible: Array<boolean> = [true, true, false]

// console.log(name, id, isEligible);

type GenericArray<value> = Array<value>

const name: GenericArray<string> = ['Mr X', 'Mr Y', 'Mr Z']
const id: GenericArray<number> = [12, 13, 34]
const isEligible: GenericArray<boolean> = [true, true, false]

console.log(name, id, isEligible);


// As simple as that. Work liek Dynamic
function identity<T>(value: T): T {
    return value;
}

console.log(typeof identity("Hello..."));
console.log(typeof identity(7));
console.log(typeof identity(true));

// Generics w Inteface
interface IApiRes<T> {
    success: boolean
    data: T
}

const res: IApiRes<string[]> = {
    success: true,
    data: ['Apple', "Banana", "Orange"]
}

console.log(res);