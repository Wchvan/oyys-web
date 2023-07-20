<template>
    <el-card class="w-full h-fit">
        <template #header>
            <div class="flex flex-row">
                <el-input
                    v-model="searchForm.dept"
                    placeholder="请输入内容"
                    size="large"
                    class="w-1/4"
                >
                    <template #prepend>部门名称：</template>
                </el-input>
                <el-input
                    v-model="searchForm.name"
                    placeholder="请输入内容"
                    size="large"
                    class="w-1/4"
                >
                    <template #prepend>姓名：</template>
                </el-input>
                <el-input
                    v-model="searchForm.phone"
                    placeholder="请输入内容"
                    size="large"
                    class="w-1/4"
                >
                    <template #prepend>电话号码：</template>
                </el-input>
                <el-button id="search" type="primary" @click="searchProvider">
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
        >
            <el-table-column
                v-for="(item, index) in tableLabels"
                :key="index"
                :prop="index"
                :label="item"
                align="center"
            />
            <el-table-column fixed="right" label="是否绑定" align="center">
                <template #default="scope">
                    <el-switch
                        v-model="tableData[scope.$index].status"
                        :disabled="!tableData[scope.$index].status"
                        type="primary"
                        size="large"
                        @change="changeStatus(scope.$index)"
                    ></el-switch>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            class="center-x w-fit mt-2"
            :current-page="searchForm.page"
            @current-change="handlePageChange"
        />
    </el-card>
</template>

<script setup lang="ts">
import { EmployeeService } from '@/api/employee/employee';
import { employeeDataType } from '@/interface/employee';
import { getEmployeeListParm } from '@/interface/employee/api';
import { ElMessage } from 'element-plus';
import { ref } from 'vue';
import useEmployeeStore from '../../store/employee/employee';

const employeeStore = useEmployeeStore();
const total = ref<number>(0);

/* 搜索相关 */
const searchForm = ref<getEmployeeListParm>({
    dept: '',
    name: '',
    page: 1,
    pageSize: 8,
    phone: '',
});

const searchProvider = () => {
    getProviders(searchForm.value);
    searchForm.value.page = 1;
};

const changeStatus = (index: number) => {
    EmployeeService.unbindEmployee({ id: tableData.value[index].workNum }).then(
        (res) => {
            if (res.code !== 200) {
                tableData.value[index].status = true;
            } else {
                ElMessage({
                    type: 'success',
                    message: '解绑成功',
                });
            }
        },
    );
};

/* 表格数据相关 */
const tableData = ref<employeeDataType[]>([]);

const getProviders = (params: getEmployeeListParm) => {
    employeeStore.getEmloyeeList(params).then((res) => {
        if (res.code === 200) {
            tableData.value = employeeStore.employeeList;
            total.value = res.data.total;
        }
    });
};

const tableLabels = ref<Partial<Record<keyof employeeDataType, string>>>({
    dept: '部门名称',
    workNum: '工号',
    name: '姓名',
    phone: '手机号',
});

getProviders(searchForm.value);

/* 页码改变相关 */
const handlePageChange = (value: number) => {
    searchForm.value.page = value;
    getProviders(searchForm.value);
};
</script>

<style lang="scss" scoped></style>
