<template>
    <el-dialog
        v-model="centerDialogVisible"
        width="55rem"
        top="10%"
        center
        destroy-on-close
    >
        <el-card class="box-card">
            <template #header>
                <div class="text-center text-2xl font-semibold">
                    <span>今日套餐</span>
                </div>
            </template>
            <el-container>
                <el-aside width="15rem">
                    <img :src="resData.QR || QR" class="w-40 h-40 center" />
                </el-aside>
                <el-main>
                    <div
                        v-for="(item, key, index) in dataLabels"
                        :key="index"
                        class="text-lg py-2 flex flex-row w-full"
                    >
                        <div class="w-36 mx-3">{{ item }}:</div>
                        <span>{{ resData[key] }}</span>
                    </div>
                </el-main>
            </el-container>
        </el-card>
        <template #footer>
            <el-button
                class="w-1/4"
                type="primary"
                size="large"
                round
                @click="centerDialogVisible = false"
                >确认</el-button
            >
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue';
import { resDataType } from '@/interface/provider';
import QR from '@/assets/qr.png';

/* 对话框显示相关 */
const centerDialogVisible = ref<boolean>(false);
const props = defineProps<{
    visible: boolean;
    data: resDataType;
}>();
const resData = ref<resDataType>(props.data);
watch(
    () => props,
    (newVal) => {
        centerDialogVisible.value = newVal.visible;
        resData.value = newVal.data;
    },
    { deep: true },
);

/* 标签 */
const dataLabels = ref<Partial<Record<keyof resDataType, string>>>({
    provider: '供应商',
    date: '截止时间',
    url: '网页链接',
    manager: '负责人',
});
</script>

<style lang="scss" scoped></style>
