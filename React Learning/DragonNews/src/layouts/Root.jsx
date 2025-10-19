import React from 'react';
import Header from '../components/Header';
import Navbar from './../components/Navbar';
import { Outlet, useNavigation } from 'react-router';
import Categories from '../components/Categories';
import RightSection from '../components/RightSection';
import { ToastContainer } from 'react-toastify';
import Loading from './../components/Loading';

const Root = () => {
    const { state } = useNavigation()

    return (
        <div>
            <section>
                <Header></Header>
                <Navbar></Navbar>
            </section>
            <main className='lg:grid grid-cols-12 container mx-auto my-10 gap-5'>
                <aside className='lg:col-span-2 max-h-fit sticky top-2'>
                    <Categories></Categories>
                </aside>
                <div className='lg:col-span-7'>
                    {
                        state === 'loading' ? <Loading></Loading> : <Outlet></Outlet>
                    }
                </div>
                <aside className='lg:col-span-3 max-h-fit sticky top-2'>
                    <RightSection></RightSection>
                </aside>
            </main>

            <ToastContainer />
        </div >
    );
};

export default Root;