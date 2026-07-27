import { Suspense } from 'react';
import Posts from './_components/Posts';
import { SearchBar } from './_components/SearchBar';

const PostPage = async ({ searchParams, }: { searchParams?: Promise<{ [key: string]: string | string[] | undefined }> }) => {
    return (
        <div className='px-4 sm:px-6 lg:px-8 my-8'>
            <div className='flex flex-col md:flex-row items-center justify-between max-w-11/12 mx-auto '>
                <div>
                    <h1 className='text-2xl font-bold'>All Posts</h1>
                </div>
                <div>
                    <SearchBar />
                </div>
            </div>
            <div className='my-6 max-w-11/12 mx-auto '>
                <Suspense fallback={<h1>Loading...</h1>}>
                    <Posts searchParams={searchParams} />
                </Suspense>
            </div>
        </div>
    )
}

export default PostPage