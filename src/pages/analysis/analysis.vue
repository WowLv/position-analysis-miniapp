<template>
	<view class="container">
		<text v-if="hopeCity" class="chart_title">{{hopeCity}}市职业技能数据</text>
		<text v-else class="chart_title">职业技能数据</text>
		<view class="chart_box">
			<f2 :onInit="onInitColumnChart" v-if="showSkill"/>
		</view>

		<text v-if="hopeCity" class="chart_title">{{hopeCity}}市招聘地区排行</text>
		<text v-else class="chart_title">招聘地区排行</text>
		<view class="chart_box circle_chart">
			<f2 :onInit="onInitCircleChart" v-if="showRegion"/>
		</view>
		
		<text class="chart_title">招聘薪资数据</text>
		<scroll-view scroll-x class="chart_scroll">
			<view class="chart_box square_chart">
				<f2 :onInit="onInitSquareChart" v-if="showSalary"/>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import { mapGetters, mapActions} from 'vuex'

	export default {
		data() {
			return {
				showSkill: false,
				showRegion: false,
				showSalary: false,
				flag: false,
				mySalary: [ '3k及以下', '4k', '6k', '8k', '10k', '12k', '14k', '16k', '20k',  '24k', '28k', '30K及以上' ]
			}
		},
		onLoad() {
			if(uni.getStorageSync('hopeObj')) {
				let firstHopeObj = uni.getStorageSync('hopeObj')
				this.setReady(firstHopeObj).then(() => {
					if(this.skillRank.length) {
						this.showSkill = true
					}
					if(this.regionRank.length) {
						this.showRegion = true
					}
					if(this.salaryList.length) {
						this.showSalary = true
					}
				})
				// Object.values(firstHopeObj).map((item, index) => {
				// 	this.setHopeData({type: keys[index], data: item})
				// 	this.setReady()
				// 	.then(() => {
				// 		if(this.skillRank.length) {
				// 			this.showSkill = true
				// 		}
				// 		if(this.regionRank.length) {
				// 			this.showRegion = true
				// 		}
				// 		if(this.salaryList.length) {
				// 			this.showSalary = true
				// 		}
				// 	})

				// })
			}else {
				this.setHopeData({type: 'noHope'})
				.then(() => {
					if(this.skillRank.length) {
						this.showSkill = true
					}
					if(this.regionRank.length) {
						this.showRegion = true
					}
					if(this.salaryList.length) {
						this.showSalary = true
					}
				})
			}
			this.flag = true
			
		},
		onShow() {
			if(this.flag && this.skillRank.length) {
				this.showSkill = true
			}
			if(this.flag && this.regionRank.length) {
				this.showRegion = true
			}
			if(this.flag && this.salaryList.length) {
				this.showSalary = true
			}
		},
		onHide() {
			this.showSkill = false
			this.showRegion = false
			this.showSalary = false 
		},
		computed: {
			...mapGetters([
				'hopeCity',
				'regionRank',
				'skillRank',
				'salaryList'
			]),
			nowSalaryList() {
				let list = []
				this.salaryList.map((item) => {
					item.value.map((valueItem, valueIndex) => {
						list.push({y: item.name, x: valueIndex, value: valueItem})
					})
				})
				return list
			}
		},
		methods: {
			...mapActions([
				'setHopeData',
				'setReady'
			]),
			onInitCircleChart(F2, config) {
				F2.Global.fontFamily = 'sans-serif';
				const chart= new F2.Chart(config);
				chart.coord('polar', {
					transposed: true,
					endAngle: 2 * Math.PI,
					startAngle: Math.PI / 2,
					innerRadius: 0.1
				});
				
				chart.source(getCurrentPages()[0].data.regionRank.reverse());
				
				chart.axis('name', {
					grid: false,
					line: null,
					label: {
						fontSize: 12,
						fontWeight: 'bold',
						fill: '#7b7b7e'
					}
				});
				chart.axis('value', false);
				chart.tooltip({
					showItemMarker: false,
					background: {
						radius: 2,
						fill: '#1890FF',
						padding: [ 3, 5 ]
					},
					onShow(ev) {
						const items = ev.items;
						items[0].name = items[0].title;
						items[0].value = items[0].value + '条';
					}
					
				});
				chart.legend('name', {
					position: 'left'
				})
				chart.interval().position('name*value').color('name', ['#3366ff', '#00cc00', '#e5e600','#000080','#6600ff']);
				chart.render();
				return chart
			},
			onInitColumnChart(F2, config) {
				F2.Global.fontFamily = 'sans-serif';
				const chart = new F2.Chart(config);
				const rules = {
					value: {
						tickCount: 6
					}
				}
				chart.source(getCurrentPages()[0].data.skillRank, rules);
				chart.interval()
					.position('name*total')
					.color('l(90) 0:#1890ff 1:#70cdd0');
				chart.axis('total', {
					grid: false
				})
				
				chart.tooltip({
					showItemMarker: false,
					background: {
						radius: 2,
						fill: '#1890FF',
						padding: [ 3, 5 ]
					},
					tooltipMarkerStyle: {
						fill: '#1890FF',
						fillOpacity: 0.1
					},
					onShow(ev) {
						const items = ev.items;
						items[0].name = null;
						items[0].value = items[0].value + '条';
					}
					
				});
				// Step 4: 渲染图表
				chart.render();
				return chart;
			},
			onInitSquareChart(F2, config) {
				F2.Global.fontFamily = 'sans-serif';
				var chart = new F2.Chart(config);
				chart.source(getCurrentPages()[0].data.nowSalaryList, {
					x: {
						type: 'cat',
						values: getCurrentPages()[0].data.mySalary
					}
				});
				chart.polygon().position('x*y').color('value', '#BAE7FF-#1890FF-#0050B3').style({
					lineWidth: 1,
					stroke: '#fff'
				}).animate({
					appear: {
					animation: 'fadeIn',
					duration: 800
					}
				});
				chart.render();
				return chart;
			}
		}
	}
</script>

<style lang="scss" scoped>
.container {
	.chart_title {
		width: 100%;
		padding: 0 20rpx;
		margin: 10rpx 20rpx;
		height: 80rpx;
		line-height: 80rpx;
		border-left: 5rpx solid #1890ff;
		font-size: $middle-size;
		color: $middle-color;
	}
	.chart_box {
	  width: 100%;
	  height: 400rpx;
	}
	.circle_chart {
		width: 100%;
		height: 500rpx
	}
	.chart_scroll {
		width: 100vw;
		.square_chart {
			height: 600rpx;
			width: 1000rpx;
		}
	}
	
}

</style>
