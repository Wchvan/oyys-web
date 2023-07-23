import ProviderService from '@/api/provider/provider';
import { providerType } from '@/interface/provider';
import { getProvidersParm, getProvidersResp } from '@/interface/provider/api';
import { defineStore } from 'pinia';
import { ref } from 'vue';

const useProviderStore = defineStore(
    'provider',
    () => {
        const providersArr = ref<providerType[]>([]);

        const getProviders = async (params: getProvidersParm) => {
            const res = (await ProviderService.getProviders(
                params,
            )) as getProvidersResp;
            if (res.code === 200) {
                providersArr.value = res.data.supplierList;
            }
            return res;
        };

        return {
            providersArr,
            getProviders,
        };
    },
    /*  {
        persist: {
            storage: localStorage, //修改存储位置
            key: '', //设置存储的key
            paths: [], //指定要长久化的字段
        },
    }, */
);

export default useProviderStore;
