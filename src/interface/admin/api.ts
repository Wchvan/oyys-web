import { apiRes } from '../type';

export type logInParm = {
    username: string;
    password: string;
};

export type logInResp = apiRes<null>;

export type logOutParm = {
    token: string;
};

export type logOutResp = apiRes<null>;
