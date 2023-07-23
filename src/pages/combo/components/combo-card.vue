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
            row-class-name="text-lg font-semibold cursor-pointer"
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
        <!-- <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            class="center-x w-fit mt-4"
            @current-change="handlePageChange"
        /> -->
        <div class="flex justify-end">
            <el-button
                type="success"
                class="w-52 mt-3"
                size="large"
                round
                @click="createDailyCombo"
                >提交并生成</el-button
            >
        </div>
    </el-card>
    <combo-detail :visible="detailVisible" :data="detailData"></combo-detail>
    <combo-res :visible="resVisible" :data="resData"></combo-res>
</template>

<script setup lang="ts">
import ProviderService from '@/api/provider/provider';
import { comboDetailType, comboType, resDataType } from '@/interface/provider';
import { getCombosParm } from '@/interface/provider/api';
import useAdminStore from '@/store/admin/admin';
import { getEndDay } from '@/utils/day/day';
import { ElMessage } from 'element-plus';
import { ref, watch } from 'vue';
import comboDetail from './combo-detail.vue';
import comboRes from './combo-res.vue';

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

// const pageSize = ref<number>(8);
const total = ref<number>(0);

/* 表格相关 */
const tableData = ref<comboType[]>([]);

const tableLabels = ref<Partial<Record<keyof comboType, string>>>({
    id: '序号',
    name: '套餐名称',
});

const getCombos = async () => {
    const res = await ProviderService.getActiveCombos({ id: providerId.value });
    if (res.code === 200) {
        tableData.value = res.data.setList;
        total.value = res.data.total;
    }
    return res;
};
getCombos();

/* 页码改变相关 */
// const handlePageChange = async (value: number) => {
//     const res = await getCombos();
//     if (res.code === 200) {
//         checkedArr.value = new Array(8).fill(false);
//         for (let i in res.data.setArr) {
//             if (checkedMap.get(res.data.setArr[i].id)) {
//                 checkedArr.value[i] = true;
//             }
//             console.log();
//         }
//     }
// };

/* 选中相关 */
const checkedMap = new Map();
const checkedArr = ref<boolean[]>(new Array(8).fill(false));
const checkedNum = ref<number>(0);
const handleChange = (index: number) => {
    if (checkedArr.value[index]) {
        if (checkedNum.value === 3) {
            checkedArr.value[index] = false;
            checkedMap.delete(tableData.value[index].id);
        } else {
            checkedNum.value++;
            checkedMap.set(tableData.value[index].id, true);
        }
    } else {
        checkedNum.value--;
        checkedMap.delete(tableData.value[index].id);
    }
};

/* 对话框显示详情 */
const detailVisible = ref<boolean>(false);
const detailData = ref<comboDetailType>({
    description: '',
    flavor: '',
    id: -1,
    image: '',
    name: '',
    status: true,
    weight: '',
    supplierName: '',
});

const showProviderDetail = (row: comboType, column: any) => {
    if (column.label !== '选择') {
        detailVisible.value = false;
        detailData.value = Object.assign(row, {
            supplierName: providerName.value,
        });
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
        for (let i of checkedMap.keys()) {
            setInfo.value.push(i);
        }
        const res = await ProviderService.createDailyCombo({
            setIdList: setInfo.value,
        });
        if (res.code === 200) {
            ElMessage({
                type: 'success',
                message: '已生成当日套餐',
            });
            resDialog();
        }
    }
};

/* 生成成功的对话框 */
const resVisible = ref<boolean>(false);
const resData = ref<resDataType>({
    provider: providerName.value,
    date: '',
    manager: useAdminStore().userName,
    url: '',
    QR: '',
});

const resDialog = () => {
    resData.value = {
        provider: providerName.value,
        date: getEndDay(),
        manager: useAdminStore().userName,
        url: 'https://ts1.cn.mm.bing.net/',
        QR: 'https://ts1.cn.mm.bing.net/th/id/R-C.260ff59a2bd16317baec7ba8a64a6325?rik=d5SKVqE7wLw62g&riu=http%3a%2f%2fphoto.16pic.com%2f00%2f07%2f42%2f16pic_742184_b.jpg&ehk=rVj8KASsMZwodFmuSX2aa6g7rQgKEBsF9p%2fLz3DiSVA%3d&risl=&pid=ImgRaw&r=0',
    };
    resVisible.value = false;
    setTimeout(() => {
        resVisible.value = true;
    });
};
</script>

<style lang="scss" scoped></style>
