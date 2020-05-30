<template>
    <view class="container">
        <text class="title">选择您的职位类型</text>
		<uni-list class="pos_list">
			<uni-list-item v-for="(item, index) in posList" :key="index">
				<view class="pos_item">
					<text class="pos_item">{{item}}</text>
					<text class="iconfont icon-arrow-right tail"></text>
				</view>
			</uni-list-item>
		</uni-list>
    </view>
    
</template>

<script>
export default {
    data() {
        return {
            posList: ['技术', '产品', '设计', '运营', '市场', '销售', '职能'],
            selectMode: ''
        }
    },
    onLoad(option) {
        this.selectMode = option.mode
        console.log(this.selectMode)
    }
}
</script>

<style lang="scss" scoped>
    .container {
        display: flex;
        flex-direction: column;
        margin: 0 30rpx;
        .title {
            color: $main-color;
            font-size: 48rpx;
            font-weight: 500;
            margin: 50rpx 0;
        }
        .pos_list {
            width: 100%;
            .pos_item {
                display: flex;
                align-items: center;
                position: relative;
                height: 100rpx;
                font-size: $title-size;
                color: $main-color;
                border-bottom: 2rpx solid $border-color;
                .tail {
                    position: absolute;
                    right: 0;
                }
            }
        }
    }
</style>