import {
    getEmployeeListParm,
    getEmployeeListResp,
    unbindEmployeeParm,
    unbindEmployeeResp,
} from '@/interface/employee/api';
import { get, post } from '@/utils/request';

export const getEmployeeList = async (params: getEmployeeListParm) => {
    const res = (await get('/manager/users', params)) as getEmployeeListResp;
    return res;
};

export const unbindEmployee = async (params: unbindEmployeeParm) => {
    const res = (await post('/manager/users', params)) as unbindEmployeeResp;
    return res;
};

export class EmployeeService {
    static getEmloyeeList = getEmployeeList;
    static unbindEmployee = unbindEmployee;
}
