// Logout
document.getElementById('logout-btn').addEventListener('click', function () {
    window.location.href = "./index.html"
})

let transactionsData = []
let latestTransData = []

// Validation
function validation(number, amount, pin, type) {
    if (number === '' || isNaN(number) || number.length < 11 || number.length > 11) {
        alert("Please enter a valid number")
    }

    else if (amount === '' || isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount")
    }

    else if (pin === '' || pin.length < 4) {
        alert("Please enter a valid pin number")
    }

    else {
        const data = {
            type: type,
            date: new Date().toLocaleString(),
            number: number,
            amount: amount
        }

        transactionsData.push(data)
        latestTransData.unshift(data)
    }
    return;
}

// Add money
document.getElementById('add-money-btn').addEventListener('click', function (e) {
    e.preventDefault()

    const bank = document.getElementById('bank').value
    const bankNumber = document.getElementById('bank-number').value;
    const amount = document.getElementById('amount').value;
    const pin = document.getElementById('pin').value
    let mainBalance = document.getElementById('main-balance');

    if (bank === 'Select A Bank') {
        alert("Please enter a valid bank")
        return;
    }

    validation(bankNumber, amount, pin, 'Add Money')

    let newBalance = Number(mainBalance.innerText)
    let newAmount = Number(amount)
    let totalBalance = newBalance + newAmount;
    // console.log(totalBalance, typeof totalBalance)
    mainBalance.innerText = `${totalBalance}`

    // const data = {
    //     type: 'Add Money',
    //     date: new Date().toLocaleString(),
    //     number: bankNumber,
    //     amount: amount
    // }

    // if (data.number !== '' && data.amount !== '' && pin !== '') {
    //     transactionsData.push(data)
    // }

})

// Cashout
document.getElementById("cashout-money-btn").addEventListener("click", function (e) {
    e.preventDefault()

    const agentNumber = document.getElementById("agent-number").value
    const withdrawAmount = document.getElementById("withdraw").value
    const pin = document.getElementById('withdraw-pin').value
    let mainBalance = document.getElementById('main-balance');

    let newAmount = Number(withdrawAmount)
    let newBalance = Number(mainBalance.innerText)

    if (newAmount > newBalance) {
        alert("Insufficient balance")
        return;
    }

    validation(agentNumber, withdrawAmount, pin, 'Cashout')

    let balaceNow = newBalance - newAmount;
    mainBalance.innerText = balaceNow;

    // const data = {
    //     type: 'Cashout',
    //     date: new Date().toLocaleString(),
    //     number: agentNumber,
    //     amount: withdrawAmount
    // }

    // transactionsData.push(data)

})

// Transfer money
document.getElementById("transfer-money-btn").addEventListener("click", function (e) {
    e.preventDefault()

    const userNumber = document.getElementById("user-number").value;
    const transferAmount = document.getElementById("transfer-amount").value
    const pin = document.getElementById('transfer-pin').value
    let mainBalance = document.getElementById('main-balance');

    let newAmount = Number(transferAmount)
    let newBalance = Number(mainBalance.innerText)

    if (newAmount > newBalance) {
        alert("Insufficient balance")
        return;
    }

    validation(userNumber, transferAmount, pin, 'Transfer Money')

    let balaceNow = newBalance - newAmount;
    mainBalance.innerText = balaceNow;

    // const data = {
    //     type: 'Transfer Money',
    //     date: new Date().toLocaleString(),
    //     number: userNumber,
    //     amount: transferAmount
    // }

    // transactionsData.push(data)

})

// Bonus
document.getElementById("bonus-btn").addEventListener("click", function (e) {
    e.preventDefault()

    const couponNumber = document.getElementById("coupon-number").value;
    let mainBalance = document.getElementById('main-balance');
    let newBalance = Number(mainBalance.innerText)

    if (couponNumber === "ABCD12") {
        let bonusBalance = 10 + newBalance
        mainBalance.innerText = bonusBalance
    }

    else {
        alert("Enter a valid coupon code")
    }
})

// Toggler
/*function toggler(elementId, hiddenQueryId1, hiddenQueryId2, hiddenQueryId3, showQueryId) {
    document.getElementById(elementId).addEventListener('click', function () {
        document.querySelector(hiddenQueryId1).classList.add('hidden');
        document.querySelector(hiddenQueryId2).classList.add('hidden');
        document.querySelector(hiddenQueryId3).classList.add('hidden');
        document.querySelector(showQueryId).classList.remove('hidden');
    })
}

toggler("add-money", ".transfer-money-display", ".bonus-display", ".cashout-display", ".add-money-display")
toggler("cashout", ".transfer-money-display", ".bonus-display", ".add-money-display", ".cashout-display")
toggler("transfer-money", ".add-money-display", ".bonus-display", ".cashout-display", ".transfer-money-display")
toggler("bonus", ".transfer-money-display", ".add-money-display", ".cashout-display", ".bonus-display")
*/

