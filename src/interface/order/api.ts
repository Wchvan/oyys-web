import { apiRes } from '../type';

export type getOrdersParm = {
    dept?: string;
    name?: string;
    page: number;
    pageSize: number;
    today: number;
};

export type getOrdersResp = apiRes<{
    total: number;
    ordersArr: {
        dept: string;
        name: string;
        set: string;
        workNum: string;
    }[];
}>;

export type getOrdersSumParm = {
    page: number;
    pageSize: number;
    type?: number;
};

export type getOrdersSumResp = apiRes<null>;
