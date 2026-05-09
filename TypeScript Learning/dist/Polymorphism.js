"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Person {
    getSleep() {
        console.log(`Normal Person: I sleep for 8 hours`);
    }
}
class Studnet extends Person {
    getSleep() {
        console.log(`Student Person: I sleep for 7 hours`);
    }
}
class JobHolder extends Person {
    getSleep() {
        console.log(`Job Holder Person: I sleep for 6 hours`);
    }
}
const getSleepingHours = (param) => {
    param.getSleep();
};
const person1 = new Person();
const person2 = new Studnet();
const person3 = new JobHolder();
getSleepingHours(person1);
getSleepingHours(person2);
getSleepingHours(person3);
// 
class Shape {
    getArea() {
        return 0;
    }
}
class Circle extends Shape {
    r;
    constructor(r) {
        super();
        this.r = r;
    }
    getArea() {
        return Math.PI * this.r * this.r;
    }
}
class Rectangle extends Shape {
    h;
    w;
    constructor(h, w) {
        super();
        this.h = h;
        this.w = w;
    }
    getArea() {
        return this.h * this.w;
    }
}
const getAreaCalc = (param) => {
    console.log(param.getArea());
};
const shape1 = new Shape();
const shape2 = new Circle(10);
const shape3 = new Rectangle(10, 20);
getAreaCalc(shape1);
getAreaCalc(shape2);
getAreaCalc(shape3);
//# sourceMappingURL=Polymorphism.js.map