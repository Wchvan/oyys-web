import { apiRes } from '../type';

/* 获取订单名字列表 */
export type getComboNameListResp = apiRes<{
    setInfoList: {
        setName: string;
        supplierId: number;
        supplierName: string;
    }[];
    total: number;
}>;

/* 获取评价列表 */
export type getReviewsParm = {
    page: number;
    pageSize: number;
    setName?: string;
    supplierId?: number;
};
export type getReviewsResp = apiRes<{
    commentList: {
        comment: string;
        id: number;
        image: string[];
        name: string;
        setName: string;
        star: number;
        time: string;
    }[];
    total: number;
}>;

/* 删除评论 */
export type delReviewsParm = {
    list: number[];
};

export type delReviewsResp = apiRes<null>;
