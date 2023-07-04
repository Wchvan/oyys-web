<template>
    <div
        class="border-b-2 border-gray-400 flex flex-row justify-start h-full"
        style="background-color: #95b4ca"
    >
    <div
            class="flex flex-row py-1 flex-2 ml-2"
            style="cursor: pointer"
            @click="$router.push('/')"
        >
            <img :src="logoSrc" class="w-12 h-12" />
            <div class="self-center">
                <span
                    class="self-center ml-2 text-4xl font-fz navTitle"
                    style="color: #fff"
                    >食刻
                </span>
                <span
                    class="self-center ml-2 text-2xl font-xk"
                    style="color: #fff"
                    >|工作餐管理系统
                </span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import logoSrc from '@/assets/favicon.png'
</script>

<style lang="scss" scoped></style>
