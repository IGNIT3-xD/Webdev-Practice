import { createBrowserRouter } from "react-router";
import Root from "../Layouts/Root";
import Home from "../Components/Home";
import ListedBooks from './../Components/ListedBooks';
import PagesToRead from './../Components/PagesToRead';
import BookDetails from "../Components/BookDetails";

const router = createBrowserRouter([
    {
        path: "/",
        Component: Root,
        children: [
            {
                index: true,
                Component: Home,
                loader: () => fetch('/booksData.json')
            },
            {
                path: 'book/:bookId',
                Component: BookDetails,
                loader: () => fetch('/booksData.json')
            },
            {
                path: 'listed-books',
                Component: ListedBooks,
                loader: () => fetch('/booksData.json')
            },
            { path: 'pages-to-read', Component: PagesToRead },
        ]
    },
]);

export default router;