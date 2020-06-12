<template>
	<view class="container">
		<view class="my_info">
			<view class="my_login">
				<text class="login_big">{{nowUserInfo.name}}</text>
				<text class="login_small">{{nowUserInfo.detail}}</text>
				<button v-if="!userInfo" class="login_btn" open-type="getUserInfo" @getuserinfo="handleUserInfo" lang="zh_CN"></button>
			</view>
			<view class="my_avatar">
				<image :src="nowUserInfo.avatar" mode="widthFix"></image>
			</view>
		</view>
		<view class="my_setting">
			<uni-list class="setting_list">
				<uni-list-item v-for="(item, index) in settingList" :key="index">
					<navigator 
					class="list_btn" 
					open-type="navigate" 
					:url="item.url">
						<text class= "iconfont head" :class="item.class"></text>
						{{item.name}}
						<text class="iconfont icon-arrow-right tail"></text>
					</navigator>
					<view class="bottom"></view>
				</uni-list-item>
			</uni-list>
			<view v-if="userInfo" class="my_logout" @click="handleLogout">
				退出登录
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				originInfo: {
					name: "未登录/注册",
					detail: "点击头像可登陆、注册",
					avatar: "../../static/4.jpg"
				},
				settingList: [
					{ name: '在线简历', class: 'icon-feeds', url: '../../person/pages/resumeOnline/resumeOnline'},
					{ name: '附件简历', class: 'icon-folder', url: '../../person/pages/resumeAttachment/resumeAttachment'},
					{ name: '投递记录', class: 'icon-history', url: '../../person/pages/history/history'},
					{ name: '我的收藏', class: 'icon-collection', url: '../../person/pages/collect/collect'},
					{ name: '设置', class: 'icon-zhanghucaozuo', url: '../../person/pages/setting/setting'}
				],
				userInfo: null
			}
		},
		onShow() {
			this.userInfo = uni.getStorageSync('userInfo')
		},
		computed: {
			nowUserInfo() {
				if(this.userInfo) {
					return this.userInfo
				}else {
					return this.originInfo
				}
			}
		},
		methods: {
			handleUserInfo(e) {
				console.log(e)
				if(e.target.userInfo) {
					const info = e.detail.userInfo
					const _userInfo = {
						name: info.nickName,
						detail: info.province + " " +info.city,
						avatar: info.avatarUrl
					}
					// this.$store.dispatch('setUserInfo', _userInfo)
					this.userInfo = _userInfo
					uni.setStorageSync('userInfo', _userInfo)
				}else {
					return
				}
			},
			handleLogout() {
				uni.showModal({
					content: "确认退出当前账号？",
					confirmColor: "#3a3cd7",
					success: (res) => {
						if(res.confirm) {
							uni.removeStorageSync('userInfo')
							this.userInfo = null
							// this.$store.dispatch('setUserInfo', null)
							uni.showToast({
								title: "退出成功"
							})
						}
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		.my_info {
			width: 100%;
			height: 200rpx;
			background-color: $theme-color;
			display: flex;
			position: relative;
			.my_login {
				flex: 6;
				display: flex;
				flex-direction: column;
				justify-content: center;
				padding: 0 80rpx;
				color: $border-color;
				.login_big {
					font-size: 48rpx;
				}
				.login_small {
					font-size: 28rpx
				}
			}
			.my_avatar {
				flex: 4;
				width: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				image {
					width: 60%;
					border-radius: 50%;
				}
			}
			.login_btn {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					opacity: 0;
				}
		}
		.my_setting {
			width: 100%;
			.setting_list {
				margin-top: 50rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				color: $main-color;
				uni-list-item {
					// box-sizing: border-box;
					width: 100%;
					background-color: white;
					&:nth-of-type(1),
					&:nth-of-type(2),
					&:nth-of-type(3),
					&:nth-of-type(4){
						.bottom {
							margin: 0 5%;
							height: 1rpx;
							width: 90%;
							border: 1rpx solid $border-color;
						}
					}
					.list_btn {
						padding: 0 5%;
						height: 100rpx;
						display: flex;
						align-items: center;
						font-size: 34rpx;
						position: relative;
						.head {
							font-size: 50rpx;
							margin-right: 10rpx;
						}
						.tail {
							position: absolute;
							right: 5%;
							font-size: 40rpx;
						}
					}
				}
			}
			.my_logout {
				margin-top: 50rpx;
				text-align: center;
				font-size: 32rpx;
				color: #888888;
			}
		}
	}
</style>
