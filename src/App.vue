<template>
    <defaultLayout v-if="!$route.meta.avoidAuth">
        <RouterView></RouterView>
    </defaultLayout>
    <RouterView v-else></RouterView>
</template>

<script setup lang="ts">
import defaultLayout from '@/layout/default-layout.vue';
</script>

<style lang="scss">
@import './styles/common.scss';
</style>
