import { EmployeeService } from '@/api/employee/employee';
import { employeeDataType } from '@/interface/employee';
import { getEmployeeListParm } from '@/interface/employee/api';
import { defineStore } from 'pinia';
import { ref } from 'vue';

const useEmployeeStore = defineStore(
    'employee',
    () => {
        const employeeList = ref<employeeDataType[]>([]);

        const getEmloyeeList = async (params: getEmployeeListParm) => {
            const res = await EmployeeService.getEmloyeeList(params);
            if (res.code === 200) {
                employeeList.value = res.data.employeeList;
            }
            return res;
        };

        return {
            employeeList,
            getEmloyeeList,
        };
    },
    // {
    //     persist: {
    //         storage: sessionStorage, //修改存储位置
    //         key: 'adminInfo', //设置存储的key
    //         paths: ['token', 'userName'], //指定要长久化的字段
    //     },
    // },
);

export default useEmployeeStore;
