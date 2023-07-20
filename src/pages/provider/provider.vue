<template>
    <el-card class="w-full h-fit">
        <template #header>
            <el-input
                v-model="inputVal"
                placeholder="请输入内容"
                size="large"
                class="w-1/2"
            >
                <template #prepend>供应商名称：</template>
                <template #append>
                    <el-button
                        id="search"
                        type="primary"
                        @click="searchProvider"
                    >
                        <template #icon> <i-ep-search></i-ep-search></template>
                        搜索
                    </el-button>
                </template>
            </el-input>
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
            class="center-x w-fit mt-2"
            :current-page="page"
            @current-change="handlePageChange"
        />
    </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { providerType } from '@/interface/provider/index';
import useProviderStore from '@/store/provider/provider';
import { getProvidersParm } from '@/interface/provider/api';

const providerStore = useProviderStore();
const pageSize = ref<number>(8);
const total = ref<number>(0);
const page = ref<number>(1);

/* 搜索相关 */
const inputVal = ref<string>('');

const searchProvider = () => {
    getProviders({
        name: inputVal.value,
        page: 1,
        pageSize: pageSize.value,
    });
    page.value = 1;
};

/* 表格数据相关 */
const tableData = ref<providerType[]>([]);

const getProviders = (params: getProvidersParm) => {
    providerStore.getProviders(params).then((res) => {
        tableData.value = providerStore.providersArr;
        total.value = res.data.total;
    });
};

const tableLabels = ref<Partial<Record<keyof providerType, string>>>({
    id: '序号',
    name: '供应商名称',
    address: '地址',
    manager: '管理者',
    phone: '手机号',
});

getProviders({
    page: 1,
    pageSize: pageSize.value,
});

/* 页码改变相关 */
const handlePageChange = (value: number) => {
    page.value = value;
    getProviders({
        name: inputVal.value,
        page: value,
        pageSize: pageSize.value,
    });
};
</script>

<style lang="scss" scoped></style>
