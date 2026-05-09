"use strict";
// Imagine you have a special toy box. You can't just open it and grab toys.
// You have to use a special door (getter) to see what's inside, and another door (setter) to put toys in.
// Getters and setters are like those special doors for your code's "toys" (properties).
Object.defineProperty(exports, "__esModule", { value: true });
class ToyBox {
    _toys = []; // This is the secret box where toys are kept. Private means only the box knows about it.
    // Getter: This is like opening the door to see the toys
    get toys() {
        console.log("Opening the door to see toys...");
        return this._toys;
    }
    // Setter: This is like putting toys through the slot
    set toys(newToys) {
        console.log("Putting toys into the box...");
        this._toys = newToys;
    }
    // You can also add toys one by one
    addToy(toy) {
        this._toys.push(toy);
    }
}
// Let's play with the toy box!
const myToyBox = new ToyBox();
// Put some toys in
myToyBox.toys = ["car", "doll"]; // Uses the setter
myToyBox.addToy("ball");
// See what's inside
console.log("Toys in the box:", myToyBox.toys); // Uses the getter
// Output:
// Putting toys into the box...
// Toys in the box: [ 'car', 'doll', 'ball' ]
//# sourceMappingURL=GetterSetter.js.map