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

export type getSupplierChartResp = apiRes<{
    supplierList: {
        avg: number;
        id: number;
        name: string;
        num: number;
        score: number;
    }[];
}>;

export type getLikedSetChartResp = apiRes<{
    setList: {
        id: number;
        name: string;
        num: number;
        status: boolean;
        supplierName: string;
    }[];
}>;
