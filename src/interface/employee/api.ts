import { apiRes } from '../type';

/* 获取员工列表 */
export type getEmployeeListParm = {
    dept: string;
    name: string;
    page: number;
    pageSize: number;
    phone: string;
};

export type getEmployeeListResp = apiRes<{
    total: number;
    usersArr: {
        dept: string;
        name: string;
        phone: string;
        /**
         * 1为绑定，0为未绑定
         */
        status: boolean;
        workNum: number;
    }[];
}>;

/* 解绑员工 */
export type unbindEmployeeParm = {
    id: number;
};

export type unbindEmployeeResp = apiRes<null>;
