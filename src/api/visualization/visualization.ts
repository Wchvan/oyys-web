import {
    getLikedSetChartResp,
    getPopularSetsResp,
    getSupplierChartResp,
    getTopSetsResp,
} from '@/interface/visualization/api';
import { get } from '@/utils/request';

const getPopularSets = async () => {
    const res = (await get('/setList/getPopularSets')) as getPopularSetsResp;
    return res;
};

const getTopSets = async () => {
    const res = (await get('/setList/getTopSets')) as getTopSetsResp;
    return res;
};

const getSupplierChart = async () => {
    const res = (await get(
        '/supplier/getSupplierChart',
    )) as getSupplierChartResp;
    return res;
};

const getLikedSetChart = async () => {
    const res = (await get('/set/getLikedSetChart')) as getLikedSetChartResp;
    return res;
};

export class VisualizationService {
    static getPopularSets = getPopularSets;
    static getTopSets = getTopSets;
    static getSupplierChart = getSupplierChart;
    static getLikedSetChart = getLikedSetChart;
}
