"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Funcion in object => method
const user = {
    name: 'User X',
    balance: 0,
    addBalance(value) {
        return this.balance += value;
    }
};
user.addBalance(600);
console.log(user);
//# sourceMappingURL=Function.js.map