// document.getElementById('add-money').addEventListener('click', function () {
//     document.querySelector('.transfer-money-display').classList.add('hidden');
//     document.querySelector('.bonus-display').classList.add('hidden');
//     document.querySelector('.cashout-display').classList.add('hidden');
//     document.querySelector('.add-money-display').classList.remove('hidden');
// })

// document.getElementById('cashout').addEventListener('click', function () {
//     document.querySelector('.add-money-display').classList.add('hidden');
//     document.querySelector('.transfer-money-display').classList.add('hidden');
//     document.querySelector('.bonus-display').classList.add('hidden');
//     document.querySelector('.cashout-display').classList.remove('hidden');
// })

// document.getElementById('transfer-money').addEventListener('click', function () {
//     document.querySelector('.add-money-display').classList.add('hidden');
//     document.querySelector('.cashout-display').classList.add('hidden');
//     document.querySelector('.bonus-display').classList.add('hidden');
//     document.querySelector('.transfer-money-display').classList.remove('hidden');
// })

// document.getElementById('bonus').addEventListener('click', function () {
//     document.querySelector('.add-money-display').classList.add('hidden');
//     document.querySelector('.transfer-money-display').classList.add('hidden');
//     document.querySelector('.cashout-display').classList.add('hidden');
//     document.querySelector('.bonus-display').classList.remove('hidden');
// })

function Toggler(btnId, toggleDisplayId) {
    document.getElementById(btnId).addEventListener('click', function () {
        // Toggle display
        const toggleDisplay = document.getElementsByClassName('toggle-display')
        for (const display of toggleDisplay) {
            display.classList.add('hidden')
        }

        document.getElementById(toggleDisplayId).classList.remove('hidden')

        // Active button
        const btn = document.getElementsByClassName('toggle-btn');
        for (const btns of btn) {
            btns.classList.remove('bg-blue-500/10', 'border-blue-500')
            btns.classList.add('border-[#08080825]')
        }

        document.getElementById(btnId).classList.remove('border-[#08080825]')
        document.getElementById(btnId).classList.add('bg-blue-500/10', 'border-blue-500')
    });

    return;
}

Toggler('logo', 'home-display')
Toggler('add-money', 'add-money-display')
Toggler('cashout', 'cashout-display')
Toggler('transfer-money', 'transfer-money-display')
Toggler('bonus', 'bonus-display')
Toggler('pay-bill', 'pay-bill-display')
Toggler('transactions', 'transactions-display')

// document.querySelectorAll('.toggle-btn').forEach((btns, i) => {
//     btns.addEventListener('click', function () {
//         const toggleDisplay = document.querySelectorAll('.toggle-display');

//         toggleDisplay.forEach(toogleDisplays => {
//             toogleDisplays.classList.add('hidden')
//         })

//         toggleDisplay[i].classList.remove('hidden')
//     })
// })

document.getElementById('transactions').addEventListener('click', function () {
    const transactionsContainer = document.getElementById('transactions-container')
    transactionsContainer.innerText = ""

    for (const data of transactionsData) {
        const div = document.createElement('div')
        div.innerHTML = `
        <div class="rounded-xl bg-white flex items-center justify-between px-4 py-3 mb-4">
            <div class="flex items-center gap-5">
                <div class="p-2 bg-[#0db89941] rounded-full">
                    <img src="./Resources/assets/transaction1.png" alt="">
                </div>
                <div>
                    <h4 class="font-medium">${data.type}</h4>
                    <p class="text-sm mt-1.5">${data.date}</p>
                </div>
            </div>
            <div>
                <p class="font-medium">${data.number}</p>
                <p class="font-medium">৳${data.amount}</p>
            </div>
        </div>`

        transactionsContainer.appendChild(div)
    }
})

document.getElementById('logo').addEventListener('click', function () {
    const latestContainer = document.getElementById('latest-pay-container')
    latestContainer.innerText = ""

    for (const datas of latestTransData) {
        const div = document.createElement('div')
        div.innerHTML = `
        <div class="rounded-xl bg-white flex items-center justify-between px-4 py-3 mb-4">
            <div class="flex items-center gap-5">
                <div class="p-2 bg-[#0db89941] rounded-full">
                    <img src="./Resources/assets/transaction1.png" alt="">
                </div>
                <div>
                    <h4 class="font-medium">${datas.type}</h4>
                    <p class="text-sm mt-1.5">${datas.date}</p>
                </div>
            </div>
            <div>
                <p class="font-medium">${datas.number}</p>
                <p class="font-medium">৳${datas.amount}</p>
            </div>
        </div>`

        latestContainer.appendChild(div)
    }
})