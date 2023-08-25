<template>
    <el-main>
        <el-card class="w-full h-fit">
            <template #header>
                <div class="text-3xl font-semibold font-fk">订单汇总</div>
                <div class="flex flex-row justify-end">
                    <el-select
                        v-model="type"
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
            <div class="py-4 relative">
                <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="total"
                    class="center-x w-fit mt-2"
                    :page-size="pageSize"
                    :current-page="page"
                    @current-change="handlePageChange"
                />
                <div class="absolute right-8 w-fit top-5">
                    <el-select
                        v-model="pageSize"
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
import { ref, computed } from 'vue';
import { ordersSumOption, orderSumType } from '@/interface/order';
import OrderService from '@/api/order/order';

const total = ref<number>(0);

const options = ref({
    套餐: ordersSumOption.order,
    部门: ordersSumOption.dept,
});

const page = ref<number>(1);
const pageSize = ref<number>(8);
const type = ref<ordersSumOption>(ordersSumOption.order);

/* 表格数据相关 */
const tableData = ref<orderSumType[]>([]);

const getOrderList = async () => {
    if (type.value === ordersSumOption.order) {
        OrderService.getOrdersComboSum({
            page: page.value,
            pageSize: pageSize.value,
        }).then((res) => {
            if (res.code === 200) {
                console.log(res.data);
                tableData.value = res.data.collection;
            }
        });
    } else {
        OrderService.getOrdersDeptSum({
            page: page.value,
            pageSize: pageSize.value,
        }).then((res) => {
            if (res.code === 200) {
                tableData.value = res.data.collection;
            }
        });
    }
};

const tableLabels = computed(() => {
    if (type.value === ordersSumOption.order) {
        return {
            name: '套餐名称',
            num: '数量',
        };
    } else {
        return {
            name: '套餐名称',
            dept: '部门名称',
            num: '数量',
        };
    }
});

getOrderList();

/* 页码改变相关 */
const handlePageChange = (value: number) => {
    page.value = value;
    getOrderList();
};
const pageSizeChange = (value: number) => {
    pageSize.value = value;
    page.value = 1;
    getOrderList();
};

/* 选项改变相关 */
const handleTypeChange = (value: ordersSumOption) => {
    type.value = value;
    getOrderList();
};
</script>

<style lang="scss" scoped></style>
