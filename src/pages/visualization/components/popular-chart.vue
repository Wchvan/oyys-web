<template>
    <div ref="chart"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import type { popularSetType } from '@/interface/visualization';
import * as echarts from 'echarts';

const chart = ref<any>(null);
const props = defineProps<{
    data: popularSetType[];
}>();

function init() {
    var total = 5; // 数据总数
    const data = ref<number[]>([]);
    const category = ref<
        {
            name: string;
            value: number;
        }[]
    >([]);
    props.data.forEach((value) => {
        category.value.unshift({
            name: value.name,
            value: value.star,
        });
        data.value.unshift(value.star);
    });
    const option = {
        backgroundColor: '#38445E',
        title: {
            text: '平均星级最高的套餐',
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
                str += `<div>${props.data[i].name} - ${props.data[i].supplierName} : ${props.data[i].star}分</div>`;

                return str;
            },
        },
        xAxis: {
            max: total,
            splitLine: {
                show: false,
            },
            axisLine: {
                show: false,
            },
            axisLabel: {
                show: false,
            },
            axisTick: {
                show: false,
            },
        },
        grid: {
            left: 150,
            top: 50, // 设置条形图的边距
            right: 80,
            bottom: 10,
        },
        yAxis: [
            {
                type: 'category',
                inverse: false,
                data: category.value,
                axisLine: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
                axisLabel: {
                    show: false,
                },
            },
        ],
        series: [
            {
                // 内
                type: 'bar',
                barWidth: 28,
                silent: true,
                itemStyle: {
                    normal: {
                        color: '#1588D1',
                    },
                },
                label: {
                    normal: {
                        formatter: '{b}',
                        textStyle: {
                            color: '#fff',
                            fontSize: 14,
                        },
                        position: 'left',
                        distance: 20, // 向右偏移位置
                        show: true,
                    },
                },
                data: category.value,
                z: 1,
                animationEasing: 'elasticOut',
            },

            {
                // 分隔
                type: 'pictorialBar',
                itemStyle: {
                    normal: {
                        color: '#07314a',
                    },
                },
                symbolRepeat: 'fixed',
                symbolMargin: 2,
                symbol: 'rect',
                symbolClip: true,
                symbolSize: [3, 28],
                symbolPosition: 'start',
                symbolOffset: [3, -4],
                symbolBoundingData: total,
                data: [total, total, total, total, total],
                z: 2,
                animationEasing: 'elasticOut',
            },
            {
                // label
                type: 'pictorialBar',
                symbolBoundingData: total,
                itemStyle: {
                    normal: {
                        color: 'none',
                    },
                },
                label: {
                    normal: {
                        formatter: (params: any) => {
                            var text;
                            text = params.data + '分';
                            return text;
                        },
                        rich: {
                            f: {
                                color: '#ffffff',
                            },
                        },
                        fontSize: 20,
                        position: 'right',
                        distance: 20, // 向右偏移位置
                        show: true,
                    },
                },
                data: data.value,
                z: 0,
            },

            {
                name: '外框',
                type: 'bar',
                barGap: '-130%', // 设置外框粗细
                data: [total, total, total, total, total],
                barWidth: 45,
                itemStyle: {
                    normal: {
                        barBorderRadius: [5, 5, 5, 5],
                        color: 'transparent', // 填充色
                        barBorderColor: '#1588D1', // 边框色
                        barBorderWidth: 3, // 边框宽度
                    },
                },
                z: 0,
            },
            {
                type: 'scatter',
                name: '条形',
                symbol: 'roundRect',
                symbolSize: [7, 20],
                symbolOffset: [3, -5],
                symbolKeepAspect: true,
                itemStyle: {
                    normal: {
                        color: '#1588D1',
                    },
                },
                data: [total, total, total, total, total],
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
