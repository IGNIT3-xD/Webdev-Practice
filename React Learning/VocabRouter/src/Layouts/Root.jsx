import React from 'react';
import Navbar from '../Component/Navbar';
import Footer from '../Component/Footer';
import { Outlet, useNavigation } from 'react-router';
import Loading from '../Component/Loading';

const Root = () => {

    const navigation = useNavigation()
    // console.log(navigation.state);

    return (
        <div>
            <Navbar></Navbar>
            {
                navigation.state === 'loading' ?
                    <Loading></Loading> :
                    <main className='w-11/12 mx-auto min-h-[calc(100vh-285px)]'>
                        <Outlet></Outlet>
                    </main>
            }
            <Footer></Footer>
        </div>
    );
};

export default Root;