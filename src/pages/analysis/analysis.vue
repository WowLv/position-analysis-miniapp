<template>
  <view class="container">
    <view class="line">
      <line-chart :cData="lineData"></line-chart>
    </view>
    <!-- <text v-if="hopeCity" class="chart_title">{{hopeCity}}市职业技能数据</text>
    <text v-else class="chart_title">职业技能数据</text>
    <view class="chart_box">
      <f2 :onInit="onInitColumnChart" v-if="showSkill" />
    </view>-->

    <text v-if="hopeCity" class="chart_title">{{hopeCity}}市招聘数据分析</text>
    <text v-else class="chart_title">招聘数据分析</text>
    <view class="middle_box">
      <view class="chart_box circle_chart">
        <circle-chart :cData="regionRank" v-if="showRegion"></circle-chart>
        <!-- <f2 :onInit="onInitCircleChart" v-if="showRegion" /> -->
      </view>
      <view class="chart_box column_chart">
        <column-chart :cData="skillRank" v-if="showSkill"></column-chart>
        <!-- <f2 :onInit="onInitColumnChart" v-if="showSkill" /> -->
      </view>
    </view>
  </view>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import LineChart from '@/components/charts/lineChart'
import ColumnChart from '@/components/charts/columnChart'
import CircleChart from '@/components/charts/circleChart'

export default {
  data() {
    return {
      lineData: [],
      showSkill: false,
      showRegion: false,
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
        "30K及以上"
      ],
      lineData: [          
                    {date: "2010-01-10", type: "能源", value: 99.9},
                    {date: "2010-01-10", type: "金属", value: 96.6},
                    {date: "2010-01-10", type: "农副产品", value: 96.2},
                    {date: "2010-02-10", type: "能源", value: 96.7},
                    {date: "2010-02-10", type: "金属", value: 91.1},
                    {date: "2010-02-10", type: "农副产品", value: 93.4},
                    {date: "2010-03-10", type: "能源", value: 100.2},
                    {date: "2010-03-10", type: "金属", value: 99.4},
                    {date: "2010-03-10", type: "农副产品", value: 91.7},
                    {date: "2010-04-10", type: "能源", value: 104.7},
                    {date: "2010-04-10", type: "金属", value: 108.1},
                    {date: "2010-04-10", type: "农副产品", value: 93.1},
                    {date: "2010-05-10", type: "能源", value: 95.6},
                    {date: "2010-05-10", type: "金属", value: 96},
                    {date: "2010-05-10", type: "农副产品", value: 92.3},
                    {date: "2010-06-10", type: "能源", value: 95.6},
                    {date: "2010-06-10", type: "金属", value: 89.1},
                    {date: "2010-06-10", type: "农副产品", value: 92.5},
                    {date: "2010-07-10", type: "能源", value: 95.3},
                    {date: "2010-07-10", type: "金属", value: 89.2},
                    {date: "2010-07-10", type: "农副产品", value: 95.7},
                    {date: "2010-08-10", type: "能源", value: 96.1},
                    {date: "2010-08-10", type: "金属", value: 97.6},
                    {date: "2010-08-10", type: "农副产品", value: 99.9},
                    {date: "2010-09-10", type: "能源", value: 96.1},
                    {date: "2010-09-10", type: "金属", value: 100.6},
                    {date: "2010-09-10", type: "农副产品", value: 103.8},
                    {date: "2010-10-10", type: "能源", value: 101.6},
                    {date: "2010-10-10", type: "金属", value: 108.3},
                    {date: "2010-10-10", type: "农副产品", value: 108.9},
                    {date: "2010-11-10", type: "能源", value: 105.6}
                ]
    };
  },
  onLoad() {
    if (uni.getStorageSync("hopeObj")) {
      let firstHopeObj = uni.getStorageSync("hopeObj");
      this.setReady(firstHopeObj).then(() => {
        if (this.skillRank.length) {
          this.showSkill = true;
        }
        if (this.regionRank.length) {
          this.showRegion = true;
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
      });
    }
  },
  components: {
    LineChart,
    ColumnChart,
    CircleChart
  },
  computed: {
    ...mapGetters(["hopeCity", "regionRank", "skillRank"])
  },
  methods: {
    ...mapActions(["setHopeData", "setReady"]),
    
  }
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
    height: 400rpx;
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
}
</style>
