import {
    delReviewsParm,
    delReviewsResp,
    getComboNameListResp,
    getReviewsParm,
    getReviewsResp,
} from '@/interface/review/api';
import { del, get, post } from '@/utils/request';

/* 获取套餐列表 */
const getComboNameList = async () => {
    const res = (await get('/comment/getSetName')) as getComboNameListResp;
    return res;
};

/* 获取评价列表 */
const getReviews = async (params: getReviewsParm) => {
    const res = (await post('/comment/getComment', params)) as getReviewsResp;
    return res;
};

/* 删除评论 */
const delReviews = async (params: delReviewsParm) => {
    const res = (await post(
        '/comment/deleteComment',
        params,
    )) as delReviewsResp;
    return res;
};

export class ReviewService {
    static getReviews = getReviews;
    static getComboNameList = getComboNameList;
    static delReviews = delReviews;
}
