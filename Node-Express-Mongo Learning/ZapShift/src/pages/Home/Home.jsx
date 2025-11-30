import React from 'react';
import Banner from './Components/Banner';
import Works from './Components/Works';
import OurServices from './Components/OurServices';
import Help from './Components/Help';
import Track from './Components/Track';
import MarchentBanner from './Components/MarchentBanner';
import Feedback from './Components/Feedback';

const reviwsPromise = fetch('/Reviews.json').then(res => res.json())

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Works></Works>
            <OurServices></OurServices>
            <Help></Help>
            <Track></Track>
            <MarchentBanner></MarchentBanner>
            <Feedback reviwsPromise={reviwsPromise}></Feedback>
        </div>
    );
};

export default Home;