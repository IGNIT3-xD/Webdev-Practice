 // Funcion in object => method
const user = {
    name: 'User X',
    balance: 0,
    addBalance(value: number) {
        return this.balance += value;
    }
}

user.addBalance(600)
console.log(user)