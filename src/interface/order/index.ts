export type orderType = {
    date: string;
    dept: string;
    id: number;
    name: string;
    setName: string;
    status: string;
    workNum: string;
};

export type getOrderTodayParm = {
    dept: string;
    name: string;
    page: number;
    pageSize: number;
};

export enum ordersSumOption {
    'order' = 0,
    'dept' = 1,
}

export type orderSumType =
    | {
          name: string;
          dept: string;
          num: number;
      }
    | {
          name: string;
          num: number;
      };
