import { User } from 'src/app/core/interfaces/user';

// Update
export interface Campaign {
    id: number;
    user: User;
    userId: number;
    adName: string;
    spent: number;
    keyResults: number;
    clicks: number;
    averageCPM: number;
    starts: Date;
    ends: Date;
}
