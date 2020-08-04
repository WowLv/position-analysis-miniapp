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
					<view class="item" v-for="item in tabs[0].content" :key="item.type">
						<text class="title">{{item.title}}</text>
						<text class="value">{{item.value}}</text>
					</view>
				</scroll-view>
				<scroll-view scroll-y class="scroll_box" v-if="item.type === 2">
					<view class="item">
						<button class="button" open-type="contact">联系客服</button>
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
							{ title: '消息一', value: 1111},
							{ title: '消息二', value: 2222}
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
						height: 150rpx;
						border: 2rpx solid $border-color;
						box-shadow: 1rpx 2rpx 15rpx $circle-border-color;
						border-radius: 10rpx;
						&:first-of-type {
							margin: 0;
						}
						.button{
							background-color: white;
							height: 100%;
							display: flex;
							align-items: center;
							justify-content: center;
						}
						.button::after{
							border: none;
							border-radius: 0;
						}
					}
				}
				
			}
		}
	}

</style>
