export interface UserDetails {
    uid: string;
    about: string;
    email: string;
}

export interface UserAbout {
    id: number;
    uid: string;
    about: string;
    lastUpdate: Date;
    email: string;
}