import {
    loginParm,
    loginResp,
    logoutParm,
    logoutResp,
} from '@/interface/admin/api';
import { post } from '@/utils/request';

const login = async (params: loginParm) => {
    const res = (await post('/managerlogin', params)) as loginResp;
    return res;
};

const logout = async (params: logoutParm) => {
    const res = (await post('/managerlogout', params)) as logoutResp;
    return res;
};

class AdminServer {
    static logout = logout;
    static login = login;
}

export default AdminServer;
