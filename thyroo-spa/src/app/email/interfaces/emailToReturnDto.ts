// TODO: User is any
// We need to enhace this any to the real user interface

import { User } from 'src/app/core/interfaces/user';

export interface EmailToReturnDto {
    id: number;
    sender: any;
    senderId: number;
    recipient: User;
    recipientId: number;
    subject: string;
    emailBody: string;
    draft: boolean;
    favorite: boolean;
    read: boolean;
    messageSent: Date;
    dateRead: Date;
    senderDeleted: boolean;
    recipientDeleted: boolean;
}
