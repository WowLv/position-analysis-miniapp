<template>
	<view class="analysis">
		<f2 class="f2-chart" :onInit="onInitChart" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			onInitChart(F2, config) {
				F2.Global.fontFamily = 'sans-serif';
				const chart = new F2.Chart(config);
				const data = [
					{ genre: 'Sports', sold: 275 },
					{ genre: 'Strategy', sold: 115 },
					{ genre: 'Action', sold: 120 },
					{ genre: 'Shooter', sold: 350 },
					{ genre: 'Other', sold: 150 },
				];
				// Step 2: 载入数据源
				chart.source(data);

				// Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
				chart.interval().position('genre*sold').color('genre');

				// Step 4: 渲染图表
				chart.render();
			}
		}
	}
</script>

<style lang="scss" scoped>
.analysis {
	  width: 100%;
	  height: 500rpx;
	}
</style>
	