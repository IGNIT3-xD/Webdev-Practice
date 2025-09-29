import React from 'react';
import { Link, NavLink } from 'react-router';

const Header = () => {
    return (
        <div>
            <h2>Header</h2>
            <nav>
                {/* <Link to={"/"}>Home</Link>
                <Link to={"blogs"}>Blogs</Link>
                <Link to={"products"}>Products</Link> */}

                <NavLink to={"/"}>Home</NavLink>
                <NavLink to={"blogs"}>Blogs</NavLink>
                <NavLink to={"products"}>Products</NavLink>
                <NavLink to={"users"}>Users</NavLink>
                <NavLink to={"users2"}>Users 2</NavLink>
            </nav>
        </div>
    );
};

export default Header;