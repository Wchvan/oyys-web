import AdminServer from '@/api/admin/admin';
import {
    UserType,
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
        const id = ref<number>(-1);
        const userType = ref<UserType>(UserType.Admin);

        const init = () => {
            userName.value = '';
            token.value = '';
            id.value = -1;
            userType.value = UserType.Admin;
        };

        const login = async (params: loginParm) => {
            const res = (await AdminServer.login(params)) as loginResp;

            if (res.code === 200) {
                userName.value = params.username;
                token.value = res.data.token;
                id.value = res.data.id;
                userType.value = res.data.userType;
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
            id,
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
