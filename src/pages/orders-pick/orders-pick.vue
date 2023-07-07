<template>
    <el-main>
        <el-card class="w-full h-fit">
            <template #header>
                <div class="text-3xl font-semibold font-fk">员工订单详情</div>
                <div class="flex flex-row justify-end">
                    <div class="w-1/2">
                        <span class="text-lg font-semibold">套餐名称：</span>
                        <el-input
                            v-model="searchForm.name"
                            style="width: 30%"
                            class="mr-3"
                        ></el-input>
                        <span class="text-lg font-semibold">部门：</span>
                        <el-input
                            v-model="searchForm.dept"
                            style="width: 30%"
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
            <el-pagination
                background
                layout="prev, pager, next"
                :total="total"
                class="center-x w-fit mt-4"
                :current-page="searchForm.page"
                @current-change="handlePageChange"
            />
        </el-card>
    </el-main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { orderType, getOrderTodayParm } from '@/interface/order/index';
import useOrderStore from '@/store/order/order';

const orderStore = useOrderStore();
const total = ref<number>(0);

/* 搜索相关 */
const searchForm = ref<getOrderTodayParm>({
    page: 1,
    pageSize: 10,
    dept: '',
    name: '',
});

const searchOrders = () => {
    getOrderList(searchForm.value);
    searchForm.value.page = 1;
};

/* 表格数据相关 */
const tableData = ref<orderType[]>([]);

const getOrderList = async (params: getOrderTodayParm) => {
    orderStore.getOrderToday(params).then((res) => {
        if (res.code === 200) {
            tableData.value = res.data.ordersArr;
            total.value = res.data.total;
        }
    });
};

const tableLabels = ref<Partial<Record<keyof orderType, string>>>({
    dept: '部门名称',
    name: '员工名称',
    set: '套餐名称',
    workNum: '套餐数量',
});

getOrderList(searchForm.value);

/* 页码改变相关 */
const handlePageChange = (value: number) => {
    searchForm.value.page = value;
    getOrderList(searchForm.value);
};
</script>

<style lang="scss" scoped></style>
