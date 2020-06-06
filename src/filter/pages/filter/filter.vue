<template>
	<view class="container">
		<uni-list class="filter_list">
			<uni-list-item 
			v-for="(item, index) in filterList" 
			:key="item.type" 
			:class="index !== filterList.length - 1 ? 'border_bottom' : ''"
			>
				<view v-if="item.type === 'hopeSalary'" class="item_salary">
					<salary-picker :pName="item.name" :pValue="hopeObj[item.type]" @comfirm="handleComfirm"></salary-picker>
				</view>
				<view v-else-if="item.type === 'hopeDate'">
					<date-picker :pName="item.name" :pValue="hopeObj[item.type]" @comfirm="handleComfirm"></date-picker>
				</view>
				<view v-else class="no_salary">
					<text class="item_title">{{item.name}}</text>
					<view class="item_right">
						<text class="item_selected">{{hopeObj[item.type]}}</text>
						<text class="iconfont icon-arrow-right"></text>
					</view>
					<view class="item_mask" @click="handleClick(item.type, item.typeList)"></view>
				</view>

			</uni-list-item>
		</uni-list>
		<button class="filter_save" @click="saveFilter">保存</button>
	</view>
</template>

<script>
	import SalaryPicker from '../../components/salaryPicker/salaryPicker'
	import DatePicker from '../../components/datePicker/datePicker'
	import { debounce } from '../../../utils/utils'
	import { mapGetters, mapActions} from 'vuex'
	
	export default {
		data() {
			return {
				filterList: [
					{
						type: 'hopePos',
						name: '期望职位类别'
					},
					{
						type: 'hopeType',
						name: '工作性质',
						typeList: ['全职','兼职','实习']
					},
					{
						type: 'hopeSalary',
						name: '期望月薪'
					},
					{
						type: 'hopeCity',
						name: '期望城市'
					},
					{
						type: 'hopeDate',
						name: '到岗时间'
					}
				]
			}
		},
		onLoad() {
			if(uni.getStorageSync('hopeObj')) {
				let firstHopeObj = uni.getStorageSync('hopeObj')
				// { hopeSalary, hopeCity, hopeType, hopeDate, hopePos }
				let keys = Object.keys(firstHopeObj)
				Object.values(firstHopeObj).map((item, index) => {
					if(item) {
						this.setHopeData({type: keys[index], data: item})
					}
				})
				console.log(this.hopeObj)
				
			}
		},
		components: {
			SalaryPicker,
			DatePicker
		},
		computed: {
			...mapGetters([
				'hopeSalary',
				'hopeCity',
				'hopeType',
				'hopeDate',
				'hopePos'
			]),
			hopeObj() {
				return {
					hopeSalary: this.hopeSalary,
					hopeCity: this.hopeCity,
					hopeType: this.hopeType,
					hopeDate: this.hopeDate,
					hopePos: this.hopePos
				}
			}
		},
		methods: {
			...mapActions([
				'setHopeData'
			]),
			handleClick(type, list) {
				switch(type) {
					case 'hopePos':
						uni.navigateTo({
							url: '../selectPosition/selectPosition?mode=hope'
						})
						break;
					case 'hopeType':
						uni.showActionSheet({
							itemList: list,
							success: (res) => {
								let index = res.tapIndex
								this.setHopeData( {type: 'hopeType', data: list[index]} )
								// this.filterList.forEach((item) => {
								// 	if(item.type === type) {
								// 		item.value = list[index]
								// 	}
								// })
							}
						})
						break;
					case 'hopeCity':
						uni.navigateTo({
							url: '../selectRegion/selectRegion?mode=hope'
						})
						break;
				}
			},
			handleComfirm(e) {
				this.setHopeData(e)
			},
			saveFilter() {
				//后期将数据保存到服务器并筛选首页数据
				uni.setStorageSync('hopeObj', this.hopeObj)
				uni.showToast({
					title: '保存成功'
				});
			}
			
		}
	}
	
</script>

<style scoped lang="scss">
	.container {
		margin-top: 30rpx;
		.filter_list {
			display: flex;
			flex-direction: column;
			margin: 0 30rpx;
			.border_bottom {
				border-bottom: 2rpx solid $border-color;
			}
			uni-list-item {	
				width: 100%;
				.no_salary {
					height: 100rpx;
					position: relative;
					display: flex;
					align-items: center;
					justify-content: space-between;
					.item_title {
						color: $main-color;
						font-size: 35rpx;
					}
					.item_right {
						color: $shallow-color;
						.item_selected {
							font-size: $main-size;
						}
						.icon-arrow-right {
							margin-left: 20rpx;
							font-size: $small-size;
						}
					}
					.item_mask {
						position: absolute;
						top: 0;
						left: 0;
						width: 100%;
						height: 100%;
					}
				}
				
				
			}
		}
		.filter_save {
			margin-top: 150rpx;
			width: 500rpx;
			height: 80rpx;
			color: $border-color;
			background-color: $theme-color;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
</style>
