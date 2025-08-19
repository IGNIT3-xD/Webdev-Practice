function avgPrice(phones) {
    let total = 0
    for (const phone of phones) {
        total += phone.price
    }
    const avg = total / phones.length
    return Number(avg.toFixed(2))
}


const phones = [
    { model: "PhoneA", brand: "Iphone", price: 95000 },
    { model: "PhoneB", brand: "Samsung", price: 40000 },
    { model: "PhoneC", brand: "Oppo", price: 26000 },
    { model: "PhoneD", brand: "Nokia", price: 35000 },
    { model: "PhoneE", brand: "Iphone", price: 105000 },
    { model: "PhoneF", brand: "HTC", price: 48000 },
];

console.log('Avg. price: ', avgPrice(phones))