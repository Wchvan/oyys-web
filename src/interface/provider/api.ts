import { apiRes } from '../type';

/* 获取所有供应商基本信息 */
export type getProvidersParm = {
    address: string;
    manager: string;
    name: string;
    page: number;
    pageSize: number;
    phone: string;
};

export type getProvidersResp = apiRes<{
    total: number;
    supplierList: {
        address: string;
        id: number;
        manager: string;
        name: string;
        phone: string;
        status: boolean;
    }[];
}>;

/* 获取启用状态下的供应商列表 */
export type getActiveProvidersParm = {
    address: string;
    manager: string;
    name: string;
    page: number;
    pageSize: number;
    phone: string;
};
export type getActiveProvidersResp = apiRes<{
    total: number;
    supplierList: {
        address: string;
        id: number;
        manager: string;
        name: string;
        phone: string;
        status: boolean;
    }[];
}>;

/* 新增供应商 */
export type addProviderParm = {
    address: string;
    manager: string;
    name: string;
    phone: string;
};

export type addProviderResp = apiRes<null>;

/* 启用供应商 */
export type activateProviderParm = {
    id: number;
};

export type activateProviderRes = apiRes<null>;

/* 禁用供应商 */
export type banProviderParm = {
    id: number;
};

export type banProviderRes = apiRes<null>;

/* 删除供应商 */
export type deleteProviderParm = {
    list: number[];
};

export type deleteProviderRes = apiRes<null>;

/* 修改供应商信息 */
export type updateProviderParm = {
    address: string;
    id: number;
    manager: string;
    name: string;
    phone: string;
};

export type updateProviderRes = apiRes<null>;

/* 获得供应商关联套餐 */
export type getCombosParm = {
    id: number;
};

export type getCombosResp = apiRes<{
    total: number;
    setList: {
        description: string;
        flavor: string;
        id: number;
        image: string;
        name: string;
        status: boolean;
        weight: string;
    }[];
}>;

/* 获取供应商启用状态下的套餐 */
export type getActiveCombosParm = {
    id: number;
};

export type getActiveCombosResp = apiRes<{
    setList: {
        description: string;
        flavor: string;
        id: number;
        image: string;
        name: string;
        status: boolean;
        weight: string;
    }[];
    total: number;
}>;

/* 生成每日套餐 */
export type createDailyComboParm = {
    deadline: string;
    setIdList: number[];
};

export type createDailyComboResp = apiRes<null>;

/* 新增套餐 */
export type addComboParm = {
    description: string;
    flavor: string;
    image: any;
    name: string;
    supplierId: number;
    weight: string;
};

export type addComboResp = apiRes<null>;

/* 修改套餐信息 */
export type updateComboParm = {
    description: string;
    flavor: string;
    id: number;
    image: string;
    name: string;
    supplierId: number;
    weight: string;
};

export type updateComboResp = apiRes<null>;

/* 启用套餐 */
export type activateComboParm = {
    id: number;
};
export type activateComboResp = apiRes<null>;

/* 禁用套餐 */
export type banComboParm = {
    id: number;
};
export type banComboResp = apiRes<null>;

/* 删除套餐 */
export type deleteComboParm = {
    list: number[];
};
export type deleteComboResp = apiRes<null>;
