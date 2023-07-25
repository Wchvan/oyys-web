import { apiRes } from '../type';

export type getPopularSetsResp = apiRes<{
    setList: {
        id: number;
        name: string;
        star: number;
        status: boolean;
        supplierName: string;
    }[];
}>;

export type getTopSetsResp = apiRes<{
    setList: {
        id: number;
        name: string;
        num: number;
        status: boolean;
        supplierName: string;
    }[];
}>;
