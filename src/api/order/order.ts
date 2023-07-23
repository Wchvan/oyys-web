import {
    getOrdersComboSumParm,
    getOrdersComboSumResp,
    getOrdersDeptSumParm,
    getOrdersDeptSumResp,
    getOrdersParm,
    getOrdersResp,
} from '@/interface/order/api';
import { get, post } from '@/utils/request';

/* 订单查询 */
const getOrders = async (params: getOrdersParm) => {
    const res = (await post('/orders/getOrders', params)) as getOrdersResp;
    return res;
};

/* 按部门订单汇总 */
const getOrdersDeptSum = async (params: getOrdersDeptSumParm) => {
    const res = (await post(
        '/orders/getCollectionByDept',
        params,
    )) as getOrdersDeptSumResp;
    return res;
};

/* 按套餐订单汇总 */
const getOrdersComboSum = async (params: getOrdersComboSumParm) => {
    const res = (await post(
        '/orders/getCollectionBySet',
        params,
    )) as getOrdersComboSumResp;
    return res;
};

class OrderService {
    static getOrders = getOrders;
    static getOrdersDeptSum = getOrdersDeptSum;
    static getOrdersComboSum = getOrdersComboSum;
}

export default OrderService;
