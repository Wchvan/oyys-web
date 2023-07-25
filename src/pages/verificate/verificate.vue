<template>
    <el-main class="h-full">
        <el-card class="h-full relative">
            <el-main class="main">
                <el-input v-model="code" size="large" style="width: 20rem">
                    <template #prepend> 核销码 </template>
                </el-input>
                <el-button
                    class="ml-4"
                    size="large"
                    type="success"
                    @click="verificate"
                >
                    确认
                </el-button>
            </el-main>
        </el-card>
    </el-main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { VerificateService } from '@/api/verificate/verificate';
import { ElMessage } from 'element-plus';

/* 核销订单 */
const code = ref<string>('');
const verificate = async () => {
    VerificateService.verificateCode({ code: code.value }).then((res) => {
        if (res.code === 200) {
            ElMessage({
                type: 'success',
                message: '核销成功',
            });
        }
    });
};
</script>

<style lang="scss" scoped>
.main {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>
