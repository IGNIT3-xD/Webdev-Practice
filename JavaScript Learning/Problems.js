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

// Reverse and remove space(s)
function reverseWords(s) {
    const s2 = s.trim();
    const words = s2.split(/\s+/);
    const rev = words.reverse();
    const result = rev.join(' ');
    return result;
}

console.log(reverseWords('This is the end'));