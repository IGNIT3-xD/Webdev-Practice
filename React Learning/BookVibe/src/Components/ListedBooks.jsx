import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { getBook } from '../Utility/Read';
import ReadBook from './ReadBook';
import { getBookW } from './../Utility/Wishlist';
import WishlistBook from './WishlistBook';

const ListedBooks = () => {
    const data = useLoaderData()
    const [read, setRead] = useState([]);
    // console.log(read);
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        const storedBooks = getBook();
        // const booksId = storedBooks.map(id => parseInt(id))
        const readBooks = data.filter(book => storedBooks.includes(book.bookId))
        setRead(readBooks);

        const storedWishlistBooks = getBookW()
        const wishlistBooks = data.filter(book => storedWishlistBooks.includes(book.bookId))
        setWishlist(wishlistBooks)
    }, [data])

    const [sort, setSort] = useState("")
    const handleSort = (type) => {
        setSort(type)

        if (type === "Pages") {
            const sortByPage = [...read].sort((a, b) => b.totalPages - a.totalPages)
            setRead(sortByPage)
        }

        if (type === "Rating") {
            const soryByRating = [...read].sort((a, b) => b.rating - a.rating)
            setRead(soryByRating)
        }
    }

    return (
        <div className='mt-20'>
            <div className='grid place-content-center mb-5'>
                <div className="dropdown dropdown-bottom">
                    <div tabIndex={0} role="button" className="btn m-1 btn-success">Sort by {sort}</div>
                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                        <li onClick={() => handleSort("Pages")}><a>Pages</a></li>
                        <li onClick={() => handleSort("Rating")}><a>Rating</a></li>
                    </ul>
                </div>
            </div>

            <Tabs>
                <TabList>
                    <Tab>Readed Books</Tab>
                    <Tab>Whishlist Books</Tab>
                </TabList>

                <TabPanel className={'space-y-4'}>
                    {
                        read.map(book => <ReadBook key={book.bookId} book={book}></ReadBook>)
                    }
                </TabPanel>
                <TabPanel className={'space-y-4'}>
                    {
                        wishlist.map(book => <WishlistBook key={book.bookId} book={book}></WishlistBook>)
                    }
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default ListedBooks;