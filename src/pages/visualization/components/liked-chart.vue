<template>
    <div ref="chart"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import type { likedSetType } from '@/interface/visualization';
import * as echarts from 'echarts';

const chart = ref<any>(null);
const props = defineProps<{
    data: likedSetType[];
}>();

function init() {
    const label = ref<string[]>([]);
    const data = ref<number[]>([]);

    props.data.forEach((item) => {
        label.value.push(item.name);
        data.value.push(item.num);
    });

    const option = {
        backgroundColor: '#38445E',
        title: {
            text: '收藏次数最多的套餐',
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
                    if (props.data[i].name === params[0].data.name) {
                        break;
                    }
                }
                let str = '';
                str += `<div>${props.data[i].name} - ${props.data[i].supplierName} : 收藏${props.data[i].num}次</div>`;

                return str;
            },
        },
        grid: {
            top: '30%',
            right: '3%',
            left: '5%',
            bottom: '12%',
        },
        xAxis: [
            {
                type: 'category',
                data: label.value,
                axisLine: {
                    lineStyle: {
                        color: 'rgba(255,255,255,0.12)',
                    },
                },
                axisLabel: {
                    margin: 10,
                    color: '#e2e9ff',
                    textStyle: {
                        fontSize: 14,
                    },
                },
            },
        ],
        yAxis: [
            {
                axisLabel: {
                    formatter: '{value}',
                    color: '#e2e9ff',
                },
                axisLine: {
                    show: false,
                },
                splitLine: {
                    lineStyle: {
                        color: 'rgba(255,255,255,0.12)',
                    },
                },
            },
        ],
        series: [
            {
                type: 'bar',
                data: data.value,
                barWidth: '20px',
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(
                            0,
                            0,
                            0,
                            1,
                            [
                                {
                                    offset: 0,
                                    color: 'rgba(0,244,255,1)', // 0% 处的颜色
                                },
                                {
                                    offset: 1,
                                    color: 'rgba(0,77,167,1)', // 100% 处的颜色
                                },
                            ],
                            false,
                        ),
                        barBorderRadius: [30, 30, 30, 30],
                        shadowColor: 'rgba(0,160,221,1)',
                        shadowBlur: 4,
                    },
                },
                label: {
                    normal: {
                        show: true,
                        lineHeight: 30,
                        width: 80,
                        height: 30,
                        backgroundColor: 'rgba(0,160,221,0.1)',
                        borderRadius: 200,
                        position: ['-8', '-60'],
                        distance: 1,
                        formatter: [
                            '    {d|●}',
                            ' {a|{c}}     \n',
                            '    {b|}',
                        ].join(','),
                        rich: {
                            d: {
                                color: '#3CDDCF',
                            },
                            a: {
                                color: '#fff',
                                align: 'center',
                            },
                            b: {
                                width: 1,
                                height: 30,
                                borderWidth: 1,
                                borderColor: '#234e6c',
                                align: 'left',
                            },
                        },
                    },
                },
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
