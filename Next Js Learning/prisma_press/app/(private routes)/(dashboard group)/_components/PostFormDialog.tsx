'use client'

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Textarea } from '@/components/ui/textarea';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus } from 'lucide-react';
import { useActionState, useEffect } from 'react';
import { createPost } from '@/app/(private routes)/(dashboard group)/_actions/getMyPosts';
import { toast } from 'sonner';

export function PostFormDialog() {
    const [state, action, pending] = useActionState(createPost, null)

    useEffect(() => {
        if (!state) return

        if (state.success) {
            toast.success(state.message)
        } else {
            toast.error(state.message)
        }
    }, [state])

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline"><Plus /> Create Post</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
                <form action={action}>
                    <DialogHeader>
                        <DialogTitle>Create a post</DialogTitle>
                        <DialogDescription>
                            Create your post here. Enter title, content, thumnail and tags. Click save when you&apos;re done.
                        </DialogDescription>
                    </DialogHeader>
                    <FieldGroup className="mt-4">
                        <Field>
                            <Label htmlFor="title">Title</Label>
                            <Input id="title" name="title" placeholder="Post title here." />
                        </Field>
                        <Field>
                            <Label htmlFor="content">Content</Label>
                            <Textarea className="max-h-[30vh] overflow-y-auto" id="content" name="content" placeholder="Post content here" />
                        </Field>
                        <Field>
                            <Label htmlFor="thumnbnail">Thumnbnail</Label>
                            <Input id="thumnbnail" name="thumnbnail" placeholder="Post thumnbnail url here" />
                        </Field>
                        <Field>
                            <Label htmlFor="tags">Tags</Label>
                            <Input id="tags" name="tags" placeholder="Use comma (,) for more than one tags" />
                        </Field>
                    </FieldGroup>
                    <DialogFooter className="mt-4">
                        <DialogClose asChild>
                            <Button variant="outline" type="button">Cancel</Button>
                        </DialogClose>
                        <Button type="submit" disabled={pending}>
                            {pending ? 'Creating post' : 'Create Post'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}