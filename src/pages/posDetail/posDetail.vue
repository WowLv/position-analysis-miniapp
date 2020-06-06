<template>
	<view class="container">
		<!-- 职位信息 -->
		<view class="pos_title">
			<text class="in_pos_title">{{posObj.positionName}}</text>
			<!-- 基本要求 -->
			<view class="require">
				<text class="salary">{{posObj.salary}}</text>
				<view class="require_list">
					<text>/{{posObj.city}}</text>
					<text>/{{posObj.workYear}}</text>
					<text>/{{posObj.education}}</text>
					<text>/{{posObj.jobNature}}</text>
				</view>
			</view>
			<!-- 职位诱惑 -->
			<view class="benefit">
				<text class="benefit_title">职位诱惑:</text>
				<view class="in_benefit" v-for="(item, index) in posObj.companyLabelList" :key="index">
					<text v-if="index !== 0">、</text>
					<text>{{item}}</text>
				</view>
			</view>
		</view>
		<!-- 公司信息 -->
		<view class="pos_company">
			<view class="left">
				<text class="in_left_title">{{posObj.companyShortName}}</text>
				<view class="in_company_descript">
					<text>{{posObj.industryField}}/</text>
					<text>{{posObj.financeStage}}/</text>
					<text>{{posObj.companySize}}</text>
				</view>
			</view>
			<!-- logo -->
			<view class="right">
				<image :src="posObj.companyLogo" mode="widthFix"></image>
			</view>
		</view>
		<!-- 职位描述 -->
		<view class="pos_description">
			<view class="posLabel">
				<text class="in_title">职位相关</text>
				<view class="posLabel_list" v-for="(item, index) in posObj.positionLables" :key="index">
					<text class="posLabel_item">{{item}}</text>
				</view>
			</view>
			<!-- 任职要求 -->
			<view class="require">
				<!-- 基本要求 未改-->
				<text class="in_title">任职要求</text>
				<view class="require_list" v-for="(item, index) in posObj.posRequire" :key="index">
					<text>{{item}}</text>
				</view>
			</view>
		</view>
		<!-- 发布者 -->
		<!-- <text class="in_title publisher_title">职位发布者</text>
		<view class="pos_publisher">
			<view class="avatar"><image src="https://www.lgstatic.com/thumbnail_100x100/common/image/pc/default_boy_headpic2.png" mode="widthFix" /></view>
			<view class="publisher_des">
				<text class="name">{{posObj.publisher[1]}}</text>
				<text class="pos">{{posObj.publisher[2]}}</text>
			</view>
		</view> -->
		<!-- 工作地点 -->
		<view class="pos_location">
			<text class="in_title">工作地址</text>
			<text class="in_location iconfont icon-icon_GPS">{{posObj.city}}-{{posObj.district}}</text>
			<!-- <text class="in_location_descript">{{posObj.posLocation[1]}}</text> -->
		</view>
		<!-- 底部栏 -->
		<Bottom class="pos_bottom"></Bottom>
	</view>
	
</template>

