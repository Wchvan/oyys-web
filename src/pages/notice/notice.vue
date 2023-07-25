<template>
    <el-main class="h-full">
        <el-card class="h-full relative">
            <el-main class="main flex flex-row justify-center">
                <textarea
                    v-model="notice"
                    size="large"
                    style="
                        width: 40rem;
                        height: 10rem;
                        font-size: 1.25rem;
                        border: 2px solid #ccc;
                    "
                    placeholder="输入通知信息"
                >
                </textarea>
                <el-button
                    class="ml-4 self-end"
                    size="large"
                    type="success"
                    @click="serNotice"
                >
                    确认
                </el-button>
            </el-main>
        </el-card>
    </el-main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import AdminServer from '@/api/admin/admin';

/* 核销订单 */
const notice = ref<string>('');
const serNotice = async () => {
    AdminServer.setNotice({ notice: notice.value }).then((res) => {
        if (res.code === 200) {
            ElMessage({
                type: 'success',
                message: '通知发布成功',
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
