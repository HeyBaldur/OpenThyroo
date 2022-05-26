export interface IUserPost {
    id: number;
    firstName: string;
    lastName: string;
    photoUrl: string;
    verifiedAccount: boolean;
    summary?: string;
    following?: boolean;
    uid: string;
    providerFullName: string;
    username: string;
    enrollmentDate?: Date;
    location?: string;
    occupation?: string;
}