<script>
	import Bottom from '../../components/bottom/bottom.vue'
	import posDetail from '../../mock/posDetail'
	import { getPosDetailByPid } from '../../utils/api'
	import { mapGetters }from 'vuex'
	export default {
		data() {
			return {
				posObj: {}
			}
		},
		onLoad(option) {
			console.log(option.pid)
			if(option.mode === 'point') {
				this._getLocalPosDetail(option.pid)
			}else if(option.mode === 'search') {
				this._getSearchedPosDeatil(option.pid)
			}
		},
		computed: {
			...mapGetters([
				'loadedPosList',
				'searchedPosList'
			])
		},
		components: {
			Bottom
		},
		methods: {
			async _getPosDetail(pid) {
				let posData = await getPosDetailByPid(pid)
				console.log(posData)
			},
			_getLocalPosDetail(pid) {
				this.loadedPosList.map((item, index) => {
					if(item.positionId === pid) {
						this.posObj = item
						this.posObj.posRequire = [
							"职位描述:",
							"1、熟悉HTML5/CSS3/JS，掌握Angular/React/Vue中一种或多种开发框架，熟悉React框架优先。",
							"2、具备良好的沟通能力，对于用户体验、视觉及交互设计有一定的理解；",
							"3、熟悉SVN、GIT 等常用管理工具优先；",
							"4、具备良好的沟通能力，对于用户体验、视觉及交互设计有一定的理解。",
							"职位要求:",
							"1、二本以上计算机相关专业；",
							"2、需要懂vue框架，需要精通，马上能上手的。"
						]
					}
				})
			},
			_getSearchedPosDeatil(pid) {
				this.searchedPosList.map((item, index) => {
					if(item.positionId === pid) {
						this.posObj = item
						this.posObj.posRequire = [
							"职位描述:",
							"1、熟悉HTML5/CSS3/JS，掌握Angular/React/Vue中一种或多种开发框架，熟悉React框架优先。",
							"2、具备良好的沟通能力，对于用户体验、视觉及交互设计有一定的理解；",
							"3、熟悉SVN、GIT 等常用管理工具优先；",
							"4、具备良好的沟通能力，对于用户体验、视觉及交互设计有一定的理解。",
							"职位要求:",
							"1、二本以上计算机相关专业；",
							"2、需要懂vue框架，需要精通，马上能上手的。"
						]
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
		margin: 0 30rpx;
		padding-bottom: 120rpx;
		.in_title {
			font-size: $title-size;
			color: $main-color;
			font-weight: 600;
			display: block;
			margin: 10rpx 0;
		}
		.pos_title {
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			height: 200rpx;
			.in_pos_title {
				color: $main-color;
				font-size: 50rpx;
				font-weight: 500;
				margin: 10rpx 0;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap
			}
			.require {
				display: inline-flex;
				font-size: $middle-size;
				font-weight: 400;
				text {
					color: $main-color;
				}
				.salary {
					color: $salary-color;
				}
			}
			.benefit {
				display: inline-flex;
				font-size: $middle-size;
				color: $shallow-color;
				font-weight: 340;
				.benefit_title {
					margin-right: 10rpx;
				}
			}
		}
		.pos_company {
			display: flex;
			align-items: center;
			margin: 30rpx 0;
			.left {
				flex: 8;
				padding: auto 0;
				.in_left_title {
					font-size: $title-size;
					color: $main-color;
					font-weight: 500;
					display: block;
				}
				.in_company_descript {
					font-size: $middle-size;
					color: $shallow-color;
					font-weight: 340;
					display: inline-flex;

				}
			}
			.right {
				flex: 2;
			}
		}
		.pos_description {
			margin-top: 10rpx;
			display: flex;
			flex-direction: column;
			.posLabel {
				.posLabel_list {
					font-size: $main-size;
					color: $middle-color;
					display: inline-flex;
					font-size: $middle-size;
					font-weight: 320;
					.posLabel_item {
						display: flex;
						justify-content: center;
						padding: 8rpx 20rpx;
						margin: 10rpx;
						border: 2rpx solid $circle-border-color;
						border-radius: 40rpx;
					}
				}
			}
			.require {
				margin-top: 30rpx;
				display: flex;
				flex-direction: column;
				color: $main-color;
				font-size: $middle-size;
				font-weight: 340;
				.require_list {
					margin-top: 10rpx;
				}
			}
		}
		.pos_bottom {
			width: 100%;
			position: fixed;
			bottom: 0;
		}
		.publisher_title {
			margin-top: 80rpx;
		}
		.pos_publisher {
			display: flex;
			.avatar {
				flex: 2;
				margin-right: 30rpx;
			}
			.publisher_des {
				flex: 8;
				display: flex;
				flex-direction: column;
				justify-content: center;
				.name {
					color: $middle-color;
					font-size: $main-size;
					margin: 5rpx 0;

				}
				.pos {
					color: $shallow-color;
					font-size: $middle-size;
					margin: 5rpx 0;
				}
			}
		}
		.pos_location {
			display: flex;
			flex-direction: column;
			margin: 30rpx 0 10rpx 0;
			.in_location_title {
				color: $main-color;
				font-size: $main-size;
				font-weight: 500;
				margin: 10rpx 0;
			}
			.in_location {
				font-size: $middle-size;
				color: $middle-color;
				font-weight: 360;
			}
			.in_location_descript {
				font-size: $middle-size;
				color: $middle-color;
				font-weight: 340;
				padding: 0 26rpx;
			}
		}
	}
	
</style>
