<template>
	<view class="container">
		<view class="index_top">
			<view class="top_title">
				<text>CodeRush</text>
			</view>
			<navigator url="../../filter/pages/search/search" class="top_search">
				<text class="text iconfont icon-icon_search"> 搜索职位/公司</text>
			</navigator>
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
			<navigator url="../filter/filter?mode=index" open-type="navigate">
				<text class="nav_title">为你匹配</text><text class="iconfont icon-arrow-right"></text>
			</navigator>
		</view> 
		<view class="position_list">
			<position-list :posList="loadedPosList" mode="point"></position-list>
		</view>
	</view>
</template>

<script>
	import PositionList from '@/components/positionList/positionList.vue'
	import { mapActions,mapGetters } from 'vuex'
	import { getPosDetailByPage } from '@/utils/api'
	export default {
		data() {
			return {
				pic: [
					"https://ae01.alicdn.com/kf/Hf33da4c39811463abb757fdc47dedfb2A.jpg",
					"https://ae01.alicdn.com/kf/Hd9c5474314df4ea29bd809cf72c5256e9.jpg",
					"https://ae01.alicdn.com/kf/H98cff1aebac4456eaa3d7887688130539.jpg"
				],
				currentPage: 1
			}
		},
		onLoad() {
			this._getPosDetailByPage(this.currentPage)
		},
		onReachBottom() {
			this._getPosDetailByPage(this.currentPage)
		},
		onPullDownRefresh() {
			this.currentPage = 1
			this.clearPosList()
			this._getPosDetailByPage(this.currentPage)
		},
		onUnload() {
			this.clearPosList()
		},
		components: {
			PositionList
		},
		computed: {
			...mapGetters([
				'loadedPosList'
			])
		},
		methods: {
			...mapActions([
				'setLoadedPosList',
				'clearPosList'
			]),
			//分页获取信息，缓存到vuex中
			async _getPosDetailByPage (page) {
				this.currentPage ++
				let data = await getPosDetailByPage(page)
				let dataArr = data.data
				console.log(dataArr)
				if(dataArr.length) {
					this.setLoadedPosList(dataArr)
				}else {
					uni.showToast({
						title: '已经到底了！',
						icon: 'none'
					});
				}
				
			}
		}
	}
</script>

<style lang="scss" scoped>
.container {
	display: flex;
	flex-direction: column;
	.index_top {
		// background-color: $theme-color;
		background-image: linear-gradient(to bottom right, $theme-color, #6668e7);
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		.top_title {
			height: 150rpx;
			width: 100%;
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
	.index_swiper {
		height: 340rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: $back-color;
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
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
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
