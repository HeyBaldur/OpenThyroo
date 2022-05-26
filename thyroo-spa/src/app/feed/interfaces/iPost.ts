import { IUserPost } from './iPostUser';
import { IComment } from './iCommets';
import { ILikeDet } from './iLikeDet';
import { ICategory } from './iCategory';

export interface IPost {
    id: number;
    title: string;
    description: any; // Post
    likes: number;
    created: Date;
    privatePost: boolean;
    userId: number;
    user: IUserPost;
    comments: IComment[];
    likeDet: ILikeDet[];
    liked?: boolean;
    photoUrl?: string;
    category: ICategory;
    url: string;
}
