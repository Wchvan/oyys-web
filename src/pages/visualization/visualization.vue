<template>
    <el-main class="h-full">
        <el-container
            class="w-full h-full bg-white shadow-lg shadow-slate-400"
            style="border-radius: 1rem"
        >
            <el-main class="flex flex-row justify-center h-fit center-y">
                <div class="flex-1 h-96 mx-16" style="border-radius: 20px">
                    <popular-chart
                        v-if="popularData.length !== 0"
                        :data="popularData"
                    ></popular-chart>
                </div>
                <div class="flex-1 h-96 bg-slate-500 mx-16">
                    <top-chart
                        v-if="topData.length !== 0"
                        :data="topData"
                    ></top-chart>
                </div>
            </el-main>
        </el-container>
    </el-main>
</template>

<script setup lang="ts">
import { VisualizationService } from '@/api/visualization/visualization';
import { popularSetType, topSetType } from '@/interface/visualization';
import { ref } from 'vue';
import popularChart from './components/popular-chart.vue';
import topChart from './components/top-chart.vue';

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
</script>

<style lang="scss" scoped></style>
