<template>
    <el-card class="w-full h-fit">
        <template #header>
            <div class="flex flex-row justify-between h-12">
                <div class="w-3/4">
                    <el-input
                        v-model="searchForm.name"
                        placeholder="请输入内容"
                        size="large"
                        style="width: 35%; margin-right: 0.5rem"
                    >
                        <template #prepend>供应商：</template>
                    </el-input>
                    <el-input
                        v-model="searchForm.manager"
                        placeholder="请输入内容"
                        size="large"
                        style="width: 35%; margin-right: 0.5rem"
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
                <div class="w-1/4 flex flex-row justify-end">
                    <el-button
                        type="danger"
                        class="w-20"
                        size="large"
                        @click="delFlag = !delFlag"
                    >
                        {{ delFlag ? '退出管理' : '管理' }}
                    </el-button>
                    <el-button
                        type="primary"
                        class="w-20"
                        size="large"
                        @click="createDialog"
                    >
                        新增
                    </el-button>
                    <el-button
                        type="primary"
                        class="w-24"
                        size="large"
                        @click="createManyDialog"
                    >
                        从EXCEL导入
                    </el-button>
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
            @row-click="changeInfo"
        >
            <el-table-column
                v-for="(item, index) in tableLabels"
                :key="index"
                :prop="index"
                :label="item"
                align="center"
            />
            <el-table-column fixed="right" label="今日可选" align="center">
                <template #default="scope">
                    <el-switch
                        v-model="tableData[scope.$index].status"
                        type="primary"
                        size="large"
                        @change="handleStatusChange(scope.$index)"
                    ></el-switch>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="查看套餐" align="center">
                <template #default="scope">
                    <el-button
                        type="primary"
                        size="large"
                        @click="enterCombo(scope.$index)"
                        >查看详情</el-button
                    >
                </template>
            </el-table-column>

            <el-table-column
                v-if="delFlag"
                fixed="right"
                label="选择"
                align="center"
            >
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
        <div class="py-4 relative">
            <el-pagination
                background
                layout="prev, pager, next"
                :total="total"
                class="center-x w-fit mt-2"
                :current-page="searchForm.page"
                @current-change="handlePageChange"
            />
            <div class="absolute right-8 w-fit top-5 mr-2">
                <el-select
                    v-model="searchForm.pageSize"
                    placeholder="每页8条"
                    size="large"
                    class="mr-5"
                    @change="pageSizeChange"
                >
                    >
                    <el-option label="每页5条" :value="5"></el-option>
                    <el-option label="每页8条" :value="8"></el-option>
                    <el-option label="每页10条" :value="10"></el-option>
                    <el-option label="每页15条" :value="15"></el-option>
                    <el-option label="每页20条" :value="20"></el-option>
                </el-select>
                <el-button
                    v-if="delFlag"
                    size="large"
                    type="danger"
                    @click="deleteVisible = true"
                >
                    删除
                </el-button>
            </div>
        </div>
    </el-card>
    <provider-detail
        :visible="detailVisible"
        :data="detailData"
        @update="getProviders(searchForm)"
    ></provider-detail>
    <provider-create
        :visible="createVisible"
        @update="initGetProviders"
    ></provider-create>
    <provider-create-many
        :visible="createManyVisible"
        @update="initGetProviders"
    ></provider-create-many>
    <el-dialog
        v-model="deleteVisible"
        width="40%"
        top="10%"
        center
        destroy-on-close
    >
        <div class="text-center text-2xl font-semibold">
            <span>确认删除？</span>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button type="danger" size="large" @click="handleDelete">
                    确认
                </el-button>
                <el-button
                    type="primary"
                    size="large"
                    @click="deleteVisible = false"
                >
                    取消
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { providerType } from '@/interface/provider/index';
import useProviderStore from '@/store/provider/provider';
import { getProvidersParm } from '@/interface/provider/api';
import providerDetail from './provider-detail.vue';
import providerCreate from './provider-create.vue';
import providerCreateMany from './provider-create-many.vue';
import ProviderService from '@/api/provider/provider';
import { ElMessage } from 'element-plus';

