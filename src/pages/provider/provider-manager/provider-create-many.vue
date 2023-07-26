<template>
    <el-dialog
        v-model="centerDialogVisible"
        width="40%"
        top="10%"
        center
        destroy-on-close
    >
        <el-card class="box-card">
            <el-upload
                class="upload-demo"
                drag
                action="/api/supplier/importSupplier"
                multiple
                :on-success="handleSuccess"
            >
                <i-ep-upload
                    class="center-x"
                    style="color: #ccc; font-size: 8rem"
                    ><upload-filled
                /></i-ep-upload>
                <div class="el-upload__text">
                    Drop file here or <em>click to upload</em>
                </div>
                <template #tip>
                    <div class="el-upload__tip">Excel</div>
                </template>
            </el-upload>
        </el-card>
    </el-dialog>
</template>

<script setup lang="ts">
import { apiRes } from '@/interface/type';
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

const handleSuccess = (res: apiRes<null>) => {
    if (res.code === 200) {
        ElMessage({
            type: 'success',
            message: '导入成功',
        });
        emit('update');
        centerDialogVisible.value = false;
    } else {
        ElMessage({
            type: 'error',
            message: res.msg,
        });
    }
};
</script>

<style lang="scss" scoped></style>
