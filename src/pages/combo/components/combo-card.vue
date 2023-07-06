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
            @row-click="showProviderDetail"
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
        <div class="flex justify-end">
            <el-button
                type="success"
                class="w-52"
                size="large"
                round
                @click="createDailyCombo"
                >提交并生成</el-button
            >
        </div>
    </el-card>
    <combo-detail :visible="detailVisible" :data="detailData"></combo-detail>
</template>

<script setup lang="ts">
import ProviderService from '@/api/provider/provider';
import { comboType } from '@/interface/provider';
import { getCombosParm } from '@/interface/provider/api';
import { ElMessage } from 'element-plus';
import { el } from 'element-plus/es/locale';
import { ref, watch } from 'vue';
import comboDetail from './combo-detail.vue';

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

/* 对话框显示详情 */
const detailVisible = ref<boolean>(false);
const detailData = ref<comboType>({
    id: 0,
    name: '',
    description: '',
    supplierName: '',
    flavor: '',
    weight: '',
    image: [],
});

const showProviderDetail = (row: comboType, column: any) => {
    if (column.label !== '选择') {
        detailVisible.value = false;
        detailData.value = row;
        setTimeout(() => {
            detailVisible.value = true;
            console.log(detailVisible.value);
        });
    }
};

/* 提交 */
const createDailyCombo = async () => {
    if (checkedNum.value < 3) {
        ElMessage({
            type: 'error',
            message: '请选择三个套餐',
        });
    } else {
        const setInfo = ref<number[]>([]);
        for (let i in checkedArr.value) {
            if (checkedArr.value[i] === true) {
                setInfo.value.push(tableData.value[i].id);
            }
        }
        const res = await ProviderService.createDailyCombo({
            setInfo: setInfo.value,
        });
        if (res.code === 200) {
            ElMessage({
                type: 'success',
                message: '已生成',
            });
        }
    }
};
</script>

<style lang="scss" scoped></style>
