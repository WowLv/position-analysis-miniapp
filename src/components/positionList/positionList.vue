<template>
	<view class="container">
		<scroll-view 
		@scrolltolower="refreshPage"
		:scroll-y="isScroll" 
		class="position_list" 
		:class="{position_scroll_list : isScroll}">
			<view class="list_item" v-for="item in nowPosList" :key="item.pid">
				<mp-slideview 
				:buttons="slideButtons" 
				icon="true" 
				@buttontap="handleTap"
				:disable="mode !== 'collect'"
				:data-id="item.pid">
					<view class="item_box" @click="toPosDetail" :data-pid="item.pid">
						<image :src="item.imageUrl" mode="widthFix"></image>	
						<view class="item_detail">
							<view class="head">
								<text class="head_left">{{item.pos}}</text>
								<text class="head_right">{{item.salary}}</text>
							</view>
							<view class="middle">
								<text class="company">{{item.company}}</text>
							</view>
							<view class="bottom">
								<text>{{item.location}}</text>
								<text>{{item.experience}}</text>
								<text>{{item.education}}</text>
							</view>
						</view>
					</view>
				</mp-slideview>
			</view>
			<text class="no_more" v-if="noMore">没有更多了</text>
		</scroll-view>
	</view>
</template>

<script>
import { mapGetters,mapActions } from 'vuex'
import { searchPos } from '../../utils/api'
	export default {
		props: {
			posList: {
				type: Array,
				default: []
			},
			mode: {
				type: String,
				default: ''
			},
			isScroll: {
				type: Boolean,
				default: false
			},
			searchKey: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				searchCurrentPage: 1,
				noMore: false
			}
		},
		computed: {
			...mapGetters([
				'userInfo'
			]),
			nowPosList() {
				let curList = []
				this.posList.map((item, index) => {
					let posName = ''
					if(item.positionName.length > 11) {
						posName = item.positionName.substr(0,11).concat('...')
					}else {
						posName = item.positionName
					}
					let obj = {
						pid: item.positionId,
						imageUrl: item.companyLogo,
						pos: posName,
						salary: item.salary,
						company: item.companyShortName,
						location: item.city,
						experience: item.workYear,
						education: item.education
					}
					curList.push(obj)
				})
				return curList
			},
			slideButtons() {
				return [
					{
						text: "删除",
						src: "/static/shanchu.svg"
					}
				]
			}

		},
		methods: {
			...mapActions([
				'setSearchedPosList',
				'deleteCollect'
			]),
			toPosDetail(e) {
				let pid = e.currentTarget.dataset.pid
				console.log(pid)
				if(this.mode === 'point') {
					uni.navigateTo({
						url: `../../pages/posDetail/posDetail?pid=${pid}&mode=point`
					})
				}else if(this.mode === 'search'){
					uni.navigateTo({
						url: `../../../pages/posDetail/posDetail?pid=${pid}&mode=search`
					})
				}else {
					uni.navigateTo({
						url: `../../../pages/posDetail/posDetail?pid=${pid}`
					})
				}
			},
			async _searchPos(key, location, page) {
				const res = await searchPos(key,location, page)
				console.log(res.data)
				this.setSearchedPosList(res.data)
				// this.resultList = res.data
				if(!res.data.length) {
					this.noMore = true
					uni.showToast({
						title: '已经到底了！',
						icon: 'none'
					})
				}
			},
			refreshPage() {
				if(!this.noMore) {
					if(this.isScroll) {
						this.searchCurrentPage ++
						console.log(this.searchKey)
						this._searchPos(this.searchKey, this.userInfo.location, this.searchCurrentPage)
					}
				}
			},
			handleTap(e) {
				let pid = parseInt(e.currentTarget.dataset.id)
				if(this.mode === 'collect') {
					this.deleteCollect(pid)
					uni.showToast({
						title: '已取消'
					})
				}
			}
		}
		
	}
</script>

<style scoped lang="scss">
.container {
	.position_list {
		height: 100%;
		background-color: $back-color;
		.list_item {
			.item_box {
				margin: 0 10rpx 10rpx 10rpx;
				border-radius: 30rpx;
				background-color: white;
				height: 170rpx;
				display: flex;
				align-items: center;
				border-top: 2rpx solid $border-color;
				image {
					width: 120rpx;
					margin: 0 20rpx;
				}
				.item_detail {
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					margin: 10rpx 0;
					.head {
						color: $main-color;
						padding-left: 20rpx;
						font-size: $main-size;
						position: relative;
						.head_left {
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap
						}
						.head_right {
							position: absolute;
							right: 10rpx;
							color: $salary-color;
						}
					}
					.middle {
						color: $middle-color;
						font-size: $middle-size;
						padding-left: 20rpx;
					}
					.bottom {
						color: $shallow-color;
						font-size: $small-size;
						text {
							padding: 0 20rpx;
							&:nth-of-type(1),
							&:nth-of-type(2) {
								border-right: 2rpx solid $border-color;
							}
						}
					}
				}
			}
		}
		.no_more {
			display: flex;
			height: 80rpx;
			justify-content: center;
			align-items: center;
			font-size: $main-size;
			color: $shallow-color
		}
	}
	.position_scroll_list {
		height: 87vh;
	}
}

</style>
