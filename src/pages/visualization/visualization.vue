<template>
    <el-main class="h-full">
        <el-container
            class="w-full h-full bg-white shadow-lg shadow-slate-400"
            style="border-radius: 1rem"
        >
            <el-main class="flex flex-col h-full center-y">
                <div class="flex flex-row h-1/2 my-3">
                    <div class="flex-1 h-full mx-2" style="border-radius: 20px">
                        <popular-chart
                            v-if="popularData.length !== 0"
                            :data="popularData"
                        ></popular-chart>
                    </div>
                    <div class="flex-1 h-full bg-slate-500 mx-3">
                        <top-chart
                            v-if="topData.length !== 0"
                            :data="topData"
                        ></top-chart>
                    </div>
                </div>
                <div class="flex flex-row h-1/2 my-3">
                    <div class="flex-1 h-full mx-2" style="border-radius: 20px">
                        <liked-chart
                            v-if="likedSetData.length !== 0"
                            :data="likedSetData"
                        ></liked-chart>
                    </div>
                    <div class="flex-1 h-full bg-slate-500 mx-3">
                        <supplier-chart
                            v-if="supplierData.length !== 0"
                            :data="supplierData"
                        ></supplier-chart>
                    </div>
                </div>
            </el-main>
        </el-container>
    </el-main>
</template>

<script setup lang="ts">
import { VisualizationService } from '@/api/visualization/visualization';
import { likedSetType, popularSetType, supplierDataType, topSetType } from '@/interface/visualization';
import { ref } from 'vue';
import popularChart from './components/popular-chart.vue';
import topChart from './components/top-chart.vue';
import likedChart from './components/liked-chart.vue';
import supplierChart from './components/supplier-chart.vue';

const popularData = ref<popularSetType[]>([]);
VisualizationService.getPopularSets().then((res) => {
    if (res.code === 200) {
        popularData.value = res.data.setList;
    }
});

const topData = ref<topSetType[]>([]);
VisualizationService.getTopSets().then((res) => {
    if (res.code === 200) {
        topData.value = res.data.setList;
    }
});

const supplierData = ref<supplierDataType[]>([])
VisualizationService.getSupplierChart().then((res) => {
    if (res.code === 200) {
        supplierData.value = res.data.supplierList;
        console.log(supplierData.value)
    }
});

const likedSetData = ref<likedSetType[]>([])
VisualizationService.getLikedSetChart().then((res) => {
    if (res.code === 200) {
        likedSetData.value = res.data.setList.slice(0, 5);
    }
});

</script>

<style lang="scss" scoped></style>
