// Polymorphism: It is the ability of an object to take on many forms. It allows us to use a single interface to represent different types of objects. In TypeScript, we can achieve polymorphism through method overriding and interfaces.

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

// Now, we can use the same function to call the getSleep method of different classes, and it will execute the appropriate method based on the object type. This is polymorphism in action.
const getSleepingHours = (param: Person) => {
    param.getSleep();
}

const person1 = new Person()
const person2 = new Studnet()
const person3 = new JobHolder()

getSleepingHours(person1)
getSleepingHours(person2)
getSleepingHours(person3)


class Shape {
    getArea(): number {
        return 0
    }
}

class Circle extends Shape {
    r: number;

    constructor(r: number) {
        super()
        this.r = r
    }

    getArea(): number {
        return Math.PI * this.r * this.r
    }
}

class Rectangle extends Shape {
    h: number;
    w: number;

    constructor(h: number, w: number) {
        super()
        this.h = h;
        this.w = w
    }

    getArea(): number {
        return this.h * this.w;
    }
}

const getAreaCalc = (param: Shape) => {
   console.log(param.getArea());
}

const shape1 = new Shape()
const shape2 = new Circle(10)
const shape3 = new Rectangle(10, 20)

getAreaCalc(shape1)
getAreaCalc(shape2)
getAreaCalc(shape3)