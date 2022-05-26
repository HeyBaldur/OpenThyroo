import { IUserPost } from 'src/app/feed/interfaces/iPostUser';

export interface Article {
    id: number;
    title: string;
    description: string;
    likes: number;
    created: Date;
    privatePost: boolean;
    user: IUserPost;
    userId: number;
    photoUrl: string;
}

export interface ArticleToUpdateDto {
    id: number;
    title: string;
    description: string;
    userId: number;
}
