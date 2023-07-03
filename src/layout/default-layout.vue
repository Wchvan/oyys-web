<template>
    <el-container class="layout">
        <el-header class=" p-0">
            <top-nav></top-nav>
        </el-header>
        <el-container class="w-full h-full">
            <el-aside class="h-full w-56">
                <left-nav></left-nav>
            </el-aside>
            <el-main>
                <slot></slot>
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup lang='ts'>
import topNav from '@/components/top-nav.vue'
import leftNav from '@/components/left-nav.vue';
</script>

<style lang='scss' scoped>
.layout{
    width: 100%;
    height: 100%;
}
</style>