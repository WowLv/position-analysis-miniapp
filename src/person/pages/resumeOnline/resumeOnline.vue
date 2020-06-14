<template>
	<view class="container">
		<navigator url="../../../pages/filter/filter?mode=resume" open-type="navigate" class="filter">
			<text class="iconfont icon-feeds"></text>
			<text class="filter_text">求职意向</text>
		</navigator>
		<view class="base_info">
			<view class="info_top">
				<view class="top_info">
					<text class="name">吕鸿志<text class="iconfont icon-tubiao09">编辑</text></text>
					<view class="info_box">
						<text class="info">男</text>
						<text class="info">22岁</text> 
						<text class="info">深圳市</text>
						<text class="info">学生</text>
					</view>
				</view>
				<view class="top_avatar">
					<image src="../../../static/4.jpg" mode="widthFix" />
				</view>
			</view>
			<view class="info_bottom">
				<text class="phone"><text class="iconfont icon-ipad"></text>15816993417</text>
				<text class="email"><text class="iconfont icon-email"></text>lyuhongzhi@foxmail.com</text>
			</view>
		</view>
		<view class="introduce"></view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
.container {
	display: flex;
	flex-direction: column;
	background-color: $back-color;
	.filter {
		background-color: white;
		display: flex;
		height: 100rpx;
		.icon-feeds {
			flex: 2;
			display: flex;
			padding-left: 50rpx;
			align-items: center;
			font-size: 60rpx;
			color: #ff9900;
		}
		.filter_text {
			flex: 8;
			display: flex;
			align-items: center;
			font-size: $title-size;
			font-weight: 500;
			color: $main-color;
		}
	}
	.base_info {
		padding: 20rpx;
		padding-left: 30rpx;
		margin-top: 20rpx;
		width: 100%;
		background-color: white;
		display: flex;
		flex-direction: column;
		.info_top {
			display: flex;
			.top_info {
				flex: 7;
				display: flex;
				flex-direction: column;
				.name {
					color: $main-color;
					font-size: 40rpx;
					margin: 20rpx 0;
					.icon-tubiao09 {
						margin-left: 50rpx;
						font-size: $main-size;
						color: $middle-color;
					}
				}
				.info_box {
					.info {
						color: $main-color;
						font-size: $middle-size;
						&:nth-of-type(1) {
							margin-right: 10rpx;
						}
						&:nth-of-type(2),
						&:nth-of-type(3),
						&:nth-of-type(4) {
							margin: 0 10rpx;
						}
					}
				}
			}
			.top_avatar {
				flex: 3;
				display: flex;
				justify-content: center;
				align-items: center;
				image {
					width: 70%;;
				}
			}
		}
		.info_bottom {
			margin-top: 10rpx;
			display: flex;
			flex-direction: column;
			color: $main-color;
			font-size: $main-size;
			.iconfont {
				font-size: 50rpx;
			}
			.phone {
				margin: 10rpx 0;
			}
		}
	}
	.introduce {
		height: 200rpx;
		margin-top: 20rpx;
		background-color: white;
	}
}
</style>