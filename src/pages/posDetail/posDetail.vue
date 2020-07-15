<template>
	<view class="container" v-if="!loading">
		<view class="label_box" v-if="posObj.famousCompany === 'True'">
			<view class="label">名企</view>
		</view>
		<!-- 职位信息 -->
		<view class="pos_title">
			<text class="in_pos_title">{{posObj.positionName}}</text>
			<!-- 基本要求 -->
			<view class="require">
				<text class="salary">{{posObj.salary}}</text>
				<view class="require_list">
					<text class="split">|</text><text>{{posObj.workYear}}</text>
					<text class="split">|</text><text>{{posObj.city}}</text>
					<text class="split">|</text><text>{{posObj.education}}</text>
					<text class="split">|</text><text>{{posObj.jobNature}}</text>
				</view>
			</view>
			<!-- 职位诱惑 -->
			<view class="benefit">
				<text class="in_title">职位诱惑</text>
				<view class="benefit_list" v-for="(item, index) in posObj.companyLabelList" :key="index">
					<!-- <text v-if="index !== 0">、</text> -->
					<text class="benefit_item" v-if="!item">暂无数据</text>
					<text class="benefit_item" v-else>{{item.replace(/'/g,"")}}</text>
				</view>
			</view>
		</view>
		<!-- 公司信息 -->
		<view class="pos_company">
			<view class="left">
				<text class="in_left_title">{{posObj.companyShortName}}</text>
				<view class="in_company_descript">
					<text>{{posObj.industryField}}</text><text class="split">|</text>
					<text>{{posObj.financeStage}}</text><text class="split">|</text>
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
					<text class="posLabel_item" v-if="!item">暂无数据</text>
					<text class="posLabel_item" v-else>{{item.replace(/'/g,"")}}</text>
				</view>
			</view>
			
			<!-- 任职要求 -->
			<!-- <view class="require"> -->
				<!-- 基本要求 未改 -->
				<!-- <text class="in_title">任职要求</text>
				<view class="require_list" v-for="(item, index) in posObj.positionDesc" :key="index">
					<text>{{item}}</text> 
				</view>
			</view>  -->
		</view>
		<!-- 数据分析 -->
		<view class="chart_box">
			<radarChart class="chart"></radarChart>
		</view>
		<!-- 工作地点 -->
		<view class="pos_location">
			<text class="in_title">工作地址</text>
			<view class="location_box">
				<text class="in_location iconfont icon-icon_GPS">{{posObj.city}}-{{posObj.district}}</text>
				<text class="map_toggle" @click="toggleMap">显示地图</text>
			</view>
			<map 
				class="map" 
				scale="13"
				:longitude="posObj.longitude"
				:latitude="posObj.latitude"
				:markers="markers"
				v-if="showMap">
			</map>
		</view>

		<!-- 底部栏 -->
		<Bottom class="pos_bottom" :data="posObj" :pid="pid"></Bottom>
	</view>
	
</template>

<script>
	import Bottom from '@/components/bottom/bottom.vue'
	import radarChart from '@/components/charts/radarChart.vue'
	import { getPosDetail } from '@/utils/api'
	import { mapGetters }from 'vuex'
	var QQMapWX = require('@/utils/qqmap-wx-jssdk')
	var qqmapsdk = new QQMapWX({
		key: 'GPJBZ-PLHWG-KAKQS-IJN24-AHFYH-2SBOB'
	});  
	export default {
		data() {
			return {
				loading: true,
				showMap: false,
				pid: 0,
				markers: [
					{	
						id: 0,
						longitude: 0,
						latitude: 0,
						width: 30,
						height: 30,
						callout: { 
							display: 'ALWAYS',
							textAlign: 'center',
							content: '',
							fontSize: 12,
							padding: 8,
							borderRadius: 4,
							//背景颜色不设置ios不显示文本
							bgColor: '#ffffff'
						},
						iconPath: '../../static/position.png'
					}
				],
				posObj: {}
			}
		},
		onLoad(option) {
			this.pid = option.pid
			this._getPosDetail(option.pid)
		},
		computed: {
			...mapGetters([
				'userCollect'
			])
		},
		components: {
			Bottom,
			radarChart
		},
		methods: {
			async _getPosDetail(pid) {
				let _posObj = await getPosDetail(pid)
				this.posObj = _posObj.data[0]
				console.log(this.posObj)
				this.posObj.companyLogo = `//www.lgstatic.com/thumbnail_160x160/${this.posObj.companyLogo}`
				// this.posObj.positionDesc = [
				// 	"职位描述:",
				// 	"1、熟悉HTML5/CSS3/JS，掌握Angular/React/Vue中一种或多种开发框架，熟悉React框架优先。",
				// 	"2、具备良好的沟通能力，对于用户体验、视觉及交互设计有一定的理解；",
				// 	"3、熟悉SVN、GIT 等常用管理工具优先；",
				// 	"4、具备良好的沟通能力，对于用户体验、视觉及交互设计有一定的理解。",
				// 	"职位要求:",
				// 	"1、二本以上计算机相关专业；",
				// 	"2、需要懂vue框架，需要精通，马上能上手的。"
				// ]
				this.posObj.longitude = parseFloat(this.posObj.longitude)
				this.posObj.latitude = parseFloat(this.posObj.latitude)
				this.markers[0].longitude = parseFloat(this.posObj.longitude)
				this.markers[0].latitude = parseFloat(this.posObj.latitude)
				this.formatLoction({ latitude: this.posObj.latitude, longitude: this.posObj.longitude })
				this.loading = false
			},
			formatLoction(location) {
				qqmapsdk.reverseGeocoder({
					location: location,
					success: (res) => {
						this.markers[0].callout.content = res.result.address
					},
					fail: (err) => {
						console.log(err)
					},
				})
			},
			toggleMap() {
				this.showMap = !this.showMap
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
		overflow-x: hidden;
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
			height: 100%;
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
				font-size: $main-size;
				font-weight: 380;
				display: flex;
				text {
					color: $middle-color;
				}
				.salary {
					color: $salary-color;
				}
				.split {
					margin: 0 10rpx;
					color: $shallow-color
				}
			}
			.benefit {
				.benefit_title {
					margin-right: 10rpx;
				}
				.benefit_list {
					font-size: $main-size;
					color: $middle-color;
					display: inline-flex;
					font-size: $middle-size;
					font-weight: 320;
					.benefit_item {
						display: flex;
						justify-content: center;
						padding: 8rpx 20rpx;
						margin: 10rpx;
						border: 2rpx solid $circle-border-color;
						border-radius: 40rpx;
					}
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
					font-weight: 380;
				}
				.split {
					margin: 0 10rpx;
					color: $shallow-color
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
		.chart_box {
			width: 100%;
			height: 100%;	
			margin-top: 40rpx;
		}
		.pos_location {
			display: flex;
			flex-direction: column;
			margin: 30rpx 0 10rpx 0;
			.location_box {
				display: flex;
				justify-content: space-between;
				margin: 0 0 15rpx 0;
				font-size: $middle-size;
				.in_location {
					color: $middle-color;
					font-weight: 360;
				}
				.map_toggle {
					color: $actived-color;
					font-weight: 520;
				}
			}
			.map {
				width: 100%;
				height: 350rpx;
			}
		}
		.label_box {
			width: 160rpx;
			height: 160rpx;
			overflow: hidden;
			position: absolute;
			top: 0;
			right: 0;
			.label {
				font: bold 24rpx Sans-Serif;
				color: #333;
				text-align: center;
				text-shadow: rgba(255,255,255,0.5) 0 1rpx 0;
				transform: rotate(45deg);
				position: relative;
				padding: 12rpx;
				right: -28rpx;
				bottom: -10rpx;
				width: 180rpx;
				background-color: #BFDC7A;
				background-image: linear-gradient(top, #BFDC7A, #8EBF45);
				color: #6a6340;
				box-shadow: 0 0 3rpx rgba(0,0,0,0.3);
				&::before, &::after {
					content: "";
					border-top: 3rpx solid #6e8900;
					border-left: 3rpx solid transparent;
					border-right: 3rpx solid transparent;
					position: absolute;
					bottom: -3rpx;
				}
				&::before {
					left: 0;
				}
				&::after {
					right: 0;
				}
			}
		}
	}
	
</style>
