import { IUserPost } from './iPostUser';

export interface IFollowee {
    id: number;
    followee: IUserPost;
    UserId: number;
    followeeId: number;
}