const emit = defineEmits<{
    (e: 'enterPick', id: number, name: string): void;
}>();

const providerStore = useProviderStore();
const total = ref<number>(0);

/* 搜索相关 */
const searchForm = ref<getProvidersParm>({
    address: '',
    manager: '',
    name: '',
    page: 1,
    pageSize: 8,
    phone: '',
});

const searchProvider = () => {
    searchForm.value.page = 1;
    getProviders(searchForm.value);
};

/* 删除相关 */
const delFlag = ref<boolean>(false);
const checkedMap = new Map();
const checkedArr = ref<boolean[]>(
    new Array(searchForm.value.pageSize).fill(false),
);
const checkedNum = ref<number>(0);
const handleChange = (index: number) => {
    if (checkedArr.value[index]) {
        checkedNum.value++;
        checkedMap.set(tableData.value[index].id, true);
    } else {
        checkedNum.value--;
        checkedMap.delete(tableData.value[index].id);
    }
};

const deleteVisible = ref<boolean>(false);
const handleDelete = async () => {
    const list = ref<number[]>([]);
    for (let i of checkedMap.keys()) {
        list.value.push(i);
    }
    ProviderService.deleteProvider({
        list: list.value,
    }).then((res) => {
        if (res.code === 200) {
            ElMessage({
                type: 'success',
                message: '删除成功',
            });
            initGetProviders();
        }
    });
    deleteVisible.value = false;
    delFlag.value = false;
};

/* 表格数据相关 */
const tableData = ref<providerType[]>([]);

const getProviders = (params: getProvidersParm) => {
    checkedArr.value = new Array(searchForm.value.pageSize).fill(false);
    checkedMap.clear();
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

/* 初始请求 */
const initGetProviders = () => {
    searchForm.value = {
        address: '',
        manager: '',
        name: '',
        page: 1,
        pageSize: 8,
        phone: '',
    };
    getProviders(searchForm.value);
};
initGetProviders();

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

/* 进入套餐管理 */
const enterCombo = (index: number) => {
    emit('enterPick', tableData.value[index].id, tableData.value[index].name);
};

/* 改变供应商信息 */
const detailVisible = ref<boolean>(false);
const detailData = ref<providerType>({
    address: '',
    id: 0,
    manager: '',
    name: '',
    phone: '',
    status: false,
});

const changeInfo = (row: providerType, col: any) => {
    if (col.label !== '今日可选' && col.label !== '选择') {
        detailVisible.value = false;
        detailData.value = row;
        setTimeout(() => {
            detailVisible.value = true;
        });
    }
};

/* 新增供应商 */
const createVisible = ref<boolean>(false);
const createDialog = () => {
    createVisible.value = false;
    setTimeout(() => {
        createVisible.value = true;
    });
};

/* 批量新增 */
const createManyVisible = ref<boolean>(false);
const createManyDialog = () => {
    createManyVisible.value = false;
    setTimeout(() => {
        createManyVisible.value = true;
    });
};

/* 禁用和启用供应商 */
const handleStatusChange = (index: number) => {
    if (!tableData.value[index].status) {
        ProviderService.banProvider({ id: tableData.value[index].id }).then(
            (res) => {
                if (res.code === 200) {
                    ElMessage({
                        type: 'success',
                        message: '禁用成功',
                    });
                } else {
                    tableData.value[index].status =
                        !tableData.value[index].status;
                }
            },
        );
    } else {
        ProviderService.activateProvider({
            id: tableData.value[index].id,
        }).then((res) => {
            if (res.code === 200) {
                ElMessage({
                    type: 'success',
                    message: '启用成功',
                });
            } else {
                tableData.value[index].status = !tableData.value[index].status;
            }
        });
    }
};
</script>

<style lang="scss" scoped></style>
