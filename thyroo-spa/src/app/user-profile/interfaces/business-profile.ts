import { Country } from './country';

export interface BusinessProfile {
    userId: number;
    summary: string;
    occupation: string;
    emailContact: string;
    phoneContact: string;
    emailContactHidden: string;
    phoneContactVisibleHidden: string;
    knowAs: string;
    experienceYears: string;
    skillSet: string;
    accomplishments: string;
    legend: string;
    currentlyActive: boolean;
    country: Country;
    availableFor: Country;
    countryId: number;
    availableForId: number;
    photoUrl: string;
    website: string;
    profileVerified: boolean;
    companyName: string;
    city: string;
    address: string;
}
