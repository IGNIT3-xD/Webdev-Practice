"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user = {
    id: 2046,
    name: 'Imran',
    age: 24
};
const getUser = (info, key) => {
    return info[key];
};
console.log(getUser(user, "id"));
console.log(getUser(user, "name"));
console.log(getUser(user, "age"));
//# sourceMappingURL=KeyOfConstraints.js.map