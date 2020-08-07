<template>
  <view class="container">
    <text class="chart_title" v-if="cTitle">{{cTitle}}</text>
    <view class="chart_box">
      <f2 :onInit="onInitPieChart" v-if="cData.length" />
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
    onInitPieChart(F2, config) {
      F2.Global.fontFamily = "sans-serif";
      chart = new F2.Chart(config);
      chart.source(data);
      chart.coord("polar");
      chart.legend({
        position: "right",
      });
      chart.axis(false);
      chart.interval().position("year*population").color("year").style({
        lineWidth: 1,
        stroke: "#fff",
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
  height: 400rpx;
}
</style>