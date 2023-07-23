import { apiRes } from '../type';

export type loginParm = {
    password: string;
    username: string;
};

export enum UserType {
    Admin = 'ADMIN',
    Manager = 'MANAGER',
    User = 'USER',
}

export type loginResp = apiRes<{
    id: number;
    token: string;
    username: string;
    userType: UserType;
}>;

export type logoutParm = {
    token: string;
};

export type logoutResp = apiRes<null>;
