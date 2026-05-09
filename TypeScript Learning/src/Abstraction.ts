// ABSTRACTION: Hide the complex details, show only what's needed
// Think of it like a TV remote: You don't need to know HOW it works inside,
// you just press buttons and it works!

// Abstract class: Like a blueprint that says "all animals must have these abilities"
abstract class Animal {
    // Abstract method: Subclasses MUST create their own version of this
    abstract makeSound(): void;

    // Regular method: All animals can use this (the "easy" part)
    sleep(): void {
        console.log("💤 Zzzzz... sleeping");
    }

    // This method calls an abstract method (hidden complexity)
    performAction(): void {
        console.log("🎬 Performing action...");
        this.makeSound(); // We don't know HOW each animal makes sound, but they must!
    }
}

// Real animals implement the abstract methods
class Dog extends Animal {
    // Dog must implement makeSound (required by abstract class)
    makeSound(): void {
        console.log("🐕 Ghew! Ghew!");
    }
}

class Cat extends Animal {
    // Cat must implement makeSound (required by abstract class)
    makeSound(): void {
        console.log("🐱 Meow! Meow!");
    }
}

class Bird extends Animal {
    // Bird must implement makeSound (required by abstract class)
    makeSound(): void {
        console.log("🐦 Tweet! Tweet!");
    }
}

// Using abstraction: We don't care HOW each animal makes sounds
const myDog = new Dog();
const myCat = new Cat();
const myBird = new Bird();

console.log("=== Using Abstraction ===\n");

myDog.performAction(); // Calls makeSound() but we don't need to know how it works
myCat.performAction();
myBird.performAction();

console.log("\n=== Direct method calls ===\n");

myDog.sleep();
myCat.sleep();
myBird.sleep();

// ============================================================
// REAL-WORLD ANALOGY
// ============================================================
// Think of a car:
// - You don't need to understand how the engine works
// - You just press the accelerator, it goes!
// - The engine complexity is ABSTRACTED away
// - You only interact with the steering wheel, pedals, buttons (the interface)

abstract class Vehicle {
    abstract accelerate(): void;
    abstract brake(): void;

    startEngine(): void {
        console.log("🚗 Engine started (you don't need to know the complex details!)");
    }
}

class Car extends Vehicle {
    accelerate(): void {
        console.log("⚡ Car speeds up!");
    }

    brake(): void {
        console.log("🛑 Car stops!");
    }
}

const myCar = new Car();
console.log("\n=== Real-world example: Car ===\n");
myCar.startEngine();
myCar.accelerate();
myCar.brake();

// KEY POINTS:
// ✓ Abstraction hides complex implementation
// ✓ Abstract classes force subclasses to implement required methods
// ✓ Makes code simpler and easier to use
// ✓ Less brain power needed to use the class, more needed to create it
