import { User } from 'src/app/users/interfaces/user';

export interface UserMatched {
    id: number;
    businessProfile: User;
    businessProfileId: number;
    targetBusinessProfile: User;
    targetBusinessProfileId: number; // Current user
    matchDate: Date;
    user: any;
}
