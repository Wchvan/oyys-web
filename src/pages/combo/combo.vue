<template>
    <el-container class="w-full h-full p-4 flex-col">
        <el-breadcrumb :separator-icon="ArrowRight" class="w-full mb-5">
            <el-breadcrumb-item class="cursor-pointer text-lg" @click="back"
                >套餐选择</el-breadcrumb-item
            >
            <el-breadcrumb-item class="cursor-pointer text-lg" @click="back"
                >供应商选择</el-breadcrumb-item
            >
            <el-breadcrumb-item v-if="pickFlag" class="text-lg"
                >选择套餐</el-breadcrumb-item
            >
        </el-breadcrumb>
        <provider-card v-if="!pickFlag" @enterPick="enterPick"></provider-card>
        <combo-card v-else :id="providerId" :name="providerName"></combo-card>
    </el-container>
</template>

<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue';
import { ref } from 'vue';
import providerCard from './components/provider-card.vue';
import comboCard from './components/combo-card.vue';

/* 是否进入选套餐界面 */
const pickFlag = ref<boolean>(false);
const back = () => {
    pickFlag.value = false;
};

/* 进入选菜界面 */
const providerId = ref<number>(1);
const providerName = ref<string>('');
const enterPick = (id: number, name: string): void => {
    providerId.value = id;
    providerName.value = name;
    pickFlag.value = true;
};
</script>

<style lang="scss" scoped></style>
