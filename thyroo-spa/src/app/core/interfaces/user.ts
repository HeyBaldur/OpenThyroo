export interface User {
    id: number;
    username: string;
    emailAddress: string;
    enrollmentDate: Date;
    lastActive: Date;
    city: string;
    country: string;
    firstName: string;
    lastName: string;
    photoUrl: string;
    summary: string;
    privateAccount: boolean;
    verifiedAccount: boolean;
    visibleForCompanies: boolean;
    following: boolean;
    uid: string;
    providerFullName: string;
    businessId: number;
    occupation: string;
    location: string;
}
