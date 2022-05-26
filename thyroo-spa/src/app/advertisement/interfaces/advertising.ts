import { User } from 'src/app/core/interfaces/user';
import { Campaign } from './campaign';

// Upper and lower case updated
// Code-Review failed.
export interface Advertising {
    id: number;
    user: User;
    adsCampaignId: number;
    adsCampaign: Campaign;
    objective: string;
    // profileTypes: ProfileType; // Not implemented
    // profileTypesId: number; // Not implemented
    // profileSubTypes: ProfileSubType; // Not implemented
    // profileSubTypesId: number; // Not implemented
    // businessOfInterest: BusinessOfInterest; // Not implemented
    // businessOfInterestId: number; // Not implemented
    // locationId: number; // Not implemented
    locationName: string;
    starts: Date; // Same as campaing
    ends: Date; // Same as campaing
    amount: number;
    title: string;
    description: string;
    url: string;
    sponsoredBy: string;
    active: boolean;
    clicks: number;
    impressions: number;
    engagements: number;
    audience: string;
}
