<template>
    <el-main>
        <el-card class="w-full h-fit p-4">
            <template #header>
                <div class="flex flex-row">
                    <el-input
                        v-model="searchForm.dept"
                        placeholder="请输入内容"
                        size="large"
                        class="w-1/6 mr-2"
                    >
                        <template #prepend>部门名称：</template>
                    </el-input>
                    <el-input
                        v-model="searchForm.name"
                        placeholder="请输入内容"
                        size="large"
                        class="w-1/6 mr-2"
                    >
                        <template #prepend>姓名：</template>
                    </el-input>
                    <el-input
                        v-model="searchForm.workNum"
                        placeholder="请输入内容"
                        size="large"
                        class="w-1/6 mr-2"
                    >
                        <template #prepend>工号：</template>
                    </el-input>
                    <el-button
                        id="search"
                        type="primary"
                        size="large"
                        @click="searchEmployee"
                    >
                        <template #icon> <i-ep-search></i-ep-search></template>
                        搜索
                    </el-button>
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
                <el-table-column
                    fixed="right"
                    label="是否可点餐"
                    align="center"
                >
                    <template #default="scope">
                        <el-switch
                            v-model="tableData[scope.$index].status"
                            type="primary"
                            size="large"
                            @change="changeStatus(scope.$index)"
                        ></el-switch>
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
                    :page-size="searchForm.pageSize"
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
    </el-main>
    <employee-create
        :visible="createVisible"
        @update="initGetEmployee"
    ></employee-create>
    <employee-update
        :visible="detailVisible"
        :data="detailData"
        @update="getEmployees(searchForm)"
    ></employee-update>
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
import { EmployeeService } from '@/api/employee/employee';
import { employeeDataType } from '@/interface/employee';
import { getEmployeeListParm } from '@/interface/employee/api';
import { ElMessage } from 'element-plus';
import { ref } from 'vue';
import useEmployeeStore from '../../store/employee/employee';
import employeeCreate from './employee-create.vue';
import employeeUpdate from './employee-update.vue';

const employeeStore = useEmployeeStore();
const total = ref<number>(0);

/* 搜索相关 */
const searchForm = ref<getEmployeeListParm>({
    dept: '',
    name: '',
    page: 1,
    pageSize: 8,
    workNum: '',
});

const searchEmployee = () => {
    searchForm.value.page = 1;
    getEmployees(searchForm.value);
};

const changeStatus = (index: number) => {
    if (!tableData.value[index].status) {
        EmployeeService.banEmployee({
            id: tableData.value[index].id,
        }).then((res) => {
            if (res.code !== 200) {
                tableData.value[index].status = !tableData.value[index].status;
            } else {
                ElMessage({
                    type: 'success',
                    message: '禁用成功',
                });
            }
        });
    } else {
        EmployeeService.activateEmployee({
            id: tableData.value[index].id,
        }).then((res) => {
            if (res.code !== 200) {
                tableData.value[index].status = !tableData.value[index].status;
            } else {
                ElMessage({
                    type: 'success',
                    message: '启用成功',
                });
            }
        });
    }
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
    EmployeeService.delEmployee({
        list: list.value,
    }).then((res) => {
        if (res.code === 200) {
            ElMessage({
                type: 'success',
                message: '删除成功',
            });
            initGetEmployee();
        }
    });
    deleteVisible.value = false;
};

/* 表格数据相关 */
const tableData = ref<employeeDataType[]>([]);

const getEmployees = (params: getEmployeeListParm) => {
    checkedArr.value = new Array(searchForm.value.pageSize).fill(false);
    employeeStore.getEmloyeeList(params).then((res) => {
        if (res.code === 200) {
            tableData.value = employeeStore.employeeList;
            total.value = res.data.total;
        }
    });
};

const tableLabels = ref<Partial<Record<keyof employeeDataType, string>>>({
    id: '序号',
    dept: '部门名称',
    workNum: '工号',
    name: '姓名',
    phone: '手机号',
});

/* 初始请求 */
const initGetEmployee = () => {
    searchForm.value = {
        dept: '',
        name: '',
        page: 1,
        pageSize: 8,
        workNum: '',
    };
    getEmployees(searchForm.value);
};

initGetEmployee();

/* 页码改变相关 */
const handlePageChange = (value: number) => {
    searchForm.value.page = value;
    getEmployees(searchForm.value);
};
const pageSizeChange = (value: number) => {
    searchForm.value.pageSize = value;
    searchForm.value.page = 1;
    getEmployees(searchForm.value);
};

/* 新增员工 */
const createVisible = ref<boolean>(false);
const createDialog = () => {
    createVisible.value = false;
    setTimeout(() => {
        createVisible.value = true;
    });
};

/* 改变员工信息 */
const detailVisible = ref<boolean>(false);
const detailData = ref<employeeDataType>({
    id: 0,
    name: '',
    phone: '',
    dept: '',
    workNum: '',
    status: false,
});

const changeInfo = (row: employeeDataType, col: any) => {
    if (col.label !== '是否可点餐' && col.label !== '选择') {
        detailVisible.value = false;
        detailData.value = row;
        setTimeout(() => {
            detailVisible.value = true;
        });
    }
};
</script>

<style lang="scss" scoped></style>
