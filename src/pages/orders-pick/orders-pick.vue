<template>
    <el-main>
        <el-card class="w-full h-fit">
            <template #header>
                <div class="text-3xl font-semibold font-fk">员工订单详情</div>
                <div class="flex flex-row justify-end w-full">
                    <span class="text-lg font-semibold">套餐名称：</span>
                    <el-input
                        v-model="searchForm.name"
                        style="width: 16rem"
                        class="mr-3"
                    ></el-input>
                    <span class="text-lg font-semibold">部门：</span>
                    <el-input
                        v-model="searchForm.dept"
                        style="width: 16rem"
                        class="mr-3"
                    ></el-input>
                    <el-button
                        type="primary"
                        round
                        class="w-24"
                        @click="searchOrders"
                        >查询</el-button
                    >
                </div>
            </template>
            <el-table
                ref="tableRef"
                :data="tableData"
                style="width: 100%; height: fit-content"
                size="large"
                row-key="date"
                header-row-class-name="text-xl font-bold text-center"
                row-class-name="text-lg font-semibold cursor-pointer"
            >
                <el-table-column
                    v-for="(item, index) in tableLabels"
                    :key="index"
                    :prop="index"
                    :label="item"
                    align="center"
                />
            </el-table>
            <div class="py-4 relative">
                <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="total"
                    :page-size="searchForm.pageSize"
                    class="center-x w-fit mt-2"
                    :current-page="searchForm.page"
                    @current-change="handlePageChange"
                />
                <div class="absolute right-8 w-fit top-5">
                    <el-select
                        v-model="searchForm.pageSize"
                        placeholder="每页8条"
                        size="large"
                        @change="pageSizeChange"
                    >
                        <el-option label="每页5条" :value="5"></el-option>
                        <el-option label="每页8条" :value="8"></el-option>
                        <el-option label="每页10条" :value="10"></el-option>
                        <el-option label="每页15条" :value="15"></el-option>
                        <el-option label="每页20条" :value="20"></el-option>
                    </el-select>
                </div>
            </div>
        </el-card>
    </el-main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { orderType } from '@/interface/order/index';
import { getOrdersParm } from '@/interface/order/api';
import useOrderStore from '@/store/order/order';

const orderStore = useOrderStore();
const total = ref<number>(0);

/* 搜索相关 */
const searchForm = ref<getOrdersParm>({
    page: 1,
    pageSize: 8,
    dept: '',
    name: '',
});

const searchOrders = () => {
    getOrderList(searchForm.value);
    searchForm.value.page = 1;
};

/* 表格数据相关 */
const tableData = ref<orderType[]>([]);

const getOrderList = async (params: getOrdersParm) => {
    orderStore.getOrderToday(params).then((res) => {
        if (res.code === 200) {
            tableData.value = res.data.orderList;
            total.value = res.data.total;
        }
    });
};

const tableLabels = ref<Partial<Record<keyof orderType, string>>>({
    id: '订单号',
    workNum: '工号',
    name: '姓名',
    setName: '套餐名',
    dept: '部门',
    date: '时间',
    status: '是否核销',
});

getOrderList(searchForm.value);

/* 页码改变相关 */
const handlePageChange = (value: number) => {
    searchForm.value.page = value;
    getOrderList(searchForm.value);
};

const pageSizeChange = (value: number) => {
    searchForm.value.pageSize = value;
    searchForm.value.page = 1;
    getOrderList(searchForm.value);
};
</script>

<style lang="scss" scoped></style>
