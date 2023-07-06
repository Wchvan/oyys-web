<template>
<div class=" w-full h-full login-bg relative">
    <div class=" w-1/2 absolute" style="top:25%">
      <div class="text-5xl w-fit center-x font-fz font-medium">食刻工作餐管理系统</div>
      <el-form
                    id="login-form"
                    ref="loginFormRef"
                    status-icon
                    :model="loginForm"
                    :rules="rules"
                    class=" mt-28 w-1/2 center-x"
                >
                    <el-form-item prop="username">
                        <el-input
                            v-model="loginForm.username"
                            size="large"
                            placeholder="输入账号"
                            class="h-11"
                        >
                            <template #prepend>
                                <i-ep-user class="text-xl" />
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input
                            v-model="loginForm.password"
                            size="large"
                            placeholder="输入密码"
                            class="h-11"
                            type="password"
                            show-password
                        >
                            <template #prepend>
                                <i-ep-lock class="text-xl" />
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-popover
                            placement="top-start"
                            :width="180"
                            trigger="hover"
                            content="可以联系管理员修改密码"
                        >
                            <template #reference>
                                <el-link >登录遇到问题？</el-link>
                            </template>
                        </el-popover>
                    </el-form-item>
                    <el-button
                        type="primary"
                        class="center-x w-1/2"
                        size="large"
                        round
                        @click="submitForm(loginFormRef)"
                        >登录</el-button
                    >
                </el-form>
    </div>
</div>
</template>

<script setup lang='ts'>
import { reactive, ref } from 'vue';
import { ElMessage, FormInstance, FormRules } from 'element-plus';
import { useRouter } from 'vue-router';
import useAdminStore from '@/store/admin/admin';
import { loginParm } from '@/interface/admin/api';

const adminStore = useAdminStore();
const router = useRouter();

/* 提交的表单 */
const loginForm = reactive<loginParm>({
    username: '',
    password: '',
});

const loginFormRef = ref<FormInstance>();

/* 表单校验规则 */
const validateUser = (rule: any, value: string, callback: any) => {
    if (value === '') {
        callback(new Error('请输入账号！'));
    } else {
        callback();
    }
};

const validatePass = (rule: any, value: string, callback: any) => {
    if (value === '') {
        callback(new Error('请输入密码!'));
    } else if (value.length < 6 || value.length > 12) {
        callback(new Error('密码长度为6到12位'));
    } else {
        callback();
    }
};

const rules = reactive<FormRules>({
    username: [{ validator: validateUser, trigger: 'blur' }],
    password: [{ validator: validatePass, trigger: 'blur' }],
});

/* 提交表单函数 */
const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.validate((valid, error) => {
        if (valid) {
            adminStore.login(loginForm).then((res) => {
                if (res.code === 200) {
                    router.push('/');
                } else {
                    ElMessage({
                        showClose: true,
                        message: res.msg,
                        type: 'error',
                    });
                }
            });
        } else {
            console.log('error submit!');
            return false;
        }
    });
};
</script>

<style lang='scss' scoped>
.login-bg{
  background: url('@/assets/login-bg.png') no-repeat center;
  background-size: 100% 100%;
}
</style>