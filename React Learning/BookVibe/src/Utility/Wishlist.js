export const getBookW = () => {
    const stored = localStorage.getItem('wishlist');

    if (stored) {
        const storedData = JSON.parse(stored);
        return storedData;
    }
    else {
        return [];
    }
}

export const addWishlist = (id) => {
    const storedBooks = getBookW();

    if (storedBooks.includes(id)) {
        alert("The Book has already exist in your wishlist");
    }
    else {
        storedBooks.push(id)
        const data = JSON.stringify(storedBooks)
        localStorage.setItem('wishlist', data)
    }
}