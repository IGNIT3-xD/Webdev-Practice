import { Suspense } from 'react';
import MyPosts from './../../_components/MyPosts';

const MyPostPage = () => {
    return (
        <div className='px-4 sm:px-6 lg:px-8 my-8'>
            <h1 className='text-2xl font-bold'>My Post(s)</h1>
            <div className='my-6 max-w-11/12 mx-auto '>
                <Suspense fallback={<h1>Loading...</h1>}>
                    <MyPosts />
                </Suspense>
            </div>
        </div>
    )
}

export default MyPostPage