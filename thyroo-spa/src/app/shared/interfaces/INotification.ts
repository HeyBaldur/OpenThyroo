import { User } from 'src/app/core/interfaces/user';

export interface INotification {
    id?: number;
    userId: number;
    user?: User;
    recipientId: number;
    notificationDate?: Date;
    description: string;
    url: string;
    read?: boolean;
}