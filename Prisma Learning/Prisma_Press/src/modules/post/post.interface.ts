import type { PostStatus } from "../../../generated/prisma/enums";

export interface IPost {
    title: string;
    content: string;
    thumnbnail?: string;
    is_featured?: boolean;
    status?: PostStatus;
    tags: string[];
}

export interface IUpdatePost {
    title: string;
    content: string;
    thumnbnail?: string;
    status?: PostStatus;
    tags: string[];
}