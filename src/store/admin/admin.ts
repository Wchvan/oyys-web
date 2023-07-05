import AdminServer from '@/api/admin/admin';
import {
    logInParm,
    logInResp,
    logOutParm,
    logOutResp,
} from '@/interface/admin/api';
import { defineStore } from 'pinia';
import { ref } from 'vue';

const useAdminStore = defineStore(
    'admin',
    () => {
        const userName = ref<string>('');
        const token = ref<string>('');

        const init = () => {
            userName.value = '';
            token.value = '';
        };

        const logIn = async (params: logInParm) => {
            const res = (await AdminServer.logIn(params)) as logInResp;

            if (res.code === 200) {
                userName.value = params.username;
            }

            return res;
        };

        const logOut = async (params: logOutParm) => {
            const res = (await AdminServer.logOut(params)) as logOutResp;
            init();
            return res;
        };

        return {
            userName,
            token,
            logOut,
            logIn,
        };
    },
    {
        persist: {
            storage: sessionStorage, //修改存储位置
            key: 'adminInfo', //设置存储的key
            paths: ['token', 'userName'], //指定要长久化的字段
        },
    },
);

export default useAdminStore;
