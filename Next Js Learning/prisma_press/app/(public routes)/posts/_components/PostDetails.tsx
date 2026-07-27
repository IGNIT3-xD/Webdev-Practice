import Image from 'next/image'
import { Badge } from "@/components/ui/badge"

type PostData = {
    thumbnail: string,
    title: string,
    content: string,
    tags: string[],
}

type PostDetailsProps = {
    post: PostData
}

export function PostDetails({ post }: PostDetailsProps) {
    // console.log(post);

    return (
        <article className="mx-auto max-w-3xl">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                <Image
                    src={post.thumbnail}
                    alt={post.title}
                    unoptimized
                    height={500}
                    width={500}
                    className="object-cover"
                />
            </div>

            <div className="mt-6 flex flex-wrap gap-1">
                {post.tags?.map((tag) => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
            </div>

            <h1 className="mt-4 text-3xl font-bold tracking-tight">{post.title}</h1>

            <div className="mt-4 whitespace-pre-wrap text-muted-foreground">
                {post.content}
            </div>
        </article>
    )
}