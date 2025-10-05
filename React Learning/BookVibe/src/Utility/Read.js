const getBook = () => {
    const storedBooks = localStorage.getItem('readList');

    if (storedBooks) {
        const stroredBooksData = JSON.parse(storedBooks)
        return stroredBooksData;
    }
    else {
        return [];
    }
}

const addBook = (id) => {
    const stroredData = getBook();

    if (stroredData.includes(id)) {
        alert("The Book has already exist in your read list");
    }
    else {
        stroredData.push(id);
        const data = JSON.stringify(stroredData);
        localStorage.setItem('readList', data)
    }
}

export { addBook, getBook }