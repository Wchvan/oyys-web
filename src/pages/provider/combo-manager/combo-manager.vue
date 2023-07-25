<template>
    <el-container class="w-full h-full overflow-auto">
        <el-header
            class="border-b-2 border-gray-200 text-center text-3xl font-semibold relative"
        >
            供应商：{{ providerName }}
            <div class="w-1/4 flex flex-row justify-end absolute right-2 top-0">
                <el-button
                    :type="delFlag ? 'warning' : 'danger'"
                    class="w-20"
                    size="large"
                    @click="delFlag = !delFlag"
                >
                    {{ delFlag ? '退出管理' : '管理' }}
                </el-button>
                <el-button
                    type="primary"
                    class="w-20"
                    size="large"
                    @click="createDialog"
                >
                    新增
                </el-button>
                <el-button
                    v-if="delFlag"
                    type="danger"
                    class="w-20"
                    size="large"
                    @click="deleteVisible = true"
                >
                    删除
                </el-button>
            </div>
        </el-header>
        <el-main
            class="flex flex-row justify-between flex-wrap"
            style="height: 2000px"
        >
            <el-card
                v-for="(item, index) in comboList"
                :key="index"
                class="h-64 my-4"
                style="width: 45%; padding: 0"
            >
                <el-container class="w-full h-60">
                    <el-main
                        class="flex flex-row h-48 w-full"
                        style="padding: 0"
                    >
                        <div class="w-44 h-44 bg-blue-400">
                            <img :src="item.image" class="w-full h-full" />
                        </div>
                        <div class="ml-4 flex-1 h-44">
                            <div
                                v-for="(item, key) in comboLabels"
                                :key="key"
                                class="mt-1"
                            >
                                <span>{{ item }}：</span>
                                <span v-if="key === 'id'">{{
                                    comboList[index][key]
                                }}</span>
                                <el-input
                                    v-if="key !== 'id' && changeFlag[index]"
                                    v-model="comboList[index][key]"
                                    style="width: 70%"
                                ></el-input>
                                <span v-if="key !== 'id' && !changeFlag[index]">
                                    {{ comboList[index][key] }}
                                </span>
                            </div>
                        </div>
                        <div
                            v-if="delFlag"
                            class="flex flex-row justify-end relative"
                            style="flex: 0.125"
                        >
                            <input
                                v-model="checkedArr[index]"
                                type="checkbox"
                                class="w-6 h-6"
                                @change="handleChange(index)"
                            />
                        </div>
                    </el-main>
                    <el-footer
                        class="h-12 w-full flex flex-row justify-between"
                    >
                        <div>
                            <span class="text-lg font-semibold"
                                >是否启用：</span
                            >
                            <el-switch
                                v-model="comboList[index].status"
                                size="large"
                                @change="handleStatusChange(index)"
                            >
                            </el-switch>
                        </div>
                        <el-button
                            class="w-1/3"
                            round
                            type="primary"
                            @click="handleUpdate(index)"
                            >{{
                                changeFlag[index] ? '完成' : '修改'
                            }}</el-button
                        >
                    </el-footer>
                </el-container>
            </el-card>
        </el-main>
    </el-container>
    <combo-create
        :id="providerId"
        :visible="createVisible"
        @update="getCombos"
    ></combo-create>
    <el-dialog
        v-model="deleteVisible"
        width="40%"
        top="10%"
        center
        destroy-on-close
    >
        <div class="text-center text-2xl font-semibold">
            <span>确认删除？</span>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button type="danger" size="large" @click="handleDelete">
                    确认
                </el-button>
                <el-button
                    type="primary"
                    size="large"
                    @click="deleteVisible = false"
                >
                    取消
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import ProviderService from '@/api/provider/provider';
import { comboDetailType, comboType } from '@/interface/provider';
import { ElMessage } from 'element-plus';
import { ref, watch } from 'vue';
import comboCreate from './combo-create.vue';

const props = defineProps<{
    id: number;
    name: string;
}>();
const providerId = ref<number>(props.id);
const providerName = ref<string>(props.name);
watch(
    () => props,
    (newVal) => {
        providerId.value = newVal.id;
        providerName.value = newVal.name;
        getCombos();
    },
    { deep: true },
);

const comboList = ref<comboType[]>([]);

/* 删除相关 */
const delFlag = ref<boolean>(false);
const checkedMap = new Map();
const checkedArr = ref<boolean[]>(
    new Array(comboList.value.length).fill(false),
);
const checkedNum = ref<number>(0);

const handleChange = (index: number) => {
    if (checkedArr.value[index]) {
        checkedNum.value++;
        checkedMap.set(comboList.value[index].id, true);
    } else {
        checkedNum.value--;
        checkedMap.delete(comboList.value[index].id);
    }
};

const deleteVisible = ref<boolean>(false);
const handleDelete = async () => {
    const list = ref<number[]>([]);
    for (let i of checkedMap.keys()) {
        list.value.push(i);
    }
    ProviderService.deleteCombo({
        list: list.value,
    }).then((res) => {
        if (res.code === 200) {
            ElMessage({
                type: 'success',
                message: '删除成功',
            });
            getCombos();
        }
    });
    deleteVisible.value = false;
    delFlag.value = false;
};

/* 修改套餐信息 */
const changeFlag = ref<boolean[]>(
    new Array(comboList.value.length).fill(false),
);
const handleUpdate = async (index: number) => {
    changeFlag.value[index] = !changeFlag.value[index];
    if (!changeFlag.value[index]) {
        ProviderService.updateCombo({
            ...comboList.value[index],
            supplierId: providerId.value,
        }).then((res) => {
            if (res.code === 200) {
                ElMessage({
                    type: 'success',
                    message: '修改成功',
                });
            }
        });
    }
};

/* 获取套餐列表 */
const getCombos = async () => {
    ProviderService.getCombos({
        id: providerId.value,
    }).then((res) => {
        if (res.code === 200) {
            comboList.value = res.data.setList;
            checkedArr.value = new Array(comboList.value.length).fill(false);
            checkedMap.clear();
            changeFlag.value = new Array(comboList.value.length).fill(false);
        }
    });
};

getCombos();

const comboLabels = ref<Partial<Record<keyof comboType, string>>>({
    id: '编号',
    name: '名称',
    description: '详情',
    flavor: '风味',
    weight: '重量',
});

/* 新增套餐 */
const createVisible = ref<boolean>(false);
const createDialog = () => {
    createVisible.value = false;
    setTimeout(() => {
        createVisible.value = true;
    });
};

/* 禁用和启用套餐 */
const handleStatusChange = (index: number) => {
    if (!comboList.value[index].status) {
        ProviderService.banCombo({ id: comboList.value[index].id }).then(
            (res) => {
                if (res.code === 200) {
                    ElMessage({
                        type: 'success',
                        message: '禁用成功',
                    });
                } else {
                    comboList.value[index].status =
                        !comboList.value[index].status;
                }
            },
        );
    } else {
        ProviderService.activateCombo({
            id: comboList.value[index].id,
        }).then((res) => {
            if (res.code === 200) {
                ElMessage({
                    type: 'success',
                    message: '启用成功',
                });
            } else {
                comboList.value[index].status = !comboList.value[index].status;
            }
        });
    }
};
</script>

<style lang="scss" scoped></style>
