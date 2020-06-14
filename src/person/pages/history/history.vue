<template>
	<view class="container">
		<view class="weui-slidecells">
			<mp-slideview :buttons="slideButtons">
				<view class="weui-slidecell">
					左滑可以删除（图标Button）
				</view>
			</mp-slideview>
		</view>
	</view>
</template>

<script>
export default{
	data() {
		return {
			 slideButtons: [{
			  text: '普通',
			  extClass: 'test'
            },{
			  text: '普通',
			  extClass: 'test'
            },{
              type: 'warn',
			  text: '警示',
			  extClass: 'test'
            }]
		}
	}
}
</script>

<style lang="scss" scoped>

.container {
	height: 100vh;
	background-color: $back-color;
	.weui-slidecells {
		overflow: hidden;
		background-color: white;
		.test {
			background-color: aquamarine;
		}
	}
}
</style>
