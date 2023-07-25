import useAdminStore from '@/store/admin/admin';
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/combo',
    },
    {
        path: '/login',
        name: 'Login',
        meta: {
            title: '用户登录',
            keepAlive: true,
            avoidAuth: true,
        },
        component: () => import('@/pages/login/login.vue'),
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
        path: '/provider',
        name: 'Provider',
        meta: {
            title: '供应商管理',
            keepAlive: true,
        },
        component: () => import('@/pages/provider/provider.vue'),
    },
    {
        path: '/employee',
        name: 'Employee',
        meta: {
            title: '员工管理',
            keepAlive: true,
        },
        component: () => import('@/pages/employee/employee.vue'),
    },
    {
        path: '/review',
        name: 'Review',
        meta: {
            title: '评价管理',
            keepAlive: true,
        },
        component: () => import('@/pages/review/review.vue'),
    },
    {
        path: '/verificate',
        name: 'Verificate',
        meta: {
            title: '核销订单',
            keepAlive: true,
        },
        component: () => import('@/pages/verificate/verificate.vue'),
    },
    {
        path: '/notice',
        name: 'Notice',
        meta: {
            title: '通知设置',
            keepAlive: true,
        },
        component: () => import('@/pages/notice/notice.vue'),
    },
    {
        path: '/visualization',
        name: 'Visualization',
        meta: {
            title: '可视化',
            keepAlive: true,
        },
        component: () => import('@/pages/visualization/visualization.vue'),
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

// 路由守卫

router.beforeEach((to, from, next) => {
    const userStore = useAdminStore();
    const isAuthenticated = userStore.userName;
    if (!to.matched.some((record) => record.meta.avoidAuth)) {
        if (!isAuthenticated) {
            next('/login');
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;
