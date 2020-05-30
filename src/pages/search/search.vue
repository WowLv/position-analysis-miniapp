<template>
    <view class="container">
        <Top :location="userLocation"></Top>
        <navigator url="../selectPosition/selectPosition?mode=search" class="search_filter">
            <text class="title">按分类搜索</text>
            <text class="search_comfirm">技术<text class="iconfont icon-arrow-down"></text></text>
        </navigator>
    </view>
</template>

<script>
import Top from '../../components/top/top'
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            userLocation: ''
        }
    },
    onShow() {
        if(this.userInfo.location) {
            this.userLocation = this.userInfo.location
        }
    },
    computed: {
        ...mapGetters([
            'userInfo'
        ])
    },
    components: {
        Top
    }
}
</script>

<style lang="scss" scoped>
    .container {
        margin: 0 30rpx;
        .search_filter {
            height: 90rpx;
            width: 100%;
            display: flex;
            align-items: center;
            position: relative;
            margin-top: 10rpx;
            border-top: 1rpx solid $circle-border-color;
            .title {
                color: $main-color;
                font-size: $main-size;
                font-weight: 500;
            }
            .search_comfirm {
                display: flex;
                justify-content: center;
                align-items: center;
                position: absolute;
                color: $shallow-color;
                font-size: $middle-size;
                right: 0;
            }
        }
    }
</style>