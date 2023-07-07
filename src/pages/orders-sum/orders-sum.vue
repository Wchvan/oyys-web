<template>
    <el-main>
        <el-card class="w-full h-fit ">
        <template #header>
            <div class=" text-3xl font-semibold font-fk">
                订单汇总
            </div>
            <div class=" flex flex-row justify-end">
                <el-select v-model="sumType" class="m-2"  size="large">
                    <el-option
                    v-for="(item, index) in options"
                    :key="index"
                    :label="index"
                    :value="item"
                    />
                </el-select>
            </div>
        </template>
        <!-- <el-table
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
            :current-page="page"
            @current-change="handlePageChange"
        /> -->
    </el-card>
    </el-main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import useOrderStore from '@/store/order/order'
import { ordersSumOption } from '@/interface/order';



const orderStore = useOrderStore();
const total = ref<number>(0);
const page = ref<number>(1);
const pageSize = ref<number>(10)
const sumType = ref<ordersSumOption>(ordersSumOption.order)

const options = ref({
    "套餐": ordersSumOption.order,
    "部门": ordersSumOption.dept
})


/* 表格数据相关 */
// const tableData = ref<orderType[]>([]);

// const getOrderList = async (params: getOrderTodayParm) => {
//     orderStore.getOrderToday(params).then(res => {
//         if (res.code === 200) {
//             tableData.value = res.data.ordersArr
//             total.value = res.data.total
//         }
//     })
// };

// const tableLabels = ref<Partial<Record<keyof orderType, string>>>({
//     dept: '部门名称',
//     name: '员工名称',
//     set: '套餐名称',
//     workNum: '套餐数量'
// });

// getOrderList(searchForm.value);

// /* 页码改变相关 */
// const handlePageChange = (value: number) => {
//     searchForm.value.page = value;
//     getOrderList(searchForm.value);
// };


</script>

<style lang="scss" scoped></style>
