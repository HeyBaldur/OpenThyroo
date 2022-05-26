import { Country } from 'src/app/user-profile/interfaces/country';

// Business user profile
export interface User {
    id: number;
    userId: number;
    summary: string;
    occupation: string;
    emailContact: string;
    phoneContact: string;
    emailContactHidden: boolean;
    phoneContactVisibleHidden: boolean;
    knowAs: string;
    country: Country;
    countryId: number;
    availableFor: Country;
    availableForId: number;
    experienceYears: number;
    skillSet: string;
    accomplishments: string;
    legend: string;
    currentlyActive: boolean;
    photoUrl: string;
    website: string;
    profileVerified: boolean;
    companyName: string;
    city: string;
}

// Non business profile
export interface SingleUser {
    email: string;
    uid: string;
    photoUrl: string;
    providerFullName: string;
}
