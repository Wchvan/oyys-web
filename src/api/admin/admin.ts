import {
    loginParm,
    loginResp,
    logoutParm,
    logoutResp,
    setNoticeParm,
    setNoticeResp,
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

const setNotice = async (params: setNoticeParm) => {
    const res = (await post('/setList/setNotice', params)) as setNoticeResp;
    return res;
};

class AdminServer {
    static logout = logout;
    static login = login;
    static setNotice = setNotice;
}

export default AdminServer;
