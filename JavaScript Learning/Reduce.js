const myNum = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
let initial = 0

const sum = myNum.reduce((acc, curVal) => {
    console.log(`Accumulator : ${acc} and Current Value : ${curVal}`);
    return acc + curVal
}, initial)

console.log(`Sum is= ${sum}`)

//
const shoppingCart = [
    { product: 'Book', price: 399 },
    { product: 'Gpu', price: 12000 },
    { product: 'Jursey', price: 549 },
    { product: 'Keyboard & Mouse', price: 499 }
]

const totalPay = shoppingCart.reduce((acc, item) => acc + item.price, 0)

const items = shoppingCart.map((itm) => itm.product)

console.log(`Products: ${items} and Total Bill : ${totalPay}`)