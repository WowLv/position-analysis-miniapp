<template>
  <view class="container">
    <!-- 热门职位曲线对比图 -->
    <view class="chart_box line_chart">
      <line-chart :cData="lineData" cTitle="热门职位对比"></line-chart>
      <!-- <line-chart :cData="lineData" v-if="showTrend"></line-chart> -->
    </view>

    <text v-if="hopeCity" class="chart_title">{{hopeCity}}市招聘数据分析</text>
    <text v-else class="chart_title">招聘数据分析</text>
    <view class="middle_box">
      <!-- 地区排行图 -->
      <view class="chart_box circle_chart">
        <circle-chart :cData="regionRank" v-if="showRegion"></circle-chart>
      </view>
      <!-- 当前技术栈排行 -->
      <view class="chart_box column_chart">
        <column-chart :cData="skillRank" v-if="showSkill"></column-chart>
      </view>
    </view>
    <!-- 工资分布图 -->
    <view class="chart_box heat_chart">
      <heat-chart :cData="salaryList" cTitle="工资分布图" v-if="showSalary"></heat-chart>
    </view>
    <!-- 学历要求比例图 -->
    <view class="chart_box pie_chart">
      <pie-chart :cData="pieData" cTitle="学历要求比例"></pie-chart>
    </view>
    
  </view>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import LineChart from "@/components/charts/lineChart";
import ColumnChart from "@/components/charts/columnChart";
import CircleChart from "@/components/charts/circleChart";
import PieChart from "@/components/charts/pieChart";
import HeatChart from "@/components/charts/heatChart";

export default {
  // import { posTrend } from '@/utils/api'
  data() {
    return {
      showSkill: false,
      showRegion: false,
      showTrend: false,
      showSalary: false,
      mySalary: [
        "3k及以下",
        "4k",
        "6k",
        "8k",
        "10k",
        "12k",
        "14k",
        "16k",
        "20k",
        "24k",
        "28k",
        "30K及以上",
      ],
      lineData: [
        { date: "2010-01-10", type: "能源", value: 99.9 },
        { date: "2010-01-10", type: "金属", value: 96.6 },
        { date: "2010-01-10", type: "农副产品", value: 96.2 },
        { date: "2010-02-10", type: "能源", value: 96.7 },
        { date: "2010-02-10", type: "金属", value: 91.1 },
        { date: "2010-02-10", type: "农副产品", value: 93.4 },
        { date: "2010-03-10", type: "能源", value: 100.2 },
        { date: "2010-03-10", type: "金属", value: 99.4 },
        { date: "2010-03-10", type: "农副产品", value: 91.7 },
        { date: "2010-04-10", type: "能源", value: 104.7 },
        { date: "2010-04-10", type: "金属", value: 108.1 },
        { date: "2010-04-10", type: "农副产品", value: 93.1 },
        { date: "2010-05-10", type: "能源", value: 95.6 },
        { date: "2010-05-10", type: "金属", value: 96 },
        { date: "2010-05-10", type: "农副产品", value: 92.3 },
        { date: "2010-06-10", type: "能源", value: 95.6 },
        { date: "2010-06-10", type: "金属", value: 89.1 },
        { date: "2010-06-10", type: "农副产品", value: 92.5 },
        { date: "2010-07-10", type: "能源", value: 95.3 },
        { date: "2010-07-10", type: "金属", value: 89.2 },
        { date: "2010-07-10", type: "农副产品", value: 95.7 },
        { date: "2010-08-10", type: "能源", value: 96.1 },
        { date: "2010-08-10", type: "金属", value: 97.6 },
        { date: "2010-08-10", type: "农副产品", value: 99.9 },
        { date: "2010-09-10", type: "能源", value: 96.1 },
        { date: "2010-09-10", type: "金属", value: 100.6 },
        { date: "2010-09-10", type: "农副产品", value: 103.8 },
        { date: "2010-10-10", type: "能源", value: 101.6 },
        { date: "2010-10-10", type: "金属", value: 108.3 },
        { date: "2010-10-10", type: "农副产品", value: 108.9 },
        { date: "2010-11-10", type: "能源", value: 105.6 },
      ],
      // heatData: [
      //   { name: "不限", value: [3, 1, 5, 9, 4, 1, 1, 7, 2, 0, 1, 0] },
      //   { name: "应届毕业生", value: [5, 2, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0] },
      //   { name: "1年以下", value: [2, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
      //   { name: "1-3年", value: [1, 1, 14, 29, 31, 9, 0, 6, 3, 0, 2, 0] },
      //   { name: "3-5年", value: [0, 1, 3, 9, 34, 16, 8, 49, 33, 0, 11, 0] },
      //   { name: "5-10年", value: [0, 0, 0, 0, 2, 5, 3, 15, 27, 1, 15, 0] },
      //   { name: "10年以上", value: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
      // ],
      pieData: [
        {
          year: "专科",
          population: 41.8,
        },
        {
          year: "博士",
          population: 15.8,
        },
        {
          year: "不限",
          population: 31.7,
        },
        {
          year: "本科",
          population: 46,
        },
        {
          year: "硕士",
          population: 18,
        },
      ],
    };
  },
  onLoad() {
    // this._posTrend()
    // .then(() => { this.showTrend = true })
    if (uni.getStorageSync("hopeObj")) {
      let firstHopeObj = uni.getStorageSync("hopeObj");
      this.setReady(firstHopeObj).then(() => {
        if (this.skillRank.length) {
          this.showSkill = true;
        }
        if (this.regionRank.length) {
          this.showRegion = true;
        }
        if (this.salaryList.length) {
          this.showSalary = true;
        }
      });
    } else {
      this.setHopeData({ type: "noHope" }).then(() => {
        if (this.skillRank.length) {
          this.showSkill = true;
        }
        if (this.regionRank.length) {
          this.showRegion = true;
        }
        if (this.salaryList.length) {
          this.showSalary = true;
        }
      });
    }
  },
  components: {
    LineChart,
    ColumnChart,
    CircleChart,
    PieChart,
    HeatChart,
  },
  computed: {
    ...mapGetters(["hopeCity", "regionRank", "skillRank", "salaryList"]),
  },
  methods: {
    ...mapActions(["setHopeData", "setReady"]),
    // async _posTrend() {
    //     let res = await posTrend()
    //     this.lineData = res.data
    //     console.log(res.data)
    // }
  },
};
</script>

<style lang="scss" scoped>
.container {
  .line {
    height: 100%;
    width: 100%;
  }
  .chart_title {
    width: 100%;
    padding: 0 20rpx;
    margin: 10rpx 20rpx;
    height: 80rpx;
    line-height: 80rpx;
    border-left: 5rpx solid #1890ff;
    font-size: $middle-size;
    color: $middle-color;
  }
  .chart_box {
    width: 100%;
    height: 100%;
  }
  .middle_box {
    display: flex;
    .circle_chart,
    .column_chart {
      flex: 4.5;
      width: 100%;
      height: 100%;
    }
    .column_chart {
      flex: 5.5;
    }
  }
  .pie_chart {
    width: 50vw;
    height: 100%;
  }
}
</style>
