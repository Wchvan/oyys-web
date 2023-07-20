<template>
    <el-main>
        <el-card class="w-full h-fit">
            <template #header>
                <div class="text-3xl font-semibold font-fk">订单汇总</div>
                <div class="flex flex-row justify-end">
                    <el-select
                        v-model="searchForm.type"
                        class="m-2"
                        size="large"
                        @change="handleTypeChange"
                    >
                        <el-option
                            v-for="(item, index) in options"
                            :key="index"
                            :label="index"
                            :value="item"
                        />
                    </el-select>
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
import { ordersSumOption, orderSumType } from '@/interface/order';
import { getOrdersSumParm } from '@/interface/order/api';
import OrderService from '@/api/order/order';

const total = ref<number>(0);

const options = ref({
    套餐: ordersSumOption.order,
    部门: ordersSumOption.dept,
});

const searchForm = ref<getOrdersSumParm>({
    page: 1,
    pageSize: 10,
    type: ordersSumOption.order,
});

/* 表格数据相关 */
const tableData = ref<orderSumType[]>([]);

const getOrderList = async (params: getOrdersSumParm) => {
    OrderService.getOrdersSum(params).then((res) => {
        if (res.code === 200) {
            tableData.value = res.data.deptsArr.deptsArr;
            total.value = res.data.total;
        }
    });
};

const tableLabels = ref<Partial<Record<keyof orderSumType, string>>>({
    set: '名称',
    num: '数量',
});

getOrderList(searchForm.value);

/* 页码改变相关 */
const handlePageChange = (value: number) => {
    searchForm.value.page = value;
    getOrderList(searchForm.value);
};

/* 选项改变相关 */
const handleTypeChange = (value: ordersSumOption) => {
    searchForm.value.type = value;
    getOrderList(searchForm.value);
};
</script>

<style lang="scss" scoped></style>
