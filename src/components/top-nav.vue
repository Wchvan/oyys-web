<template>
    <div
        class="border-b-2 border-gray-400 flex flex-row justify-between h-full"
        style="background-color: #95b4ca"
    >
        <div
            class="flex flex-row py-1 flex-2 ml-2"
            style="cursor: pointer"
            @click="$router.push('/')"
        >
            <img :src="logoSrc" class="w-12 h-12" />
            <div class="self-center">
                <span
                    class="self-center ml-2 text-4xl font-fz navTitle"
                    style="color: #fff"
                    >食刻
                </span>
                <span
                    class="self-center ml-2 text-2xl font-xk"
                    style="color: #fff"
                    >|工作餐管理系统
                </span>
            </div>
        </div>
        <div class="flex flex-row py-1 flex-2 ml-2" style="cursor: pointer">
            <div class="self-center">
                <el-dropdown>
                    <span
                        class="self-center mr-2 text-2xl font-fz navTitle"
                        style="color: #fff"
                    >
                        {{ adminStore.userName }}
                        <el-icon class="el-icon--right">
                            <arrow-down />
                        </el-icon>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="logout">
                                <span class="text-lg">退出登录</span>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import logoSrc from '@/assets/favicon.png';
import { ArrowDown } from '@element-plus/icons-vue';
import useAdminStore from '@/store/admin/admin';
import { useRouter } from 'vue-router';

const router = useRouter();
const adminStore = useAdminStore();

const logout = async () => {
    adminStore.logout({ id: adminStore.id });
    router.push('/login');
};
</script>

<style lang="scss" scoped></style>
