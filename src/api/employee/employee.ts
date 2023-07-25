import {
    getEmployeeListParm,
    getEmployeeListResp,
    banEmployeeParm,
    banEmployeeResp,
    activateEmployeeParm,
    addEmployeeParm,
    addEmployeeResp,
    delEmployeeParm,
    delEmployeeResp,
    updateEmployeeParm,
    updateEmployeeResp,
} from '@/interface/employee/api';
import { get, post } from '@/utils/request';

/* 获取员工列表 */
export const getEmployeeList = async (params: getEmployeeListParm) => {
    const res = (await post(
        '/employee/getEmployees',
        params,
    )) as getEmployeeListResp;
    return res;
};

/* 新增员工 */
export const addEmployee = async (params: addEmployeeParm) => {
    const res = (await post(
        '/employee/addEmployee',
        params,
    )) as addEmployeeResp;
    return res;
};

/* 删除员工 */
export const delEmployee = async (params: delEmployeeParm) => {
    const res = (await post(
        '/employee/deleteEmployee',
        params,
    )) as delEmployeeResp;
    return res;
};

/* 更新员工信息 */
export const updateEmployee = async (params: updateEmployeeParm) => {
    const res = (await post(
        '/employee/updateEmployee',
        params,
    )) as updateEmployeeResp;
    return res;
};

/* 禁用员工 */
export const banEmployee = async (params: banEmployeeParm) => {
    const res = (await get('/employee/banEmployee', params)) as banEmployeeResp;
    return res;
};

/* 激活员工 */
export const activateEmployee = async (params: activateEmployeeParm) => {
    const res = (await get(
        '/employee/activateEmployee',
        params,
    )) as getEmployeeListResp;
    return res;
};

export class EmployeeService {
    static getEmloyeeList = getEmployeeList;
    static addEmployee = addEmployee;
    static delEmployee = delEmployee;
    static updateEmployee = updateEmployee;
    static banEmployee = banEmployee;
    static activateEmployee = activateEmployee;
}
