import { get } from '@/utils/request';
import { getProvidersParm, getProvidersResp } from '@/interface/provider/api';

/* 获取所有供应商基本信息 */
const getProviders = async (params: getProvidersParm) => {
    const res = (await get('/manager/supplier', params)) as getProvidersResp;
    return res;
};

class ProviderService {
    static getProviders = getProviders;
}

export default ProviderService;
