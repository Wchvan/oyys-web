import {
    getPopularSetsResp,
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

export class VisualizationService {
    static getPopularSets = getPopularSets;
    static getTopSets = getTopSets;
}
