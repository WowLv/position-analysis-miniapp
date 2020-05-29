<template>
	<view class="top">
		<view class="top_title">
			<text>CodeRush</text>
		</view>
		<navigator url="" class="top_search">
			<text class="text iconfont icon-icon_search"> 搜索职位/公司</text>
		</navigator>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				myAvatar:""
			}
		},
		props: {
			avatarSrc: {
				type: String,
				default: ""
			}
		}
	}
</script>

<style scoped lang="scss">
	.top {
		background-color: $theme-color;
		// height: 100rpx;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		.top_title {
			height: 150rpx;
			width: 100%;
			background-color: $theme-color;
			display: flex;
			justify-content: center;
			align-items: center;
			text{
				font-size: 80rpx;
				color: $border-color;
				font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
			}
		}
		.top_search {
			width: 90%;
			height: 70rpx;
			margin-bottom: 30rpx;
			background-color: white;
			border-radius: 35rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			.text {
				color: $shallow-color;
				font-size: 30rpx;
			}
		}
		
	}
</style>
