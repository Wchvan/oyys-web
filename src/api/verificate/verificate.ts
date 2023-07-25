import {
    verificateCodeParm,
    verificateCodeResp,
} from '@/interface/verificate/api';
import { get } from '@/utils/request';

const verificateCode = async (params: verificateCodeParm) => {
    const res = (await get('/verify', params)) as verificateCodeResp;
    return res;
};

export class VerificateService {
    static verificateCode = verificateCode;
}
