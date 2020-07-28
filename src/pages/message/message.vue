<template>
	<view class="container">
		<view>
			<tabs-swiper 
			class="tabs"
			ref="tabs" 
			:list="list" 
			:current="current" 
			@change="tabsChange"
			 swiperWidth="750" 
			 is-scroll="false"
			 gutter="300">
			 </tabs-swiper>
		</view>
		<swiper :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish" class="tab_swiper">
			<swiper-item class="tab_items" v-for="(item, index) in tabs" :key="index">
				<scroll-view scroll-y class="scroll_box" v-if="item.type === 1">
					<view class="item" v-for="item in recommondList" :key="item.pid">
						<text class="title">为你匹配一条招聘信息</text>
						<view class="value">
							<view class="left">
								<image :src="item.companyLogo" mode="widthFix" />
							</view>
							<view class="right">
								<view class="r_top">
									<text>{{item.positionName}}</text>
									<text class="salary">{{item.salary}}</text>
								</view>
								<view class="r_middle">
									<text>{{item.companyName}}</text>
									<text class="point">·</text>
									<text>{{item.city}}</text>
									<text>{{item.workYear}}</text>
									<text>{{item.jobNature}}</text>
								</view>
								<view class="r_bottom">
									<text v-for="(el, index) in item.industryField" :key="index">{{el}}</text>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
				<scroll-view scroll-y class="scroll_box" v-if="item.type === 2">
					<view class="item">
						联系客服
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
import TabsSwiper from '@/components/tabs-swiper/tabs-swiper'
	export default {
		data() {
			return {
				list: [{
					name: '消息'
				}, {
					name: '小助手'
				}],
				tabs: [
					{	
						type: 1,
						name: '消息',
					 	content: [
							{ pid: 1716541, city: "广州", companyLogo:"//www.lgstatic.com/thumbnail_160x160/image1/M00/37/D4/CgYXBlWjz7aAav4uAAAamQKHn4M680.png?cc=0.40202441322617233", positionName: "Java WEB程序员", companyName: "金科汇智", salary: "3K-6K", workYear: "应届毕业生", jobNature: "实习", industryField: "移动互联网,金融"},
						 ] 
					},
					{ 
						type: 2,
						name: '小助手' ,
						content: []
					}
				],
				current: 0, // tabs组件的current值，表示当前活动的tab选项
				swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
			};
		},
		components: {
			TabsSwiper
		},
		computed: {
			recommondList() {
				let currList = this.tabs[0].content.map((item) => {
					item.industryField = item.industryField.split(',')
					return item
				})
				return currList
			}
		},
		methods: {
			// tabs通知swiper切换
			tabsChange(index) {
				this.swiperCurrent = index;
			},
			// swiper-item左右移动，通知tabs的滑块跟随移动
			transition(e) {
				let dx = e.detail.dx;
				this.$refs.tabs.setDx(dx);
			},
			// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
			// swiper滑动结束，分别设置tabs和swiper的状态
			animationfinish(e) {
				let current = e.detail.current;
				this.$refs.tabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			},
		}
	}
</script>

<style scoped lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		.tabs {
			position: fixed;
			left: 0;
			top: 0;
			z-index: 99;
		}
		.tab_swiper {
			margin-top: 80rpx;
			width: 95%;
			height: 93vh;
			.tab_items {
				.scroll_box {
					height: 100%;
					display: flex;
					flex-direction: column;
					.item {
						margin: 20rpx 0;
						width: 100%;
						height: 240rpx;
						border: 2rpx solid $border-color;
						box-shadow: 1rpx 2rpx 15rpx $circle-border-color;
						border-radius: 10rpx;
						display: flex;
						flex-direction: column;
						&:first-of-type {
							margin: 0;
						}
						.title {
							flex: 2;
							display: flex;
							justify-content: center;
							align-items: center;
							font-size: $middle-size;
							color: $actived-color
						}
						.value {
							flex: 7;
							display: flex;
							.left {
								flex: 3;
								display: flex;
								justify-content: center;
								align-items: center;
								image {
									width: 60%;
								}
							}
							.right {
								flex: 7;
								display: flex;
								flex-direction: column;
								.r_top {
									display: flex;
									justify-content: space-between;
									padding: 10rpx 10rpx 0 10rpx;
									color: $main-color;
									font-size: $title-size;
									.salary {
										color: $salary-color;
									}
								}
								.r_middle {
									color: $middle-color;
									font-size: $middle-size;
									.point {
										font-weight: 500;
									}
									text {
										padding: 0 10rpx;
										&:nth-of-type(4), &:nth-of-type(5){
											border-left: 4rpx solid $border-color;
										}
									}
								}
								.r_bottom {
									margin-top: 10rpx;
									text {
										display: inline-block;
										font-size: $middle-size;
										color: $shallow-color;
										background-color: $back-color;
										padding: 0 10rpx;
										margin-right: 15rpx;
										border-radius: 8rpx;
									}
								}
							}
						}
					}
				}
				
			}
		}
	}

</style>
