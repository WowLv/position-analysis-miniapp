<template>
  <view class="container">
    <view class="chart_box line_chart">
      <f2 :onInit="onInitLineChart" />
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
        <f2 :onInit="onInitCircleChart" v-if="showRegion" />
      </view>
      <view class="chart_box column_chart">
        <f2 :onInit="onInitColumnChart" v-if="showSkill" />
      </view>
    </view>
  </view>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      lineData: [],
      showSkill: false,
      showRegion: false,
      showSalary: false,
      flag: false,
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
      // Object.values(firstHopeObj).map((item, index) => {
      // 	this.setHopeData({type: keys[index], data: item})
      // 	this.setReady()
      // 	.then(() => {
      // 		if(this.skillRank.length) {
      // 			this.showSkill = true
      // 		}
      // 		if(this.regionRank.length) {
      // 			this.showRegion = true
      // 		}
      // 		if(this.salaryList.length) {
      // 			this.showSalary = true
      // 		}
      // 	})

      // })
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
    this.flag = true;
  },
  onShow() {
    if (this.flag && this.skillRank.length) {
      this.showSkill = true;
    }
    if (this.flag && this.regionRank.length) {
      this.showRegion = true;
    }
  },
  onHide() {
    this.showSkill = false;
    this.showRegion = false;
  },
  computed: {
    ...mapGetters(["hopeCity", "regionRank", "skillRank"])
  },
  methods: {
    ...mapActions(["setHopeData", "setReady"]),
    onInitLineChart(F2, config) {
      F2.Global.fontFamily = "sans-serif";
      uni.request({
        url: "https://f2.antv.vision/zh/examples/data/series-line.json",
        success: res => {
          let data = res.data;
          const chart = new F2.Chart(config);
          chart.source(data);
          chart.scale("date", {
            type: "timeCat",
            tickCount: 3
          });
          chart.scale("value", {
            tickCount: 5
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
            }
          });
          chart.tooltip({
            custom: true, // 自定义 tooltip 内容框
            onChange: function onChange(obj) {
              const legend = chart.get("legendController").legends.top[0];
              const tooltipItems = obj.items;
              const legendItems = legend.items;
              const map = {};
              legendItems.forEach(function(item) {
                map[item.name] = _.clone(item);
              });
              tooltipItems.forEach(function(item) {
                const name = item.name;
                const value = item.value;
                if (map[name]) {
                  map[name].value = value;
                }
              });
              legend.setItems(_.values(map));
            },
            onHide: function onHide() {
              const legend = chart.get("legendController").legends.top[0];
              legend.setItems(chart.getLegendItems().country);
            }
          });
          chart
            .line()
            .position("date*value")
            .color("type");
		  chart.render();
		  return chart
        }
      });
    },
    onInitCircleChart(F2, config) {
      F2.Global.fontFamily = "sans-serif";
      const chart = new F2.Chart(config);
      chart.coord("polar", {
        transposed: true,
        endAngle: 2 * Math.PI,
        startAngle: Math.PI / 2,
        innerRadius: 0.1
      });

      chart.source(getCurrentPages()[0].data.regionRank.reverse());

      chart.axis("name", {
        grid: false,
        line: null,
        label: (text, index, total) => {
          let fontSize = ''
          if(total === 5) {
            fontSize = '9'
          }else {
            fontSize = '11'
          }
          const cfg = {
            fontSize,
            fontWeight: "bold"
          }
          return cfg
        }
        // label: {
        //   // fontSize: 12,
        //   // fontWeight: "bold",
        //   fill: "#7b7b7e"
        // }
      });
      chart.axis("value", false);
      chart.tooltip({
        showItemMarker: false,
        background: {
          radius: 2,
          fill: "#1890FF",
          padding: [3, 5]
        },
        onShow(ev) {
          const items = ev.items;
          items[0].name = items[0].title;
          items[0].value = items[0].value + "条";
        }
      });
      chart.legend("name", {
        position: "top"
      });
      chart
        .interval()
        .position("name*value")
        .color("name", ["#3366ff", "#00cc00", "#e5e600", "#000080", "#6600ff"]);
      chart.render();
      return chart;
    },
    onInitColumnChart(F2, config) {
      F2.Global.fontFamily = "sans-serif";
      const chart = new F2.Chart(config);
      const rules = {
        value: {
          tickCount: 6
        }
      };
      chart.source(getCurrentPages()[0].data.skillRank, rules);
      chart.axis("total", {
        grid: false
      });
      chart.axis("name", {
        label: {
          rotate: 120
        },
        labelOffset: 15,
        position: "bottom"
      })
      chart.tooltip({
        showItemMarker: false,
        background: {
          radius: 2,
          fill: "#1890FF",
          padding: [3, 5]
        },
        tooltipMarkerStyle: {
          fill: "#1890FF",
          fillOpacity: 0.1
        },
        onShow(ev) {
          const items = ev.items;
          items[0].name = null;
          items[0].value = items[0].value + "条";
        }
      });
      // chart.tooltip(false)
      chart
        .interval()
        .position("name*total")
        .color("l(90) 0:#1890ff 1:#70cdd0");
      // Step 4: 渲染图表
      chart.render();
      return chart;
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
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
      height: 400rpx;
    }
    .column_chart {
      flex: 5.5;
    }
  }
}
</style>
