export interface User {
    id: number;
    email: string;
    firstname: string;
    lastname: string;
    expiresIn: Date;
    captcha: string;
    twofaenabled: boolean;
    emailverified: boolean;
    logout: boolean;

}
