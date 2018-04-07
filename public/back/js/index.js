/**
 * Created by mymy on 2018/4/7.
 */

var echarts_1 = echarts.init(document.querySelector(".echarts_1"));

// 指定图表的配置项和数据
var option1 = {
  title: {
    text: 'ECharts 入门示例'
  },
  tooltip: {},
  legend: {
    data:['销量']
  },
  xAxis: {
    data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
  },
  yAxis: {},
  series: [{
    name: '销量',
    type: 'bar',
    data: [5, 20, 36, 10, 10, 20]
  }]
};

// 使用刚指定的配置项和数据显示图表。
echarts_1.setOption(option1);