import amazon from '../../../assets/Images/assets/brands/amazon.png'
import casio from '../../../assets/Images/assets/brands/casio.png'
import moonstar from '../../../assets/Images/assets/brands/moonstar.png'
import randstand from '../../../assets/Images/assets/brands/randstad.png'
import star from '../../../assets/Images/assets/brands/star.png'
import startPeople from '../../../assets/Images/assets/brands/start_people.png'
import Marquee from 'react-fast-marquee';

const Help = () => {
    const images = [amazon, casio, moonstar, randstand, star, startPeople]
    // console.log(images);

    return (
        <div className='my-10 w-11/12 mx-auto'>
            <h1 className='text-center font-bold text-secondary text-2xl'>We've helped thousands of sales teams</h1>
            <Marquee speed={100} className='my-10'>
                {
                    images.map(brand =>
                        <img src={brand} className='mx-8 md:mx-14' alt="" />
                    )
                }
            </Marquee>
        </div >
    );
};

export default Help;