import { Suspense } from 'react';
import MyPosts from './../../_components/MyPosts';
import { PostFormDialog } from './../../_components/PostFormDialog';

const MyPostPage = () => {
    return (
        <div className='px-4 sm:px-6 lg:px-8 my-8'>
            <div className='flex flex-col md:flex-row justify-between items-center'>
                <h1 className='text-2xl font-bold'>My Post</h1>
                <PostFormDialog/>
            </div>
            <div className='my-6 max-w-11/12 mx-auto '>
                <Suspense fallback={<h1>Loading...</h1>}>
                    <MyPosts />
                </Suspense>
            </div>
        </div>
    )
}

export default MyPostPage