<template>
    <el-card class="w-full h-fit">
        <template #header>
            <div class="flex flex-row">
                <el-input
                    v-model="searchForm.name"
                    placeholder="请输入内容"
                    size="large"
                    class="w-1/3 mr-4"
                >
                    <template #prepend>供应商：</template>
                </el-input>
                <el-input
                    v-model="searchForm.manager"
                    placeholder="请输入内容"
                    size="large"
                    class="w-1/3 mr-4"
                >
                    <template #prepend>负责人：</template>
                </el-input>
                <el-button
                    id="search"
                    type="primary"
                    size="large"
                    @click="searchProvider"
                >
                    <template #icon> <i-ep-search></i-ep-search></template>
                    搜索
                </el-button>
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
                    <el-button
                        type="primary"
                        size="large"
                        @click="handleClick(scope.$index)"
                        >选择</el-button
                    >
                </template>
            </el-table-column>
        </el-table>

        <div class="py-4 relative">
            <el-pagination
                background
                layout="prev, pager, next"
                :total="total"
                class="center-x w-fit mt-2"
                :page-size="searchForm.pageSize"
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
    <provider-dialog
        :visible="detailVisible"
        :data="detailData"
    ></provider-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type {
    activeProviderType,
    providerType,
} from '@/interface/provider/index';
import useProviderStore from '@/store/provider/provider';
import { getActiveProvidersParm } from '@/interface/provider/api';
import providerDialog from './provider-dialog.vue';
import ProviderService from '@/api/provider/provider';

const emit = defineEmits<{
    (e: 'enterPick', id: number, name: string): void;
}>();

const providerStore = useProviderStore();
const total = ref<number>(0);

const searchForm = ref<getActiveProvidersParm>({
    address: '',
    manager: '',
    name: '',
    page: 1,
    pageSize: 8,
    phone: '',
});

/* 搜索相关 */
const searchProvider = () => {
    getProviders(searchForm.value);
    searchForm.value.page = 1;
};

const handleClick = (index: number) => {
    emit('enterPick', tableData.value[index].id, tableData.value[index].name);
};

/* 表格数据相关 */
const tableData = ref<activeProviderType[]>([]);

const getProviders = (params: getActiveProvidersParm) => {
    ProviderService.getActiveProviders(params).then((res) => {
        tableData.value = res.data.supplierList;
        total.value = res.data.total;
    });
};

const tableLabels = ref<Partial<Record<keyof activeProviderType, string>>>({
    id: '序号',
    name: '供应商名称',
    score: '分数',
    num: '五星次数',
    avg: '平均分',
});

getProviders(searchForm.value);

/* 页码改变相关 */
const handlePageChange = (value: number) => {
    searchForm.value.page = value;
    getProviders(searchForm.value);
};

const pageSizeChange = (value: number) => {
    searchForm.value.pageSize = value;
    searchForm.value.page = 1;
    getProviders(searchForm.value);
};

/* 对话框显示详情 */
const detailVisible = ref<boolean>(false);
const detailData = ref<providerType>({
    address: '',
    id: 0,
    manager: '',
    name: '',
    phone: '',
    status: false,
});

const showProviderDetail = (row: providerType) => {
    detailVisible.value = false;
    detailData.value = row;
    setTimeout(() => {
        detailVisible.value = true;
    });
};
</script>

<style lang="scss" scoped></style>
