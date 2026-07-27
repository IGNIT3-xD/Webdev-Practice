'use client'
import Image from 'next/image'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from 'next/link';
import {
    Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card"

type Post = {
    id: string,
    thumbnail: string,
    title: string,
    content: string,
    tags: string[],
}

type PostCardProps = {
    post: Post
}

const truncateWords = (text: string, maxLength: number) => {
    if (text.length <= maxLength)
        return text

    return text.slice(0, maxLength).trimEnd() + '....'
}

export function PostCard({ post }: PostCardProps) {
    // console.log(post);

    return (
        <Card className="relative mx-auto w-full max-w-sm pt-0">
            <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
            <Image
                src={post.thumbnail}
                alt={post.title}
                unoptimized
                width={800}
                height={500}
                className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
            />
            <CardHeader>
                <CardAction>
                    {
                        post.tags.map((tag) => <Badge key={tag} variant="secondary">{tag}</Badge>)
                    }
                </CardAction>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>
                    {truncateWords(post.content, 20)}
                </CardDescription>
            </CardHeader>
            <CardFooter>
                <Button className="w-full" asChild>
                    <Link href={`/posts/${post.id}`}>View Details</Link>
                </Button>
            </CardFooter>
        </Card>
    )
}
