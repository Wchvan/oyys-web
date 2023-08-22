<template>
    <div ref="chart"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import type { supplierDataType } from '@/interface/visualization';
import * as echarts from 'echarts';

const chart = ref<any>(null);
const props = defineProps<{
    data: supplierDataType[];
}>();
function init() {
    const label = ref<string[]>([]);
    const data = ref<number[]>([]);
    const top = props.data[0].num;

    props.data.forEach((item) => {
        label.value.push(item.name);
        data.value.push(
            Math.floor((item.num / top) * 40 + (item.avg / 5) * 60),
        );
    });

    const option = {
        backgroundColor: '#38445E',
        title: {
            text: '供应商排行',
            textStyle: {
                align: 'center',
                color: '#fff',
                fontSize: 20,
            },
            left: 'center',
            top: '15px',
        },
        grid: {
            top: '12%',
            right: '3%',
            left: '25%',
            bottom: '5%',
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
                str += `<div>${props.data[i].name} - 总分：${params[0].value}</div> ${props.data[i].num}次五星 - 平均分: ${props.data[i].avg}`;

                return str;
            },
        },
        xAxis: {
            show: false,
            type: 'value',
            name: '(单位:次)',
        },
        yAxis: [
            {
                data: label.value,
                inverse: true, //反向
                axisLine: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
                axisLabel: {
                    color: '#fff',
                    fontSize: 12,
                    align: 'center',
                    margin: 80,
                    formatter: function (value: any, index: any) {
                        var sureInd =
                            label.value.map((item) => item).indexOf(value) + 1;
                        if (sureInd == 1) {
                            return '{a|' + sureInd + '}' + '{e|' + value + '}';
                        } else if (sureInd == 2) {
                            return '{b|' + sureInd + '}' + '{e|' + value + '}';
                        } else if (sureInd == 3) {
                            return '{c|' + sureInd + '}' + '{e|' + value + '}';
                        } else if (sureInd == 4) {
                            return '{d|' + sureInd + '}' + '{e|' + value + '}';
                        } else {
                            return '{d|' + sureInd + '}' + '{e|' + value + '}';
                        }
                    },
                    rich: {
                        a: {
                            backgroundColor: '#F7B500',
                            width: 18,
                            height: 18,
                            lineHeight: 20,
                            borderRadius: 9,
                        },
                        e: {
                            color: '#666666',
                            width: 100,
                            textAlign: 'center',
                        },
                        b: {
                            backgroundColor: '#B7B7B7',
                            width: 18,
                            height: 18,
                            lineHeight: 20,
                            borderRadius: 9,
                        },
                        c: {
                            backgroundColor: '#F27C00',
                            width: 18,
                            height: 18,
                            lineHeight: 20,
                            borderRadius: 9,
                        },
                        d: {
                            backgroundColor: '#0068DB',
                            width: 18,
                            height: 18,
                            lineHeight: 20,
                            borderRadius: 9,
                        },
                    },
                },
            },
            {
                inverse: true, //反向
                position: 'right', //坐标轴位置，移至右边
                axisLine: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
                show: false,
                data: label.value,
                axisLabel: {
                    color: '#333',
                    formatter: function (value: any, index: any) {
                        if (value.length > 7) {
                            return value.slice(0, 6) + '...';
                        } else {
                            return value;
                        }
                    },
                },
            },
        ],

        series: [
            {
                name: '数据量',
                type: 'bar',
                barWidth: 20,
                data: data.value, //次数列表
                yAxisIndex: 0, //使用右侧y轴
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 1,
                    y2: 0,
                    colorStops: [
                        {
                            offset: 1,
                            color: '#0fe5e3', // 0% 处的颜色
                        },
                        {
                            offset: 0,
                            color: '#2ca1d6', // 100% 处的颜色
                        },
                    ],
                    global: false, // 缺省为 false
                },
                itemStyle: {
                    normal: {
                        barBorderRadius: [30, 30, 30, 30],
                    },
                },
                label: {
                    show: false,
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
