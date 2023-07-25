import { apiRes } from '../type';

/* 获取员工列表 */
export type getEmployeeListParm = {
    dept: string;
    name: string;
    workNum: string;
    page: number;
    pageSize: number;
};

export type getEmployeeListResp = apiRes<{
    total: number;
    employeeList: {
        id: number;
        dept: string;
        name: string;
        phone: string;
        status: boolean;
        workNum: number;
    }[];
}>;

/* 新增员工 */
export type addEmployeeParm = {
    dept: string;
    name: string;
    phone: string;
    workNum: string;
};

export type addEmployeeResp = apiRes<null>;

/* 删除员工 */
export type delEmployeeParm = {
    list: number[];
};
export type delEmployeeResp = apiRes<null>;

/* 更新员工信息 */
export type updateEmployeeParm = {
    dept: string;
    id: number;
    name: string;
    phone: string;
    workNum: string;
};

export type updateEmployeeResp = apiRes<null>;

/* 禁用员工  */
export type banEmployeeParm = {
    id: number;
};

export type banEmployeeResp = apiRes<null>;

/* 激活员工 */
export type activateEmployeeParm = {
    id: number;
};

export type activateEmployeeResp = apiRes<null>;
