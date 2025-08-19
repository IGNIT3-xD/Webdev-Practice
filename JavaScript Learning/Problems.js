// --------------------------- Loops -----------------------//

// Sum of Even
let sum = 0
for (let i = 0; i <= 10; i++) {
    if (i % 2 != 0) {
        console.log(i)
        sum += i
    }
}
console.log(`Sum of odd no. is = ${sum}`)

// Sum untill it will be 100 or exceeds
let i = 1
let sum2 = 0
while (i <= 100) {
    sum2 = sum2 + i

    if (sum2 >= 100) {
        break
    }

    console.log(`Itertion ${i}, Sum is = ${sum2}`)
    i++
}

// Count A
const name = 'Al Bukark Ibn Mussallam'

let count = 0
for (let ltr of name) {
    if (ltr === 'a' || ltr === 'A')
        count++
}
console.log(`A or a has : ${count} times`)

// Countdown
let l = 10
while (l >= 0) {
    console.log(l)
    l--
}

// --------------------------- String -----------------------//

// Vowel exist or not
const message = 'HAUello worldi'
let convert = message.toLocaleLowerCase()

if (convert.includes('a') && convert.includes('e') && convert.includes('i') && convert.includes('o') && convert.includes('u')) {
    console.log('All the vowels are exist')
}
else {
    console.log('Not all vowels are exist')
}

// Reverse a sentence 
const statement = 'I am a hard working person'

const sentences = statement.split(' ')
console.log(sentences)

const reversed = sentences.reverse()
console.log(reversed)

const result = reversed.join(" ");
console.log(result)

// --------------------------- Array -----------------------//

// Sum of an array
const myArray = [1, 2, 3, 4, 5]
let sum3 = 0

for (let i = 0; i < myArray.length; i++) {
    console.log(myArray[i])
    sum3 += myArray[i]
}
console.log(`Sum of the array is = ${sum3}`)

// concatenate all the elements of an array into a single string.
var numbers = ['Tom', 'Tim', 'Tin', 'Tik']
let res = ''
for (let n of numbers) {
    res += n
}
console.log(res)

// --------------------------- Function -----------------------//

// Sum and Avg.
function make_avg(nums) {
    let sum = 0;
    for (let n of nums) {
        sum += n;
    }
    console.log(`Sum of the array is : ${sum}`);

    let avg = sum / nums.length;
    return `Avg of the array is : ${avg}`;
}

console.log(make_avg([1, 2, 3, 4, 5]));

// Avg of odds number
function odd(arr) {
    const oddArr = [];

    for (const num of arr) {
        if (num % 2 !== 0) {
            oddArr.push(num);
        }
    }

    let sum = 0;
    for (const odd of oddArr) {
        sum += odd;
    }

    const avg = sum / oddArr.length;
    return avg;
}
console.log(odd([42, 13, 58, 65, 81]));

// Reverse and remove space(s)
function reverseWords(s) {
    const s2 = s.trim();
    const words = s2.split(/\s+/);
    const rev = words.reverse();
    const result = rev.join(' ');
    return result;
}

console.log(reverseWords('This is the end'));

// Num to array and Reverse a num
function revNum(x) {
    const convert = String(x)
    const rev = convert.split('').reverse().join('')
    const result = Number(rev)
    return result
}

console.log(revNum(123))

// Sort a num
function sortANum(arr) {
    const x = arr.sort(function (a, b) { return a - b })
    return x
}

console.log(sortANum([3, 2, 1, 100, 500, 77]))

// Remove duplicate
function noDuplicate(arr) {
    const newArr = [];

    for (const value of arr) {
        if (newArr.includes(value) === false) {
            newArr.push(value);
        }
    }

    console.log(`Duplicate items: ${arr.length - newArr.length}`)
    return newArr;
}

console.log(noDuplicate([1, 2, 3, 1, 1, 5, 7, 9, 8, 8]));

// Swap
function swap(a, b) {
    console.log(`Before: ${a} ${b}`)
    let temp = a
    a = b
    b = temp
    return `After: ${a} ${b}`
}

console.log(swap(10, 2))

// Swap using destructuring
function swap2(a, b) {
    // console.log(`Before: ${a} ${b}`)
    [a, b] = [b, a]
    return `After: ${a} ${b}`
}

console.log(swap2(1, 2))

// Count duplicate values
function countDuplicate(arr, find) {
    let count = 0
    for (const num of arr) {
        if (num === find) {
            count++;
        }
    }
    return count
}

console.log(countDuplicate([5, 6, 11, 12, 98, 5], 5))

// Count no. of vowels
function countVowels(str) {
    let count = 0

    for (const ltr of str.toLowerCase()) {
        if (ltr === 'a' || ltr === 'e' || ltr === 'i' || ltr === 'o' || ltr === 'u')
            count++
    }
    return count
}

console.log(countVowels('Hello World'))

// Longest word in a string
function longestWord(str) {
    const s = str.split(' ')
    let len = 0
    let longWord = ''

    for (let word of s) {
        // console.log(word.length, word)
        if (word.length > len) {
            len = word.length
            longWord = word
        }
    }
    return longWord
}

console.log(longestWord('I am learning Programming to become a programmer'))

// Max array
function maxArray(arr) {
    let maxNum = arr[0]
    for (let n of arr) {
        if (n > maxNum) {
            maxNum = n
        }
    }
    return maxNum
}

console.log(maxArray([61, 2, 73, 4, 5, 66]))

// Smallest name
function smallestName(names) {
    let smallName = names[0]
    for (const name of names) {
        if (name.length < smallName.length) {
            smallName = name
        }
    }
    return smallName
}

const heights = ['rahim', 'robin', 'rafi', 'ron', 'rashed'];
console.log('Smallest name is : ', smallestName(heights))

// Cheapest phone
function cheapestPhone(obj) {
    let minPrice = obj[0]
    // console.log(minPrice, minPrice.price)
    for (const phone of obj) {
        // console.log(phone.price)
        if (phone.price < minPrice.price) {
            minPrice = phone
        }
    }
    return minPrice
}

const myObj = [
    { name: 'Samsung', price: 46000, camera: '80 Mp', color: 'Black' },
    { name: 'IPhone', price: 146000, camera: '60 Mp', color: 'White' },
    { name: 'Xiaomi', price: 34000, camera: '70 Mp', color: 'Blue' },
    { name: 'Nokia', price: 12000, camera: '36 Mp', color: 'Black' },
    { name: 'Huawei', price: 86000, camera: '120 Mp', color: 'Black' },
    { name: 'Oppo', price: 46000, camera: '80 Mp', color: 'Black' }
]

console.log(cheapestPhone(myObj))

// Cart
function cart(products) {
    let total = 0
    for (const product of products) {
        // console.log(product, product.price, product.quantity)
        const quantityAndPrice = product.price * product.quantity
        // console.log(quantityAndPrice)
        total += quantityAndPrice
    }
    return total
}

const myProducts = [
    { name: 'Shirt', price: 800, quantity: 1 },
    { name: 'Pant', price: 950, quantity: 2 },
    { name: 'Trouser', price: 250, quantity: 2 },
    { name: 'Jersey', price: 350, quantity: 1 },
    { name: 'T-Shirt', price: 100, quantity: 3 }
]

console.log('Total Price is :', cart(myProducts))

// Avg. price of phone
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