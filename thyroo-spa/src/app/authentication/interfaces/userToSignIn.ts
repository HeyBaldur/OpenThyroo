export interface UserToSignIn {
    email: string;
    uid: string;
    photoUrl: string;
    providerFullName: string;
}

export interface SignInCredentials {
    emailAddress: string;
    password: string;
}

export interface SignUpCredentials {
    emailAddress: string;
    password: string;
    username: string;
    firstName: string;
    lastName: string;
}


