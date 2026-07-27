import { getPosts } from './../_actions/getPosts';
import { PostCard } from './PostCard';
import { IPosts } from '@/lib/types';

const Posts = async ({ searchParams, }: { searchParams?: Promise<{ [key: string]: string | string[] | undefined }> }) => {
    const query = await searchParams
    const posts = await getPosts({ query })
    // console.log(posts);

    if (!posts.success || !posts.data?.length) {
        return (
            <div className='text-center'>
                <h1 className='text-2xl font-bold'>No post found</h1>
            </div>
        )
    }

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center justify-center'>
            {
                posts.data.map((post: IPosts) => (
                    <PostCard key={post.id} post={post} />
                ))
            }
        </div>
    )
}

export default Posts