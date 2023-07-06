import AdminServer from '@/api/admin/admin';
import {
    loginParm,
    loginResp,
    logoutParm,
    logoutResp,
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

        const login = async (params: loginParm) => {
            const res = (await AdminServer.login(params)) as loginResp;

            if (res.code === 200) {
                userName.value = params.username;
            }

            return res;
        };

        const logout = async (params: logoutParm) => {
            const res = (await AdminServer.logout(params)) as logoutResp;
            init();
            return res;
        };

        return {
            userName,
            token,
            logout,
            login,
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
