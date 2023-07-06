import { apiRes } from '../type';

export type getProvidersParm = {
    id?: number;
    name?: string;
    page: number;
    pageSize: number;
};

export type getProvidersResp = apiRes<{
    total: number;
    providersArr: {
        address: string;
        avatar: string[];
        id: number;
        manager: string;
        name: string;
        phone: string;
    }[];
}>;

export type getCombosParm = {
    name?: string;
    supplierId?: number;
    page: number;
    pageSize: number;
};

export type getCombosResp = apiRes<{
    total: number;
    setArr: {
        description: string;
        flavor: string;
        id: number;
        image: string[];
        supplierName: string;
        weight: string;
        name: string;
    }[];
}>;

export type createDailyComboParm = {
    setInfo: number[];
};

export type createDailyComboResp = apiRes<null>;

export type getQRCodeResp = apiRes<{
    QR: string;
    url: string;
}>;
