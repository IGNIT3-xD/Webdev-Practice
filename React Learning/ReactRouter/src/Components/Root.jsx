import React from 'react';
import Header from './Header';
import { Outlet, useNavigation } from 'react-router';
import Footer from './Footer';

const Root = () => {

    // For showing loading in loader(fetch)
    const navigation = useNavigation();
    const isNavigating = Boolean(navigation.location)

    return (
        <div>
            <Header></Header>

            {isNavigating && <h3>Loading...</h3>}
            <Outlet></Outlet>

            <Footer></Footer>
        </div>
    );
};

export default Root;