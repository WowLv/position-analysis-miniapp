<template>
	<view class="index">
		<view class="index_top">
			<Top></Top>
		</view>
		<view class="index_swiper">
			<swiper indicator-dots autoplay :interval="3000" circular>
				<swiper-item v-for="(item, index) in pic" :key="index">
					<navigator>
						<image :src="item" mode="widthFix"></image>
					</navigator>
				</swiper-item>
			</swiper>
		</view>
		<view class="index_navigator">
			<navigator url="../filter/filter" open-type="navigate">
				<text class="nav_title">职位期望</text><text class="iconfont icon-arrow-right"></text>
			</navigator>
		</view> 
		<view class="position_list">
			<position-list></position-list>
		</view>
	</view>
</template>

<script>
	import Top from '@/components/top/top.vue'
	import PositionList from '@/components/positionList/positionList.vue'
	export default {
		data() {
			return {
				pic: [
					"https://ae01.alicdn.com/kf/Hf33da4c39811463abb757fdc47dedfb2A.jpg",
					"https://ae01.alicdn.com/kf/Hd9c5474314df4ea29bd809cf72c5256e9.jpg",
					"https://ae01.alicdn.com/kf/H98cff1aebac4456eaa3d7887688130539.jpg"]
			}
		},
		components: {
			Top,
			PositionList
		}
	}
</script>

<style lang="scss" scoped>
.index {
	display: flex;
	flex-direction: column;
	.index_top {
		width: 100%;
	}
	.index_swiper {
		height: 340rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #F0F1F7;
		swiper {
			height: 280rpx;
			width: 90%;
			border-radius: 8rpx;
			box-shadow: 1rpx 2rpx 12rpx #999999;
			swiper-item {
				border-radius: 8rpx;
			}
		}
	}
	.index_navigator {
		height: 100rpx;
		navigator {
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			.nav_title {
				font-size: 36rpx;
				color: $main-color;
				margin: 0 10rpx 0 30rpx;
			}
		}
	}
	
}

</style>
