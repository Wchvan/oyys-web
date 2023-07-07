import {
    getOrdersParm,
    getOrdersResp,
    getOrdersSumParm,
    getOrdersSumResp,
} from '@/interface/order/api';
import { get } from '@/utils/request';

const getOrders = async (params: getOrdersParm) => {
    const res = (await get('/manager/getorders', params)) as getOrdersResp;
    return res;
};

const getOrdersSum = async (params: getOrdersSumParm) => {
    const res = (await get(
        '/manager/getAllOrders',
        params,
    )) as getOrdersSumResp;
    return res;
};

class OrderService {
    static getOrders = getOrders;
    static getOrdersSum = getOrdersSum;
}

export default OrderService;
