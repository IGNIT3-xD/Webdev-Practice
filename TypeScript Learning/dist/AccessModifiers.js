"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Driver {
    id;
    name;
    earnings;
    constructor(id, name, earnings) {
        this.id = id;
        this.name = name;
        this.earnings = earnings;
    }
}
const d1 = new Driver("0991", "Hasan", 24000);
console.log(d1.id);
// console.log(d1.name); Error can't be accessible
// console.log(d1.earnings); ""
class ChildDriver extends Driver {
    constructor() {
        super("1245", "Abdul", 24000);
        // Now, we can access protected member in child class
        this.earnings = 25000; // Now, can be accessible
    }
}
const d2 = new ChildDriver(); // No arguments needed
console.log(d2);
//# sourceMappingURL=AccessModifiers.js.map