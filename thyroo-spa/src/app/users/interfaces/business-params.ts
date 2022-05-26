import { User } from 'src/app/core/interfaces/user';
import { BusinessProfile } from 'src/app/user-profile/interfaces/business-profile';

export interface BusinessParams {
    businessTypeId: number;
    profileTypeId: number;
    profileSubTypeId: number;
    countryId: number;
    title: string;
    city: string;
}

export interface BusinessProfiles {
    id: number;
    businessProfile: BusinessProfile;
    userId: number;
    profileTypesId: number;
    profileSubTypesId: number;
    businessOfInterestId: number;
}


export interface Pagination {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
}

export class PaginatedResult<T> {
    result: T;
    pagination: Pagination;
}
