import { getPostById } from './../_actions/getPostsById';
import { PostDetails } from './../_components/PostDetails';

const PostDetailsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params
    const result = await getPostById(id)

    if (!result.success) {
        result(
            <h1 className='text-center my-6 text-2xl font-bold'>Post not found</h1>
        )
    }

    return (
        <div className='max-w-11/12 mx-auto my-8'>
            <PostDetails post={result.data} />
        </div>
    )
}

export default PostDetailsPage