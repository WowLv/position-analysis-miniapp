<template>
	<view class="top">
		<!-- 把location设置为false时不适用位置组件 -->
		<navigator 
		hover-class="none"
		url="../../pages/selectRegion/selectRegion?mode=search" 
		class="top_location" 
		:class="{'none':location === 'false'}"
		>
			<text v-if="location" class="in_location" >
				{{location}}
				<text class="iconfont icon-arrow-down"></text>
			</text>
			<text v-else class="iconfont icon-icon_GPS"></text>
		</navigator>
		<view class="top_input">
			<text class="iconfont icon-icon_search"></text>
			<input type="text">
		</view>
		<view class="top_cancel">取消</view>
	</view>
</template>

<script>
	export default {
		props: {
			location: {
				type: String,
				default: ''
			}
		}
	}
</script>

<style scoped lang="scss">
	.top {
		display: flex;
		height:80rpx;
		color: $main-color;
		padding: 10rpx 0;
		font-size: $main-size;
		
		.iconfont {
			font-size: $title-size;
		}
		.top_location, .top_cancel {
			width: 110rpx;
			max-width: 110rpx;
			display: flex;
			line-height: 60rpx;
			.in_location {
				overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
			}
			.icon-icon_GPS {
				color: $middle-color;
				margin-left: 30rpx;
			}
		}
		.top_cancel {
			width: 90rpx;
			justify-content: flex-end;
		}
		.top_input {
			flex: 1;
			display: flex;
			align-items: center;
			border: 2rpx solid $circle-border-color;
			border-radius: 30rpx;
			margin: 0;
			.icon-icon_search {
				color: $circle-border-color;
				margin-left: 20rpx;
			}
			input {
				width: 100%;
				height: 60rpx;
				margin: 0 20rpx;
			}
		}
		.none {
			display: none;
		}
	}
</style>
