import { get, post, del } from '@/utils/request';
import {
    activateComboParm,
    activateComboResp,
    activateProviderParm,
    addComboParm,
    addComboResp,
    addProviderParm,
    addProviderResp,
    banComboParm,
    banComboResp,
    banProviderParm,
    banProviderRes,
    createDailyComboParm,
    createDailyComboResp,
    deleteComboParm,
    deleteComboResp,
    deleteProviderParm,
    deleteProviderRes,
    getActiveCombosParm,
    getActiveCombosResp,
    getActiveProvidersParm,
    getActiveProvidersResp,
    getCombosParm,
    getCombosResp,
    getProvidersParm,
    getProvidersResp,
    updateComboParm,
    updateProviderParm,
    updateProviderRes,
} from '@/interface/provider/api';

/* 获取所有供应商基本信息 */
const getProviders = async (params: getProvidersParm) => {
    const res = (await post(
        '/supplier/getSuppliers',
        params,
    )) as getProvidersResp;
    return res;
};

/* 获取启用状态下的供应商列表 */
const getActiveProviders = async (params: getActiveProvidersParm) => {
    const res = (await post(
        '/setList/getSuppliers',
        params,
    )) as getActiveProvidersResp;
    return res;
};

/* 新增供应商 */
const addProvider = async (params: addProviderParm) => {
    const res = (await post(
        '/supplier/addSupplier',
        params,
    )) as addProviderResp;
    return res;
};

/* 禁用供应商 */
const banProvider = async (params: banProviderParm) => {
    const res = (await get('/supplier/banSupplier', params)) as banProviderRes;
    return res;
};

/* 删除供应商 */
const deleteProvider = async (params: deleteProviderParm) => {
    const res = (await post(
        '/supplier/deleteSupplier',
        params,
    )) as deleteProviderRes;
    return res;
};

/* 更改供应商信息 */
const updateProvider = async (params: updateProviderParm) => {
    const res = (await post(
        '/supplier/updateSupplier',
        params,
    )) as updateProviderRes;
    return res;
};

/* 获得供应商关联套餐 */
const getCombos = async (params: getCombosParm) => {
    const res = (await get(
        '/supplier/getSupplierSets',
        params,
    )) as getCombosResp;
    return res;
};

/* 获取供应商启用状态下的套餐 */
const getActiveCombos = async (params: getActiveCombosParm) => {
    const res = (await get('/setList/getSets', params)) as getActiveCombosResp;
    return res;
};

/* 生成每日套餐 */
const createDailyCombo = async (params: createDailyComboParm) => {
    const res = (await post(
        '/setList/createList',
        params,
    )) as createDailyComboResp;
    return res;
};

/* 启用供应商 */
const activateProvider = async (params: activateProviderParm) => {
    const res = (await get(
        '/supplier/activateSupplier',
        params,
    )) as banProviderRes;
    return res;
};

/* 新增套餐 */
const addCombo = async (params: addComboParm) => {
    const res = (await post('/set/addSet', params)) as addComboResp;
    return res;
};

/* 更新套餐信息 */
const updateCombo = async (params: updateComboParm) => {
    const res = (await post('/set/updateSet', params)) as addComboResp;
    return res;
};

/* 启用套餐 */
const activateCombo = async (params: activateComboParm) => {
    const res = (await get('/set/activateSet', params)) as activateComboResp;
    return res;
};

/* 禁用套餐 */
const banCombo = async (params: banComboParm) => {
    const res = (await get('/set/banSet', params)) as banComboResp;
    return res;
};

/* 删除套餐 */
const deleteCombo = async (params: deleteComboParm) => {
    const res = (await post('/set/deleteSet', params)) as deleteComboResp;
    return res;
};

class ProviderService {
    static getProviders = getProviders;
    static getActiveProviders = getActiveProviders;
    static addProvider = addProvider;
    static getCombos = getCombos;
    static getActiveCombos = getActiveCombos;
    static createDailyCombo = createDailyCombo;
    static activateProvider = activateProvider;
    static banProvider = banProvider;
    static deleteProvider = deleteProvider;
    static updateProvider = updateProvider;
    static addCombo = addCombo;
    static updateCombo = updateCombo;
    static activateCombo = activateCombo;
    static banCombo = banCombo;
    static deleteCombo = deleteCombo;
}

export default ProviderService;
