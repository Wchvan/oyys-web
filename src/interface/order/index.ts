export type orderType = {
    dept: string;
    name: string;
    set: string;
    workNum: string;
};

export type getOrderTodayParm = {
    dept?: string;
    name?: string;
    page: number;
    pageSize: number;
};

export enum ordersSumOption {
    'order' = 0,
    'dept' = 1,
}

export type orderSumType = {
    num: number;
    set: string;
};
