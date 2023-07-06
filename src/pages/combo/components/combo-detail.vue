<template>
    <el-dialog v-model="centerDialogVisible" width="40%" top="5%" center destroy-on-close>
        <el-card class="box-card">
            <template #header>
                <div class="text-center text-2xl font-semibold">
                    <span>供应商详情</span>
                </div>
            </template>
            <el-carousel class="w-1/2 center-x mt-2" height="12rem">
                <el-carousel-item v-for="(item, index) in comboData.image" :key="index">
                    <img class="w-full h-full" :src="item"/>
                </el-carousel-item>
            </el-carousel>
            <div v-for="(item, key, index) in dataLabels" :key="index" class="text-lg py-2 flex flex-row">
                <div class="w-44 mr-3">{{ item }}:</div>
                <span>{{ comboData[key] }}</span>
            </div>
        </el-card>
        <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" size="large" @click="centerDialogVisible = false">
                    确认
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue';
import { comboType } from '@/interface/provider';


/* 对话框显示相关 */
const centerDialogVisible = ref<boolean>(false);
const props = defineProps<{
    visible: boolean;
    data: comboType;
}>();
const comboData = ref<comboType>(props.data)
watch(
    () => props,
    (newVal) => {
        centerDialogVisible.value = newVal.visible;
        comboData.value = newVal.data
    },
    { deep: true }
);

/* 标签 */
const dataLabels = ref<Partial<Record<keyof comboType, string>>>({
    id: '编号',
    name: '名称',
    description: '形容',
    supplierName: '供应商商',
    flavor: '风味',
    weight: '重量'
});

</script>

<style lang="scss" scoped></style>
