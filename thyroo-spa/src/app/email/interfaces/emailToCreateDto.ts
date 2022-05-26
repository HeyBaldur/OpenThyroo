export interface EmailToCreateDto {
    senderId: number;
    recipientId: number;
    subject: string;
    emailBody: string;
    draft: boolean;
    favorite: boolean;
    // messageSent: Date;
}
