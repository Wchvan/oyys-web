import OrderService from '@/api/order/order';
import { getOrderTodayParm, orderType } from '@/interface/order';
import { getOrdersResp } from '@/interface/order/api';
import { defineStore } from 'pinia';
import { ref } from 'vue';

const useOrderStore = defineStore(
    'order',
    () => {
        const orderList = ref<orderType[]>([]);

        const getOrderToday = async (params: getOrderTodayParm) => {
            const res = (await OrderService.getOrders({
                ...params,
            })) as getOrdersResp;
            if (res.code === 200) {
                orderList.value = res.data.ordersArr;
            }
            return res;
        };

        return {
            orderList,
            getOrderToday,
        };
    },
    // {
    //     persist: {
    //         storage: sessionStorage, //修改存储位置
    //         key: 'adminInfo', //设置存储的key
    //         paths: ['token', 'userName'], //指定要长久化的字段
    //     },
    // },
);

export default useOrderStore;
