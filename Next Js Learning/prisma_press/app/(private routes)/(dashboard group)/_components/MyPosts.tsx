
import { getMyPost } from './../_actions/getMyPosts';
import { IPosts } from '@/lib/types';
import { PostCard } from './../../../(public routes)/posts/_components/PostCard';

const MyPosts = async () => {
    const myPost = await getMyPost()

    if (!myPost.success || !myPost.data?.length) {
        return (
            <div className='text-center'>
                <h1 className='text-2xl font-bold'>No post found</h1>
            </div>
        )
    }

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center justify-center'>
            {
                myPost.data.map((post: IPosts) =>
                    <PostCard key={post.id} post={post} />
                )
            }
        </div>
    )
}

export default MyPosts