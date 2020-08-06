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
			<view class="submit" v-if="!isDelivery" @click="handleDelivery">投递简历</view>
			<view class="submitSuccess" v-else>半年内不能重复投递</view>
		</view>
	</view>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
	export default {
		props: {
			data: {
				type: Object,
				default: {}
			},
			pid: {
				type: Number,
				default: ''
			}
		},
		data() {
			return {
				// isCollect: false
			};
		},
		computed: {
			...mapGetters([
				'userCollect',
				'userDelivery'
			]),
			isCollect() {
				let flag = false
				if(this.userCollect.length) {
					this.userCollect.map((item) => {
						if(parseInt(item.positionId) === this.pid) {
							flag = true
						}
					})
				}
				return flag
			},
			isDelivery() {
				let flag = false
				if(this.userDelivery.length) {
					this.userDelivery.map((item) => {
						if(parseInt(item.positionId) === this.pid) {
							flag = true
						}
					})
				}
				return flag
			},
		},
		methods: {
			...mapActions([
				'setCollect',
				'deleteCollect',
				'setDelivery',
				'deleteDelivery'
			]),
			handleCollect() {
				if(!this.isCollect) {
					this.setCollect(this.data)
					uni.showToast({
						title: '收藏成功'
					})
				}else {
					this.deleteCollect(this.pid)
					uni.showToast({
						title: '已取消'
					})
				}
			},
			handleDelivery() {
				if(!this.isDelivery) {
					this.setDelivery(this.data)
					uni.showToast({
						title: '投递成功'
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
				position: relative;
				.in_text {
					position: absolute;
					top: 55rpx
				}
				.iconfont {
					font-size: 48rpx;
					padding: 0;
					margin: 0;
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
			.submit , .submitSuccess {
				flex: 6;
				color: $border-color;
				font-size: $main-size;
				border-radius: 10rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				
			}
			.submit {
				background-color: #309263;
			}
			.submitSuccess {
				background-color:$shallow-color;
			}
		}
		
	}
</style>
