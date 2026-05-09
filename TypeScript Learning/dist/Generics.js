"use strict";
// const name: Array<string> = ['Mr X', 'Mr Y', 'Mr Z']
Object.defineProperty(exports, "__esModule", { value: true });
const name = ['Mr X', 'Mr Y', 'Mr Z'];
const id = [12, 13, 34];
const isEligible = [true, true, false];
console.log(name, id, isEligible);
// As simple as that. Work liek Dynamic
function identity(value) {
    return value;
}
console.log(typeof identity("Hello..."));
console.log(typeof identity(7));
console.log(typeof identity(true));
const res = {
    success: true,
    data: ['Apple', "Banana", "Orange"]
};
console.log(res);
//# sourceMappingURL=Generics.js.map