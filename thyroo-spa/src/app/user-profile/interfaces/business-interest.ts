import { ProfileType } from './profile-type';
import { ProfileSubType } from './profile-sub-type';
import { BusinessOfInterest } from './business-of-interest';

export interface BusinessInterest {
    id: number;
    profileTypes: ProfileType;
    profileSubTypes: ProfileSubType;
    businessOfInterest: BusinessOfInterest;
}
