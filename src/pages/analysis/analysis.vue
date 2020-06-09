<template>
	<view class="container">
		<text v-if="hopeCity" class="chart_title">{{hopeCity}}市职业技能数据</text>
		<text v-else class="chart_title">职业技能数据</text>
		<view class="chart_box">
			<f2 id="column_chart" :onInit="onInitColumnChart" v-if="showSkill"/>
		</view>

		<text v-if="hopeCity" class="chart_title">{{hopeCity}}市招聘地区排行</text>
		<text v-else class="chart_title">招聘地区排行</text>
		<view class="chart_box circle_chart">
			<f2 id="circle_chart" :onInit="onInitCircleChart" v-if="showRegion"/>
		</view>
		
		
	</view>
</template>

<script>
// import { getRegionRank} from '@/utils/api'
// import { TopFiveDate } from '@/utils/utils'
import { mapGetters, mapActions} from 'vuex'

	export default {
		data() {
			return {
				showSkill: false,
				showRegion: false,
				flag: false
			}
		},
		onLoad() {
			if(uni.getStorageSync('hopeObj')) {
				let firstHopeObj = uni.getStorageSync('hopeObj')
				let keys = Object.keys(firstHopeObj)
				Object.values(firstHopeObj).map((item, index) => {
					if(item) {
						this.setHopeData({type: keys[index], data: item})
						.then(() => {
							if(this.skillRank.length) {
								this.showSkill = true
							}
							if(this.regionRank.length) {
								this.showRegion = true
							}
						})
					}
				})
			}else {
				this.setHopeData({type: 'hopeCity'})
				.then(() => {
					if(this.skillRank.length) {
						this.showSkill = true
					}
					if(this.regionRank.length) {
						this.showRegion = true
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
		},
		onHide() {
			this.showSkill = false
			this.showRegion = false
		},
		computed: {
			...mapGetters([
				'hopeCity',
				'regionRank',
				'skillRank'
			])
		},
		methods: {
			...mapActions([
				'setHopeData'
			]),
			onInitLineChart(F2, config) {
				const chart = new F2.Chart(config);
				chart.source(data);
				chart.scale('date', {
					type: 'timeCat',
					tickCount: 3
				});
				chart.scale('value', {
					tickCount: 5
				});
				chart.axis('date', {
					label: function label(text, index, total) {
						// 只显示每一年的第一天
						const textCfg = {};
						if (index === 0) {
							textCfg.textAlign = 'left';
						} else if (index === total - 1) {
							textCfg.textAlign = 'right';
						}
						return textCfg;
					}
				});
				chart.tooltip({
					custom: true, // 自定义 tooltip 内容框
					onChange: function onChange(obj) {
						const legend = chart.get('legendController').legends.top[0];
						const tooltipItems = obj.items;
						const legendItems = legend.items;
						const map = {};
						legendItems.forEach(function(item) {
							map[item.name] = _.clone(item);
						});
						tooltipItems.forEach(function(item) {
							const name = item.name;
							const value = item.value;
							if (map[name]) {
								map[name].value = value;
							}
						});
						legend.setItems(_.values(map));
					},
					onHide: function onHide() {
						const legend = chart.get('legendController').legends.top[0];
						legend.setItems(chart.getLegendItems().country);
					}
				});
				chart.line().position('date*value').color('type');
				chart.render();
				return chart
			},
			onInitCircleChart(F2, config) {
				const chart= new F2.Chart(config);
				chart.coord('polar', {
					transposed: true,
					endAngle: 2 * Math.PI,
					startAngle: Math.PI / 2,
					innerRadius: 0.1
				});
				// console.log(getCurrentPages()[0].data)
				// const data = [
				// 	{name: "数据开发", value: 257},
				// 	{name: "运维", value: 300},
				// 	{name: "测试", value: 425},
				// 	{name: "移动前端开发", value: 1058},
				// 	{name: "后端开发", value: 1352}
				// ]
				// chart.source(data)
				
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
				// const data = [
				// 	{name: "广东", value: 1342},
				// 	{name: "北京", value: 1103},
				// 	{name: "上海", value: 855},
				// 	{name: "浙江", value: 274},
				// 	{name: "四川", value: 215}
				// ]
				const rules = {
					value: {
						tickCount: 6
					}
				}
				// console.log(getCurrentPages()[0].data.provinceRank)
				chart.source(getCurrentPages()[0].data.skillRank, rules);
				// chart.source(data, rules)

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
			// async _getRegionRank(region) {
			// 	let res = await getRegionRank(region)
			// 	console.log(res.data)
			// 	this.regionRank = res.data.hotRegion
			// 	this.skillRank = TopFiveDate(res.data.skill)
			// }
			// async _getPosRank() {
			// 	let res = await getPosRank()
			// 	this.posRank = TopFiveDate(res.data.other)
			// }
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
}

</style>
