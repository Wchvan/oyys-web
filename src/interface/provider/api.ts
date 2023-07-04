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
