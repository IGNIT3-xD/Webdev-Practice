import { use } from "react";

const AsyncAwait = ({ postsPromise }) => {
    const posts = use(postsPromise)
    console.log(posts);

    return (
        <div>
            <h3>Posts: {posts.length}</h3>

            {
                posts.map(post => <Post key={post.id} post={post}></Post>)
            }
        </div>
    );
};

function Post({ post }) {
    // console.log(post);
    return (
        <div className="card2">
            <h3>Title: {post.title}</h3>
            <p>{post.body}</p>
        </div>
    )
}

export default AsyncAwait;