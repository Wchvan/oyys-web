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
                    <span>新增员工</span>
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
                ></el-input>
            </div>
        </el-card>
        <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" size="large" @click="addProvider">
                    确认
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { EmployeeService } from '@/api/employee/employee';
import { addEmployeeParm } from '@/interface/employee/api';
import { ElMessage } from 'element-plus';
import { watch, ref } from 'vue';
const emit = defineEmits<{
    (e: 'update'): void;
}>();

/* 对话框显示相关 */
const centerDialogVisible = ref<boolean>(false);
const props = defineProps<{
    visible: boolean;
}>();
watch(
    () => props,
    (newVal) => {
        centerDialogVisible.value = newVal.visible;
    },
    { deep: true },
);

const employeeData = ref<addEmployeeParm>({
    name: '',
    phone: '',
    dept: '',
    workNum: '',
});

/* 标签 */
const dataLabels = ref<Partial<Record<keyof addEmployeeParm, string>>>({
    name: '名称',
    phone: '手机号码',
    dept: '部门名称',
    workNum: '工号',
});

const addProvider = async () => {
    for (let i in employeeData.value) {
        if (employeeData.value[i as keyof addEmployeeParm] === '') {
            ElMessage({
                type: 'error',
                message: '请填好每个输入框',
            });
            return;
        }
    }
    EmployeeService.addEmployee(employeeData.value).then((res) => {
        if (res.code === 200) {
            ElMessage({
                type: 'success',
                message: '成功',
            });
            emit('update');
            centerDialogVisible.value = false;
        }
    });
};
</script>

<style lang="scss" scoped></style>
