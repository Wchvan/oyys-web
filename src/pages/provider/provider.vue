<template>
    <el-container class="w-full h-full p-4 flex-col">
        <el-breadcrumb :separator-icon="ArrowRight" class="w-full mb-5">
            <el-breadcrumb-item class="cursor-pointer text-lg" @click="back"
                >供应商管理</el-breadcrumb-item
            >
            <el-breadcrumb-item v-if="pickFlag" class="text-lg"
                >套餐管理</el-breadcrumb-item
            >
        </el-breadcrumb>
        <provider-manager
            v-if="!pickFlag"
            @enterPick="enterPick"
        ></provider-manager>
        <combo-manager
            v-else
            :id="providerId"
            :name="providerName"
        ></combo-manager>
    </el-container>
</template>

<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue';
import { ref } from 'vue';
import providerManager from './provider-manager/provider-manager.vue';
import comboManager from './combo-manager/combo-manager.vue';

/* 是否进入选套餐界面 */
const pickFlag = ref<boolean>(false);
const back = () => {
    pickFlag.value = false;
};

/* 进入选菜界面 */
const providerId = ref<number>(1);
const providerName = ref<string>('');
const enterPick = (id: number, name: string): void => {
    pickFlag.value = true;
    providerId.value = id;
    providerName.value = name;
};
</script>

<style lang="scss" scoped></style>
