<template>
  <view class="container">
      <view class="data_box add">
          <text class="box box_top">较昨日<text class="top_add add">+3088</text></text>
          <text class="box box_middle add">133888</text>
          <text class="box box_bottom">招聘数量</text>
      </view>
      <view class="data_box minus">
          <text class="box box_top">较昨日<text class="top_add minus">-108</text></text>
          <text class="box box_middle minus">2888</text>
          <text class="box box_bottom">岗位数量</text>
      </view>
      <view class="data_box add">
          <text class="box box_top">较昨日<text class="add">+98</text></text>
          <text class="box box_middle add">4888</text>
          <text class="box box_bottom">企业数量</text>
      </view>
      <view class="data_box add">
          <text class="box box_top">较昨日<text class="top_add add">+6</text></text>
          <text class="box box_middle add">108</text>
          <text class="box box_bottom">城市数量</text>
      </view>
      <view class="data_box add">
          <text class="box box_top">较昨日<text class="top_add add">+15</text></text>
          <text class="box box_middle add">988</text>
          <text class="box box_bottom">实习岗位</text>
      </view>
      <view class="data_box minus">
          <text class="box box_top">较昨日<text class="top_add minus">-56</text></text>
          <text class="box box_middle minus">886</text>
          <text class="box box_bottom">一线城市</text>
      </view>
  </view>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.container {
    padding: 30rpx;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-row-gap: 10rpx;
    grid-column-gap: 10rpx;
    .add {
        background-color: #e5ffe53f;
    }
    .minus {
        background-color:  #ffe5f22f;
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
        // &:nth-of-type(2) {
        //     background-color: #e5f2ff2f;
        // }
        // &:nth-of-type(3) {
        //     background-color: #ffffe52f;
        // }
        // &:nth-of-type(4) {
        //     background-color: #f2e5ff2f;
        // }
        // &:nth-of-type(5) {
        //     background-color: #e5ffe53f;
        // }
        // &:nth-of-type(6) {
        //     background-color: #ffece52f;
        // }
    }
}
</style>