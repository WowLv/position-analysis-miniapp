<template>
  <view class="container">
    <view class="loading">
        <!-- <loading></loading> -->
    </view>
    <view class="main">
      <view
        class="data_box"
        :class="dataObj.companyTotal.today - dataObj.companyTotal.yesterday >= 0 ? add : minus"
      >
        <!-- <text class="box box_top">较昨日<text class="top_add add">+3088</text></text>
        <text class="box box_middle add">133888</text>-->
        <text class="box box_top">
          较昨日
          <text
            class="top_add add"
            v-if="dataObj.recruitmentTotal.today - dataObj.recruitmentTotal.yesterday >= 0"
          >+{{dataObj.recruitmentTotal.today - dataObj.recruitmentTotal.yesterday}}</text>
          <text
            class="top_add minus"
            v-else
          >{{dataObj.recruitmentTotal.today - dataObj.recruitmentTotal.yesterday}}</text>
        </text>
        <text
          class="box box_middle"
        >{{dataObj.recruitmentTotal.today}}</text>
        <text class="box box_bottom">招聘数量</text>
      </view>
      <view
        class="data_box"
        :class="dataObj.companyTotal.today - dataObj.companyTotal.yesterday >= 0 ? add : minus"
      >
        <!-- <text class="box box_top">较昨日<text class="top_add minus">-108</text></text>
        <text class="box box_middle minus">2888</text>-->
        <text class="box box_top">
          较昨日
          <text
            class="top_add add"
            v-if="dataObj.positionTotal.today - dataObj.positionTotal.yesterday >= 0"
          >+{{dataObj.positionTotal.today - dataObj.positionTotal.yesterday}}</text>
          <text
            class="top_add minus"
            v-else
          >{{dataObj.positionTotal.today - dataObj.positionTotal.yesterday}}</text>
        </text>
        <text
          class="box box_middle"
          :class="dataObj.companyTotal.today - dataObj.companyTotal.yesterday >= 0 ? add : minus"
        >{{dataObj.positionTotal.today}}</text>
        <text class="box box_bottom">岗位数量</text>
      </view>
      <view
        class="data_box"
        :class="dataObj.companyTotal.today - dataObj.companyTotal.yesterday >= 0 ? add : minus"
      >
        <!-- <text class="box box_top">较昨日<text class="add">+98</text></text>
        <text class="box box_middle add">4888</text>-->
        <text class="box box_top">
          较昨日
          <text
            class="top_add add"
            v-if="dataObj.companyTotal.today - dataObj.companyTotal.yesterday >= 0"
          >+{{dataObj.companyTotal.today - dataObj.companyTotal.yesterday}}</text>
          <text
            class="top_add minus"
            v-else
          >{{dataObj.companyTotal.today - dataObj.companyTotal.yesterday}}</text>
        </text>
        <text
          class="box box_middle"
          :class="dataObj.companyTotal.today - dataObj.companyTotal.yesterday >= 0 ? add : minus"
        >{{dataObj.companyTotal.today}}</text>
        <text class="box box_bottom">企业数量</text>
      </view>
      <view
        class="data_box"
        :class="dataObj.companyTotal.today - dataObj.companyTotal.yesterday >= 0 ? add : minus"
      >
        <!-- <text class="box box_top">较昨日<text class="top_add add">+6</text></text>
        <text class="box box_middle add">108</text>-->
        <text class="box box_top">
          较昨日
          <text
            class="top_add add"
            v-if="dataObj.cityTotal.today - dataObj.cityTotal.yesterday >= 0"
          >+{{dataObj.cityTotal.today - dataObj.cityTotal.yesterday}}</text>
          <text
            class="top_add minus"
            v-else
          >{{dataObj.cityTotal.today - dataObj.cityTotal.yesterday}}</text>
        </text>
        <text
          class="box box_middle"
          :class="dataObj.companyTotal.today - dataObj.companyTotal.yesterday >= 0 ? add : minus"
        >{{dataObj.cityTotal.today}}</text>
        <text class="box box_bottom">城市数量</text>
      </view>
      <view
        class="data_box"
        :class="dataObj.companyTotal.today - dataObj.companyTotal.yesterday >= 0 ? add : minus"
      >
        <!-- <text class="box box_top">较昨日<text class="top_add add">+15</text></text>
        <text class="box box_middle add">988</text>-->
        <text class="box box_top">
          较昨日
          <text
            class="top_add add"
            v-if="dataObj.practiceTotal.today - dataObj.practiceTotal.yesterday >= 0"
          >+{{dataObj.practiceTotal.today - dataObj.practiceTotal.yesterday}}</text>
          <text
            class="top_add minus"
            v-else
          >{{dataObj.practiceTotal.today - dataObj.practiceTotal.yesterday}}</text>
        </text>
        <text
          class="box box_middle"
          :class="dataObj.companyTotal.today - dataObj.companyTotal.yesterday >= 0 ? add : minus"
        >{{dataObj.practiceTotal.today}}</text>
        <text class="box box_bottom">实习岗位</text>
      </view>
      <view
        class="data_box"
        :class="dataObj.companyTotal.today - dataObj.companyTotal.yesterday >= 0 ? add : minus"
      >
        <!-- <text class="box box_top">较昨日<text class="top_add minus">-56</text></text>
        <text class="box box_middle minus">886</text>-->
        <text class="box box_top">
          较昨日
          <text
            class="top_add add"
            v-if="dataObj.firstCityTotal.today - dataObj.firstCityTotal.yesterday >= 0"
          >+{{dataObj.firstCityTotal.today - dataObj.firstCityTotal.yesterday}}</text>
          <text
            class="top_add minus"
            v-else
          >{{dataObj.firstCityTotal.today - dataObj.firstCityTotal.yesterday}}</text>
        </text>
        <text
          class="box box_middle"
          :class="dataObj.companyTotal.today - dataObj.companyTotal.yesterday >= 0 ? add : minus"
        >{{dataObj.firstCityTotal.today}}</text>
        <text class="box box_bottom">一线城市</text>
      </view>
    </view>
  </view>
</template>

<script>
import { getCompare } from "@/utils/api";
export default {
  data() {
    return {
      dataObj: {},
    };
  },
  created() {
    this._getCompare();
  },
  methods: {
    async _getCompare() {
      let res = await getCompare();
      this.dataObj = res.data;
      console.log(res.data);
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
    .loading {

    }
  .main {
    padding: 30rpx;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-row-gap: 10rpx;
    grid-column-gap: 10rpx;
    .add {
      background-color: #e5ffe53f;
    }
    .minus {
      background-color: #ffe5f22f;
    }
    .data_box {
      height: 180rpx;
      border-radius: 10rpx;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .box {
        flex: 3;
      }
      .box_top {
        color: $shallow-color;
        font-size: $middle-size;
      }
      .box_middle {
        flex: 4;
        font-size: 42rpx;
        font-weight: 500;
      }
      .box_bottom {
        color: $main-color;
        font-size: $middle-size;
        font-weight: 450;
      }
      .add {
        color: #00cc99;
      }
      .minus {
        color: #ff99cc;
      }
    }
  }
}
</style>