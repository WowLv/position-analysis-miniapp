<template>
    <view class="container">
        <!-- 信息输入框 -->
        <view v-if="cType === 'input'">
            <view class="cell_box">
                <slot class="cell_title" v-if="isSlot"></slot>
                <view class="cell_title" v-else>{{title}}</view>
                <input class="cell_content" v-model="inputValue" @input="watchInput">
            </view>
            <view :class="{ border_bottom : !bottom }"></view>
        </view>
        <!-- 弹框选择器 -->
        <view v-if="cType === 'popup'">
            <view class="cell_box">
                <slot class="cell_title" v-if="isSlot"></slot>
                <view class="cell_title" v-else>{{title}}</view>
                <text class="cell_content">{{value}}</text>
                <text class="iconfont icon-arrow-right"></text>
                <view class="cell_mask" @click="handleClick"></view>
            </view>
            <view :class="{ border_bottom : !bottom }"></view>
        </view>
        <!-- 时间选择器 -->
        <view v-if="cType === 'date'">
            <picker 
            class="picker"
            mode="date"
            :start="start"
            :end="end"
            @change="handleDate">
                <text class="item_title">{{title}}</text>
                <text class="item_selected">{{value}}</text>
                <text class="iconfont icon-arrow-right"></text>
            </picker>
            <view :class="{ border_bottom : !bottom }"></view>
        </view>
        <!-- 导航选择器 -->
        <view v-if="cType === 'navigator'">
            <view class="cell_box">
                <slot class="cell_title" v-if="isSlot"></slot>
                <view class="cell_title" v-else>{{title}}</view>
                <text class="cell_content">{{value}}</text>
                <text class="iconfont icon-arrow-right"></text>
                <view class="cell_mask" @click="handleNav(cUrl)"></view>
            </view>
            <view :class="{ border_bottom : !bottom }"></view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            inputValue: '',
            now: ''
        }
    },
    props: {
        //最后一项标记
        bottom: {
            type: Boolean,
            default: false
        },
        //类别
        cType: {
            type: String,
            default: ''
        },
        //辨别内容类型
        valueType: {
            type: String,
            default: ''
        },
        //选择框内容数组
        cList: {
            type: Array,
            default: []
        },
        //跳转页面相对地址
        cUrl: {
            type: String,
            default: ''
        },
        //需要加图标时用slot插槽
        isSlot: {
            type: Boolean,
            default: false
        },
        //标题
        title: {
            type: String,
            default: ''
        },
        //默认值
        value: {
            type: String,
            default: ''
        },
        start: {
            type: String,
            default: ''
        },
        end: {
            type: String,
            default: ''
        }
    },
    mounted() {
        if(this.cType ===  'input') {
            this.inputValue = this.value
        }
    },
    methods: {
        //input
        watchInput() {
            this.$emit('cellValue', { type: this.valueType, value: this.inputValue })
        },
        //popup
        handleClick() {
            if(this.cType === 'popup') {
                uni.showActionSheet({
                    itemList: this.cList,
                    success: (res) => {
                        this.$emit('cellValue', { type: this.valueType, value: this.cList[res.tapIndex] })
                    }
                })
            }
        },
        //navigator
        handleNav(url) {
            uni.navigateTo({ url })
        },
        //date
        handleDate(e) {
            this.$emit('cellValue', { type: 'date', value: e.detail.value })
        }
    }
}
</script>

<style lang="scss" scoped>
.container {
    width: 100%;
    padding: 0 30rpx;
    .cell_box {
        background-color: white;
        width: 100%;
        height: 100rpx;
        display: flex;
        align-items: center;
        position: relative;
        .cell_title {
            flex: 3;
            font-size: 34rpx;
            color: $main-color;
        }
        .cell_content {
            flex: 7;
            font-size: $main-size;
            color: $shallow-color;
            text-align: right;
            padding: 0 30rpx;
        }
        .icon-arrow-right {
            font-size: $main-size;
            color: $shallow-color;
            position: absolute;
            right: 0;
        }
        .cell_mask {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
        }
    }
    .picker {
        background-color: white;
		width: 100%;
		height: 100rpx;
		position: relative;
		line-height: 100rpx;
		.item_title {
			color: $main-color;
			font-size: 34rpx;
		}
		.item_selected {
			position: absolute;
			color: $shallow-color;
			font-size: $main-size;
			right: 30rpx;
		}
		.icon-arrow-right {
			position: absolute;
			color: $shallow-color;
			right: 0;
			font-size: $main-size;
		}
	}
    .border_bottom {
        border-bottom: 2rpx solid $border-color;
    }
}
</style>