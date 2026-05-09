class Bank {
    private _balance: number = 0;

    // Getter method to access the private balance property
    get balance(): number {
        return this._balance;
    }

    // Setter method to update the private balance property    
    set balance(value: number) {
        this._balance += value;
    }
}

const myBank = new Bank();
console.log("Old balance:", myBank.balance); // Output: 0

// Using the setter to update the balance
myBank.balance = 100;
console.log("Updated balance:", myBank.balance); // Output: 100 