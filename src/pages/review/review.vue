<template>
    <el-main class="h-full">
        <el-container
            class="w-full h-full bg-white shadow-lg shadow-slate-400"
            style="border-radius: 1rem"
        >
            <el-header
                class="flex flex-row justify-end"
                style="border-bottom: 1.5px solid #eee"
            >
                <el-select v-model="selectVal" size="large" @change="setChange">
                    <el-option label="所有套餐" :value="''"></el-option>
                    <el-option
                        v-for="item in setInfoList"
                        :key="item.supplierId"
                        :label="`${item.setName}-${item.supplierName}`"
                        :value="`${item.setName}-${item.supplierId}`"
                    ></el-option>
                </el-select>
                <el-button
                    :type="delFlag ? 'warning' : 'primary'"
                    class="w-20 ml-2"
                    size="large"
                    @click="delFlag = !delFlag"
                >
                    {{ delFlag ? '退出管理' : '管理' }}
                </el-button>
                <el-button
                    v-if="delFlag"
                    size="large"
                    type="danger"
                    @click="deleteVisible = true"
                >
                    删除
                </el-button>
            </el-header>
            <el-main>
                <el-container
                    v-for="(item, index) in reviewList"
                    :key="index"
                    class="h-fit bg-white shadow-lg shadow-slate-200 my-5"
                >
                    <el-header
                        style="padding: 0 1rem"
                        class="flex flex-row justify-between"
                    >
                        <div>
                            <div class="text-2xl font-semibold">
                                {{ item.name }}
                            </div>
                            <div class="text-xs">{{ item.time }}</div>
                        </div>
                        <div class="flex flex-row">
                            <div>
                                <div>套餐名：{{ item.setName }}</div>
                                <div>评分：{{ item.star }}</div>
                            </div>
                            <input
                                v-if="delFlag"
                                v-model="checkedArr[index]"
                                type="checkbox"
                                class="ml-5 w-7 h-7"
                                @change="handleChange(index)"
                            />
                        </div>
                    </el-header>
                    <el-main style="padding: 0 1rem">
                        {{ item.comment }}
                    </el-main>
                    <el-footer
                        style="padding: 1rem 1rem; height: 10rem"
                        class="flex flex-row"
                    >
                        <img
                            v-for="url in item.image"
                            :key="url"
                            style="
                                width: 8rem;
                                height: 8rem;
                                margin-right: 0.25rem;
                            "
                            :src="url"
                        />
                    </el-footer>
                </el-container>

                <div class="py-4 relative">
                    <el-pagination
                        background
                        layout="prev, pager, next"
                        :total="total"
                        class="center-x w-fit mt-2"
                        :current-page="searchForm.page"
                        :page-size="searchForm.pageSize"
                        @current-change="handlePageChange"
                    />
                    <div class="absolute right-8 w-fit top-5 mr-2">
                        <el-select
                            v-model="searchForm.pageSize"
                            placeholder="每页8条"
                            size="large"
                            class="mr-5"
                            @change="pageSizeChange"
                        >
                            <el-option label="每页5条" :value="5"></el-option>
                            <el-option label="每页8条" :value="8"></el-option>
                            <el-option label="每页10条" :value="10"></el-option>
                            <el-option label="每页15条" :value="15"></el-option>
                            <el-option label="每页20条" :value="20"></el-option>
                        </el-select>
                    </div>
                </div>
            </el-main>
        </el-container>
    </el-main>
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
import { ref } from 'vue';
import { ReviewService } from '@/api/review/review';
import { reviewType, searchFormType, setInfoType } from '@/interface/review';
import { ElMessage } from 'element-plus';

const selectVal = ref<string>('');
const searchForm = ref<searchFormType>({
    setName: '',
    page: 1,
    pageSize: 8,
    supplierId: undefined,
});

const total = ref<number>(0);
const reviewList = ref<reviewType[]>([]);

/* 删除相关 */
const delFlag = ref<boolean>(false);
const checkedMap = new Map();
const checkedArr = ref<boolean[]>(
    new Array(searchForm.value.pageSize).fill(false),
);
const checkedNum = ref<number>(0);

const handleChange = (index: number) => {
    if (checkedArr.value[index]) {
        checkedNum.value++;
        checkedMap.set(reviewList.value[index].id, true);
    } else {
        checkedNum.value--;
        checkedMap.delete(reviewList.value[index].id);
    }
};

const deleteVisible = ref<boolean>(false);
const handleDelete = async () => {
    const list = ref<number[]>([]);
    for (let i of checkedMap.keys()) {
        list.value.push(i);
    }
    ReviewService.delReviews({
        list: list.value,
    }).then((res) => {
        if (res.code === 200) {
            ElMessage({
                type: 'success',
                message: '删除成功',
            });
            getReviews();
        }
    });
    deleteVisible.value = false;
    delFlag.value = false;
};

/* 套餐名称 */
const setInfoList = ref<setInfoType[]>([]);
const getSetNameList = async () => {
    ReviewService.getComboNameList().then((res) => {
        if (res.code === 200) {
            setInfoList.value = res.data.setInfoList;
        }
    });
};
getSetNameList();
const setChange = async () => {
    searchForm.value.setName = selectVal.value.split('-')[0];
    searchForm.value.supplierId = Number(selectVal.value.split('-')[1]);
    getReviews();
};

/* 获取评论列表 */
const getReviews = async () => {
    checkedArr.value = new Array(searchForm.value.pageSize).fill(false);
    checkedMap.clear();
    ReviewService.getReviews(searchForm.value).then((res) => {
        if (res.code === 200) {
            reviewList.value = res.data.commentList;
            total.value = res.data.total;
        }
    });
};
getReviews();

/* 页码改变相关 */
const handlePageChange = (value: number) => {
    searchForm.value.page = value;
    getReviews();
};
const pageSizeChange = (value: number) => {
    searchForm.value.pageSize = value;
    searchForm.value.page = 1;
    getReviews();
};
</script>

<style lang="scss" scoped></style>
