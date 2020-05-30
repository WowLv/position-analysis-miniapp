<template>
	<view class="container">
		<!-- 职位信息 -->
		<view class="pos_title">
			<text class="in_pos_title">{{posObj.posName}}</text>
			<!-- 基本要求 -->
			<view class="require">
				<text class="salary">{{posObj.posInfo[0]}}</text>
				<view class="require_list" v-for="(item, index) in posObj.posInfo" :key="index">
					<text v-if="index !== 0">/{{item}}</text>
				</view>
			</view>
			<!-- 职位诱惑 -->
			<view class="benefit">
				<text class="benefit_title">职位诱惑:</text>
				<view class="in_benefit" v-for="(item, index) in posObj.posBenefit" :key="index">
					<text v-if="index !== 0">、</text>
					<text>{{item}}</text>
				</view>
			</view>
		</view>
		<!-- 公司信息 -->
		<view class="pos_company">
			<view class="left">
				<text class="in_left_title">{{posObj.companyName}}</text>
				<view class="in_company_descript" v-for="(item, index) in posObj.companyDes" :key="index">
					<text v-if="index !== 0">/</text>
					<text>{{item}}</text>
				</view>
			</view>
			<view class="right">
				<image :src="posObj.imageUrl" mode="widthFix"></image>
			</view>
		</view>
		<!-- 职位描述 -->
		<view class="pos_description">
			<view class="in_pos_descript">
				<text class="in_descript_title">职业描述</text>
				<view class="descript_list" v-for="(item, index) in posObj.posDescript" :key="index">
					<text class="in_descript">{{item}}</text>
				</view>
			</view>
			<!-- 任职要求 -->
			<view class="require">
				<!-- 基本要求 -->
				<text class="in_descript_title">任职要求</text>
				<view class="require_list" v-for="(item, index) in posObj.posRequire" :key="index">
					<text>{{index+1}}.{{item}}</text>
				</view>
				<!-- 加分项 -->
				<view class="descript_plus">
					<text class="in_descript_title">加分项</text>
					<view class="in_descript_plus" v-for="(item, index) in posObj.addition" :key="index">
						<text>{{index+1}}.{{item}}</text>
					</view>
				</view>
				
			</view>
		</view>
		<!-- 工作地点 -->
		<view class="pos_location">
			<text class="in_location_title">工作地址</text>
			<text class="in_location iconfont icon-icon_GPS">{{posObj.posLocation[0]}}</text>
			<text class="in_location_descript">{{posObj.posLocation[1]}}</text>
		</view>
		<!-- 底部栏 -->
		<Bottom class="pos_bottom"></Bottom>
	</view>
	
</template>

<script>
	import Bottom from '../../components/bottom/bottom.vue'
	// import { getPosDetail } from '../../utils/api.js'
	export default {
		data() {
			return {
				posObj: {
					pid: 1,
					posName: '前端开发工程师',
					imageUrl: '//www.lgstatic.com/thumbnail_160x160/i/image2/M01/A8/30/CgoB5lvlMWmAJ0OwAABcYWwLBog210.jpg',
					companyName: '前海爱讯科技（深圳）有限公司',
					companyDes: ['移动互联网', '50-150人', '不需要融资'],
					posInfo: ['6k-8k','广州', '经验1年以下', '本科及以上', '全职'],
					posBenefit: ['朝阳企业', '环境优美', '氛围好', '有萌宠'],
					posDescript: ['前端开发', '移动端', 'Web前端', 'Vue'],
					posRequire: [
						'本科及以上学历，1年以上相关工作经验，优秀者可放宽。',
						'你至少得证明你是一个前端工程师，所以你必须熟悉JavaScript；熟悉ES6；掌握vue,react,angular任一前端框架，vue优先。',
						'这些项目工程化所使用的技术，自然也不在话下——熟悉使用npm,nodejs,webpack,yarn等前端开发工具中的一种或多种；熟悉git的使用。',
						'好的代码习惯可以帮助你减少无意义的思考，所以你的代码应当工整，该有的注释不能少。',
						'前端知识种类繁多，更新频繁，所以我们希望你有足够的举一反三的能力；不给自己预设局限——可以接受学习后端、原生等知识，当然，这绝不意味着你会成为"全干工程师"。',
						'开发人员的工作中，要跟技术人员与非技术人员沟通，所以我们希望你能顺畅地跟不同的人员沟通。'
					],
					addition: ['参与社区，分享知识，如有 github 或博客，请附上地址。', '扎实的计算机基础知识。'],
					posLocation: ['广州市海珠区', '新港中路397号Tit创意园创意大道6号联合文创']
				}
				
			}
		},
		onLoad(option) {
			// console.log(option.pid)
			// this._getPosDetail()
			//小程序request只能请求http
		},
		components: {
			Bottom
		},
		methods: {
			// async _getPosDetail() {
			// 	let posData = await getPosDetail()
			// 	console.log(posData)
			// }
		}
	}
</script>

<style scoped lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		margin: 0 30rpx;
		padding-bottom: 120rpx;
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
			display: flex;
			flex-direction: column;
			.in_pos_descript {
				.descript_list {
					font-size: $main-size;
					color: $middle-color;
					display: inline-flex;
					font-size: $middle-size;
					font-weight: 320;
					.in_descript {
						display: flex;
						justify-content: center;
						padding: 8rpx 20rpx;
						margin: 15rpx;
						border: 2rpx solid $circle-border-color;
						border-radius: 40rpx;
					}
				}
			}
			.require {
				display: flex;
				flex-direction: column;
				color: $main-color;
				font-size: $middle-size;
				font-weight: 340;
				.require_list {
					margin-top: 10rpx;
				}
				.descript_plus {
					margin-top: 20rpx;
					.in_descript_plus {
						margin-top: 10rpx;
					}
				}
			}
			.in_descript_title {
				font-size: $main-size;
				color: $main-color;
				font-weight: 500;
				display: block;
				margin: 10rpx 0;
			}
			
		}
		.pos_bottom {
			width: 100%;
			position: fixed;
			bottom: 0;
		}
		.pos_location {
			display: flex;
			flex-direction: column;
			margin: 10rpx 0;
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
