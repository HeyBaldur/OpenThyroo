import { IUserPost } from './iPostUser';

export interface IComment {
    id: number;
    postId: number;
    user: IUserPost;
    userId: number;
    description: string;
    created: Date;
    likes: number;
    commentsReplies?: IReplyComment[];
}

export interface IReplyComment {
    id: number;
    commentId: number;
    user: IUserPost;
    userId: number;
    description: string;
    created: Date;
    likes: number;
}
