import { apiRes } from '../type';

/* 订单查询 */
export type getOrdersParm = {
    dept: string;
    name: string;
    page: number;
    pageSize: number;
};

export type getOrdersResp = apiRes<{
    total: number;
    orderList: {
        date: string;
        dept: string;
        id: number;
        name: string;
        setName: string;
        status: string;
        workNum: string;
    }[];
}>;

/* 按部门订单汇总 */
export type getOrdersDeptSumParm = {
    page: number;
    pageSize: number;
};

export type getOrdersDeptSumResp = apiRes<{
    collection: {
        name: string;
        dept: string;
        num: number;
    }[];
    total: number;
}>;

/* 按套餐汇总订单 */
export type getOrdersComboSumParm = {
    page: number;
    pageSize: number;
};

export type getOrdersComboSumResp = apiRes<{
    collection: {
        name: string;
        num: number;
    }[];
    total: number;
}>;
