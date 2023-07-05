import {
    logInParm,
    logInResp,
    logOutParm,
    logOutResp,
} from '@/interface/admin/api';
import { post } from '@/utils/request';

const logIn = async (params: logInParm) => {
    const res = (await post('/manager/login', params)) as logInResp;
    return res;
};

const logOut = async (params: logOutParm) => {
    const res = (await post('/manager/logout', params)) as logOutResp;
    return res;
};

class AdminServer {
    static logOut = logOut;
    static logIn = logIn;
}

export default AdminServer;
