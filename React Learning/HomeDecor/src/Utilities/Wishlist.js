const getProducts = () => {
    const existingProducts = JSON.parse(localStorage.getItem('wishlist'));

    if (existingProducts) {
        // console.log(existingProducts);
        return existingProducts;
    }
    else {
        return [];
    }
}

const addWishlist = (id) => {
    const storedProduct = getProducts();

    if (storedProduct.includes(id)) {
        alert('Exist');
        return;
    }

    storedProduct.push(id);
    const data = JSON.stringify(storedProduct);
    localStorage.setItem('wishlist', data)
}

const removeWishlist = (id) => {
    const storedProduct = getProducts();

    const updateProduct = storedProduct.filter(item => item !== id)
    localStorage.setItem('wishlist', JSON.stringify(updateProduct));
    return updateProduct;
}

export { getProducts, addWishlist, removeWishlist }