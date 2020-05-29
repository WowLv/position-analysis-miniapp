<template>
	<view class="position_list">
		<uni-list class="list_main">
			<uni-list-item class="list_item" v-for="(item, index) in positionList" :key="index">
				<view class="item_box" @click="toPosDetail">
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
			</uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				positionList: [
					{
						imageUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1590390858232&di=d39703c8d443cf85e0ccbbaf215a14e9&imgtype=0&src=http%3A%2F%2Fsxsimg.xiaoyuanzhao.com%2F55%2F0D%2F553DB5EACC768D24F1B909CE98AA1C0D.jpg',
						pos: 'web前端开发工程师',
						salary: '10k-20k',
						company: '腾讯',
						location: '深圳',
						experience: '3-5年',
						education: '本科'
					},
					{
						imageUrl: '//www.lgstatic.com/thumbnail_120x120/i/image2/M01/79/0A/CgoB5ltr2A-AM5SFAADbT9jQCn841.jpeg',
						pos: 'web前端开发实习生',
						salary: '4k-8k',
						company: '字节跳动',
						location: '广州',
						experience: '应届',
						education: '本科'
					},
					{
						imageUrl: '//www.lgstatic.com/thumbnail_120x120/i/image3/M00/25/F7/Cgq2xlqX1IOACpHwAAAP79sJfBk394.jpg',
						pos: 'web前端开发工程师',
						salary: '12k-18k',
						company: '万兴科技',
						location: '深圳',
						experience: '1-3年',
						education: '本科'
					},
					{
						imageUrl: '//www.lgstatic.com/thumbnail_100x100/image1/M00/29/F4/Cgo8PFVoIgqANdHPAABcSbG32_0272.gif',
						pos: 'web前端开发工程师',
						salary: '5k-8k',
						company: '南方报业',
						location: '广州',
						experience: '应届',
						education: '本科'
					},
					{
						imageUrl: '//www.lgstatic.com/thumbnail_100x100/i/image2/M01/A8/30/CgoB5lvlMWmAJ0OwAABcYWwLBog210.jpg',
						pos: '前端开发工程师',
						salary: '6k-8k',
						company: '前海爱讯科技有限公司',
						location: '广州',
						experience: '1年',
						education: '本科'
					}
				]
			}
		},
		methods: {
			toPosDetail() {
				uni.navigateTo({
					url:"../../pages/posDetail/posDetail?pid=1"
				})
			}
		}
		
	}
</script>

<style scoped lang="scss">
.position_list {
	.list_main {
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin: 0 25rpx;
		.item_box {
			height: 170rpx;
			display: flex;
			align-items: center;
			border-top: 1px solid $border-color;
			image {
				width: 120rpx;
				// margin: 20 0rpx;
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
					.head_right {
						position: absolute;
						right: 0;
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
							border-right: 1px solid $border-color;
						}
					}
				}
			}
		}
	}
}
</style>
