import { IUserPost } from './iPostUser';

export interface IFollower {
    id: number;
    caUser: IUserPost;
    UserId: number;
    followeeId: number;
    following: boolean;
}
