import { get } from '@/utils/request';
import {
    getCombosParm,
    getCombosResp,
    getProvidersParm,
    getProvidersResp,
} from '@/interface/provider/api';

/* 获取所有供应商基本信息 */
const getProviders = async (params: getProvidersParm) => {
    const res = (await get('/manager/supplier', params)) as getProvidersResp;
    return res;
};
/* 获得供应商关联套餐 */
const getCombos = async (params: getCombosParm) => {
    const res = (await get('/manager/set', params)) as getCombosResp;
    return res;
};

class ProviderService {
    static getProviders = getProviders;
    static getCombos = getCombos;
}

export default ProviderService;
