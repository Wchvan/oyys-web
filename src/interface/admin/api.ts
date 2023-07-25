import { apiRes } from '../type';

/* 登录 */
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

/* 登出 */
export type logoutParm = {
    id: number;
};

export type logoutResp = apiRes<null>;

/* 设置通知 */
export type setNoticeParm = {
    notice: string;
};

export type setNoticeResp = apiRes<null>;
