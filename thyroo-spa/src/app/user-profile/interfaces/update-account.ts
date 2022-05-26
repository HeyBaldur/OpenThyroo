export interface UpdateAccount {
    firstName: string;
    lastName: string;
}

export interface PhotoUrlDto {
    photoUrl: string;
}

export interface EmailDto {
    emailAddress: string;
}

export interface PasswordDto {
    password: string;
    newPassword: string;
    passwordConfirmation: string;
}
