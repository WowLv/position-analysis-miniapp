<template>
    <view class="container">
        <cell cType="input" :value="projectObj.name" valueType="name" @cellValue="handleCellValue" title="项目名称"></cell>
        <cell cType="input" :value="projectObj.position" valueType="position" @cellValue="handleCellValue" title="你的职责"></cell>
        <cell cType="date" dateMode='month' :value="projectObj.startDate" valueType="startDate" @cellValue="handleCellValue" title="开始时间" start="1970" :end="now"></cell>
        <cell cType="date" dateMode='month' :value="projectObj.endDate" valueType="endDate" @cellValue="handleCellValue" title="结束时间" start="1970" :end="now" bottom></cell>
        <text class="introduce_title">项目内容</text>
        <textarea class="introduce_content" />
        <text class="show_title">项目链接</text>
        <input type="text" placeholder="https://" class="show_src">
        <button class="save_btn" @click="saveInfo">保存</button>
        <text class="delete_btn">删除此项目经验</text>
    </view>
</template>

<script>
import { getNowDate } from '@/utils/utils'
export default {
    data() {
        return {
            now: ''
        }
    },
    onLoad(option) {
       this.now = getNowDate('month')
    }
}
</script>

<style lang="scss" scoped>
.container {
    .introduce_title, .show_title {
        display: block;
        font-size: $middle-size;
        color: $middle-color;
        background-color: $back-color;
        padding: 15rpx 30rpx;
    }
    .introduce_content, .show_src {
        font-size: $middle-size;
        color: $middle-color;
        padding: 30rpx;
    }
    .show_src {
        padding: 20rpx 10rpx;
        border-bottom: 2rpx solid $border-color;
    }
    .save_btn, .delete_btn {
        margin: 0 auto;
        margin-top: 60rpx;
        width: 500rpx;
        height: 80rpx;
        color: $border-color;
        background-color: $theme-color;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .delete_btn {
        margin-top: 30rpx;
        color: $middle-color;
        background-color: white;
    }
}
</style>