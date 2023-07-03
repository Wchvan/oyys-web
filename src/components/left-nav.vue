<template>
    <el-menu
        :default-active="activeIndex"
        router
        class="h-full"
        background-color="#D2E7F5"
        @select="changePath"
    >
        <el-menu-item index="/combo" class="h-16">
            <template #title>
                <div
                    class="text-xl text-center"
                    style="display: inline-flex; align-items: center"
                >
                    <i-ep-House></i-ep-House>
                    <span class="ml-2">套餐选择</span>
                </div>
            </template>
        </el-menu-item>
        <el-sub-menu index="/orders" class="h-fit">
            <template #title>
                <div
                    class="text-xl text-center h-16 w-full"
                    style="display: inline-flex; align-items: center"
                >
                    <i-ep-Tickets></i-ep-Tickets>
                    <span class="ml-2">订单管理</span>
                </div>
            </template>
            <el-menu-item
                index="/orders-pick"
                class="h-16"
                style="background-color: #fff"
            >
                <template #title>
                    <div
                        class="text-xl text-center h-16 w-full"
                        style="display: inline-flex; align-items: center"
                    >
                        <span class="ml-2">员工订单列表</span>
                    </div>
                </template>
            </el-menu-item>
            <el-menu-item
                index="/orders-sum"
                class="h-16"
                style="background-color: #fff"
            >
                <template #title>
                    <div
                        class="text-xl text-center h-16 w-full"
                        style="display: inline-flex; align-items: center"
                    >
                        <span class="ml-2">订单汇总</span>
                    </div>
                </template>
            </el-menu-item>
        </el-sub-menu>
        <el-menu-item index="/orders-history" class="h-16">
            <template #title>
                <div
                    class="text-xl text-center"
                    style="display: inline-flex; align-items: center"
                >
                    <i-ep-Stopwatch></i-ep-Stopwatch>
                    <span class="ml-2">历史订单</span>
                </div>
            </template>
        </el-menu-item>
        <el-sub-menu index="/manage" class="h-fit">
            <template #title>
                <div
                    class="text-xl text-center h-16 w-full"
                    style="display: inline-flex; align-items: center"
                >
                    <i-ep-Avatar></i-ep-Avatar>
                    <span class="ml-2">人员管理</span>
                </div>
            </template>
            <el-menu-item
                index="/provider"
                class="h-16"
                style="background-color: #fff"
            >
                <template #title>
                    <div
                        class="text-xl text-center h-16 w-full"
                        style="display: inline-flex; align-items: center"
                    >
                        <span class="ml-2">供应商</span>
                    </div>
                </template>
            </el-menu-item>
            <el-menu-item
                index="/user"
                class="h-16"
                style="background-color: #fff"
            >
                <template #title>
                    <div
                        class="text-xl text-center h-16 w-full"
                        style="display: inline-flex; align-items: center"
                    >
                        <span class="ml-2">员工</span>
                    </div>
                </template>
            </el-menu-item>
        </el-sub-menu>
    </el-menu>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();

const activeIndex = ref<string>(sessionStorage.getItem('index') || '/combo');

const changePath = (index: string) => {
    activeIndex.value = index;
    sessionStorage.setItem('index', activeIndex.value);
};
</script>

<style lang="scss" scoped></style>
