<template>
  <view class="container">
    <text class="chart_title" v-if="cTitle">{{cTitle}}</text>
    <view class="chart_box">
      <f2 :onInit="onInitChart" v-if="cData.length" />
    </view>
  </view>
</template>

<script>
const PieLabel = require("@antv/f2/lib/plugin/pie-label");
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
    onInitChart(F2, config) {
      F2.Global.fontFamily = "sans-serif";
      chart = new F2.Chart({ ...config, plugins: PieLabel });
      let showData = data.filter((item) => {
        return item.name === "上市公司";
      })[0];
      chart.source(data);
      // chart.legend({ position: "right" });
      chart.legend(false);
      chart.coord("polar", {
        transposed: true,
        radius: 0.6,
        innerRadius: 0.45,
      });
      chart.axis(false);
      chart.interval().position("const*value").color("name").adjust("stack");
      chart.pieLabel({
        sidePadding: 10,
        activeShape: true,
        skipOverlapLabels: true,
        label1: function label1(data) {
          return {
            text: data.name,
            fill: "#343434",
            fontWeight: "bold",
          };
        },
        label2: function label2(data) {
          return {
            text: data.value,
            fill: "#999",
          };
        },
      });
      chart.tooltip({
        triggerOn: ["touchstart"],
        alwaysShow: true,
      });
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
  height: 450rpx;
}
</style>