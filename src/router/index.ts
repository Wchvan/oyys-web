import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/combo',
    },
    {
        path: '/combo',
        name: 'Combo',
        meta: {
            title: '套餐选择',
            keepAlive: true,
        },
        component: () => import('@/pages/combo/combo.vue'),
    },
    {
        path: '/orders-pick',
        name: 'OrdersPick',
        meta: {
            title: '员工订单情况',
            keepAlive: true,
        },
        component: () => import('@/pages/orders-pick/orders-pick.vue'),
    },
    {
        path: '/orders-sum',
        name: 'OrdersSum',
        meta: {
            title: '订单汇总',
            keepAlive: true,
        },
        component: () => import('@/pages/orders-sum/orders-sum.vue'),
    },
    {
        path: '/orders-history',
        name: 'OrdersHistory',
        meta: {
            title: '历史订单',
            keepAlive: true,
        },
        component: () => import('@/pages/orders-history/orders-history.vue'),
    },
    {
        path: '/provider',
        name: 'provider',
        meta: {
            title: '供应商管理',
            keepAlive: true,
        },
        component: () => import('@/pages/provider/provider.vue'),
    },
    {
        path: '/user',
        name: 'user',
        meta: {
            title: '员工管理',
            keepAlive: true,
        },
        component: () => import('@/pages/user/user.vue'),
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

// 路由守卫

router.beforeEach((to, from, next) => {
    if (1) {
        next();
    } else {
        next();
    }
});

export default router;
