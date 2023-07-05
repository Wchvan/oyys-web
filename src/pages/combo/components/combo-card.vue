<template>
    <el-card class="w-full h-fit">
        <template #header>
            <div class="w-fit center-x text-2xl font-semibold">
                {{ providerName }}提供的套餐
            </div>
        </template>
        <el-table
            ref="tableRef"
            :data="tableData"
            style="width: 100%; height: fit-content"
            size="large"
            row-key="date"
            header-row-class-name="text-xl font-bold text-center"
            row-class-name="text-lg font-semibold"
        >
            <el-table-column
                v-for="(item, index) in tableLabels"
                :key="index"
                :prop="index"
                :label="item"
                align="center"
            />
            <el-table-column fixed="right" label="选择" align="center">
                <template #default="scope">
                    <input
                        v-model.value="checkedArr[scope.$index]"
                        type="checkbox"
                        class="w-8 h-8"
                        @change="handleChange(scope.$index)"
                    />
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            class="center-x w-fit mt-4"
            @current-change="handlePageChange"
        />
    </el-card>
</template>

<script setup lang="ts">
import ProviderService from '@/api/provider/provider';
import { comboType } from '@/interface/provider';
import { getCombosParm } from '@/interface/provider/api';
import { ref, watch } from 'vue';

const props = defineProps<{
    id: number;
    name: string;
}>();
const providerId = ref<number>(props.id);
const providerName = ref<string>(props.name);
watch(
    () => props,
    (newVal) => {
        providerId.value = newVal.id;
        providerName.value = newVal.name;
    },
    { deep: true },
);

const pageSize = ref<number>(8);
const total = ref<number>(0);

/* 表格相关 */
const tableData = ref<comboType[]>([]);

const tableLabels = ref<Partial<Record<keyof comboType, string>>>({
    id: '序号',
    name: '套餐名称',
});

const getCombos = async (params: getCombosParm) => {
    ProviderService.getCombos(params).then((res) => {
        if (res.code === 200) {
            tableData.value = res.data.setArr;
            total.value = res.data.total;
        }
    });
};
getCombos({
    supplierId: providerId.value,
    page: 0,
    pageSize: pageSize.value,
});

/* 页码改变相关 */
const handlePageChange = (value: number) => {
    getCombos({
        supplierId: providerId.value,
        page: value,
        pageSize: pageSize.value,
    });
};

/* 选中相关 */
const checkedArr = ref<boolean[]>(new Array(8).fill(false));
const checkedNum = ref<number>(0);
const handleChange = (index: number) => {
    if (checkedArr.value[index]) {
        if (checkedNum.value === 3) {
            checkedArr.value[index] = false;
        } else {
            checkedNum.value++;
        }
    } else {
        checkedNum.value--;
    }
};
</script>

<style lang="scss" scoped></style>
