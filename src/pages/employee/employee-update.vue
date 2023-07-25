<template>
    <el-dialog
        v-model="centerDialogVisible"
        width="40%"
        top="10%"
        center
        destroy-on-close
    >
        <el-card class="box-card">
            <template #header>
                <div class="text-center text-2xl font-semibold">
                    <span>员工详情</span>
                </div>
            </template>
            <div
                v-for="(item, key, index) in dataLabels"
                :key="index"
                class="text-lg py-2 flex flex-row"
            >
                <div class="w-44 mr-3">{{ item }}:</div>
                <el-input
                    v-model="employeeData[key]"
                    :input-style="{ fontSize: '1.25rem' }"
                    :disabled="key === 'id'"
                ></el-input>
            </div>
        </el-card>
        <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" size="large" @click="changeInfo">
                    确认
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { EmployeeService } from '@/api/employee/employee';
import ProviderService from '@/api/provider/provider';
import { employeeDataType } from '@/interface/employee';
import { updateEmployeeParm } from '@/interface/employee/api';
import { ElMessage } from 'element-plus';
import { watch, ref } from 'vue';
const emit = defineEmits<{
    (e: 'update'): void;
}>();

/* 对话框显示相关 */
const centerDialogVisible = ref<boolean>(false);
const props = defineProps<{
    visible: boolean;
    data: employeeDataType;
}>();
const employeeData = ref<employeeDataType>(props.data);

watch(
    () => props,
    (newVal) => {
        centerDialogVisible.value = newVal.visible;
        employeeData.value = newVal.data;
    },
    { deep: true },
);

/* 标签 */
const dataLabels = ref<Partial<Record<keyof employeeDataType, string>>>({
    id: '编号',
    name: '名字',
    phone: '手机号码',
    dept: '部门',
    workNum: '工号',
});

const changeInfo = async () => {
    for (let i in employeeData.value) {
        if (employeeData.value[i as keyof employeeDataType] === '') {
            ElMessage({
                type: 'error',
                message: '请填好每个输入框',
            });
            return;
        }
    }
    EmployeeService.updateEmployee({
        id: employeeData.value.id,
        name: employeeData.value.name,
        phone: employeeData.value.phone,
        dept: employeeData.value.dept,
        workNum: employeeData.value.workNum,
    }).then((res) => {
        if (res.code === 200) {
            ElMessage({
                type: 'success',
                message: '修改成功',
            });
            emit('update');
            centerDialogVisible.value = false;
        }
    });
};
</script>

<style lang="scss" scoped></style>
