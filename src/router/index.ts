import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
    // {
    //     path: '/admin-log',
    //     name: 'AdminLog',
    //     meta: {
    //         title: '系统日志',
    //         keepAlive: true,
    //         admin: true, // 是否只有admin才能访问
    //     },
    //     component: () => import('@/pages/admin/log/log.vue'),
    // },
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
