<template>
	<view class="container">
		<view v-for="item in list" :key="item.id">
			<mp-slideview :buttons="slideButtons" icon="true" @buttontap="handleTap">
				<view class="weui">
					{{item.top}}
					<view>{{item.bottom}}</view>
				</view>
			</mp-slideview>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list: [
				{ id: 1, top: '左滑可以删除(1)', bottom: '1'},
				{ id: 2, top: '左滑可以删除(2)', bottom: '2'},
			],
			 slideButtons: [{
				text: "收藏",
				  src: "/static/shoucang.svg"
				  //需要绝对路径
            }]
		}
	},
	methods: {
		handleTap(e) {
			console.log(e)
		}
	}
}
</script>

<style lang="scss" scoped>

.container {
	height: 100%;
	background-color: $back-color;
	.weui {
		height: 170rpx;
		display: flex;
		flex-direction: column;
		background-color: white;
	}
	
	
}
</style>
