document.getElementById('products').addEventListener('click', function (e) {
    if (e.target.className.includes('add-to-cart-btn')) {
        const product = e.target;

        const productImg = product.parentNode.parentNode.children[0].children[0].src;
        const title = product.parentNode.children[0].innerText;
        const price = product.parentNode.children[1].children[0].innerText;
        let totalPrice = document.getElementById('total-price').children[0].innerText;

        const newPrice = (Number(price) + Number(totalPrice));
        document.getElementById('total-price').children[0].innerText = newPrice;

        const cartContainer = document.getElementById('cart-container')
        const div = document.createElement('div')

        document.getElementById('empty').classList.add('hidden');

        div.innerHTML = `
        <div class="mt-5 flex items-center justify-between bg-white p-2 rounded-lg">
            <div class="flex gap-5">
                <img class="w-20 rounded-sm"
                    src="${productImg}" alt="">
                <div>
                    <h2 class="font-medium">${title}</h2>
                    <p>Price: $<span>${price}</span> Tk</p>
                </div>
            </div>
            <div>
                <h4>Quantity</h4>
                <p>${qty}</p>
            </div>
        </div>`

        cartContainer.append(div)

    }
})