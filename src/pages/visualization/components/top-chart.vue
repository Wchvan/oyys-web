<template>
    <div ref="chart"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import type { topSetType } from '@/interface/visualization';
import * as echarts from 'echarts';

const chart = ref<any>(null);
const props = defineProps<{
    data: topSetType[];
}>();

function init() {
    var total = 5; // 数据总数
    const data = ref<number[]>([]);
    const label = ref<string[]>([]);
    props.data.forEach((value) => {
        label.value.push(value.name);
        data.value.push(value.num);
    });
    const option = {
        backgroundColor: '#38445E',
        grid: {
            left: '12%',
            top: '15%',
            bottom: '12%',
            right: '8%',
        },
        title: {
            text: '五星次数最多的套餐',
            textStyle: {
                align: 'center',
                color: '#fff',
                fontSize: 20,
            },
            left: 'center',
            top: '15px',
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow',
            },
            formatter: (params: any) => {
                let i: any = 0;
                for (i in props.data) {
                    if (props.data[i].name === params[0].axisValueLabel) {
                        break;
                    }
                }
                let str = '';
                str += `<div>${props.data[i].name} - ${props.data[i].supplierName} : ${props.data[i].num}次</div>`;

                return str;
            },
        },
        xAxis: {
            data: label.value,
            axisTick: {
                show: false,
            },
            axisLine: {
                lineStyle: {
                    color: 'rgba(255, 129, 109, 0.1)',
                    width: 1, //这里是为了突出显示加上的
                },
            },
            axisLabel: {
                textStyle: {
                    color: '#999',
                    fontSize: 12,
                },
            },
            nameGap: 45,
        },
        yAxis: [
            {
                splitNumber: 2,
                axisTick: {
                    show: false,
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(255, 129, 109, 0.1)',
                        width: 1, //这里是为了突出显示加上的
                    },
                },
                axisLabel: {
                    textStyle: {
                        color: '#999',
                    },
                },
                splitArea: {
                    areaStyle: {
                        color: 'rgba(255,255,255,.5)',
                    },
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: 'rgba(255, 129, 109, 0.1)',
                        width: 0.5,
                        type: 'dashed',
                    },
                },
            },
        ],
        series: [
            {
                name: 'hill',
                type: 'pictorialBar',
                barCategoryGap: '0%',
                symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
                label: {
                    show: true,
                    position: 'top',
                    distance: 15,
                    color: '#DB5E6A',
                    fontWeight: 'bolder',
                    fontSize: 20,
                },
                itemStyle: {
                    normal: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                                {
                                    offset: 0,
                                    color: 'rgba(232, 94, 106, .8)', //  0%  处的颜色
                                },
                                {
                                    offset: 1,
                                    color: 'rgba(232, 94, 106, .1)', //  100%  处的颜色
                                },
                            ],
                            global: false, //  缺省为  false
                        },
                    },
                    emphasis: {
                        opacity: 1,
                    },
                },
                data: data.value,
                z: 10,
            },
        ],
    };

    let mychart = echarts.init(chart.value);
    mychart.setOption(option);
    window.addEventListener('resize', function () {
        mychart.resize();
    });
}
onMounted(() => {
    init();
});

watch(
    () => props.data,
    () => {
        init();
    },
);
</script>

<style lang="scss" scoped>
div {
    width: 100%;
    height: 100%;
}
</style>
