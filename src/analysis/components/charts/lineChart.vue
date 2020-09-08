<template>
  <view class="container">
    <text class="chart_title" v-if="cTitle">{{cTitle}}</text>
    <view class="chart_box line_chart">
      <f2 :onInit="onInitChart" />
    </view>
  </view>
</template>

<script>
let data = [];
let chart = {};
export default {
  data() {
    return {};
  },
  props: {
    cData: {
      type: Array,
      default: [],
    },
    cTitle: {
      type: String,
      default: "",
    },
  },
  created() {
    data = this.newData;
    // console.log(data);
  },
  computed: {
    newData() {
      if (data.length) {
        chart.changeData(this.cData);
      }
      return this.cData;
    },
  },
  methods: {
    // onInitChart(F2, config) {
    //   F2.Global.fontFamily = "sans-serif";
    //   chart = new F2.Chart(config);
    //   chart.source(data, {
    //     time: {
    //       type: "timeCat",
    //       tickCount: 3,
    //       mask: "hh:mm",
    //       range: [0, 1],
    //     },
    //     value: {
    //       tickCount: 3,
    //       formatter: function formatter(ivalue) {
    //         return ivalue + "%";
    //       },
    //     },
    //   });
    //   chart.axis("time", {
    //     line: null,
    //     label: function label(text, index, total) {
    //       const textCfg = {};
    //       if (index === 0) {
    //         textCfg.textAlign = "left";
    //       } else if (index === total - 1) {
    //         textCfg.textAlign = "right";
    //       }
    //       return textCfg;
    //     },
    //   });
    //   chart.axis("tem", {
    //     grid: function grid(text) {
    //       if (text === "0%") {
    //         return {
    //           lineDash: null,
    //           lineWidth: 1,
    //         };
    //       }
    //     },
    //   });
    //   chart.legend({
    //     position: "bottom",
    //     offsetY: -5,
    //   });
    //   chart
    //     .line()
    //     .position("time*value")
    //     .color("type")
    //     .shape("type", function (type) {
    //       if (type === "预期收益率") {
    //         return "line";
    //       }
    //       if (type === "实际收益率") {
    //         return "dash";
    //       }
    //     });

    //   chart.render();
    //   return chart;
    // },
    onInitChart(F2, config) {
      F2.Global.fontFamily = "sans-serif";
      chart = new F2.Chart(config);
      chart.source(data,{
        date: {
          type: "timeCat",
          mask: "MM-DD",
          tickCount: 5
        }
      });
      chart.axis("date", {
        label: function label(text, index, total) {
          // 只显示每一年的第一天
          const textCfg = {};
          if (index === 0) {
            textCfg.textAlign = "left";
          } else if (index === total - 1) {
            textCfg.textAlign = "right";
          }
          return textCfg;
        },
      });
      chart.tooltip({
        custom: true, // 自定义 tooltip 内容框
        onChange(obj) {
          const legend = chart.get("legendController").legends.top[0];
          const tooltipItems = obj.items;
          const legendItems = legend.items;
          const map = {};
          legendItems.forEach(function (item) {
            map[item.name] = item;
          });
          tooltipItems.forEach(function (item) {
            const name = item.name;
            const value = item.value;
            if (map[name]) {
              map[name].value = value;
            }
          });
          legend.setItems(Object.values(map));
        },
        onHide() {
          const legend = chart.get("legendController").legends.top[0];
          legend.setItems(chart.getLegendItems().country);
        },
      });
      chart.line().position("date*value").color("type").shape("smooth");
      chart.render();
      return chart;
    },
  },
};
</script>

<style lang="scss" scoped>
.chart_title {
  width: 100%;
  padding: 0 20rpx;
  margin: 10rpx 20rpx 0 20rpx;
  height: 80rpx;
  line-height: 80rpx;
  border-left: 5rpx solid #1890ff;
  font-size: $middle-size;
  color: $middle-color;
}
.chart_box {
  width: 100%;
  height: 400rpx;
}
</style>