import { apiRes } from '../type';

export type loginParm = {
    username: string;
    password: string;
};

export type loginResp = apiRes<null>;

export type logoutParm = {
    token: string;
};

export type logoutResp = apiRes<null>;
