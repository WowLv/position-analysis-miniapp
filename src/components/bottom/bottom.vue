<template>
	<view class="bottom">
		<view class="mash"></view>
		<view class="main">
			<view class="share">
				<text class="iconfont icon-share"></text>
				<text class="in_text">分享</text>
				<button class="share_btn" open-type="share"></button>
			</view>
			<view class="collect" @click="handleCollect">
				<text class="iconfont icon-collection" v-if="!isCollect"></text>
				<text class="iconfont icon-collection-fill" v-else></text>
				<text class="in_text">收藏</text>
			</view>
			<view class="submit">投递简历</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isCollect: false
			};
		},
		methods: {
			handleCollect() {
				this.isCollect = !this.isCollect
				if(this.isCollect) {
					uni.showToast({
						title: '收藏成功'
					})
				}else {
					uni.showToast({
						title: '已取消'
					})
				}
				
			}
		}
	}
</script>

<style scoped lang="scss">
	.bottom {
		position: relative;
		height: 120rpx;
		.mash {
			position: absolute;
			width: 100%;
			height: 100%;
			left: 0;
			top: 0;
			background-color: white;
			opacity: 0.9;
			z-index: -1;
		}
		.main {
			height: 100%;
			width: 90%;
			display: flex;
			padding: 20rpx 0;
			font-size: $middle-size;
			font-weight: 340;
			.share, .collect  {
				flex: 2;
				display: flex;
				flex-direction: column;
				align-items: center;
				color: $middle-color;
				font-size: 24rpx;
				.iconfont {
					font-size: 48rpx;
				}
			}
			.share {
				color: #309263;
				position: relative;
				.share_btn {
					position: absolute;
					left: 0;
					top: 0;
					width: 100%;
					height: 100%;
					opacity: 0;
				}
			}
			.submit {
				background-color: #309263;
				flex: 6;
				color: $border-color;
				font-size: $main-size;
				border-radius: 10rpx;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
		
	}
</style>
